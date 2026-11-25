import Image from "next/image";

import pinkCheck from "@/assets/pink-check.svg";
import desktopCharingImg from "../../../assets/desktop-charing.webp";
import mobileCharingImg from "../../../assets/mobile-charing.webp";

import { CTAButton } from "@/components/ui/CTAButton";

export const WhatYouGetSection = () => {
  return (
    <section className="w-full flex justify-center bg-white px-4 lg:px-10 py-12.5 font-sf overflow-hidden">
      <div className="w-full max-w-300 flex flex-col lg:flex-row items-stretch gap-4 lg:gap-4">
        {/* Left Side: Content Card */}
        <div className="w-full lg:w-167 bg-[rgba(190,24,93,0.05)] rounded-2xl p-5 lg:p-10 flex flex-col justify-center items-start gap-5 lg:gap-5">
          <h2 className="text-[35px] lg:text-[40px] font-medium leading-[115%] tracking-[-0.005em] text-[#292929]">
            What you get in your{" "}
            <span className="font-instrument italic font-[300]">Movyo</span>{" "}
            journey
          </h2>
          <p className="text-[16px] lg:text-[18px] font-[300] leading-[140%] text-[#292929]">
            You&apos;re not just getting medication. You&apos;re joining a
            complete wellness program built to help you succeed long-term — with
            a team and a community behind you the whole way.
          </p>

          <div className="flex flex-col gap-2 w-full">
            <span className="text-[16px] lg:text-[18px] font-normal leading-none tracking-[-0.01em] text-[#111111]">
              What&apos;s included:
            </span>

            {[
              "Provider Consultation via Beluga Health",
              "Monthly medication delivery (if prescribed)",
              "Ongoing care support",
            ].map((item, i) => (
              <div key={i} className="flex flex-row items-center gap-2 px-4">
                <Image
                  src={pinkCheck}
                  alt=""
                  width={20}
                  height={20}
                  className="h-3.5 w-3.5 shrink-0"
                  aria-hidden
                />
                <span className="text-[16px] lg:text-[18px] font-normal leading-none tracking-[-0.01em] text-[#111111]">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <CTAButton
            className="w-fit min-w-54.75 h-12.5 max-h-12.5 mt-2 text-[18px] lg:px-7.5 font-normal cursor-pointer font-sf leading-5"
            showIcon
          >
            Start Your Journey
          </CTAButton>

          <div className="flex flex-col font-sf w-full max-w-147 h-10 leading-[140%]">
            <span className="text-[14px] font-medium text-[#C32E6D] leading-[140%]">
              Offer Details
            </span>
            <span className="text-[14px] font-[300] text-[#292929] leading-[140%]">
              Monthly Membership starts at $147
            </span>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="w-full lg:w-129 h-119 lg:h-auto relative rounded-2xl overflow-hidden shrink-0">
          {/* Desktop Image */}
          <div className="hidden lg:block absolute inset-0">
            <Image
              src={desktopCharingImg}
              alt="Your Journey"
              fill
              className="object-cover"
              sizes="516px"
              quality={70}
              fetchPriority="low"
            />
          </div>
          {/* Mobile Image */}
          <div className="lg:hidden absolute inset-0">
            <Image
              src={mobileCharingImg}
              alt="Your Journey"
              fill
              className="object-cover"
              sizes="100vw"
              quality={70}
              fetchPriority="low"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
