"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { cn } from "@/lib/helper/utils";

type AccordionVariant = "default" | "brand" | "pill";

type AccordionContextValue = {
  openIds: ReadonlySet<string>;
  toggle: (id: string) => void;
  variant: AccordionVariant;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext(component: string) {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error(`${component} must be used within Accordion`);
  }
  return ctx;
}

export type AccordionProps = {
  children: React.ReactNode;
  type?: "single" | "multiple";
  className?: string;
  defaultOpen?: string | string[];
  /** `brand`: marketing cards. `pill`: white capsule rows on dark backgrounds (home FAQ). */
  variant?: AccordionVariant;
};

export function Accordion({
  children,
  type = "single",
  className,
  defaultOpen,
  variant = "default",
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(() => {
    if (defaultOpen == null) return new Set();
    return new Set(Array.isArray(defaultOpen) ? defaultOpen : [defaultOpen]);
  });

  const toggle = useCallback(
    (id: string) => {
      setOpenIds((prev) => {
        const next = new Set(prev);
        if (type === "single") {
          if (next.has(id)) {
            next.delete(id);
          } else {
            next.clear();
            next.add(id);
          }
        } else if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    },
    [type],
  );

  const value = useMemo(
    () => ({ openIds, toggle, variant }),
    [openIds, toggle, variant],
  );

  const shell =
    variant === "brand"
      ? cn("flex w-full max-w-[770px] flex-col gap-4", className)
      : variant === "pill"
        ? cn("flex w-full flex-col gap-3", className)
        : cn(
            "divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 bg-white",
            className,
          );

  return (
    <AccordionContext.Provider value={value}>
      <div className={shell}>{children}</div>
    </AccordionContext.Provider>
  );
}

export type AccordionItemProps = {
  value: string;
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

/** FAQ body copy — SF Pro Display, light weight, cap edge trim (spec). */
const accordionPanelBodyClass =
  "w-full text-left text-[#111] [leading-trim:both] [text-edge:cap] [font-family:var(--font-landing-sans)] text-base font-[300] not-italic leading-normal [&_p]:pb-4";

const chevronBrand = (open: boolean) =>
  `h-6 w-6 shrink-0 text-[#C32E6D] transition-transform duration-200 ${
    open ? "rotate-0" : "-rotate-90"
  }`;

function Chevron({ className }: { className: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

/** Right chevron; rotate 90° when open to point down (home FAQ). */
function ChevronRight({ className }: { className: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 6l6 6-6 6"
      />
    </svg>
  );
}

export function AccordionItem({
  value,
  title,
  children,
  className,
}: AccordionItemProps) {
  const { openIds, toggle, variant } = useAccordionContext("AccordionItem");
  const open = openIds.has(value);
  const panelId = `accordion-panel-${value}`;
  const headingId = `accordion-heading-${value}`;

  const btnDefault =
    "mx-auto flex w-full max-w-[770px] items-center justify-between gap-3 rounded-lg bg-white p-4 text-left text-sm min-[380px]:text-lg font-medium text-gray-900 shadow-[0_2px_9px_0_rgba(0,0,0,0.10)] transition-colors hover:bg-gray-50 cursor-pointer";
  const chevronDefault = `h-5 w-5 shrink-0 text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`;

  if (variant === "brand") {
    const cardShadow = "rounded-lg shadow-[0_2px_9px_0_rgba(0,0,0,0.10)]";

    if (open) {
      return (
        <div
          className={cn(
            "flex w-full flex-col items-start gap-4 bg-[#FFF9FC] p-4",
            cardShadow,
            className,
          )}
        >
          <h3 className="m-0 w-full">
            <button
              type="button"
              id={headingId}
              className="flex w-full cursor-pointer items-center justify-between gap-3 bg-transparent p-0 text-left font-sf text-sm min-[380px]:text-[20px] font-medium not-italic leading-normal text-[#111] [leading-trim:both] [text-edge:cap] outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[#C32E6D] focus-visible:ring-offset-2"
              aria-expanded
              aria-controls={panelId}
              onClick={() => toggle(value)}
            >
              <span className="pr-2">{title}</span>
              <Chevron className={chevronBrand(true)} />
            </button>
          </h3>
          <div className="h-px w-full shrink-0 bg-gray-200" aria-hidden />
          <div
            id={panelId}
            role="region"
            aria-labelledby={headingId}
            className={accordionPanelBodyClass}
          >
            {children}
          </div>
        </div>
      );
    }

    return (
      <div
        className={cn(
          "w-full bg-white p-4 transition-colors hover:bg-[#FFF9FC]",
          cardShadow,
          className,
        )}
      >
        <h3 className="m-0">
          <button
            type="button"
            id={headingId}
            className="flex w-full cursor-pointer items-center justify-between gap-3 bg-transparent p-0 text-left font-sf text-sm min-[380px]:text-[20px] font-medium not-italic leading-normal text-[#111] [leading-trim:both] [text-edge:cap] outline-none focus-visible:ring-2 focus-visible:ring-[#C32E6D] focus-visible:ring-offset-2"
            aria-expanded={false}
            aria-controls={panelId}
            onClick={() => toggle(value)}
          >
            <span className="pr-2">{title}</span>
            <Chevron className={chevronBrand(false)} />
          </button>
        </h3>
        <div id={panelId} hidden className="hidden">
          {children}
        </div>
      </div>
    );
  }

  if (variant === "pill") {
    const chevronPill = `h-5 w-5 shrink-0 text-[#912026] transition-transform duration-200 ${
      open ? "rotate-90" : ""
    }`;
    const btnPill =
      "mx-auto flex w-full max-w-[770px] cursor-pointer items-center justify-between gap-3 rounded-lg bg-white p-4 text-left font-sf text-sm min-[380px]:text-lg font-medium not-italic leading-snug text-[#111] [leading-trim:both] [text-edge:cap] shadow-[0_2px_9px_0_rgba(0,0,0,0.10)] transition-colors hover:bg-gray-50";

    if (open) {
      return (
        <div
          className={cn(
            "mx-auto w-full max-w-192.5 overflow-hidden rounded-lg border border-[#E8E8E8] bg-[#FFF9FC] shadow-none",
            className,
          )}
        >
          <h3 className="m-0">
            <button
              type="button"
              id={headingId}
              className="flex w-full cursor-pointer items-center justify-between gap-3 bg-transparent px-4 py-4 md:py-5.25 text-left font-sf text-sm min-[380px]:text-lg font-medium not-italic leading-snug text-[#111] [leading-trim:both] [text-edge:cap] outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[#C32E6D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF9FC] md:px-4"
              aria-expanded
              aria-controls={panelId}
              onClick={() => toggle(value)}
            >
              <span className="pr-2">{title}</span>
              <ChevronRight className="h-5 w-5 shrink-0 rotate-90 text-[#C32E6D] transition-transform duration-200" />
            </button>
          </h3>
          <div
            id={panelId}
            role="region"
            aria-labelledby={headingId}
            className="px-4 md:px-4 [&_p]:pb-4"
          >
            <div
              className="h-px mb-5 w-full shrink-0 bg-[#6B7280]"
              aria-hidden
            />
            {children}
          </div>
        </div>
      );
    }

    return (
      <div className={className}>
        <h3 className="m-0">
          <button
            type="button"
            id={headingId}
            className={cn(
              btnPill,
              " bg-white px-4 py-4 md:py-5.25 shadow-sm transition-shadow hover:shadow md:px-4",
            )}
            aria-expanded={false}
            aria-controls={panelId}
            onClick={() => toggle(value)}
          >
            <span className="pr-2">{title}</span>
            <ChevronRight className={chevronPill} />
          </button>
        </h3>
        <div id={panelId} hidden className="hidden">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <h3 className="m-0">
        <button
          type="button"
          id={headingId}
          className={btnDefault}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => toggle(value)}
        >
          <span>{title}</span>
          <Chevron className={chevronDefault} />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        hidden={!open}
        className={
          open
            ? `mx-auto w-full max-w-192.5 border-2 border-black px-4 py-3 ${accordionPanelBodyClass}`
            : "hidden"
        }
      >
        {children}
      </div>
    </div>
  );
}
