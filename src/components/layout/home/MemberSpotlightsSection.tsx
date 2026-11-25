import type { CSSProperties, SVGProps } from "react";

import spotlightBg from "@/assets/testimonial-bg.webp";
import spotlightBgMobile from "@/assets/testimonial-mobile-image.webp";
import { HomeStaticImage } from "@/components/layout/home/HomeStaticImage";
import { CTAButton, cn } from "@/components/ui";

type Spotlight = {
  id: string;
  quote: string;
  result: string;
  name: string;
  age: string;
};

const memberSpotlightsPrimaryButtonClass = cn(
  "inline-flex h-11 min-h-11 items-center justify-center gap-2.5 lg:gap-4 rounded-full border-2 border-white bg-white px-4 lg:px-7.5 py-2",
  "font-sf text-xs min-[440px]:text-sm font-medium leading-[150%] text-[#2253C7] lg:text-xl",
  "hover:border-white hover:bg-[#F3F6FF] hover:text-[#2253C7]",
  "[&_svg]:!h-4 [&_svg]:!w-4 lg:[&_svg]:!h-8 lg:[&_svg]:!w-8 [&_svg]:shrink-0 [&_svg]:aspect-square",
);

const memberSpotlightsGhostButtonClass = cn(
  "inline-flex h-11 min-h-11 items-center justify-center gap-2 rounded-full border-2 border-white bg-transparent px-4 lg:px-7.5 py-2",
  "font-sf text-xs min-[440px]:text-sm font-medium leading-[150%] text-white lg:text-xl",
  "hover:border-white hover:bg-white/10 hover:text-white",
  "[&_svg]:!h-4 [&_svg]:!w-4 lg:[&_svg]:!h-8 lg:[&_svg]:!w-8 [&_svg]:shrink-0 [&_svg]:aspect-square",
);
const spotlights: Spotlight[] = [
  {
    id: "renee",
    quote: "The live events kept me accountable when I wanted to give up.",
    result: "↓ 18 lbs in 12 weeks",
    name: "Renee T.",
    age: "Age 52",
  },
  {
    id: "christine",
    quote: "I finally found a community that gets midlife hormones.",
    result: "↓ 16 lbs in 10 weeks",
    name: "Christine L.",
    age: "Age 47",
  },
  {
    id: "maria",
    quote: "The provider Q&As made me feel safe asking hard questions.",
    result: "↓ 22 lbs in 14 weeks",
    name: "Maria S.",
    age: "Age 49",
  },
  {
    id: "jennifer",
    quote: "This is the first program that treated me like a whole person.",
    result: "↓ 15 lbs in 9 weeks",
    name: "Jennifer K.",
    age: "Age 54",
  },
  {
    id: "anita",
    quote: "Weekly challenges turned habits I used to abandon into momentum.",
    result: "↓ 19 lbs in 11 weeks",
    name: "Anita P.",
    age: "Age 45",
  },
];

function QuoteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M10 11H6C5.73478 11 5.48043 10.8946 5.29289 10.7071C5.10536 10.5196 5 10.2652 5 10V7C5 6.73478 5.10536 6.48043 5.29289 6.29289C5.48043 6.10536 5.73478 6 6 6H9C9.26522 6 9.51957 6.10536 9.70711 6.29289C9.89464 6.48043 10 6.73478 10 7V13C10 15.667 8.667 17.333 6 18"
        stroke="#0F1F5C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 11H15C14.7348 11 14.4804 10.8946 14.2929 10.7071C14.1054 10.5196 14 10.2652 14 10V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18C18.2652 6 18.5196 6.10536 18.7071 6.29289C18.8946 6.48043 19 6.73478 19 7V13C19 15.667 17.667 17.333 15 18"
        stroke="#0F1F5C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="w-4 h-4 md:w-5 md:h-5"
    >
      <path
        d="M6.86915 6.11758L1.55249 6.88841L1.45832 6.90758C1.31577 6.94542 1.18582 7.02042 1.08173 7.12491C0.977646 7.22941 0.903158 7.35965 0.865873 7.50235C0.828589 7.64505 0.829844 7.79509 0.869511 7.93714C0.909178 8.07919 0.985835 8.20817 1.09165 8.31091L4.94332 12.0601L4.03499 17.3559L4.02415 17.4476C4.01543 17.595 4.04604 17.7421 4.11286 17.8738C4.17968 18.0055 4.28031 18.1171 4.40443 18.1972C4.52856 18.2772 4.67173 18.3228 4.81928 18.3293C4.96683 18.3358 5.11346 18.303 5.24415 18.2342L9.99915 15.7342L14.7433 18.2342L14.8267 18.2726C14.9642 18.3268 15.1137 18.3434 15.2598 18.3207C15.4059 18.298 15.5433 18.2369 15.658 18.1436C15.7727 18.0503 15.8604 17.9282 15.9123 17.7898C15.9642 17.6513 15.9784 17.5016 15.9533 17.3559L15.0442 12.0601L18.8975 8.31008L18.9625 8.23924C19.0553 8.12489 19.1162 7.98796 19.1389 7.84241C19.1616 7.69686 19.1453 7.54789 19.0917 7.41069C19.0381 7.27348 18.9491 7.15294 18.8337 7.06134C18.7184 6.96974 18.5808 6.91036 18.435 6.88925L13.1183 6.11758L10.7417 1.30091C10.6729 1.16136 10.5664 1.04384 10.4343 0.961666C10.3022 0.87949 10.1497 0.835938 9.99415 0.835938C9.83858 0.835938 9.6861 0.87949 9.554 0.961666C9.42189 1.04384 9.31542 1.16136 9.24665 1.30091L6.86915 6.11758Z"
        fill="#F7B422"
      />
    </svg>
  );
}

