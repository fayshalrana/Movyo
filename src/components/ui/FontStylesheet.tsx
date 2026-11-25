"use client";

import { useEffect } from "react";
import { getAssetUrl } from "@/lib/helper/utils";

/**
 * Client component to inject font stylesheet into head
 * Only loads home-fonts.css when this component is rendered
 * This ensures CSS loads only on pages that need it (with-navbar routes)
 */
export function FontStylesheet({ sheetName }: { sheetName: string }) {
  useEffect(() => {
    // Check if stylesheet already exists to avoid duplicate loading
    const selector = "link[href*=\"" + sheetName + ".css\"]";
    const existingLink = document.querySelector(selector);

    if (!existingLink) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = getAssetUrl("/assets/css/" + sheetName + ".css");
      // Add to head for proper loading order
      document.head.appendChild(link);
    }
  }, [sheetName]);

  return null;
}