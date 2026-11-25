# syntax=docker/dockerfile:1

FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm config set ignore-scripts true && pnpm install --frozen-lockfile

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm install -g pnpm && pnpm config set ignore-scripts true && pnpm install --frozen-lockfile
RUN pnpm run build

# Ensure webpack static assets exist (turbopack/dev builds 404 all /_next/static on deploy).
RUN CHUNK_COUNT="$(find .next/static/chunks -maxdepth 1 -name '*.js' 2>/dev/null | wc -l)" && \
    test "$CHUNK_COUNT" -gt 0 || (echo "ERROR: no JS chunks in .next/static/chunks" && exit 1) && \
    ! ls .next/static/chunks 2>/dev/null | grep -q turbopack || (echo "ERROR: turbopack chunks in production image" && exit 1)

# Run Lighthouse CI against the built app
RUN apk add --no-cache chromium
ENV CHROME_PATH=/usr/bin/chromium-browser
RUN pnpm run lhci || (echo "Lighthouse failed! The full HTML report was generated in /app/lighthouse-reports" && exit 1)

# Production image - standalone output from next.config.ts
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Environment variables for Intake API
ENV INTAKE_API_URL=https://staging.intake.dosable.com
ENV API_KEY=e1eb09a8396d0609618f75e1d2c184dbc21ed40fe4ee47481e9f96910b321b81
ENV TENANT_ID=29

RUN addgroup -g 1001 -S nodejs \
  && adduser -S -u 1001 -G nodejs nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next && chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]