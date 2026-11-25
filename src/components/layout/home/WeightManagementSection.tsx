import {
  DocumentBadgeIcon,
  HeadsetSupportIcon,
  RxPrescriptionIcon,
  StethoscopeIcon,
} from "@/components/icons";
import { BeforeAfterCompare } from "@/components/layout/home/BeforeAfterCompare";
import { WeightCalculatorCard } from "@/components/layout/home/WeightCalculatorCard";
import { CTAButton, cn } from "@/components/ui";
import { HeaderFeatureBar } from "@/components/layout/home/HeaderFeatureBar";

const features = [
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

const weightManagementPrimaryButtonClass = cn(
  "inline-flex h-auto min-h-0 items-center justify-center gap-2.5 lg:gap-4 rounded-full border-2 border-transparent bg-[#2253C7] px-4 lg:px-7.5 py-2",
  "font-sf text-xs min-[440px]:text-sm text-center lg:text-[20px] tracking-[0.28px] lg:tracking-[0%] font-medium leading-[160%] lg:leading-[150%] text-white",
  "hover:border-[#2253C7] hover:bg-transparent hover:text-[#2253C7]",
  "[&_svg]:!h-4 [&_svg]:!w-4 lg:[&_svg]:!h-8 lg:[&_svg]:!w-8 [&_svg]:shrink-0 [&_svg]:aspect-square",
);

const weightManagementGhostButtonClass = cn(
 "inline-flex h-auto min-h-0 items-center justify-center gap-2.5 md:gap-4 rounded-full border-2 border-[#2253C7] bg-transparent px-4 lg:px-7.5 py-2",
  "font-sf text-center text-xs min-[440px]:text-sm lg:text-[20px] tracking-[0.28px] md:tracking-[0%] font-medium leading-[160%] lg:leading-[150%] text-[#2253C7]",
  "hover:border-[#2253C7] hover:bg-transparent hover:text-[#2253C7]",
 "[&_svg]:!h-4 [&_svg]:!w-4 lg:[&_svg]:!h-8 lg:[&_svg]:!w-8 [&_svg]:shrink-0 [&_svg]:aspect-square",
);

export function WeightManagementSection() {
  return (
    <section
      className="w-full bg-[#F8F8F8] pt-12.5 pb-15 lg:pb-12.5 lg:pt-20"
      aria-labelledby="weight-management-heading"
    >
      <div className="mx-auto w-full max-w-316.5 px-4 sm:px-5 md:px-6 lg:px-2 xl:px-0">
        <h2
          id="weight-management-heading"
          className="mx-auto max-w-261.25 text-center font-satoshi text-[30px] min-[440px]:text-[32px] font-bold leading-[130%] tracking-[0%] text-[#0F1F5C] md:text-4xl lg:text-[60px]"
        >
          Finally Manage Your Weight Without Battling Hunger, Crash Diets,{" "}
          <br />
          or Feel Like A Failure
        </h2>

        <div className="mt-15 md:mt-12.5 flex flex-col-reverse md:grid items-stretch gap-7.5 md:grid-cols-2 lg:grid-cols-[662px_1fr] lg:gap-6 lg:max-h-160.75">
          <BeforeAfterCompare className="lg:w-[662px]" />
          <WeightCalculatorCard />
        </div>

        <div className="mt-15 lg:my-12.5">
          <HeaderFeatureBar
            className="h-12"
            textClassName="text-sm md:text-lg tracking-[-0.14px] md:tracking-[-0.18px] leading-[100%]"
          />
        </div>

        <div className="py-5 flex flex-col items-center gap-4 justify-center">
          <div className="flex items-center gap-4.5 justify-center">
            <CTAButton
              href="/get-started"
              colorScheme="blue"
              showIcon
              className={weightManagementPrimaryButtonClass}
            >
              Let&apos;s Get Started
            </CTAButton>
            <CTAButton
              href="/#pricing"
              colorScheme="blue"
              variant="ghost"
              showIcon
              className={weightManagementGhostButtonClass}
            >
              See Pricing
            </CTAButton>
          </div>
          <p className="text-center font-sf text-sm min-[440px]:text-base lg:text-lg font-[300] leading-[150%] text-[#232424]">
            No Hidden Fees. No Monthly Membership. Cancel Anytime
          </p>
        </div>
      </div>
    </section>
  );
}
