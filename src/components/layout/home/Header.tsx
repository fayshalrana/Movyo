"use client";

import React from "react";

import logoMobile from "@/assets/logo-mobile.webp";
import wordmark from "@/assets/movyo-wordmark.webp";
import { MenuIcon } from "@/components/icons";
import { CLOSE_MOBILE_MENU_EVENT } from "@/components/layout/scrollToSectionTop";
import { HeaderFeatureBar } from "@/components/layout/home/HeaderFeatureBar";
import { AppLink } from "@/components/ui/AppLink";
import { CTAButton, cn } from "@/components/ui";

import { HOME_PATH } from "./homePath";

const navigation = [
  { name: "How It Works", id: "how-it-works" },
  { name: "Program", id: "program" },
  { name: "FAQs", id: "faq" },
  { name: "Community", id: "community" },
  { name: "Pricing", id: "pricing" },
] as const;

const navLinkClass =
  "font-sf text-base font-normal text-[#232424] lg:h-7 tracking-[0%] leading-[150%] transition-colors py-0.5 px-3";

const headerCtaClass = cn(
  "font-sf border-transparent bg-[#000000] text-white",
  "hover:bg-[#c48b76] hover:text-white hover:border-transparent",
  "focus-visible:ring-[#D9A48D]",
);

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const close = () => setIsMenuOpen(false);
    document.addEventListener(CLOSE_MOBILE_MENU_EVENT, close);
    return () => document.removeEventListener(CLOSE_MOBILE_MENU_EVENT, close);
  }, []);

  return (
    <header id="site-header" className="sticky top-0 bg-white z-50">
      <div className="bg-[#081237] px-4 py-2 text-center sm:px-5 md:px-6">
        <p className="font-sf text-[10px] font-normal leading-[150%] text-white sm:text-base">
          Save up to $200 on GLP-1 medications. Start today and feel like
          yourself again.
        </p>
      </div>

      <HeaderFeatureBar className="h-11 md:h-17.5"/>

      <nav className="mx-auto h-15 w-full max-w-316.5 bg-white px-4 sm:px-5 md:h-20 md:px-6 lg:px-0">
        <div className="relative flex h-full items-center justify-between py-3 md:py-5">
          <AppLink
            href={HOME_PATH}
            target="_self"
            className="relative block h-[36px] w-[106px] shrink-0 lg:h-10 lg:w-39.75"
          >
            <picture className="block h-full w-full">
              {/* Desktop wordmark — browser only fetches this when media matches */}
              <source
                media="(min-width: 1024px)"
                srcSet={wordmark.src}
                width={159}
                height={40}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoMobile.src}
                alt="Movyo Health"
                width={106}
                height={36}
                className="h-[36px] w-[106px] object-contain object-left lg:h-10 lg:w-39.75"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </AppLink>

          <div className="hidden items-center gap-2 lg:flex lg:gap-6">
            {navigation.map((item) => (
              <AppLink
                key={item.name}
                href={`${HOME_PATH}#${item.id}`}
                target="_self"
                className={navLinkClass}
              >
                {item.name}
              </AppLink>
            ))}
            <CTAButton
              href="/get-started"
              className={cn(
                headerCtaClass,
                "rounded-full px-4 py-1.5 text-base font-medium leading-[160%] tracking-[2%]",
              )}
            >
              Get Started
            </CTAButton>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="inline-flex cursor-pointer items-center justify-center rounded-md p-2 text-black hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7eb1e6] btn-bounce"
            >
              <MenuIcon className="h-6 w-6" strokeWidth={2} />
            </button>
          </div>

          {isMenuOpen && (
            <div className="absolute inset-x-0 top-[calc(100%+8px)] z-10 w-full rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
              <div className="flex flex-col gap-1">
                {navigation.map((item) => (
                  <AppLink
                    key={item.name}
                    href={`${HOME_PATH}#${item.id}`}
                    target="_self"
                    className="rounded-md px-3 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  >
                    {item.name}
                  </AppLink>
                ))}
                <CTAButton
                  href="/get-started"
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    headerCtaClass,
                    "mt-2 w-full rounded-full px-4 py-2.5 text-base font-medium leading-[160%] tracking-[2%]",
                  )}
                >
                  Get Started
                </CTAButton>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
