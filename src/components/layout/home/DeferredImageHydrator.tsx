"use client";

import { useEffect, type DependencyList, type RefObject } from "react";

import {
  loadDeferredImages,
  observeDeferredImages,
  observeDeferredImagesAfterLoad,
} from "@/lib/deferred-image";

/** Re-run deferred image loading after React hydrates client components. */
export function DeferredImageHydrator() {
  useEffect(() => {
    observeDeferredImagesAfterLoad();
  }, []);

  return null;
}

/** Load every deferred image under a subtree (e.g. after carousel clones slides). */
export function useLoadDeferredImagesIn(
  rootRef: RefObject<Element | null>,
  deps: DependencyList = [],
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    // Carousel clones need immediate swap once the page has already loaded.
    if (document.readyState === "complete") {
      loadDeferredImages(root);
      observeDeferredImages(root);
      return;
    }
    observeDeferredImagesAfterLoad(root);
  }, deps);
}
