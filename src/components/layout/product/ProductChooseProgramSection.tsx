"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import pricingImg from "@/assets/MovyoBottle 2.png";
import productPricingBg from "@/assets/product-page-picing-bg.webp";
import productPricingBgMobile from "@/assets/product-page-picing-bg-mobile.webp";
import { VialGroundShadowIcon } from "@/components/icons";
import { CTAButton } from "@/components/ui";

const BANNER_BACKGROUND_SRC = productPricingBg;
const BANNER_BACKGROUND_SRC_MOBILE = productPricingBgMobile;
const ACCENT = "#C32E6D";

type ProgramCard = {
  badge: string;
  vial: typeof pricingImg;
  vialAlt: string;
  name: string;
  medicationLine: string;
  medicationItalic: string;
  price: string;
};

const programs: ProgramCard[] = [
  {
    badge: "Most popular",
    vial: pricingImg,
    vialAlt: "Movyo Health semaglutide vial",
    name: "Semaglutide",
    medicationLine: "Semaglutide medication",
    medicationItalic: "(if prescribed)",
    price: "$147",
  },
  {
    badge: "Stronger option",
    vial: pricingImg,
    vialAlt: "Movyo Health tirzepatide vial",
    name: "Tirzepatide",
    medicationLine: "Tirzepatide medication",
    medicationItalic: "(if prescribed)",
    price: "$247",
  },
];

const sharedIncludes = [
  "Licensed provider review",
  "Injection guidance & supplies",
  "Ongoing support & check-ins",
  "Access to member community",
] as const;

export function ProductChooseProgramSection() {
  const router = useRouter();
  const goToQualify = () => router.push("/get-started");

  return (
    <section
      id="product-pricing"
      className="relative isolate overflow-x-hidden overflow-y-visible px-4 py-16 sm:px-6 md:py-12.5"
      aria-labelledby="product-choose-program-heading"
    >
      <Image
        src={BANNER_BACKGROUND_SRC_MOBILE}
        alt=""
        fill
        sizes="100vw"
        quality={70}
        fetchPriority="low"
        className="-z-20 object-cover object-top md:hidden"
        aria-hidden
      />
      <Image
        src={BANNER_BACKGROUND_SRC}
        alt=""
        fill
        sizes="100vw"
        quality={70}
        fetchPriority="low"
        className="-z-20 hidden object-cover object-center md:block"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-section-narrow md:max-w-6xl">
        <header className="mx-auto w-full max-w-full text-center md:max-w-none">
          <h2
            id="product-choose-program-heading"
            className="font-sf text-[28px] font-medium not-italic leading-[114.99999999999999%] tracking-[-0.2px] text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.2)] min-[440px]:text-[35px] md:text-[40px]"
          >
            <span>Choose the program that&apos;s </span>
            <span className="font-instrument font-normal italic">right</span>
            <span> for you</span>
          </h2>
          <p className="mt-2 font-sf text-base font-[300] not-italic leading-[140%] text-white min-[440px]:text-lg md:text-2xl">
            Doctor-guided weight loss programs with medication, support, and a
            plan built around you
          </p>
        </header>

        <div className="mt-8 grid w-full lg:flex lg:justify-center grid-cols-1 gap-8 md:mt-12.5 md:grid-cols-2 lg:justify-items-center lg:gap-12.5">
          {programs.map((program) => (
            <article
              key={program.name}
              role="link"
              tabIndex={0}
              aria-label={`See if you qualify for ${program.name}`}
              onClick={goToQualify}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  goToQualify();
                }
              }}
              className="relative isolate mx-auto flex w-full max-w-section-narrow shrink-0 cursor-pointer flex-col items-stretch gap-4 overflow-hidden rounded-[38px] border border-white/55 bg-white/10 lg:bg-white/20 p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.45)] backface-hidden transition-[background-color,border-color,box-shadow,transform] duration-200 hover:border-[#C32E6D]/60  hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.55),0_8px_28px_rgba(195,46,109,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C32E6D] focus-visible:ring-offset-2 transform-[translateZ(0)] lg:mx-0 lg:w-110.5 lg:max-w-none lg:items-start lg:p-6.5 lg:backdrop-blur-xs"
            >
              {/* Vial + shadow — same asset and layout as home ChooseProgramSection */}
              <div className="w-full overflow-visible">
                <div className="relative mx-auto h-56 sm:h-44 w-36 overflow-visible md:h-56 md:w-47.5 py-7">
                  <Image
                    src={program.vial}
                    alt={program.vialAlt}
                    width={116}
                    height={168}
                    className="relative z-10 mx-auto h-42 w-29 object-contain object-bottom"
                    sizes="116px"
                  />
                  <VialGroundShadowIcon
                    filterId={`product-vial-ground-${program.name.replace(/\s+/g, "-").toLowerCase()}`}
                    className="pointer-events-none absolute bottom-6 left-1/2 z-0 h-11 w-40 max-w-[min(100%,160px)] -translate-x-1/2 translate-y-[20%]"
                  />
                </div>
              </div>

              <h3 className="w-full font-sf text-xl font-bold not-italic leading-[100%] tracking-[-0.24px] text-[#C32E6D] min-[440px]:text-2xl">
                {program.name}
              </h3>

              <div className="mt-auto flex w-full flex-col items-stretch gap-4">
                <CTAButton
                  showIcon
                  onClick={goToQualify}
                  className="max-h-12.5 w-full px-6 py-4 font-sf text-[18px] font-normal shadow-md cursor-pointer"
                >
                  See If You Qualify
                </CTAButton>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
