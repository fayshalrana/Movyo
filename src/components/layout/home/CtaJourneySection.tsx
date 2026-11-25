import ctaTeam from "@/assets/cta-journey-team.webp";
import { HomeStaticImage } from "@/components/layout/home/HomeStaticImage";
import { CTAButton, cn } from "@/components/ui";


const ctaBtn = cn(
 "inline-flex h-auto min-h-0 items-center justify-center gap-2.5 lg:gap-4 rounded-full border-2 border-transparent bg-[#2253C7] px-4 lg:px-7.5 py-2",
  "font-sf text-xs min-[440px]:text-sm text-center lg:text-[20px] tracking-[0.28px] lg:tracking-[0%] font-medium leading-[160%] lg:leading-[150%] text-white",
  "hover:border-[#2253C7] hover:bg-transparent hover:text-[#2253C7]",
  "[&_svg]:!h-4 [&_svg]:!w-4 lg:[&_svg]:!h-8 lg:[&_svg]:!w-8 [&_svg]:shrink-0 [&_svg]:aspect-square",
);

function CtaJourneyBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[#f8f9fb]"
      aria-hidden
    >
      <div className="absolute -left-20 -top-25 h-55 w-55 rounded-full bg-[#FFFAEE]/90 blur-[20px] sm:h-65 sm:w-65" />
      <div className="absolute -right-[20%] md:-right-[50%] lg:right-[5%] -bottom-[20%] md:-bottom-[55%] lg:-bottom-[30%] h-60 w-60 rounded-full bg-[#F3F2FF] blur-[10px] sm:h-78 sm:w-78" />
      <div className="absolute -left-[24%] md:-left-[50%] lg:-left-[15%] -bottom-[24%] md:-bottom-[55%] lg:-bottom-[35%] h-[240px] w-[240px] rounded-full bg-[#EFF4FF] blur-[10px] sm:h-[312px] sm:w-[312px]" />
    </div>
  );
}

export function CtaJourneySection() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 px-4 py-12.5"
      aria-labelledby="cta-journey-heading"
    >
      <div className="mx-auto w-full max-w-316.5">
        <div className="overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[480px_1fr] gap-7.5 md:gap-8">
          <div className="relative aspect-[4/5] lg:aspect-[4/3] h-full max-h-[476px] lg:max-h-[290px] w-full sm:aspect-[16/10] md:aspect-auto lg:min-h-[476px] rounded-2xl overflow-hidden lg:max-w-[480px]">
            <HomeStaticImage
              src={ctaTeam}
              alt="Three Movyo Health community members smiling in branded t-shirts"
              fill
              className="object-cover object-left md:object-right"
            />
          </div>

          <div className="relative flex lg:min-h-90 flex-col justify-center min-[440px]:px-10 px-5 py-5 sm:px-10 sm:py-12 md:p-4 lg:px-10 lg:py-5 rounded-2xl overflow-hidden">
            <CtaJourneyBackground />

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="">
                <h2
                  id="cta-journey-heading"
                  className="font-satoshi text-[30px] min-[440px]:text-[32px] font-bold leading-[130%] text-[#0F1F5C] sm:text-[34px] lg:text-[60px]"
                >
                  Are You Ready?
                </h2>

                <p className="my-4 w-full font-sf text-sm min-[440px]:text-base font-normal md:font-medium leading-[130%] lg:leading-[160%] tracking-[0.32px] lg:tracking-[0.48px] text-[#232424] sm:mt-5 lg:text-[24px]">
                Ready to stop fighting your body and start working with it? Save on your first month — right now. It is not about willpower. It is about having the right clinical support. Lose weight with a medically supervised GLP-1 program designed around your life, delivered to your door.
                </p>

                <div
                  className="h-1 w-25 rounded-full bg-[#F7B422]"
                  aria-hidden
                />
              </div>

              <div className="mt-24 sm:mt-8">
                <CTAButton
                  href="/get-started"
                  showIcon
                  className={ctaBtn}
                >
                 Start My Assessment
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
