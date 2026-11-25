"use client";

import { GoogleTagManager } from "@next/third-parties/google";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, type ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Footer as HomeFooter } from "@/components/layout/home/Footer";
import { Header as HomeHeader } from "@/components/layout/home/Header";
import { isHomeRoute } from "@/components/layout/home/homePath";
import {
  scrollToHomeSection,
  setupSmoothHashClickNavigation,
} from "@/components/layout/scrollToSectionTop";
import { FontStylesheet } from "@/components/ui/FontStylesheet";

type ShellSwitcherProps = {
  children: ReactNode;
};

const HOME_GTM_ID = "GTM-N3H6M7JT";

function useInteractionGtm(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    let loaded = false;
    const load = () => {
      if (loaded) return;
      loaded = true;
      const w = window as Window & { dataLayer?: unknown[] };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${HOME_GTM_ID}`;
      document.head.appendChild(script);
    };

    window.addEventListener("scroll", load, { once: true, passive: true });
    window.addEventListener("pointerdown", load, { once: true });
    window.addEventListener("keydown", load, { once: true });

    return () => {
      window.removeEventListener("scroll", load);
      window.removeEventListener("pointerdown", load);
      window.removeEventListener("keydown", load);
    };
  }, [enabled]);
}

function useHomeHashScroll(enabled: boolean, pathname: string) {
  useEffect(() => {
    if (!enabled) return;
    return setupSmoothHashClickNavigation();
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    const raw = window.location.hash.slice(1);
    if (!raw) return;
    const frame = requestAnimationFrame(() => scrollToHomeSection(raw));
    return () => cancelAnimationFrame(frame);
  }, [enabled, pathname]);
}

export function ShellSwitcher({ children }: ShellSwitcherProps) {
  const pathname = usePathname();
  const isHome = isHomeRoute(pathname);

  useInteractionGtm(isHome);
  useHomeHashScroll(isHome, pathname);

  if (isHome) {
    return (
      <>
        <HomeHeader />
        <main className="flex-1 overflow-x-clip">{children}</main>
        <HomeFooter />
      </>
    );
  }

  return (
    <>
      <GoogleTagManager gtmId="GTM-N3H6M7JT" />
      <FontStylesheet sheetName="home-fonts" />
      <Header />
      <main className="flex-1">{children}</main>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}
