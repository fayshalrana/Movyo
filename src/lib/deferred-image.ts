/** 1×1 transparent GIF — stable placeholder for deferred images (SSR + client match). */
export const DEFERRED_PLACEHOLDER_SRC =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

function loadDeferredImage(img: HTMLImageElement) {
  const url = img.getAttribute("data-movyo-src");
  if (!url) return;
  img.src = url;
  img.removeAttribute("data-movyo-src");
}

/** Swap placeholder src → real URL for all deferred images under `root`. */
export function loadDeferredImages(root: ParentNode = document) {
  root.querySelectorAll("img[data-movyo-src]").forEach((node) => {
    loadDeferredImage(node as HTMLImageElement);
  });
}

/** Run `fn` after the window `load` event (initial resources already finished). */
export function afterWindowLoad(fn: () => void) {
  if (typeof window === "undefined") return;
  if (document.readyState === "complete") {
    fn();
    return;
  }
  window.addEventListener("load", fn, { once: true });
}

/** IntersectionObserver-based loader (matches inline bootstrap). */
export function observeDeferredImages(root: ParentNode = document) {
  const imgs = root.querySelectorAll("img[data-movyo-src]");
  if (!imgs.length) return;

  if (!("IntersectionObserver" in window)) {
    loadDeferredImages(root);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        loadDeferredImage(entry.target as HTMLImageElement);
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "320px" },
  );

  imgs.forEach((img) => observer.observe(img));
}

/**
 * Start observing deferred images only after window load so the initial
 * waterfall stays logo + hero (and other critical assets).
 */
export function observeDeferredImagesAfterLoad(root: ParentNode = document) {
  afterWindowLoad(() => {
    // Yield so Pingdom / Lighthouse can close the load window first.
    const start = () => observeDeferredImages(root);
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(start, { timeout: 1200 });
    } else {
      window.setTimeout(start, 0);
    }
  });
}

/** Inline boot script — begins deferred loads only after window `load`. */
export const DEFERRED_IMAGE_BOOTSTRAP = `(function(){function l(i){var u=i.getAttribute("data-movyo-src");if(!u)return;i.src=u;i.removeAttribute("data-movyo-src");}function b(){var imgs=[].slice.call(document.querySelectorAll("img[data-movyo-src]"));if(!imgs.length)return;if(!("IntersectionObserver"in window)){imgs.forEach(l);return;}var o=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){l(e.target);o.unobserve(e.target);}});},{rootMargin:"320px"});imgs.forEach(function(i){o.observe(i);});}function s(){if(typeof requestIdleCallback==="function"){requestIdleCallback(b,{timeout:1200});}else{setTimeout(b,0);}}function r(){if(document.readyState==="complete")s();else window.addEventListener("load",s,{once:true});}r();window.__movyoLoadDeferredImages=b;})();`;

/** Filenames (substring match) that must stay in the initial request waterfall. */
export const EAGER_IMAGE_PATTERNS = [
  /herobgv2-mobile/i,
  /heroV2/i,
  /banner-img-desktop/i,
  /logo-mobile/i,
];

export function isEagerImageUrl(url: string): boolean {
  return EAGER_IMAGE_PATTERNS.some((pattern) => pattern.test(url));
}
