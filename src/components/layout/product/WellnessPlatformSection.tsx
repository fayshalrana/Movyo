import Image from "next/image";
import progressImg from "../../../assets/progress.webp";
import progressImgMobile from "../../../assets/progress-mobile.webp";

import { CTAButton } from "@/components/ui/CTAButton";

export const WellnessPlatformSection = () => {
  return (
    <section className="w-full flex justify-center bg-white px-4 lg:px-10 py-12.5 font-sf overflow-hidden">
      <div className="w-full max-w-300 flex flex-col lg:flex-row items-center gap-4 lg:gap-9">
        {/* Left Side: Image */}
        <div className="w-full lg:w-129 h-81.25 lg:h-122 relative rounded-2xl overflow-hidden shrink-0">
          <Image
            src={progressImgMobile}
            alt="Wellness Platform"
            fill
            className="object-cover lg:hidden"
            sizes="100vw"
          />
          <Image
            src={progressImg}
            alt="Wellness Platform"
            fill
            className="hidden object-cover lg:block"
            sizes="516px"
          />
        </div>

        {/* Right Side: Steps */}
        <div className="w-full lg:w-167 flex flex-col justify-center items-center lg:items-start px-0 gap-10 lg:gap-12.5">
          {/* Header */}
          <div className="flex flex-col gap-2 w-full text-center lg:text-left">
            <h2 className="text-[35px] lg:text-[40px] font-medium leading-[115%] tracking-[-0.005em] text-[#111111] font-sf lg:leading-[114.99999999999999%]">
              <span className="hidden lg:inline">
                Your{" "}
                <span className="font-instrument italic font-[300]">
                  One-Stop
                </span>{" "}
                Metabolic Wellness Platform
              </span>
              <span className="lg:hidden text-center block">
                Start your program in <br /> 3{" "}
                <span className="font-instrument italic font-[300]">
                  simple
                </span>{" "}
                steps
              </span>
            </h2>
            <p className="text-[16px] lg:text-[24px] font-[300] leading-[140%] text-[#6B7280] font-sf">
              <span className="hidden lg:inline">
                The right treatment plan for you. Backed by real providers, real
                support, and a community that shows up.
              </span>
              <span className="lg:hidden">
                From assessment to treatment, everything is handled <br />
                online
              </span>
            </p>
          </div>

          {/* Steps List */}
          <div className="flex flex-col gap-6.25 w-full font-sf px-5">
            {/* Step 1 */}
            <div className="flex flex-row items-center gap-6 w-full">
              <div className="w-10 h-10 rounded-full bg-[#003982] flex items-center justify-center shrink-0">
                <span className="text-white text-[18px] font-medium leading-none">
                  1
                </span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[18px] lg:text-[20px] font-medium leading-[140%] text-[#111111]">
                  <span className="hidden lg:inline">
                    Complete Your Health Assessment
                  </span>
                  <span className="lg:hidden">Take a quick assessment</span>
                </h3>
                <p className="text-[14px] font-normal leading-[150%] text-[#6B7280] lg:hidden">
                  Answer a few questions about your health and goals — takes
                  less than 5 minutes.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-row items-center gap-6 w-full">
              <div className="w-10 h-10 rounded-full bg-[#003982] flex items-center justify-center shrink-0">
                <span className="text-white text-[18px] font-medium leading-none">
                  2
                </span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[18px] lg:text-[20px] font-medium leading-[140%] text-[#111111]">
                  <span className="hidden lg:inline">
                    Get Reviewed & Approved
                  </span>
                  <span className="lg:hidden">
                    Reviewed by a licensed provider
                  </span>
                </h3>
                <p className="text-[14px] font-normal leading-[150%] text-[#6B7280] lg:hidden">
                  A licensed medical professional reviews your profile and
                  builds your personalized plan.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-row items-center gap-6 w-full">
              <div className="w-10 h-10 rounded-full bg-[#003982] flex items-center justify-center shrink-0">
                <span className="text-white text-[18px] font-medium leading-none">
                  3
                </span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[18px] lg:text-[20px] font-medium leading-[140%] text-[#111111]">
                  <span className="hidden lg:inline">
                    Receive Medication & Start Your Journey with Us
                  </span>
                  <span className="lg:hidden">Start your program</span>
                </h3>
                <p className="text-[14px] font-normal leading-[150%] text-[#6B7280] lg:hidden">
                  If prescribed, your medication ships to your door — with
                  ongoing support included.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <CTAButton
            className="w-fit min-w-62.5 h-12.5 max-h-12.5 self-center text-[18px] font-normal lg:px-7.5 lg:self-start cursor-pointer font-sf leading-5"
            showIcon
          >
            Start Your Assessment
          </CTAButton>
        </div>
      </div>
    </section>
  );
};
