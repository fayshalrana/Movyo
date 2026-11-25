"use client";
import Image from "next/image";
import type { ReactNode } from "react";
import { AppLink } from "@/components/ui/AppLink";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TikTokIcon,
  XIcon,
} from "@/components/icons";
import { FooterNewsletterForm } from "@/components/layout/FooterNewsletterForm";
import footerLogo from "@/assets/logo2.webp";
import hipaaBadgeImg from "@/assets/hipaa-badge.webp";
import footerBgDesktop from "@/assets/footerBg@compressed.webp";
import footerBgMobile from "@/assets/footerBg-mobile.svg";

/** Same-tab hash links on home; policy, product, and checkout open in a new tab. */
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

const relatedLinks = [
  { name: "How It Works", href: "/#how-it-works" },
  { name: "Pricing", href: "/#pricing" },
  { name: "Movyo Community", href: "/#community" },
  { name: "FAQ", href: "/#faq" },
  { name: "Terms & Conditions", href: "/terms-and-conditions" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Shipping & Refund Policy", href: "/shipping-refund-policy" },
];

const treatmentLinks = [
  { name: "Semaglutide", href: "/product" },
  { name: "Tirzepatide", href: "/product" },
];

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
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#003982] hover:bg-black/5 hover:text-[#003982] origin-center transition-[transform,colors,background-color,border-color] duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] motion-safe:hover:scale-[1.1] motion-safe:active:scale-[0.9] motion-reduce:hover:scale-100"
    >
      {children}
    </a>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  const linkClass = "text-[#022348] transition-colors hover:text-[#d61a65]";

  return (
    <footer className="relative font-sans text-[#64748b]">
      <Image
        src={footerBgMobile}
        alt=""
        fill
        className="object-cover object-center md:hidden"
        sizes="100vw"
        loading="lazy"
        fetchPriority="low"
        aria-hidden
      />
      <Image
        src={footerBgDesktop}
        alt=""
        className="hidden object-cover object-center md:block"
        aria-hidden
        fill
        fetchPriority="low"
        decoding="async"
        loading="lazy"
        // On mobile (max-width: 1023px), size is 0vw (don't download/render)
        // On desktop, use 350px
        sizes="(max-width: 1023px) 0vw, 350px"
        quality={85}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-1 h-20 md:bg-linear-to-b md:from-white md:to-transparent sm:h-24 md:h-32"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-1 h-20 md:bg-linear-to-t md:from-white md:to-transparent sm:h-24 md:h-32"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-full min-[450px]:max-w-110 md:max-w-7xl px-4 py-12 sm:px-6 lg:px-0 lg:py-12.5 lg:max-w-280 lg:mx-auto">
        <div className="flex flex-col gap-6 md:gap-10 lg:flex-row lg:items-start lg:gap-38.25">
          {/* Brand + newsletter */}
          <div className="flex w-full max-w-full md:max-w-footer-brand shrink-0 flex-col gap-2.75 md:gap-30 lg:max-w-93.75">
            <AppLink
              href="/"
              target="_self"
              className="inline-block max-w-full self-stretch"
            >
              <Image
                src={footerLogo}
                alt="Movyo Health"
                width={375}
                height={95}
                sizes="(max-width: 420px) 100vw, 375px"
                className="ml-[10px] h-23.7 w-full sm:w-93.75 max-w-full object-contain object-left"
              />
            </AppLink>
            <FooterNewsletterForm />
          </div>

          <div className="flex flex-col md:flex-row justify-between min-w-0 flex-1 gap-4 md:gap-8 lg:gap-14">
            <div>
              <h3 className="text-left font-sf text-[24px] font-medium not-italic capitalize leading-[130%] text-[#BE185D]">
                Related Links
              </h3>
              <ul className="mt-4 space-y-2">
                {relatedLinks.map((item) => (
                  <li key={item.name}>
                    <AppLink
                      href={item.href}
                      target={
                        isFooterNewTabHref(item.href) ? "_blank" : "_self"
                      }
                      className={`text-[16px] font-sf font-normal ${linkClass}`}
                    >
                      {item.name}
                    </AppLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-left font-sf text-[24px] font-medium not-italic capitalize leading-[130%] text-[#BE185D]">
                Treatments
              </h3>
              <ul className="mt-4 space-y-2.5">
                {treatmentLinks.map((item) => (
                  <li key={item.name}>
                    <AppLink
                      href={item.href}
                      target={
                        isFooterNewTabHref(item.href) ? "_blank" : "_self"
                      }
                      className={`text-[16px] font-sf font-normal ${linkClass}`}
                    >
                      {item.name}
                    </AppLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-left font-sf text-[24px] font-medium not-italic capitalize leading-[130%] text-[#BE185D]">
                Support
              </h3>
              <ul className="mt-4 space-y-2.5 text-[16px] font-sf font-normal">
                <li>
                  <a
                    href="tel:+16615181189"
                    className={`${linkClass} text-[16px] font-sf font-normal`}
                  >
                    +1 (661) 518-1189
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:Support@Movyohealth.Com"
                    className={`${linkClass} break-all text-[16px] font-sf font-normal`}
                  >
                    support@movyohealth.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-12 border-t border-white pt-4  md:pt-8">
          <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-6 md:gap-4 md:flex-row sm:items-center w-full">
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-21.25 shrink-0">
                  <Image
                    src={hipaaBadgeImg}
                    alt="HIPAA compliant"
                    fill
                    className="object-contain object-left"
                    sizes="85px"
                  />
                </div>
                <a
                  href="https://www.legitscript.com/websites/?checker_keywords=movyo.health"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Verify LegitScript Approval for www.movyo.health"
                >
                  <img
                    src="https://static.legitscript.com/seals/49851379.png"
                    alt="Verify Approval for www.movyo.health"
                    width="73"
                    height="79"
                    className="h-20 w-auto object-contain block"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                  />
                </a>
              </div>

              <div className="w-full space-y-1 leading-relaxed text-[#022348] text-sm font-sf font-normal">
                <p className="hidden md:block font-sf font-normal leading-[130%]">
                  Operated By DeliveryDart LLC 30 N Gould St Ste R, Sheridan, WY
                  82801
                </p>
                <p className="md:hidden font-sf font-normal leading-[130%]">
                  Operated By DeliveryDart LLC <br /> 30 N Gould St Ste R,
                  Sheridan, WY 82801
                </p>
                <p className="font-sf font-normal leading-[130%]">
                  &copy; {year} MOVYO Health. All Rights Reserved.
                </p>
              </div>
            </div>
            <div className="mt-6 -ml-1.75 md:ml-0 md:mt-4 flex shrink-0 flex-wrap items-center justify-end gap-1 lg:mt-0">
              <SocialIcon
                label="Facebook"
                href="https://www.facebook.com/movyohealth"
              >
                <FacebookIcon className="h-5 w-5" />
              </SocialIcon>
              <SocialIcon label="LinkedIn" href="https://www.linkedin.com/">
                <LinkedInIcon className="h-5 w-5" />
              </SocialIcon>
              <SocialIcon
                label="Instagram"
                href="https://www.instagram.com/movyohealth/"
              >
                <InstagramIcon className="h-5 w-5" />
              </SocialIcon>
              <SocialIcon label="X" href="https://x.com/movyohealth">
                <XIcon className="h-5 w-5" />
              </SocialIcon>
              <SocialIcon
                label="TikTok"
                href="https://www.tiktok.com/@movyo.health"
              >
                <TikTokIcon className="h-5 w-5" />
              </SocialIcon>
            </div>
          </div>
        </div>

        <p className="mt-6 max-w-full tracking-[0px] text-center font-sf text-[12px] md:text-[16px] font-normal not-italic leading-[130%] text-[#022348]">
          Movyo Health is a patient management platform that works with
          independent{" "}
          <br className="hidden min-[435px]:block min-[445px]:hidden" />
          physicians and pharmacies. We do not provide medical services
          directly. All{" "}
          <br className="hidden min-[435px]:block min-[445px]:hidden" />
          prescriptions{" "}
          <br className="hidden min-[1270px]:block min-[1300px]:hidden" />
          are filled and shipped by US-based, licensed pharmacies. Medical{" "}
          <br className="hidden min-[435px]:block min-[445px]:hidden" />
          care is provided by Beluga Health licensed providers who are solely
          responsible{" "}
          <br className="hidden min-[435px]:block min-[445px]:hidden" />
          for clinical decisions.{" "}
          <br className="hidden min-[1270px]:block min-[1300px]:hidden" />
          Service eligibility varies by state. Must be 18 years or older to{" "}
          <br className="hidden min-[435px]:block min-[445px]:hidden" />
          use this service. Payment does not guarantee a prescription. Results
          vary. For{" "}
          <br className="hidden min-[435px]:block min-[445px]:hidden" />
          emergencies, call 911. This{" "}
          <br className="hidden min-[1270px]:block min-[1300px]:hidden" />
          site is for informational purposes and not a substitute{" "}
          <br className="hidden min-[435px]:block min-[445px]:hidden" />
          for professional medical advice.
        </p>
      </div>
    </footer>
  );
}
