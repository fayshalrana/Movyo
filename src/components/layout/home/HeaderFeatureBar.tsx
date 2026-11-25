import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/components/ui";

type HeaderFeatureItem = {
  id: string;
  label: string;
  icon: ReactNode;
};

const featureItems: HeaderFeatureItem[] = [
  {
    id: "supervised",
    label: "US-Certified Licensed Pharmacy",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden
      >
        <path
          d="M5 3.33398H4.16667C3.72464 3.33398 3.30072 3.50958 2.98816 3.82214C2.67559 4.1347 2.5 4.55862 2.5 5.00065V7.91732C2.5 9.13289 2.98289 10.2987 3.84243 11.1582C4.70197 12.0178 5.86776 12.5007 7.08333 12.5007C8.29891 12.5007 9.4647 12.0178 10.3242 11.1582C11.1838 10.2987 11.6667 9.13289 11.6667 7.91732V5.00065C11.6667 4.55862 11.4911 4.1347 11.1785 3.82214C10.866 3.50958 10.442 3.33398 10 3.33398H9.16667"
          stroke="#232424"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.66666 12.5C6.66666 13.1566 6.79599 13.8068 7.04727 14.4134C7.29854 15.02 7.66684 15.5712 8.13113 16.0355C8.59542 16.4998 9.14662 16.8681 9.75325 17.1194C10.3599 17.3707 11.0101 17.5 11.6667 17.5C12.3233 17.5 12.9735 17.3707 13.5801 17.1194C14.1867 16.8681 14.7379 16.4998 15.2022 16.0355C15.6665 15.5712 16.0348 15.02 16.2861 14.4134C16.5373 13.8068 16.6667 13.1566 16.6667 12.5V10"
          stroke="#232424"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.16666 2.5V4.16667"
          stroke="#232424"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 2.5V4.16667"
          stroke="#232424"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 8.33268C15 8.77471 15.1756 9.19863 15.4882 9.51119C15.8007 9.82375 16.2246 9.99935 16.6667 9.99935C17.1087 9.99935 17.5326 9.82375 17.8452 9.51119C18.1577 9.19863 18.3333 8.77471 18.3333 8.33268C18.3333 7.89065 18.1577 7.46673 17.8452 7.15417C17.5326 6.84161 17.1087 6.66602 16.6667 6.66602C16.2246 6.66602 15.8007 6.84161 15.4882 7.15417C15.1756 7.46673 15 7.89065 15 8.33268Z"
          stroke="#232424"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "personalized",
    label: "Personalized to Your Biology",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden
      >
        <path
          d="M3.75 2C3.33437 2 3 2.33437 3 2.75V11.25C3 11.6656 3.33437 12 3.75 12C4.16562 12 4.5 11.6656 4.5 11.25V9H6.94062L10.9406 13L7.22188 16.7188C6.92813 17.0125 6.92813 17.4875 7.22188 17.7781C7.51562 18.0688 7.99062 18.0719 8.28125 17.7781L12 14.0594L15.7188 17.7781C16.0125 18.0719 16.4875 18.0719 16.7781 17.7781C17.0687 17.4844 17.0719 17.0094 16.7781 16.7188L13.0594 13L16.7781 9.28125C17.0719 8.9875 17.0719 8.5125 16.7781 8.22188C16.4844 7.93125 16.0094 7.92813 15.7188 8.22188L12 11.9406L9.02187 8.9625C10.7063 8.70937 12 7.25625 12 5.5C12 3.56562 10.4344 2 8.5 2H3.75ZM8.5 7.5H4.5V3.5H8.5C9.60313 3.5 10.5 4.39687 10.5 5.5C10.5 6.60313 9.60313 7.5 8.5 7.5Z"
          fill="#232424"
        />
      </svg>
    ),
  },
  {
    id: "providers",
    label: "Licensed Beluga Health Providers",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden
      >
        <path
          d="M11.6667 2.5V5.83333C11.6667 6.05435 11.7545 6.26631 11.9108 6.42259C12.067 6.57887 12.279 6.66667 12.5 6.66667H15.8334"
          stroke="#232424"
          strokeWidth="1.16667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.16669 6.66667V4.16667C4.16669 3.72464 4.34228 3.30072 4.65484 2.98816C4.9674 2.67559 5.39133 2.5 5.83335 2.5H11.6667L15.8334 6.66667V15.8333C15.8334 16.2754 15.6578 16.6993 15.3452 17.0118C15.0326 17.3244 14.6087 17.5 14.1667 17.5H10"
          stroke="#232424"
          strokeWidth="1.16667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.23223 13.4338C2.76339 12.9649 2.5 12.3291 2.5 11.666C2.5 11.003 2.76339 10.3671 3.23223 9.89825C3.70107 9.42941 4.33696 9.16602 5 9.16602C5.66304 9.16602 6.29893 9.42941 6.76777 9.89825C7.23661 10.3671 7.5 11.003 7.5 11.666C7.5 12.3291 7.23661 12.9649 6.76777 13.4338C6.29893 13.9026 5.66304 14.166 5 14.166C4.33696 14.166 3.70107 13.9026 3.23223 13.4338Z"
          stroke="#232424"
          strokeWidth="1.16667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.75 14.166L2.5 18.3327L5 17.0827L7.5 18.3327L6.25 14.166"
          stroke="#232424"
          strokeWidth="1.16667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "medications",
    label: "Compounded GLP-1 Medications",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden
      >
        <path
          d="M6.66665 17.5007H13.3333C13.5543 17.5007 13.7663 17.4129 13.9226 17.2566C14.0788 17.1003 14.1666 16.8883 14.1666 16.6673V8.33398C14.1666 7.67094 13.9033 7.03506 13.4344 6.56622C12.9656 6.09738 12.3297 5.83398 11.6666 5.83398H8.33331C7.67027 5.83398 7.03439 6.09738 6.56555 6.56622C6.09671 7.03506 5.83331 7.67094 5.83331 8.33398V16.6673C5.83331 16.8883 5.92111 17.1003 6.07739 17.2566C6.23367 17.4129 6.44563 17.5007 6.66665 17.5007Z"
          stroke="#232424"
          strokeWidth="0.833333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.33331 11.666H11.6666"
          stroke="#232424"
          strokeWidth="0.833333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 10V13.3333"
          stroke="#232424"
          strokeWidth="0.833333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.33331 5.83333V3.33333C8.33331 3.11232 8.42111 2.90036 8.57739 2.74408C8.73367 2.5878 8.94563 2.5 9.16665 2.5H10.8333C11.0543 2.5 11.2663 2.5878 11.4226 2.74408C11.5788 2.90036 11.6666 3.11232 11.6666 3.33333V5.83333"
          stroke="#232424"
          strokeWidth="0.833333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "support",
    label: "US-Certified Licensed Pharmacy",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden
      >
        <path
          d="M3.33337 11.6667V9.16667C3.33337 7.39856 4.03575 5.70286 5.286 4.45262C6.53624 3.20238 8.23193 2.5 10 2.5C11.7682 2.5 13.4638 3.20238 14.7141 4.45262C15.9643 5.70286 16.6667 7.39856 16.6667 9.16667V11.6667"
          stroke="#232424"
          strokeWidth="1.16667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 15.834C15 17.2148 12.7617 18.334 10 18.334"
          stroke="#232424"
          strokeWidth="1.16667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.33337 11.6667C3.33337 11.2246 3.50897 10.8007 3.82153 10.4882C4.13409 10.1756 4.55801 10 5.00004 10H5.83337C6.2754 10 6.69932 10.1756 7.01188 10.4882C7.32445 10.8007 7.50004 11.2246 7.50004 11.6667V14.1667C7.50004 14.6087 7.32445 15.0326 7.01188 15.3452C6.69932 15.6577 6.2754 15.8333 5.83337 15.8333H5.00004C4.55801 15.8333 4.13409 15.6577 3.82153 15.3452C3.50897 15.0326 3.33337 14.6087 3.33337 14.1667V11.6667Z"
          stroke="#232424"
          strokeWidth="1.16667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.5 11.6667C12.5 11.2246 12.6756 10.8007 12.9882 10.4882C13.3007 10.1756 13.7246 10 14.1667 10H15C15.442 10 15.866 10.1756 16.1785 10.4882C16.4911 10.8007 16.6667 11.2246 16.6667 11.6667V14.1667C16.6667 14.6087 16.4911 15.0326 16.1785 15.3452C15.866 15.6577 15.442 15.8333 15 15.8333H14.1667C13.7246 15.8333 13.3007 15.6577 12.9882 15.3452C12.6756 15.0326 12.5 14.6087 12.5 14.1667V11.6667Z"
          stroke="#232424"
          strokeWidth="1.16667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

/** One strip long enough to cover wide viewports before looping. */
const loopItems: HeaderFeatureItem[] = [
  ...featureItems,
  ...featureItems,
];

function FeatureStrip({
  items,
  stripKey,
  duplicate = false,
  textClassName,
}: {
  items: HeaderFeatureItem[];
  stripKey: number;
  duplicate?: boolean;
  textClassName?: string;
}) {
  return (
    <ul
      className="flex shrink-0 items-center gap-6 pr-6"
      aria-hidden={duplicate || undefined}
      aria-label={duplicate ? undefined : "Program benefits"}
    >
      {items.map((item, index) => (
        <li
          key={`${stripKey}-${item.id}-${index}`}
          className={cn(
            "flex shrink-0 items-center gap-2 font-sf text-xs md:text-sm font-normal leading-[100%] text-[#232424] tracking-[-0.12px] md:tracking-[-0.14px] capitalize",
            textClassName,
          )}
        >
          <span
            className="inline-flex size-5 shrink-0 items-center justify-center text-[#232424]"
            aria-hidden
          >
            {item.icon}
          </span>
          <span className="whitespace-nowrap">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

export function HeaderFeatureBar({
  className,
  textClassName,
}: {
  /** Applied to the marquee track. Defaults to h-17.5 (70px). */
  className?: string;
  /** Overrides font size / tracking on feature labels. */
  textClassName?: string;
} = {}) {
  return (
    <div className="w-full overflow-hidden bg-transparent">
      <div
        className={cn(
          "flex h-17.5 w-full items-center overflow-hidden",
          className,
        )}
      >
        <div
          className="header-feature-marquee flex w-max"
          style={
            {
              "--marquee-duration": "35s",
            } as CSSProperties
          }
        >
          {[0, 1, 2].map((dup) => (
            <FeatureStrip
              key={dup}
              stripKey={dup}
              items={loopItems}
              duplicate={dup !== 0}
              textClassName={textClassName}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
