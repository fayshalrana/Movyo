import { CTAButton, cn } from "@/components/ui";
import { HomeStaticImage } from "@/components/layout/home/HomeStaticImage";
import faqSemaglutide from "@/assets/faq1.webp";
import faqTirzepatide from "@/assets/faq2.webp";

const FAQ_ITEMS: { id: string; question: string; answer: string }[] = [
  {
    id: "different",
    question: "How does Movyo Health work?",
    answer:
      "Movyo focuses on doctor-guided weight loss with licensed providers, transparent pricing, and ongoing support—not a one-off prescription. Your plan is personalized and you have a clear path to reach your care team.",
  },
  {
    id: "real-medication",
    question: "How do I know this is safe?",
    answer:
      "If prescribed, medication is prepared by licensed U.S. pharmacies and shipped to you. Compounded options are prepared according to applicable pharmacy regulations.",
  },
  {
    id: "safe",
    question: "How does the signup process work?",
    answer:
      "Licensed providers review your history and monitor your care. FDA-approved medications have established safety and efficacy data; compounded products may differ. Your provider will discuss benefits and risks for your situation.",
  },
  {
    id: "states",
    question: "What states are eligible?",
    answer:
      "Availability depends on provider licensing and state regulations. Start a short questionnaire or contact support—we'll confirm whether we can serve your state.",
  },
  {
    id: "same-treatments",
    question:
      "How does the pricing work?",
    answer:
      "Yes. When appropriate, providers may prescribe the same classes of GLP-1 medications used in specialty and primary care settings, subject to eligibility and clinical judgment.",
  },
  {
    id: "side-effects",
    question: "What if I need to cancel?",
    answer:
      "All medications can cause side effects. Common GLP-1–related effects can include nausea, digestive symptoms, and others. Your provider will review what to watch for and when to seek help.",
  },
  // {
  //   id: "questions-treatment",
  //   question: "What if I have questions about my treatment?",
  //   answer:
  //     "You can message your care team through your secure member portal and get guidance on dosing, side effects, and follow-up—without waiting on hold for a random call center.",
  // },
  {
    id: "insurance",
    question: "Is the medication real compounded semaglutide and tirzepatide?",
    answer:
      "Many visits and medications are cash-pay for simplicity and speed. Ask support about any HSA/FSA options or coverage questions specific to your plan.",
  },
  {
    id: "shipping",
    question: "What dosage will I be taking?",
    answer:
      "Shipping times vary by pharmacy and location. Most orders arrive within several business days after approval—you'll receive tracking when your prescription ships.",
  },
  {
    id: "community",
    question: "Where does my medication come from?",
    answer:
      "Members get access to community resources and check-ins as part of the program. Details are shared after you enroll and in your portal.",
  },
  {
    id: "medication",
    question: "How do I take my medication?",
    answer:
      "Members get access to community resources and check-ins as part of the program. Details are shared after you enroll and in your portal.",
  },

  {
    id: "shipped",
    question: "How is my medication shipped?",
    answer:
      "Members get access to community resources and check-ins as part of the program. Details are shared after you enroll and in your portal.",
  },
  {
    id: "lose",
    question: "How much weight can I expect to lose?",
    answer:
      "Members get access to community resources and check-ins as part of the program. Details are shared after you enroll and in your portal.",
  },
  {
    id: "team",
    question: "How do I reach the care team?",
    answer:
      "Members get access to community resources and check-ins as part of the program. Details are shared after you enroll and in your portal.",
  },
];

function FaqPlusIcon() {
  return (
    <span
      className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#0F1F5C] text-[#0F1F5C] bg-[#ECF0FF]"
      aria-hidden
    >
      <span className="absolute h-0.5 w-3.5 rounded-full bg-current" />
      <span className="absolute h-3.5 w-0.5 rounded-full bg-current transition-transform duration-200 group-open:scale-y-0" />
    </span>
  );
}

function FloatingVial({
  src,
  className,
}: {
  src: typeof faqSemaglutide;
  className: string;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute z-0 select-none",
        className,
      )}
      aria-hidden
    >
      <HomeStaticImage
        src={src}
        alt=""
        width={220}
        height={260}
        className="h-auto w-full object-contain mix-blend-screen"
      />
    </div>
  );
}

export function FaqSection() {
  return (
    <section
      id="faq"
      className="scroll-mt-20 bg-white px-4 py-20 md:px-4 lg:px-0"
      aria-labelledby="faq-heading"
    >
      <div className="relative mx-auto w-full max-w-316.5 text-center">
        {/* Top-left Semaglutide */}
        <FloatingVial
          src={faqSemaglutide}
          className="left-[-4%] md:left-[-6%] top-[-8%] md:top-[-10%] lg:top-[-9.3%] w-28 min-[440px]:w-35 xl:left-[-6%] md:w-50"
        />
        {/* Top-right Tirzepatide */}
        <FloatingVial
          src={faqTirzepatide}
          className="right-[-11%] top-[8.5%] min-[440px]:top-[6%] md:top-[1.5%] xl:top-[4.9%] lg:rotate-0 rotate-14 w-29 md:w-45 md:right-[-5%] lg:right-[10%] xl:w-55"
        />
        {/* Mid-right Semaglutide */}
        <FloatingVial
          src={faqSemaglutide}
          className="right-[-2%] top-[48.5%] w-37.5 rotate-[-55.016deg] xl:right-[-10%] xl:w-57.5 hidden lg:block"
        />
        {/* Bottom-left Tirzepatide */}
        <FloatingVial
          src={faqTirzepatide}
          className="bottom-[-1.4%] left-[-2%] w-38.75 rotate-45 xl:left-[-10%] xl:w-60 hidden lg:block"
        />

        <div className="relative z-10">
          <p className="font-sf text-base font-medium uppercase leading-[160%] tracking-[0.32px] md:tracking-[0.48px] text-[#8F8F8F] md:text-2xl text-center">
            FAQ
          </p>

          <h2
            id="faq-heading"
            className="mt-4 font-satoshi text-[30px] min-[440px]:text-[32px] font-bold leading-[130%] text-[#0F1F5C] lg:text-[60px] text-center"
          >
            We have got you.
          </h2>

          <p className="mx-auto mt-4 max-w-193 font-sf text-sm min-[440px]:text-base font-normal md:font-medium leading-[160%] text-[#232424] sm:text-lg md:text-2xl tracking-[0.32px] md:tracking-[0.48px] text-center">
            You have questions. We have clear answers.
          </p>

          <div
            className="mx-auto mt-4 h-1 w-25 rounded-full bg-[#F7B422]"
            aria-hidden
          />

          <div className="mx-auto mt-12.5 flex w-full max-w-239 flex-col gap-4 text-left">
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.id}
                name="movyo-faq"
                className="group rounded-md border border-[#BDC8E0] bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 marker:content-none sm:px-4 sm:py-4">
                  <span className="font-sf text-lg font-medium leading-[160%] text-[#0F1F5C] md:text-[24px] tracking-[0.36px] md:tracking-[0.48px]">
                    {item.question}
                  </span>
                  <FaqPlusIcon />
                </summary>
                <div className="border-t border-[#BDC8E0] px-5 pb-5 pt-4 sm:px-6">
                  <p className="m-0 font-sf text-sm font-normal leading-relaxed text-[#4B5563] sm:text-base">
                    {item.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
