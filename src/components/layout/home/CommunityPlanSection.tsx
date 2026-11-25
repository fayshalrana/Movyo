"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "2,400+", label: "Active members" },
  { value: "12", label: "Events / Month" },
  { value: "Free", label: "With Every Plan" },
  { value: "40+", label: "Clinical Resources" },
] as const;

const COUNT_DURATION_MS = 3000;

function parseStatValue(value: string) {
  const match = value.match(/^([\d,]+)(.*)$/);
  if (!match) {
    return { isNumeric: false as const };
  }

  return {
    isNumeric: true as const,
    target: Number.parseInt(match[1].replace(/,/g, ""), 10),
    suffix: match[2] ?? "",
  };
}

function formatCount(n: number, suffix: string) {
  return `${n.toLocaleString("en-US")}${suffix}`;
}

function AnimatedStatValue({
  value,
  active,
}: {
  value: string;
  active: boolean;
}) {
  const parsed = parseStatValue(value);
  const [display, setDisplay] = useState(() =>
    parsed.isNumeric ? formatCount(0, parsed.suffix) : value,
  );

  useEffect(() => {
    if (!active) return;

    const next = parseStatValue(value);
    if (!next.isNumeric) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setDisplay(formatCount(next.target, next.suffix));
      return;
    }

    let rafId = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / COUNT_DURATION_MS);
      setDisplay(formatCount(Math.round(next.target * progress), next.suffix));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [active, value]);

  return (
    <dt className="font-satoshi text-[32px] font-bold text-[#A85D78] lg:text-[50px]">
      {display}
    </dt>
  );
}

export function CommunityPlanSection() {
  const statsRef = useRef<HTMLDListElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="community"
      className="scroll-mt-20 bg-[#f7f7f7] md:px-6 lg:px-2 xl:px-0"
      aria-labelledby="community-plan-heading"
    >
      <div className="mx-auto w-full max-w-full overflow-hidden rounded-tl-[30px] lg:rounded-tl-[60px] rounded-tr-[30px] lg:rounded-tr-[60px] bg-[#F5F7FF] px-4 lg:px-0 pt-12.5 shadow-[0_0_50px_-1px_rgba(0,0,0,0.15)]">
        <p className="text-center font-sf text-base font-medium uppercase leading-[160%] md:tracking-[0.48px] tracking-[0.32px] text-[#8F8F8F] sm:text-2xl">
          Included With Every Plan
        </p>

        <div className="relative mx-auto mt-3 lg:mt-4 max-w-199">
          <h2
            id="community-plan-heading"
            className="text-center font-satoshi text-[25px] min-[440px]:text-[32px] tracking-[0.32px] lg:tracking-[0%] font-bold leading-[130%] text-[#0F1F5C] sm:text-[34px] lg:text-[60px]"
          >
            You are not doing this alone.
            <span className="block">You never will.</span>
          </h2>
        </div>

        <p className="mx-auto mt-3 lg:mt-4 max-w-282.75 text-center font-sf text-sm min-[440px]:text-base font-normal lg:font-medium leading-[130%] lg:leading-[150%] text-[#232424] lg:text-2xl tracking-[0.32px] lg:tracking-[0.48px]">
          Every Movyo member gets instant access to a private community of women
          on the same journey — <br className="lg:hidden block" /> weekly live
          events, monthly challenges, expert Q&amp;As, and a group that actually
          gets it. No extra cost. Ever.
        </p>

        <div
          className="mx-auto lg:mt-4 mt-3 h-1 w-25 rounded-full bg-[#F7B422]"
          aria-hidden
        />

        <div className="py-7.5 lg:py-25 max-w-316.5 mx-auto">
          <dl
            ref={statsRef}
            className="flex justify-between items-center flex-col sm:flex-row"
          >
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="max-w-max px-4 lg:px-7.5 py-3 text-center lg:text-left"
              >
                <AnimatedStatValue value={value} active={active} />
                <dd className="mt-2 font-satoshi text-base font-normal leading-[150%] text-[#232424] lg:text-2xl">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
