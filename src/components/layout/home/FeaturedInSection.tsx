import type { StaticImageData } from "next/image";

import businessInsider from "@/assets/featured-business-insider.png";
import cnn from "@/assets/featured-cnn.png";
import msnbc from "@/assets/featured-msnbc.png";
import yahoo from "@/assets/featured-yahoo.png";
import { HomeStaticImage } from "@/components/layout/home/HomeStaticImage";

type Outlet = {
  id: string;
  label: string;
  src: StaticImageData;
  className: string;
};

const outlets: Outlet[] = [
  {
    id: "msnbc",
    label: "MSNBC",
    src: msnbc,
    className: "h-[30px] w-[170px] aspect-[17/3] object-contain",
  },
  {
    id: "business-insider",
    label: "Business Insider",
    src: businessInsider,
    className: "h-[30px] w-[87px] aspect-[29/10] object-contain",
  },
  {
    id: "cnn",
    label: "CNN",
    src: cnn,
    className: "h-[30px] w-[65px] aspect-[13/6] object-contain",
  },
  {
    id: "yahoo",
    label: "Yahoo!",
    src: yahoo,
    className: "h-[30px] w-[104px] aspect-[52/15] object-contain",
  },
];

export function FeaturedInSection() {
  return (
    <section
      className="w-full bg-white px-4 py-12.5 md:px-0 lg:px-9"
      aria-labelledby="featured-in-heading"
    >
      <div className="mx-auto w-full max-w-316.5">
        <p
          id="featured-in-heading"
          className="text-center font-sf text-base font-medium uppercase leading-[160%] tracking-[0.32px] md:tracking-[0.48px] text-[#8F8F8F] sm:text-2xl pb-4 md:pb-4.5"
        >
          Feature Cover Seen In
        </p>

        <ul className="flex list-none flex-wrap items-center justify-center gap-y-6 gap-x-5 min-[440px]:gap-x-10 lg:gap-10 py-5 px-4 md:px-6 lg:px-2 xl:px-0">
          {outlets.map(({ id, label, src, className }) => (
            <li key={id} className="flex shrink-0 items-center">
              <HomeStaticImage
                src={src}
                alt={label}
                className={className}
              />
            </li>
          ))}
          <li className="flex shrink-0 items-center">
            <p className="font-sf text-base font-normal leading-[150%] text-[#0F1F5C]">
              AND <span className="font-bold">51+</span> MORE!
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
