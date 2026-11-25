"use client";

import type { ReactNode } from "react";

import wordmark from "@/assets/movyo-wordmark.webp";
import hipaaBadgeImg from "@/assets/hipaa-badge.webp";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TikTokIcon,
  XIcon,
} from "@/components/icons";
import { FooterNewsletterForm } from "@/components/layout/FooterNewsletterForm";
import { DEFERRED_PLACEHOLDER_SRC } from "@/lib/deferred-image";
import { AppLink } from "@/components/ui/AppLink";

import { HOME_PATH } from "./homePath";

const LEGITSCRIPT_SEAL_URL =
  "https://static.legitscript.com/seals/49851379.png";
const LEGITSCRIPT_VERIFY_URL =
  "https://www.legitscript.com/websites/?checker_keywords=movyo.health";

const FOOTER_NEW_TAB_HREFS = new Set([
  "/terms-and-conditions",
  "/privacy-policy",
  "/shipping-refund-policy",
  "/product",
  "/complete",
]);

function isFooterNewTabHref(href: string) {
  const path = href.split("#")[0] ?? "";
  return FOOTER_NEW_TAB_HREFS.has(path);
}

function getRelatedLinks(homePath: string) {
  return [
    { name: "How It Works", href: `${homePath}#how-it-works` },
    // { name: "Our Approach", href: `${homePath}#approach` },
    { name: "Pricing", href: `${homePath}#pricing` },
    // { name: "Provider Access", href: `${homePath}#provider-access` },
    { name: "Movyo Community", href: `${homePath}#community` },
    { name: "FAQs", href: `${homePath}#faq` },
  ];
}

const policyLinks = [
  { name: "Terms & Conditions", href: "/terms-and-conditions" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Shipping & Refund Policy", href: "/shipping-refund-policy" },
];

const treatmentLinks = [
  { name: "Semaglutide", href: "/product" },
  { name: "Tirzepatide", href: "/product" },
];

const columnHeadingClass =
  "font-sf text-base font-normal leading-[150%] text-[#7A90C2] sm:text-[15px] lg:text-[16px]";

const linkClass =
  "font-sf text-[16px] font-normal leading-[150%] text-[#0F1F5C] transition-colors hover:text-[#2557D6]";

function FooterLinkColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h3 className={columnHeadingClass}>{title}</h3>
      <ul className="mt-4 space-y-2">{children}</ul>
    </div>
  );
}

