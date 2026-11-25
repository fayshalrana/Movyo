"use client";

import Image from "next/image";
import { MenuIcon } from "@/components/icons";
import { AppLink } from "@/components/ui/AppLink";
import React from "react";

import wordmark from "@/assets/movyo-wordmark.webp";
import { CLOSE_MOBILE_MENU_EVENT } from "@/components/layout/scrollToSectionTop";
import { CTAButton } from "@/components/ui";

const navigation = [
  { name: "How It Works", id: "how-it-works" },
  { name: "Program", id: "program" },
  { name: "Pricing", id: "pricing" },
  { name: "Community", id: "community" },
  { name: "FAQ", id: "faq" },
  { name: "Contact Us", id: "contact" },
] as const;

const navLinkClass =
  "font-sf text-[16px] md:text-[13px] lg:text-[16px] font-normal text-[#111] hover:text-gray-900 -tracking-[1%] transition-colors";

export function Header() {
  const [hasScrolled, setHasScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const close = () => setIsMenuOpen(false);
    document.addEventListener(CLOSE_MOBILE_MENU_EVENT, close);
    return () => document.removeEventListener(CLOSE_MOBILE_MENU_EVENT, close);
  }, []);

  return (
    <header
      id="site-header"
      className={`sticky top-0 z-50 bg-[#FFF] transition-shadow ${
        hasScrolled ? "shadow-[0_4px_20px_0_rgba(0,0,0,0.12)]" : "shadow-none"
      } md:shadow-[0_4px_20px_0_rgba(0,0,0,0.12)]`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex min-h-14 items-center justify-between md:min-h-15.5">
          <AppLink
            href="/"
            target="_self"
            className="relative block h-10 w-30 shrink-0 sm:h-11 sm:w-40 md:h-15.5 md:w-31.5 lg:w-51.5 xl:w-61.5"
          >
            <Image
              src={wordmark}
              alt="Movyo Health"
              fill
              className="object-contain object-left"
              sizes="(max-width: 768px) 144px, 146px"
              priority
              fetchPriority="high"
              quality={80}
            />
          </AppLink>

          <div className="hidden items-center gap-6 md:gap-4 lg:gap-10 md:flex">
            {navigation.map((item) => (
              <AppLink
                key={item.name}
                href={`/#${item.id}`}
                target="_self"
                className={navLinkClass}
              >
                {item.name}
              </AppLink>
            ))}
            <CTAButton href="/get-started" className="font-sf">
              Get Started
            </CTAButton>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <CTAButton
              href="/get-started"
              className="min-h-0 min-w-0 px-4 py-2 text-sm font-medium font-sf leading-[100%]"
            >
              Get Started
            </CTAButton>
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
            <div className="absolute inset-x-0 top-[calc(100%+8px)] z-10 w-full rounded-xl border border-gray-100 bg-white p-2 shadow-lg md:hidden">
              <div className="flex flex-col gap-1">
                {navigation.map((item) => (
                  <AppLink
                    key={item.name}
                    href={`/#${item.id}`}
                    target="_self"
                    className="rounded-md px-3 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  >
                    {item.name}
                  </AppLink>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
