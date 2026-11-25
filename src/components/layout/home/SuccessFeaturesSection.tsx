import type { ReactNode, SVGProps } from "react";
import type { StaticImageData } from "next/image";

import successForum from "@/assets/img-slot.webp";
import successLibrary from "@/assets/img-slot2.webp";
import successLibrary2 from "@/assets/img-slot3.webp";
import { HomeStaticImage } from "@/components/layout/home/HomeStaticImage";
import { cn } from "@/components/ui";

type FeatureRow = {
  title: string;
  body: string;
  image: StaticImageData;
  alt: string;
  icon: ReactNode;
  imageWidth: number;
  reverse?: boolean;
};

function CalendarFeatureIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
    >
      <path
        d="M6 10.5C6 9.70435 6.31607 8.94129 6.87868 8.37868C7.44129 7.81607 8.20435 7.5 9 7.5H27C27.7956 7.5 28.5587 7.81607 29.1213 8.37868C29.6839 8.94129 30 9.70435 30 10.5V28.5C30 29.2956 29.6839 30.0587 29.1213 30.6213C28.5587 31.1839 27.7956 31.5 27 31.5H9C8.20435 31.5 7.44129 31.1839 6.87868 30.6213C6.31607 30.0587 6 29.2956 6 28.5V10.5Z"
        stroke="#4B0286"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 4.5V10.5"
        stroke="#4B0286"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 4.5V10.5"
        stroke="#4B0286"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 16.5H30"
        stroke="#4B0286"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 22.5H15V25.5H12V22.5Z"
        stroke="#4B0286"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChatFeatureIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
    >
      <path
        d="M16.5 4.5H31.5V16.5H27L21 19.5V16.5H16.5V4.5Z"
        stroke="#4B0286"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.5 24V30C22.5 30.3978 22.342 30.7794 22.0607 31.0607C21.7794 31.342 21.3978 31.5 21 31.5H9C8.60218 31.5 8.22064 31.342 7.93934 31.0607C7.65804 30.7794 7.5 30.3978 7.5 30V9C7.5 8.60218 7.65804 8.22064 7.93934 7.93934C8.22064 7.65804 8.60218 7.5 9 7.5H12"
        stroke="#4B0286"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 27V27.0208"
        stroke="#4B0286"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BookFeatureIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
    >
      <path
        d="M28.5 6V30H10.5C9.70435 30 8.94129 29.6839 8.37868 29.1213C7.81607 28.5587 7.5 27.7957 7.5 27V9C7.5 8.20435 7.81607 7.44129 8.37868 6.87868C8.94129 6.31607 9.70435 6 10.5 6H28.5Z"
        stroke="#4B0286"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.5 24H10.5C9.70435 24 8.94129 24.3161 8.37868 24.8787C7.81607 25.4413 7.5 26.2044 7.5 27"
        stroke="#4B0286"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 12H22.5"
        stroke="#4B0286"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FeatureIconBox({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-12.5 w-12.5 md:h-11 md:w-11 lg:h-12.5 lg:w-12.5 shrink-0 p-1 items-center justify-center rounded-[10px] bg-[#F9F0FF] text-[#4B0286]">
      {children}
    </span>
  );
}

const rows: FeatureRow[] = [
  {
    title: "Live Events & Challenges",
    body: "Monthly virtual wellness events and goal-setting sessions hosted by licensed health coaches and Beluga Health providers.",
    image: successForum,
    alt: "Panel discussion with Movyo community members in a bright studio",
    icon: <CalendarFeatureIcon className="h-5 w-5" />,
    imageWidth: 751,
  },
  {
    title: "Private Member Forum",
    body: "Ask questions, share wins, and connect with women who understand exactly where you are. No judgment. No diet culture. Just honest support.",
    image: successLibrary,
    alt: "Group of diverse women at a Movyo community event",
    icon: <ChatFeatureIcon className="h-5 w-5" />,
    imageWidth: 682,
    reverse: true,
  },
  {
    title: "Clinical Resource Library",
    body: "Guides on hormones, metabolism, sleep, and midlife nutrition. Written by clinicians. Built for women 40+. Always free for members.",
    image: successLibrary2,
    alt: "Women at a Movyo community event holding colorful signs",
    icon: <BookFeatureIcon className="h-5 w-5" />,
    imageWidth: 682,
  },
];

function FeatureImage({ image, alt }: Pick<FeatureRow, "image" | "alt">) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl",
        "aspect-16/10 lg:aspect-2/1",
        "shadow-[0_4px_6px_-1px_rgba(0,0,0,0.15),0_2px_4px_-1px_rgba(0,0,0,0.05)]",
      )}
    >
      <HomeStaticImage
        src={image}
        alt={alt}
        fill
        className="object-cover object-center"
      />
    </div>
  );
}

