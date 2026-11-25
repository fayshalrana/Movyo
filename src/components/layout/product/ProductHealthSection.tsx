import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

import sectionImage from "@/assets/heath-product.webp";
import sectionImageMobile from "@/assets/heath-product-mobile.webp";
import pinkCheck from "@/assets/pink-check.svg";
import { CTAButton } from "@/components/ui";

type ProductHealthSectionProps = {
  title?: string;
  priceLabel?: string;
  description?: string;
  benefits?: string[];
  ctaLabel?: string;
  ctaHref?: string;
  dosageTitle?: string;
  dosageBody?: ReactNode;
  note?: string;
  image?: StaticImageData;
  imageAlt?: string;
};

const defaultBenefits = [
  "Licensed providers prescribe and monitor your treatment",
  "Compounded semaglutide or tirzepatide delivered to your door",
  "Ongoing care coaching and medical support included",
];

export function ProductHealthSection({
  title = "Movyo Health",
  priceLabel = "Starting at $147/month",
  description = "A medically supervised weight loss program that combines compounded GLP-1 medications with personalized care coaching and ongoing provider support. Get the treatment, guidance, and accountability you need to lose weight and keep it off.",
  benefits = defaultBenefits,
  ctaLabel = "Let's Get Started",
  ctaHref = "/get-started",
  dosageTitle = "Dosage Details",
  dosageBody = "Compounded Semaglutide: Weekly injections starting at 0.25 mg, gradually increasing to maintenance dose of 1.0–2.4 mg. Compounded Tirzepatide: Weekly injections starting at 2.5 mg, gradually increasing to maintenance dose of 5–15 mg.",
  note = "*Dosage is personalized by your licensed provider based on your response and weight loss goals",
  image = sectionImage,
  imageAlt = "Four women standing together and smiling",
}: ProductHealthSectionProps) {
  return (
    <section
      className="bg-white px-4 py-12.5 md:px-8 md:py-12.5"
      aria-labelledby="product-health-heading"
    >
      <div className="mx-auto grid w-full max-w-section-narrow md:max-w-7xl grid-cols-1 gap-9 md:gap-8 lg:grid-cols-[424px_minmax(0,1fr)] lg:items-stretch">
        <div className="relative h-81.25 w-full md:h-130 md:max-w-full lg:max-w-102 overflow-hidden rounded-2xl lg:h-full xl:max-w-none">
          <Image
            src={sectionImageMobile}
            alt={imageAlt}
            fill
            className="object-cover object-top md:hidden"
            sizes="100vw"
          />
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="hidden object-cover object-center md:block"
            sizes="424px"
          />
        </div>

        <div className="text-[#292929]">
          <h2
            id="product-health-heading"
            className="font-sf text-[33px] font-medium not-italic leading-[115%] tracking-[-0.5%] md:text-[40px]"
          >
            {title}
          </h2>
          <p className="mt-1 max-w-180 font-sf text-[18px] font-[300] not-italic leading-[100%] tracking-[-1%] text-[#111111]">
            {priceLabel}
          </p>

          <div className="mt-7.5 h-px w-full bg-[#C32E6D]" aria-hidden />

          <p className="mt-7.5 max-w-4xl xl:max-w-180 font-sf text-[18px] font-normal not-italic leading-[140%] tracking-[0] text-[#292929]">
            {description}
          </p>

          <ul className="mt-7.5 space-y-3 px-6 md:px-0 md:pl-4">
            {benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-2.75 text-[#111111]"
              >
                <Image
                  src={pinkCheck}
                  alt=""
                  width={20}
                  height={20}
                  className="mt-1 h-3.5 w-3.5 shrink-0"
                  aria-hidden
                />
                <span className="font-sf text-[18px] font-normal not-italic leading-[100%] tracking-[-1%]">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-7.5">
            <CTAButton
              href={ctaHref}
              showIcon
              className="max-h-12.5 px-8 py-4 text-[18px] font-normal font-sf leading-5"
            >
              {ctaLabel}
            </CTAButton>
          </div>

          <div className="mt-8 text-[#292929]">
            <h3 className="font-sf text-[14px] font-medium not-italic leading-[140%] tracking-[0]">
              {dosageTitle}
            </h3>
            <p className="font-sf text-[14px] font-[300] not-italic leading-[140%] tracking-[0]">
              {dosageBody}
            </p>
            <p className="mt-7.5 font-sf text-[14px] font-[300] not-italic leading-[140%] tracking-[0]">
              {note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
