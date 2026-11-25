import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge class names; later arguments override Tailwind conflicts (tailwind-merge). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function loadManifest(): Record<string, string> {
  try {
    // Use indirect require via eval to bypass Webpack static bundling analysis
    const req = eval('require');
    return req('../../public/assets-manifest.json');
  } catch {
    return {};
  }
}

export function getAssetUrl(src: string, buildVersion?: string) {
  const version =
    buildVersion ||
    (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_BUILD_VERSION) ||
    "latest";
  const cleanSrc = src.startsWith("/") ? src.slice(1) : src;
  
  const manifestData = loadManifest();
  const hashedPath = manifestData[cleanSrc] || manifestData["/" + cleanSrc];
  
  const finalPath = hashedPath ? (hashedPath.startsWith('/') ? hashedPath.slice(1) : hashedPath) : cleanSrc;
  return "/" + finalPath + (finalPath.includes('?') ? '&' : '?') + "v=" + version;
}