function FeatureCopy({
  title,
  body,
  icon,
}: Pick<FeatureRow, "title" | "body" | "icon">) {
  return (
    <div className="flex w-full flex-col justify-center text-left gap-3 lg:gap-4">
      <FeatureIconBox>{icon}</FeatureIconBox>
      <h3 className="font-satoshi text-xl font-bold leading-[160%] text-[#232424] lg:text-[30px]">
        {title}
      </h3>
      <p className="font-sf text-base font-[300] leading-[130%] tracking-[0.32px] lg:tracking-[0.48px] text-[#232424] lg:text-2xl">
        {body}
      </p>
    </div>
  );
}

function FeatureRowBlock({
  title,
  body,
  image,
  alt,
  icon,
  imageWidth,
  reverse = false,
}: FeatureRow) {
  return (
    <article
      className={cn(
        "flex flex-col lg:rounded-[20px] rounded-2xl",
        "md:flex-row lg:items-center md:gap-5 lg:gap-12.5 lg:overflow-visible lg:rounded-none lg:bg-transparent lg:shadow-none",
        reverse && "lg:flex-row-reverse",
      )}
    >
      <div
        className="w-full shrink-0 lg:shrink-0 md:w-1/2 lg:w-1/1"
        style={{ maxWidth: imageWidth }}
      >
        <FeatureImage image={image} alt={alt} />
      </div>
      <div className="w-full p-4 lg:min-w-0 lg:flex-1 -mt-12.5 md:mt-0 z-40 bg-white rounded-2xl shadow-md lg:shadow-none">
        <FeatureCopy title={title} body={body} icon={icon} />
      </div>
    </article>
  );
}

export function SuccessFeaturesSection() {
  return (
    <section
      className="scroll-mt-20 bg-[#F5F7FF] px-4 pb-7.5 lg:pb-25 sm:px-5 md:px-7"
      aria-labelledby="success-features-heading"
    >
      <div className="mx-auto w-full max-w-346 overflow-hidden rounded-[30px] lg:rounded-[60px] bg-white px-4 md:px-5 py-12.5">
        <header className="mx-auto max-w-199 text-center">
          <h2
            id="success-features-heading"
            className="font-satoshi text-center text-[30px] min-[440px]:text-[32px] font-bold leading-[130%] text-[#0F1F5C] lg:text-[60px]"
          >
            Everything You Need <br /> to Succeed
          </h2>
        </header>
        <p className="mx-auto mt-4 max-w-285 text-center font-sf text-sm min-[440px]:text-base font-normal lg:font-medium leading-[130%] lg:leading-[160%] tracking-[0.32px] lg:tracking-[0.48px] text-[#232424] lg:text-2xl">
          Whether you need expert advice, motivation, or a community that truly
          understands your journey, <br className="lg:hidden block" /> Movyo gives you everything you need to build
          lasting healthy habits.
        </p>
        <div
          className="mx-auto mt-4 h-1 w-25 rounded-full bg-[#F7B422]"
          aria-hidden
        />

        <div className="mt-7.5 flex flex-col gap-7.5 md:mt-12 sm:gap-8 lg:gap-16.25">
          {rows.map((row) => (
            <FeatureRowBlock key={row.title} {...row} />
          ))}
        </div>
      </div>
    </section>
  );
}
