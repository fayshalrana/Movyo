import type { ReactNode, SVGProps } from "react";

import iphoneImage from "@/assets/iPhone.webp";
import { HomeStaticImage } from "./HomeStaticImage";

type Step = {
  title: string;
  body: string;
  icon: ReactNode;
};

function ClipboardStepIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 36"
      fill="none"
      className="h-7 w-7 lg:h-9 lg:w-9"
    >
      <path
        d="M13.5 7.5H10.5C9.70435 7.5 8.94129 7.81607 8.37868 8.37868C7.81607 8.94129 7.5 9.70435 7.5 10.5V28.5C7.5 29.2956 7.81607 30.0587 8.37868 30.6213C8.94129 31.1839 9.70435 31.5 10.5 31.5H25.5C26.2956 31.5 27.0587 31.1839 27.6213 30.6213C28.1839 30.0587 28.5 29.2956 28.5 28.5V10.5C28.5 9.70435 28.1839 8.94129 27.6213 8.37868C27.0587 7.81607 26.2956 7.5 25.5 7.5H22.5"
        stroke="#4B0286"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 7.5C13.5 6.70435 13.8161 5.94129 14.3787 5.37868C14.9413 4.81607 15.7044 4.5 16.5 4.5H19.5C20.2956 4.5 21.0587 4.81607 21.6213 5.37868C22.1839 5.94129 22.5 6.70435 22.5 7.5C22.5 8.29565 22.1839 9.05871 21.6213 9.62132C21.0587 10.1839 20.2956 10.5 19.5 10.5H16.5C15.7044 10.5 14.9413 10.1839 14.3787 9.62132C13.8161 9.05871 13.5 8.29565 13.5 7.5Z"
        stroke="#4B0286"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 18H13.515"
        stroke="#4B0286"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.5 18H22.5"
        stroke="#4B0286"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 24H13.515"
        stroke="#4B0286"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.5 24H22.5"
        stroke="#4B0286"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProviderStepIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-7 w-7 lg:h-9 lg:w-9"
      viewBox="0 0 36 36"
      fill="none"
    >
      <path
        d="M9 31.5V28.5C9 26.9087 9.63214 25.3826 10.7574 24.2574C11.8826 23.1321 13.4087 22.5 15 22.5H18"
        stroke="#4B0286"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33 24C33 30 29.25 33 27.75 33C26.25 33 22.5 30 22.5 24C24 24 26.25 23.25 27.75 21.75C29.25 23.25 31.5 24 33 24Z"
        stroke="#4B0286"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.7574 14.7426C12.6321 13.6174 12 12.0913 12 10.5C12 8.9087 12.6321 7.38258 13.7574 6.25736C14.8826 5.13214 16.4087 4.5 18 4.5C19.5913 4.5 21.1174 5.13214 22.2426 6.25736C23.3679 7.38258 24 8.9087 24 10.5C24 12.0913 23.3679 13.6174 22.2426 14.7426C21.1174 15.8679 19.5913 16.5 18 16.5C16.4087 16.5 14.8826 15.8679 13.7574 14.7426Z"
        stroke="#4B0286"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PackageStepIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-7 w-7 lg:h-9 lg:w-9"
      viewBox="0 0 36 36"
      fill="none"
    >
      <path
        d="M18 4.5L30 11.25V24.75L18 31.5L6 24.75V11.25L18 4.5Z"
        stroke="#4B0286"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 18L30 11.25"
        stroke="#4B0286"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 18V31.5"
        stroke="#4B0286"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 18L6 11.25"
        stroke="#4B0286"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 7.875L12 14.625"
        stroke="#4B0286"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TruckStepIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-7 w-7 lg:h-9 lg:w-9"
      viewBox="0 0 36 36"
      fill="none"
    >
      <path
        d="M8.37868 27.6213C7.81607 27.0587 7.5 26.2956 7.5 25.5C7.5 24.7044 7.81607 23.9413 8.37868 23.3787C8.94129 22.8161 9.70435 22.5 10.5 22.5C11.2956 22.5 12.0587 22.8161 12.6213 23.3787C13.1839 23.9413 13.5 24.7044 13.5 25.5C13.5 26.2956 13.1839 27.0587 12.6213 27.6213C12.0587 28.1839 11.2956 28.5 10.5 28.5C9.70435 28.5 8.94129 28.1839 8.37868 27.6213Z"
        stroke="#4B0286"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.5 25.5C22.5 26.2956 22.8161 27.0587 23.3787 27.6213C23.9413 28.1839 24.7044 28.5 25.5 28.5C26.2956 28.5 27.0587 28.1839 27.6213 27.6213C28.1839 27.0587 28.5 26.2956 28.5 25.5C28.5 24.7044 28.1839 23.9413 27.6213 23.3787C27.0587 22.8161 26.2956 22.5 25.5 22.5C24.7044 22.5 23.9413 22.8161 23.3787 23.3787C22.8161 23.9413 22.5 24.7044 22.5 25.5Z"
        stroke="#4B0286"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 25.5H4.5V19.5M3 7.5H19.5V25.5M13.5 25.5H22.5M19.5 9H27L31.5 16.5V25.5H28.5M31.5 16.5H19.5"
        stroke="#4B0286"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 13.5H10.5"
        stroke="#4B0286"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeadsetStepIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-7 w-7 lg:h-9 lg:w-9"
      viewBox="0 0 36 36"
      fill="none"
    >
      <path
        d="M6 21V16.5C6 13.3174 7.26428 10.2652 9.51472 8.01472C11.7652 5.76428 14.8174 4.5 18 4.5C21.1826 4.5 24.2348 5.76428 26.4853 8.01472C28.7357 10.2652 30 13.3174 30 16.5V21"
        stroke="#4B0286"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27 28.5C27 30.9855 22.971 33 18 33"
        stroke="#4B0286"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 21C6 20.2044 6.31607 19.4413 6.87868 18.8787C7.44129 18.3161 8.20435 18 9 18H10.5C11.2956 18 12.0587 18.3161 12.6213 18.8787C13.1839 19.4413 13.5 20.2044 13.5 21V25.5C13.5 26.2956 13.1839 27.0587 12.6213 27.6213C12.0587 28.1839 11.2956 28.5 10.5 28.5H9C8.20435 28.5 7.44129 28.1839 6.87868 27.6213C6.31607 27.0587 6 26.2956 6 25.5V21Z"
        stroke="#4B0286"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.5 21C22.5 20.2044 22.8161 19.4413 23.3787 18.8787C23.9413 18.3161 24.7044 18 25.5 18H27C27.7956 18 28.5587 18.3161 29.1213 18.8787C29.6839 19.4413 30 20.2044 30 21V25.5C30 26.2956 29.6839 27.0587 29.1213 27.6213C28.5587 28.1839 27.7956 28.5 27 28.5H25.5C24.7044 28.5 23.9413 28.1839 23.3787 27.6213C22.8161 27.0587 22.5 26.2956 22.5 25.5V21Z"
        stroke="#4B0286"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const steps: Step[] = [
  {
    title: "Today",
    body: "Complete your health assessment and save on your first month.",
    icon: <ClipboardStepIcon className="h-5 w-5" />,
  },
  {
    title: "Within 24 hours",
    body: "A licensed Beluga Health provider reviews and writes your prescription.",
    icon: <ProviderStepIcon className="h-5 w-5" />,
  },
  {
    title: "Within 1 to 2 days",
    body: "Your medication ships from a US-licensed compounding pharmacy.",
    icon: <PackageStepIcon className="h-5 w-5" />,
  },
  {
    title: "Day 2 or 3",
    body: "Your medication arrives at your door.",
    icon: <TruckStepIcon className="h-5 w-5" />,
  },
  {
    title: "Every month, ongoing",
    body: "Your care team checks in. Refills are simple. Support is always available.",
    icon: <HeadsetStepIcon className="h-5 w-5" />,
  },
];

