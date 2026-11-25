#!/bin/bash

# Git Pre-Push Hook
# Runs automatically on "git push". If any check fails, the push is aborted.

set -e # Exit on any failure

echo "=================================================="
echo "🚀 Git Pre-Push Hook: Verifying Quality Gates..."
echo "=================================================="

# Pre-requisite Step: Clear server error logs
echo "🧹 Clearing server error log (logs/server-errors.log)..."
if [ -f "logs/server-errors.log" ]; then
  > logs/server-errors.log
  echo "✅ Server error log cleared!"
else
  echo "ℹ️ No server error log file found to clear."
fi
echo "--------------------------------------------------"

# Step 1: TypeScript check
echo "🔍 [1/4] Running TypeScript check (tsc)..."
pnpm tsc --noEmit -p tsconfig.typecheck.json
echo "✅ [1/4] TypeScript check passed!"
echo "--------------------------------------------------"

# Step 2: ESLint check
echo "🧹 [2/4] Running Linter (eslint)..."
pnpm run lint
echo "✅ [2/4] Lint check passed!"
echo "--------------------------------------------------"

# Step 3: Production Build
echo "🏗️ [3/4] Running Production Build..."
node scripts/prepare-next-build.js
pnpm run build
echo "✅ [3/4] Production build completed successfully!"
echo "--------------------------------------------------"

# Step 4: Lighthouse Score check (requires Chrome/Chromium — enforced in Docker/CI)
resolve_chrome_path() {
  if [ -n "$CHROME_PATH" ] && [ -f "$CHROME_PATH" ]; then
    return 0
  fi

  for candidate in \
    "/c/Program Files/Google/Chrome/Application/chrome.exe" \
    "/c/Program Files (x86)/Google/Chrome/Application/chrome.exe" \
    "$LOCALAPPDATA/Google/Chrome/Application/chrome.exe" \
    "/c/Program Files/Microsoft/Edge/Application/msedge.exe" \
    "/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" \
    "$(command -v google-chrome 2>/dev/null)" \
    "$(command -v chromium 2>/dev/null)" \
    "$(command -v chromium-browser 2>/dev/null)"
  do
    if [ -n "$candidate" ] && [ -f "$candidate" ]; then
      export CHROME_PATH="$candidate"
      return 0
    fi
  done

  return 1
}

echo "⚡ [4/4] Lighthouse CI audits..."
# Enforced in Docker build (see Dockerfile). Local pre-push skips by default because
# LHCI is slow and often flaky on Windows (EPERM temp cleanup, Edge launcher quirks).
if [ "${SKIP_LHCI:-}" = "1" ]; then
  echo "⏭️  [4/4] Lighthouse CI skipped (SKIP_LHCI=1)."
elif [ "${CI:-}" = "true" ] || [ "${RUN_LHCI:-}" = "1" ]; then
  if resolve_chrome_path && pnpm exec lhci healthcheck --fatal >/dev/null 2>&1; then
    if pnpm run lhci; then
      echo "✅ [4/4] Lighthouse CI quality gate satisfied!"
    elif [ "${STRICT_LHCI:-}" = "1" ]; then
      echo "❌ [4/4] Lighthouse CI failed (STRICT_LHCI=1)."
      exit 1
    else
      echo "⚠️  [4/4] Lighthouse CI failed but push is allowed (set STRICT_LHCI=1 to enforce)."
    fi
  elif [ "${STRICT_LHCI:-}" = "1" ]; then
    echo "❌ [4/4] Lighthouse CI failed — Chrome/Chromium not found (STRICT_LHCI=1)."
    exit 1
  else
    echo "⚠️  [4/4] Lighthouse CI skipped — Chrome/Chromium not found."
  fi
else
  echo "⏭️  [4/4] Lighthouse CI skipped locally (enforced in Docker build)."
  echo "    To run here: RUN_LHCI=1 git push"
fi
echo "--------------------------------------------------"

echo "🎉 All quality gates passed! Proceeding to push..."
echo "=================================================="
exit 0
