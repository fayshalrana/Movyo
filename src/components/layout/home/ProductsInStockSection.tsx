import type { StaticImageData } from "next/image";
import type { SVGProps } from "react";

import semaglutideVial from "@/assets/pricing-vial-semaglutide-opt1-.webp";
import tirzepatideVial from "@/assets/pricing-vial-tirzepatide1.webp";
import {
  DocumentBadgeIcon,
  HeadsetSupportIcon,
  RxPrescriptionIcon,
  StethoscopeIcon,
} from "@/components/icons";
import { HeaderFeatureBar } from "@/components/layout/home/HeaderFeatureBar";
import { HomeStaticImage } from "@/components/layout/home/HomeStaticImage";
import { AppLink, CTAButton, cn } from "@/components/ui";

type ProductCard = {
  name: string;
  subtitle: string;
  vial: StaticImageData;
  alt: string;
  bullets: string[];
  href: string;
};

const products: ProductCard[] = [
  {
    name: "Semaglutide",
    subtitle: "Compounded GLP-1 Weekly Injections",
    vial: semaglutideVial,
    alt: "Movyo compounded semaglutide vial",
    bullets: [
      "Up to $200 OFF",
      "One simple injection per week",
      "No clinic visit required",
    ],
    href: "/product",
  },
  {
    name: "Tirzepatide",
    subtitle: "Compounded GLP-1 Weekly Injections",
    vial: tirzepatideVial,
    alt: "Movyo compounded tirzepatide vial",
    bullets: [
      "Up to $200 OFF",
      "One simple injection per week",
      "No clinic visit required",
    ],
    href: "/product",
  },
];

const trustItems = [
  {
    id: "pharmacy",
    label: "US-Certified Licensed Pharmacy",
    icon: StethoscopeIcon,
  },
  {
    id: "biology",
    label: "Personalized To Your Biology",
    icon: RxPrescriptionIcon,
  },
  {
    id: "providers",
    label: "Beluga Health Provider Network",
    icon: DocumentBadgeIcon,
  },
  {
    id: "support",
    label: "Ongoing Care And Support Included",
    icon: HeadsetSupportIcon,
  },
] as const;

const CheckIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M3.0709 12.8701C2.69399 11.9602 2.5 10.9849 2.5 10C2.5 9.01509 2.69399 8.03982 3.0709 7.12987C3.44781 6.21993 4.00026 5.39314 4.6967 4.6967C5.39314 4.00026 6.21993 3.44781 7.12987 3.0709C8.03982 2.69399 9.01509 2.5 10 2.5C10.9849 2.5 11.9602 2.69399 12.8701 3.0709C13.7801 3.44781 14.6069 4.00026 15.3033 4.6967C15.9997 5.39314 16.5522 6.21993 16.9291 7.12987C17.306 8.03982 17.5 9.01509 17.5 10C17.5 10.9849 17.306 11.9602 16.9291 12.8701C16.5522 13.7801 15.9997 14.6069 15.3033 15.3033C14.6069 15.9997 13.7801 16.5522 12.8701 16.9291C11.9602 17.306 10.9849 17.5 10 17.5C9.01509 17.5 8.03982 17.306 7.12987 16.9291C6.21993 16.5522 5.39314 15.9997 4.6967 15.3033C4.00026 14.6069 3.44781 13.7801 3.0709 12.8701Z"
        stroke="#4B0286"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 9.9987L9.16667 11.6654L12.5 8.33203"
        stroke="#4B0286"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const buttonClass = cn(
 "inline-flex h-auto min-h-0 items-center justify-center gap-2.5 lg:gap-4 rounded-full border-2 border-transparent bg-[#2253C7] px-4 lg:px-7.5 py-2",
  "font-sf text-xs min-[440px]:text-sm text-center lg:text-[20px] tracking-[0.28px] lg:tracking-[0%] font-medium leading-[160%] lg:leading-[150%] text-white",
  "hover:border-[#2253C7] hover:bg-transparent hover:text-[#2253C7]",
  "[&_svg]:!h-4 [&_svg]:!w-4 lg:[&_svg]:!h-8 lg:[&_svg]:!w-8 [&_svg]:shrink-0 [&_svg]:aspect-square",
);

const ghostButtonClass = cn(
  "inline-flex h-auto min-h-0 items-center justify-center gap-2.5 md:gap-4 rounded-full border-2 border-[#2253C7] bg-transparent px-4 lg:px-7.5 py-2",
  "font-sf text-center text-xs min-[440px]:text-sm lg:text-[20px] tracking-[0.28px] md:tracking-[0%] font-medium leading-[160%] lg:leading-[150%] text-[#2253C7]",
  "hover:border-[#2253C7] hover:bg-transparent hover:text-[#2253C7]",
 "[&_svg]:!h-4 [&_svg]:!w-4 lg:[&_svg]:!h-8 lg:[&_svg]:!w-8 [&_svg]:shrink-0 [&_svg]:aspect-square",
);

function InStockBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[#F5E9FF] px-2 font-satoshi text-xs font-normal leading-[160%] text-[#4B0286] md:text-base h-6.5">
      <CheckIcon />
      In Stock
    </span>
  );
}

function ProductCardBlock({ product }: { product: ProductCard }) {
  return (
    <article className="group relative flex h-full w-full max-w-110.75 cursor-pointer rounded-2xl bg-white py-4 px-7.5 shadow-[0px_0px_12.5px_-1px_var(--DropShadow100)] transition-[transform,box-shadow] duration-400 ease-in-out hover:-translate-y-1.5 hover:shadow-[0px_0px_16px_-1px_var(--DropShadow100)] md:gap-7.5 focus-within:ring-2 focus-within:ring-[#2253C7] focus-within:ring-offset-2">
      <AppLink
        href={product.href}
        target="_self"
        aria-label={`View ${product.name} product page`}
        className="absolute inset-0 z-10 rounded-2xl"
      />

      <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-0 md:-left-5 lg:-left-7.5 h-[216px] md:h-[250px] lg:h-[324px] w-29.5 md:w-[150px] lg:w-[191px]">
        <HomeStaticImage
          src={product.vial}
          alt={product.alt}
          fill
          className="object-contain object-center w-full h-full"
        />
      </div>
      <div className="pointer-events-none w-22 md:w-15 lg:w-30" />

      <div className="pointer-events-none flex flex-1 flex-col">
        <div className="flex items-start flex-col justify-between gap-3">
          <div className="min-w-0">
            <InStockBadge />
            <div className="flex flex-col mt-3">
              <h3 className="font-satoshi tracking-[-0.48px] md:tracking-[0.6px] text-xl min-[440px]:text-2xl font-bold leading-[150%] text-[#0F1F5C] lg:text-[30px]">
                {product.name}
              </h3>
              <p className="font-sf text-sm min-[440px]:text-base md:text-sm font-normal leading-[150%] text-[#8F8F8F]">
                {product.subtitle}
              </p>
            </div>
          </div>
        </div>

        <ul className="mt-8.25 lg:mt-16 flex list-none flex-col gap-2 p-0">
          {product.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-center gap-2 font-sf text-xs min-[440px]:text-base md:text-sm lg:text-base font-normal leading-[150%] text-[#0F1F5C]"
            >
              <CheckIcon className="h-5 w-5 shrink-0 text-[#0F1F5C]" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function ProductsInStockSection() {
  return (
    <section
      id="pricing"
      className="scroll-mt-20 w-full bg-[#F8FAFF] py-12.5 md:py-20"
      aria-labelledby="products-in-stock-heading"
    >
      <div className="mx-auto w-full max-w-316.5 px-4 lg:px-2 xl:px-0">
        <header className="max-w-206.75 lg:max-w-206.75 md:max-w-120 w-full mx-auto text-center">
          <p className="font-sf text-base font-medium uppercase leading-[160%] tracking-[0.32px] lg:tracking-[0.48px] text-[#8F8F8F] sm:text-2xl">
            Products In Stock
          </p>
          <h2
            id="products-in-stock-heading"
            className="py-4 font-satoshi text-center text-[26px] min-[440px]:text-[32px] font-bold leading-[130%] text-[#0F1F5C] lg:text-[60px]"
          >
            Medications Ready to Ship — Right to Your Door
          </h2>
          <div
            className="mx-auto h-1 w-25 rounded-full bg-[#F7B422]"
            aria-hidden
          />
        </header>

        <div className="flex items-center flex-col md:flex-row justify-center gap-5 mt-12.5 lg:gap-19.25">
          {products.map((product) => (
            <ProductCardBlock key={product.name} product={product} />
          ))}
        </div>

        <div className="pt-12.5 pb-7.5 lg:py-12.5">
        <HeaderFeatureBar
            className="h-12"
            textClassName="text-sm md:text-lg tracking-[-0.14px] md:tracking-[-0.18px] leading-[100%]"
          />
        </div>

        <div className="flex items-center gap-4.5 justify-center pt-5 pb-4">
          <CTAButton
            href="/get-started"
            colorScheme="blue"
            showIcon
            className={buttonClass}
          >
            Start My Assessment
          </CTAButton>
          
          <CTAButton
            href="/#pricing"
            colorScheme="blue"
            variant="ghost"
            showIcon
            className={ghostButtonClass}
          >
            See Pricing
          </CTAButton>
        </div>

        <p className="pb-5 text-center font-sf text-sm font-[300] leading-[150%] text-[#232424] md:text-lg">
          No Hidden Fees. No Monthly Membership. Cancel Anytime
        </p>
      </div>
    </section>
  );
}