function SpotlightCard({ spotlight }: { spotlight: Spotlight }) {
  return (
    <article className="flex h-full w-75 shrink-0 flex-col rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.18)] sm:p-7.5 md:w-107.5">
      <QuoteIcon className="h-5 w-6 text-[#1B3A8A]" />

      <p className="mt-4.5 font-satoshi text-lg font-medium italic leading-[150%] text-[#232424] h-25 md:h-37.5">
        {spotlight.quote}
      </p>

      <span className="mt-4.5 inline-flex w-fit items-center rounded-full bg-[#E2EBFF] px-2 font-satoshi text-sm font-medium leading-[160%] text-[#232424] sm:text-base">
        {spotlight.result}
      </span>
      <div className="w-full py-4.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="370"
          height="1"
          viewBox="0 0 370 1"
          fill="none"
          className="w-full"
        >
          <path d="M0 0.5H370" stroke="#E0E0E0" />
        </svg>
      </div>

      <div className="mt-auto flex items-start justify-between gap-3">
        <div>
          <p className="font-sf text-lg font-bold leading-[150%] text-[#0F1F5C] md:text-2xl">
            {spotlight.name}
          </p>
          <p className="font-sf text-xm font-normal leading-[150%] text-[#232424] sm:text-lg">
            {spotlight.age}
          </p>
        </div>

        <div
          className="flex items-center gap-2 text-[#F7B422] h-6.75 md:h-9"
          aria-label="5 out of 5 stars"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} className="h-3.5 w-3.5" />
          ))}
        </div>
      </div>
    </article>
  );
}

export function MemberSpotlightsSection() {
  return (
    <section
      className="scroll-mt-20 bg-[#F7F8FC] pt-7.5 md:pt-25 sm:px-5 md:px-6 lg:px-2 xl:px-0"
      aria-labelledby="member-spotlights-heading"
    >
      <div className="relative mx-auto w-full max-w-full overflow-hidden rounded-bl-[20px] min-[440px]:rounded-bl-[30px] rounded-br-[20px] min-[440px]:rounded-br-[30px]  lg:rounded-bl-[60px] lg:rounded-br-[60px]">
        <div className="absolute inset-0" aria-hidden>
          <HomeStaticImage
            src={spotlightBgMobile}
            alt=""
            fill
            className="object-cover object-center md:hidden"
          />
          <HomeStaticImage
            src={spotlightBg}
            alt=""
            fill
            className="hidden object-cover object-center md:block"
          />
        </div>

        <div className="relative z-10 px-0 py-12.5">
          <header className="px-5 text-center sm:px-8">
            <h2
              id="member-spotlights-heading"
              className="font-satoshi text-[32px] font-bold leading-[130%] text-white md:text-[34px] lg:text-[60px]"
            >
              Member Spotlights
            </h2>
            <div
              className="mx-auto mt-4 h-1 w-25 rounded-full bg-[#F7B422]"
              aria-hidden
            />
          </header>

          <div
            className="mt-12.5 overflow-hidden"
            role="region"
            aria-label="Member spotlight testimonials"
          >
            <div
              className="trust-marquee-track-ltr flex w-max"
              style={
                {
                  "--marquee-duration": "45s",
                } as CSSProperties
              }
            >
              {[0, 1, 2].map((dup) => (
                <div
                  key={dup}
                  className="flex shrink-0 items-stretch gap-4 pr-4 sm:gap-5 sm:pr-5 md:gap-7.5 md:pr-6"
                  aria-hidden={dup !== 0}
                >
                  {spotlights.map((spotlight) => (
                    <SpotlightCard
                      key={`${dup}-${spotlight.id}`}
                      spotlight={spotlight}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12.5 pt-5 flex items-center gap-3 md:px-5 justify-center sm:gap-4 md:mt-12">
            <CTAButton
              href="/get-started"
              colorScheme="blue"
              showIcon
              className={memberSpotlightsPrimaryButtonClass}
            >
              Start my Assessment
            </CTAButton>

            <CTAButton
              href="#community"
              colorScheme="blue"
              variant="ghost"
              showIcon
              className={memberSpotlightsGhostButtonClass}
            >
              Explore the Community
            </CTAButton>
          </div>

          <p className="mt-4 px-5 text-center font-sf text-sm min-[440px]:text-base md:text-lg font-[300] leading-[150%] text-white pb-5">
            Included with every Movyo membership. No extra cost.
          </p>
        </div>
      </div>
    </section>
  );
}