function SocialIcon({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[#0B2D6E] transition-colors hover:bg-[#F3F4F6] motion-safe:hover:scale-105"
    >
      {children}
    </a>
  );
}

export function Footer() {
  const homePath = HOME_PATH;
  const relatedLinks = getRelatedLinks(homePath);
  const year = 2026;

  return (
    <footer className="bg-[#fafafb] font-sans text-[#6B7280]">
      <div className="w-full px-4 py-7.5 sm:px-6 lg:px-0 lg:py-12.5">
        <div className="max-w-316.5 mx-auto grid grid-cols-1 gap-7.5 lg:gap-5 xl:gap-15 lg:grid-cols-[minmax(0,384px)_1fr]">
          <div className="max-w-full sm:max-w-96 md:max-w-auto flex flex-col justify-between gap-5 md:gap-0">
            <AppLink
              href={homePath}
              target="_self"
              className="relative block h-20 w-59.75 shrink-0 sm:h-14 sm:w-52 lg:w-79.5 lg:h-20"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={DEFERRED_PLACEHOLDER_SRC}
                data-movyo-src={wordmark.src}
                alt="Movyo Health"
                className="absolute inset-0 h-full w-full object-contain object-left"
                loading="lazy"
                decoding="async"
                suppressHydrationWarning
              />
            </AppLink>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:gap-y-10 sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-4 lg:gap-x-0">
            <FooterLinkColumn title="Related Links">
              {relatedLinks.map((item) => (
                <li key={item.name}>
                  <AppLink
                    href={item.href}
                    target={isFooterNewTabHref(item.href) ? "_blank" : "_self"}
                    className={linkClass}
                  >
                    {item.name}
                  </AppLink>
                </li>
              ))}
            </FooterLinkColumn>

            <FooterLinkColumn title="Policy">
              {policyLinks.map((item) => (
                <li key={item.name}>
                  <AppLink
                    href={item.href}
                    target={isFooterNewTabHref(item.href) ? "_blank" : "_self"}
                    className={linkClass}
                  >
                    {item.name}
                  </AppLink>
                </li>
              ))}
            </FooterLinkColumn>

            <FooterLinkColumn title="Treatments">
              {treatmentLinks.map((item) => (
                <li key={item.name}>
                  <AppLink
                    href={item.href}
                    target={isFooterNewTabHref(item.href) ? "_blank" : "_self"}
                    className={linkClass}
                  >
                    {item.name}
                  </AppLink>
                </li>
              ))}
            </FooterLinkColumn>

            <FooterLinkColumn title="Support">
              <li>
                <a href="tel:+16615181189" className={linkClass}>
                  +1 (661) 518-1189
                </a>
              </li>
              <li>
                <a href="mailto:support@movyohealth.com" className={linkClass}>
                  support@movyohealth.com
                </a>
              </li>
            </FooterLinkColumn>
          </div>
        </div>

        <div className="max-w-330 mx-auto mt-7.5">
          <p className="mx-automax-w-full text-left font-sf text-xs md:text-base font-normal leading-[150%] text-[#0F1F5C] sm:text-sm">
            Based on average weight loss reported in clinical studies of GLP-1
            medications in patients without diabetes who reached and maintained
            therapeutic dosing, along with a reduced-calorie diet and increased
            physical activity. Results may vary based on starting weight and
            program adherence. <br /> Safety info: GLP-1 medications are used to
            treat obesity or overweight. They may have serious side effects,
            including possible thyroid tumors. Do not use if you or your family
            have a history of medullary thyroid cancer or MEN 2. Talk to your
            provider before starting. <br /> These statements have not been
            evaluated by the FDA. This product is not intended to diagnose,
            treat, cure, or prevent any disease. <br /> Medical treatment is
            provided and approved by a licensed medical professional through
            Beluga Health. Movyo Health is a patient management platform and
            does not provide medical services directly. <br />
          </p>
          <p className="mx-auto mt-4 pt-4 max-w-full text-left font-sf text-xs md:text-base font-normal leading-[150%] text-[#0F1F5C] sm:text-sm border-t border-[#E0E0E0]">
            Operated by DeliveryDart LLC, 30 N Gould St Ste R, Sheridan, WY
            82801. Movyo Health is a patient management platform. Medical care
            is provided by Beluga Health licensed providers. Service eligibility
            varies by state. Payment does not guarantee a prescription. Results
            vary. For emergencies, call 911.
          </p>
          <div className="flex items-center justify-between mt-4">
            <div className="flex shrink-0 items-center gap-1 min-[440px]:gap-6">
              <div className="relative h-12.5 w-20 min-[440px]:w-17.5 md:w-28.75 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={DEFERRED_PLACEHOLDER_SRC}
                  data-movyo-src={hipaaBadgeImg.src}
                  alt="HIPAA compliant"
                  className="absolute inset-0 h-full w-full object-contain object-left"
                  loading="lazy"
                  decoding="async"
                  suppressHydrationWarning
                />
              </div>
              <div className="h-12.5 w-10 min-[440px]:w-7.5 md:w-13.5 shrink-0">
                <a
                  href={LEGITSCRIPT_VERIFY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Verify LegitScript Approval for www.movyo.health"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={DEFERRED_PLACEHOLDER_SRC}
                    data-movyo-src={LEGITSCRIPT_SEAL_URL}
                    alt="Verify Approval for www.movyo.health"
                    width={49}
                    height={54}
                    className="block h-[54px] w-auto object-contain"
                    decoding="async"
                    suppressHydrationWarning
                  />
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 min-[440px]:gap-5 lg:justify-end">
              <SocialIcon
                label="Facebook"
                href="https://www.facebook.com/movyohealth"
              >
                <FacebookIcon className="h-5 w-5 lg:h-6 lg:w-6" />
              </SocialIcon>
              <SocialIcon label="LinkedIn" href="https://www.linkedin.com/">
                <LinkedInIcon className="h-5 w-5 lg:h-6 lg:w-6" />
              </SocialIcon>
              <SocialIcon
                label="Instagram"
                href="https://www.instagram.com/movyohealth/"
              >
                <InstagramIcon className="h-5 w-5 lg:h-6 lg:w-6" />
              </SocialIcon>
              <SocialIcon label="X" href="https://x.com/movyohealth">
                <XIcon className="h-5 w-5 lg:h-6 lg:w-6" />
              </SocialIcon>
              <SocialIcon
                label="TikTok"
                href="https://www.tiktok.com/@movyo.health"
              >
                <TikTokIcon className="h-5 w-5 lg:h-6 lg:w-6" />
              </SocialIcon>
            </div>
          </div>
          <p className="mx-auto mt-7.5 max-w-full font-sf text-xs md:text-base font-normal leading-[150%] text-[#0F1F5C] sm:text-sm text-center">
            MOVYO.HEALTH © 2026 MOVYO Health. All Rights Reserved. DeliveryDart
            LLC, 30 N Gould St Ste R, Sheridan, WY 82801
          </p>
        </div>
      </div>
    </footer>
  );
}
