import bannerImgDesktop from "@/assets/banner-img-desktop.webp";
import { HomeStaticImage } from "@/components/layout/home/HomeStaticImage";
import { CTAButton, cn } from "@/components/ui";

const features = [
  {
    label: "100% online health assessment.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
      >
        <path
          d="M16.25 11.25C16.25 10.9185 16.3817 10.6005 16.6161 10.3661C16.8505 10.1317 17.1685 10 17.5 10H25C25.3315 10 25.6495 10.1317 25.8839 10.3661C26.1183 10.6005 26.25 10.9185 26.25 11.25V23.75C26.25 24.0815 26.1183 24.3995 25.8839 24.6339C25.6495 24.8683 25.3315 25 25 25H17.5C17.1685 25 16.8505 24.8683 16.6161 24.6339C16.3817 24.3995 16.25 24.0815 16.25 23.75V11.25Z"
          stroke="#232424"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22.5 10V6.25C22.5 5.91848 22.3683 5.60054 22.1339 5.36612C21.8995 5.1317 21.5815 5 21.25 5H5C4.66848 5 4.35054 5.1317 4.11612 5.36612C3.8817 5.60054 3.75 5.91848 3.75 6.25V21.25C3.75 21.5815 3.8817 21.8995 4.11612 22.1339C4.35054 22.3683 4.66848 22.5 5 22.5H16.25"
          stroke="#232424"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 11.25H22.5"
          stroke="#232424"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Provider consultation and ongoing care included",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
      >
        <path
          d="M7.5 5H6.25C5.58696 5 4.95107 5.26339 4.48223 5.73223C4.01339 6.20107 3.75 6.83696 3.75 7.5V11.875C3.75 13.6984 4.47433 15.447 5.76364 16.7364C7.05295 18.0257 8.80164 18.75 10.625 18.75C12.4484 18.75 14.197 18.0257 15.4864 16.7364C16.7757 15.447 17.5 13.6984 17.5 11.875V7.5C17.5 6.83696 17.2366 6.20107 16.7678 5.73223C16.2989 5.26339 15.663 5 15 5H13.75"
          stroke="#232424"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 18.75C10 19.7349 10.194 20.7102 10.5709 21.6201C10.9478 22.5301 11.5003 23.3569 12.1967 24.0533C12.8931 24.7497 13.7199 25.3022 14.6299 25.6791C15.5398 26.056 16.5151 26.25 17.5 26.25C18.4849 26.25 19.4602 26.056 20.3701 25.6791C21.2801 25.3022 22.1069 24.7497 22.8033 24.0533C23.4997 23.3569 24.0522 22.5301 24.4291 21.6201C24.806 20.7102 25 19.7349 25 18.75V15"
          stroke="#232424"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.75 3.75V6.25"
          stroke="#232424"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.5 3.75V6.25"
          stroke="#232424"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22.5 12.5C22.5 13.163 22.7634 13.7989 23.2322 14.2678C23.7011 14.7366 24.337 15 25 15C25.663 15 26.2989 14.7366 26.7678 14.2678C27.2366 13.7989 27.5 13.163 27.5 12.5C27.5 11.837 27.2366 11.2011 26.7678 10.7322C26.2989 10.2634 25.663 10 25 10C24.337 10 23.7011 10.2634 23.2322 10.7322C22.7634 11.2011 22.5 11.837 22.5 12.5Z"
          stroke="#232424"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "One transparent monthly price. No surprise fees.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
      >
        <path
          d="M20.875 10C20.6262 9.29405 20.1718 8.67871 19.5703 8.23317C18.9689 7.78763 18.2478 7.53229 17.5 7.5H12.5C11.5054 7.5 10.5516 7.89509 9.84835 8.59835C9.14509 9.30161 8.75 10.2554 8.75 11.25C8.75 12.2446 9.14509 13.1984 9.84835 13.9017C10.5516 14.6049 11.5054 15 12.5 15H17.5C18.4946 15 19.4484 15.3951 20.1517 16.0983C20.8549 16.8016 21.25 17.7554 21.25 18.75C21.25 19.7446 20.8549 20.6984 20.1517 21.4017C19.4484 22.1049 18.4946 22.5 17.5 22.5H12.5C11.7522 22.4677 11.0311 22.2124 10.4297 21.7668C9.82819 21.3213 9.37381 20.706 9.125 20"
          stroke="#232424"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 3.75V7.5M15 22.5V26.25"
          stroke="#232424"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Free shipping. Arrives in 1 to 2 days.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
      >
        <path
          d="M6.98223 23.0178C6.51339 22.5489 6.25 21.913 6.25 21.25C6.25 20.587 6.51339 19.9511 6.98223 19.4822C7.45107 19.0134 8.08696 18.75 8.75 18.75C9.41304 18.75 10.0489 19.0134 10.5178 19.4822C10.9866 19.9511 11.25 20.587 11.25 21.25C11.25 21.913 10.9866 22.5489 10.5178 23.0178C10.0489 23.4866 9.41304 23.75 8.75 23.75C8.08696 23.75 7.45107 23.4866 6.98223 23.0178Z"
          stroke="#232424"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.75 21.25C18.75 21.913 19.0134 22.5489 19.4822 23.0178C19.9511 23.4866 20.587 23.75 21.25 23.75C21.913 23.75 22.5489 23.4866 23.0178 23.0178C23.4866 22.5489 23.75 21.913 23.75 21.25C23.75 20.587 23.4866 19.9511 23.0178 19.4822C22.5489 19.0134 21.913 18.75 21.25 18.75C20.587 18.75 19.9511 19.0134 19.4822 19.4822C19.0134 19.9511 18.75 20.587 18.75 21.25Z"
          stroke="#232424"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.25 21.25H3.75V16.25M2.5 6.25H16.25V21.25M11.25 21.25H18.75M16.25 7.5H22.5L26.25 13.75V21.25H23.75M26.25 13.75H16.25"
          stroke="#232424"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.75 11.25H8.75"
          stroke="#232424"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
] as const;

const heroPrimaryButtonClass = cn(
  "inline-flex h-auto min-h-0 items-center justify-center gap-2.5 lg:gap-4 rounded-full border-2 border-transparent bg-[#2253C7] px-4 lg:px-7.5 py-2",
  "font-sf text-xs min-[440px]:text-sm text-center lg:text-[20px] tracking-[0.28px] lg:tracking-[0%] font-medium leading-[160%] lg:leading-[150%] text-white",
  "hover:border-[#2253C7] hover:bg-transparent hover:text-[#2253C7]",
  "[&_svg]:!h-4 [&_svg]:!w-4 lg:[&_svg]:!h-8 lg:[&_svg]:!w-8 [&_svg]:shrink-0 [&_svg]:aspect-square",
);

const heroGhostButtonClass = cn(
  "inline-flex h-auto min-h-0 items-center justify-center gap-2.5 md:gap-4 rounded-full border-2 border-[#2253C7] bg-transparent px-4 lg:px-7.5 py-2",
  "font-sf text-center text-xs min-[440px]:text-sm lg:text-[20px] tracking-[0.28px] md:tracking-[0%] font-medium leading-[160%] lg:leading-[150%] text-[#2253C7]",
  "hover:border-[#2253C7] hover:bg-transparent hover:text-[#2253C7]",
 "[&_svg]:!h-4 [&_svg]:!w-4 lg:[&_svg]:!h-8 lg:[&_svg]:!w-8 [&_svg]:shrink-0 [&_svg]:aspect-square",
);

const heroGradient =
  "linear-gradient(135deg, #FEEE93 -13.89%, #FBCDEA 58.99%, #DFB6FF 100%)";

export function HeroBanner() {
  return (
    <div className="mx-auto w-full max-w-316.5 px-4 sm:px-5 md:px-6 lg:px-2 xl:px-0 py-5">
      <section
        className="relative isolate box-border overflow-hidden rounded-2xl md:rounded-3xl px-4 py-7 lg:py-23.5 sm:px-8 h-204.5 md:h-150 lg:h-187.75 lg:px-15"
        style={{ background: heroGradient }}
        aria-labelledby="hero-heading"
      >
        <div className="flex flex-col items-start gap-4 md:gap-7.5 text-left">
          <div>
            <h1
              id="hero-heading"
              className="w-full font-satoshi text-[30px] min-[440px]:text-[32px] font-black leading-[130%] text-[#232424] sm:text-[36px] lg:text-[60px] pb-4 md:pb-7.5"
            >
              Lose weight without fighting your body.
            </h1>

            <p className="font-sf text-xs min-[440px]:text-sm text-left font-normal leading-[150%] text-[#232424] md:text-lg lg:text-2xl">
              Starting at $147. A medically supervised GLP-1 program prescribed
              and delivered to your door in 1 to 2 days. <br />
              No insurance needed. No hidden fees. No clinic visits.
            </p>
          </div>

          <div className="w-full py-5">
            <ul className="flex w-full max-w-136 list-none flex-col gap-3 min-[440px]:gap-4">
              {features.map(({ label, icon: Icon }) => (
                <li key={label} className="flex items-center gap-3">
                  <span className="inline-flex h-6 w-6 shrink-0 [&_svg]:h-full [&_svg]:w-full md:h-[30px] md:w-[30px]">
                    {Icon}
                  </span>
                  <span className="font-sf text-xs min-[440px]:text-sm lg:text-2xl font-normal leading-[150%] text-[#232424]">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="flex w-full gap-4.5 sm:flex-wrap sm:items-center sm:gap-4.5">
              <CTAButton
                href="/get-started"
                colorScheme="blue"
                showIcon
                className={heroPrimaryButtonClass}
              >
                Let&apos;s Get Started
              </CTAButton>
              <CTAButton
                href="/#pricing"
                colorScheme="blue"
                variant="ghost"
                showIcon
                className={heroGhostButtonClass}
              >
                See Pricing
              </CTAButton>
            </div>
            <p className="mt-4 font-sf text-xs min-[440px]:text-[15px] lg:text-lg font-[300] leading-[150%] text-[#232424]">
              No Hidden Fees. No Monthly Membership. Cancel Anytime
            </p>
          </div>
        </div>
        <div className="absolute right-1/2 translate-x-1/2 md:translate-x-0 md:right-5 lg:right-[39.346px] bottom-0 h-[303px] md:h-[268px] lg:h-[431px] w-[320px] md:w-[285px] lg:w-[454.499px]">
          <HomeStaticImage
            src={bannerImgDesktop}
            alt=""
            className="h-full w-auto max-w-full object-contain object-right"
            eager
            fetchPriority="high"
          />
        </div>
      </section>
    </div>
  );
}
