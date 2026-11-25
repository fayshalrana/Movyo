"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef } from "react";

import { CarouselNextIcon, CarouselPrevIcon } from "@/components/icons";
import { CTAButton } from "@/components/ui";

import community1 from "@/assets/community-carousel-1.webp";
import community2 from "@/assets/community-carousel-2.webp";
import community3 from "@/assets/community-carousel-3.webp";
import community4 from "@/assets/community-carousel-4.webp";

const COMMUNITY_SLIDES: StaticImageData[] = [
  community1,
  community2,
  community3,
  community4,
];

/** Two identical sequences so scroll position can wrap for an infinite loop. */
const LOOP_SLIDES: StaticImageData[] = [
  ...COMMUNITY_SLIDES,
  ...COMMUNITY_SLIDES,
];

const ALT_TEXT = [
  "Three women walking together outdoors after a workout",
  "Two women sharing a moment in athletic wear",
  "Two friends by the water on a sunny day",
  "Three women in athletic wear against a red wall",
];

const navBtnClass =
  "absolute top-1/2 z-20 flex h-12.5 w-12.5 shrink-0 -translate-y-1/2 items-center justify-center rounded-[30px] border border-white/50 bg-black/25 p-0 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22)] backdrop-blur-md backdrop-saturate-150 transition-[opacity,background-color] hover:bg-black/35 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:pointer-events-none disabled:opacity-30 md:h-[70px] md:w-[70px] md:rounded-[38px]";

export type CurvedCommunityCarouselProps = {
  className?: string;
  /** Only the curved strip and arrows — no headline, subcopy, or CTA. */
  sliderOnly?: boolean;
};

function getSlideMetrics(viewport: HTMLDivElement) {
  const slides = viewport.querySelectorAll(".curved-carousel-slide");
  if (slides.length < COMMUNITY_SLIDES.length + 1) return null;
  const first = slides[0] as HTMLElement;
  const afterSet = slides[COMMUNITY_SLIDES.length] as HTMLElement;
  const setWidth = afterSet.offsetLeft - first.offsetLeft;
  const step = (slides[1] as HTMLElement).offsetLeft - first.offsetLeft;
  return { setWidth, step };
}

function getSlideIndex(scrollLeft: number, step: number) {
  return Math.round(scrollLeft / step);
}