function AssessmentPhoneMockup() {
  return (
    <div className="h-full overflow-hidden" aria-hidden>
      <HomeStaticImage
        src={iphoneImage}
        alt=""
        width={431.5}
        height={723}
        className="object-contain h-full object-top"
      />
    </div>
  );
}

export function ProgramStepsSection() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 bg-white px-4 py-20 sm:px-5 md:px-6 lg:px-2 xl:px-0"
      aria-labelledby="program-steps-heading"
    >
      <div className="text-center">
        <h4 className="font-sf text-base font-medium leading-[160%] uppercase text-[#8F8F8F] md:text-2xl tracking-[0.32px] lg:tracking-[0.48px]">
          How it works
        </h4>
        <h2 className="font-satoshi text-[30px] min-[440px]:text-[32px] font-bold leading-[130%] text-[#0F1F5C] lg:text-[60px] max-w-90 lg:max-w-205.5 mx-auto py-4">
          Your medication at your door in 1 to 2 days.
        </h2>
        <p className="font-sf text-sm min-[440px]:text-base font-medium leading-[160%] text-[#232424] lg:text-2xl tracking-[0.32px] lg:tracking-[0.48px] text-center pb-4">
          No long waits. No unnecessary appointments. No confusing insurance
          hoops.
        </p>
        <div className="h-1 w-25 mx-auto bg-[#F7B422] rounded-full"></div>
      </div>
      <div className="mx-auto flex flex-col md:flex-row items-stretch justify-center max-w-316.5 gap-7.5 md:gap-10 lg:gap-15 pt-7.5 md:pt-20 lg:pt-20">
        <div className="max-w-full md:max-w-1/2 lg:max-w-150.5">
          <ol className="flex items-start list-none flex-col gap-7.5 md:gap-7 p-0 lg:gap-12.5">
            {steps.map((step) => (
              <li key={step.title} className="flex items-start gap-4.5">
                <span className="inline-flex lg:h-11.25 lg:w-11.25 h-8 w-8 p-px shrink-0 items-center justify-center lg:rounded-[10px] rounded-[5px] bg-[#F9F0FF] text-[#7C3AED]">
                  {step.icon}
                </span>
                <div className="min-w-0">
                  <h3 className="font-satoshi text-xl min-[440px]:text-2xl font-medium tracking-[-0.48px] lg:tracking-[-0.6px] leading-[150%] text-[#232424] lg:text-[30px]">
                    {step.title}
                  </h3>
                  <p className="mt-2 font-sf text-sm min-[440px]:text-base font-normal leading-[160%] text-[#8F8F8F] lg:text-2xl">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative flex items-center justify-center rounded-4xl bg-[#F9F0FF] pl-16.25 pt-22 md:pt-29 md:pl-17.5 lg:pl-23 sm:pb-0 w-full max-w-full md:max-w-1/2 lg:max-w-150.5 h-130.25 md:h-auto">
          <AssessmentPhoneMockup />
        </div>
      </div>
    </section>
  );
}