export function CurvedCommunityCarousel({
  className = "",
  sliderOnly = false,
}: CurvedCommunityCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const jumpRef = useRef(false);
  const animatingRef = useRef(false);

  const normalizeScroll = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport || jumpRef.current || animatingRef.current) return;
    const m = getSlideMetrics(viewport);
    if (!m) return;
    const { setWidth } = m;
    if (viewport.scrollLeft >= setWidth - 1) {
      jumpRef.current = true;
      viewport.scrollLeft -= setWidth;
      requestAnimationFrame(() => {
        jumpRef.current = false;
      });
    }
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const onScroll = () => normalizeScroll();
    viewport.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      viewport.removeEventListener("scroll", onScroll);
    };
  }, [normalizeScroll]);

  const scrollByDir = useCallback((dir: -1 | 1) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const m = getSlideMetrics(viewport);
    if (!m) return;
    const { setWidth, step } = m;
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;

    let index = getSlideIndex(viewport.scrollLeft, step);
    let targetIndex = index + dir;

    if (dir === 1 && targetIndex * step > maxScroll + 1) {
      jumpRef.current = true;
      viewport.scrollLeft -= setWidth;
      index = getSlideIndex(viewport.scrollLeft, step);
      targetIndex = index + 1;
      requestAnimationFrame(() => {
        jumpRef.current = false;
      });
    } else if (dir === -1 && targetIndex * step < 0) {
      jumpRef.current = true;
      viewport.scrollLeft += setWidth;
      index = getSlideIndex(viewport.scrollLeft, step);
      targetIndex = index - 1;
      setTimeout(() => {
        jumpRef.current = false;
      }, 500);
    }

    animatingRef.current = true;
    viewport.scrollTo({ left: targetIndex * step, behavior: "smooth" });
    setTimeout(() => {
      animatingRef.current = false;
    }, 500);
  }, []);

  return (
    <section
      id={sliderOnly ? undefined : "community"}
      className={
        sliderOnly
          ? `overflow-x-hidden bg-white py-4 ${className}`
          : `scroll-mt-20 overflow-x-hidden bg-white py-12.5 text-gray-200 ${className}`
      }
      aria-label={sliderOnly ? "Curved image carousel" : undefined}
      aria-labelledby={sliderOnly ? undefined : "movyo-community-heading"}
    >
      {!sliderOnly && (
        <div className="mx-auto w-full max-w-section-narrow text-center sm:px-6 md:max-w-4xl">
          <h2
            id="movyo-community-heading"
            className="font-sf font-medium not-italic leading-[115%] tracking-[-0.2px] text-[#111] text-[35px] md:text-[40px]"
          >
            Learn more about the{" "}
            <span className="font-instrument font-normal italic text-[#111]">
              Movyo
            </span>{" "}
            Community
          </h2>
          <p className="mx-auto mt-2 max-w-section-narrow text-center font-sf font-[300] not-italic leading-[140%] text-[#6B7280] text-lg md:mx-0 md:max-w-full md:text-2xl md:tracking-[-.2px]">
            See how others are transforming, and be part of something bigger.
          </p>
        </div>
      )}

      <div
        className={
          sliderOnly
            ? "max-w-full overflow-x-hidden px-4 [--carousel-curve-color:#fff] md:px-0"
            : "mt-8 max-w-full overflow-x-hidden px-4 [--carousel-curve-color:#fff] md:mt-12.5 md:px-0"
        }
      >
        <div className="curved-carousel-section curved-carousel-section--v1 max-w-full px-0 sm:px-4 md:px-0">
          <div
            ref={viewportRef}
            className="curved-carousel-viewport touch-pan-x"
            tabIndex={0}
            role="region"
            aria-label="Community photo gallery"
          >
            <div className="curved-carousel-track">
              {LOOP_SLIDES.map((src, index) => {
                const altIndex = index % COMMUNITY_SLIDES.length;
                return (
                  <div key={index} className="curved-carousel-slide">
                    <Image
                      src={src}
                      alt={ALT_TEXT[altIndex]}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 767px) 90vw, (max-width: 1024px) 40vw, 300px"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            className={`${navBtnClass} curved-carousel-nav-prev md:left-6 lg:left-10 cursor-pointer`}
            aria-label="Previous images"
            onClick={() => scrollByDir(-1)}
          >
            <CarouselPrevIcon className="h-5 w-6 shrink-0 text-white md:h-6 md:w-8" />
          </button>
          <button
            type="button"
            className={`${navBtnClass} curved-carousel-nav-next md:right-6 lg:right-10 cursor-pointer`}
            aria-label="Next images"
            onClick={() => scrollByDir(1)}
          >
            <CarouselNextIcon className="size-8 shrink-0 text-white md:size-9.75" />
          </button>
        </div>
      </div>

      {!sliderOnly && (
        <div className="mx-auto mt-6.25 flex w-full max-w-section-narrow flex-col items-center justify-center px-4 md:mt-12.5 md:max-w-none">
          <p
            className="pb-6.25 text-center font-sf text-base font-medium not-italic leading-[115%] tracking-[-0.5%] text-[#111] min-[440px]:text-xl md:pb-12.5 md:text-[26px] md:tracking-[-0.02px]"
            aria-hidden
          >
            Learn more about the{" "}
            <span className="font-instrument font-normal italic text-[#111]">
              Movyo
            </span>{" "}
            Community
          </p>
          <CTAButton
            href="#community"
            showIcon
            className="h-12.5 min-h-12.5 text-[18px]"
          >
            Learn More
          </CTAButton>
        </div>
      )}
    </section>
  );
}
