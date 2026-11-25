"use client";

import React from "react";

import rangeThumb from "@/assets/range-thumb.webp";
import { DEFERRED_PLACEHOLDER_SRC } from "@/lib/deferred-image";

const MIN_WEIGHT = 150;
const MAX_WEIGHT = 350;
const DEFAULT_WEIGHT = 250;
/** Design default: 250 lbs sits at this % of the track. */
const DEFAULT_FILL_PERCENT_MOBILE = 58;
const DEFAULT_FILL_PERCENT_DESKTOP = 38;
const DESKTOP_MQ = "(min-width: 768px)";

function projectedLossLbs(weight: number) {
  return Math.round(weight * 0.4);
}

/** Piecewise map so 150→0%, 250→anchor%, 350→100%. */
function weightToPercent(weight: number, anchorPercent: number) {
  if (weight <= DEFAULT_WEIGHT) {
    return (
      ((weight - MIN_WEIGHT) / (DEFAULT_WEIGHT - MIN_WEIGHT)) * anchorPercent
    );
  }
  return (
    anchorPercent +
    ((weight - DEFAULT_WEIGHT) / (MAX_WEIGHT - DEFAULT_WEIGHT)) *
      (100 - anchorPercent)
  );
}

function percentToWeight(percent: number, anchorPercent: number) {
  const p = Math.min(100, Math.max(0, percent));
  if (p <= anchorPercent) {
    return Math.round(
      MIN_WEIGHT +
        (p / anchorPercent) * (DEFAULT_WEIGHT - MIN_WEIGHT),
    );
  }
  return Math.round(
    DEFAULT_WEIGHT +
      ((p - anchorPercent) / (100 - anchorPercent)) *
        (MAX_WEIGHT - DEFAULT_WEIGHT),
  );
}

function useDefaultFillPercent() {
  const [anchorPercent, setAnchorPercent] = React.useState(
    DEFAULT_FILL_PERCENT_MOBILE,
  );

  React.useEffect(() => {
    const media = window.matchMedia(DESKTOP_MQ);
    const sync = () => {
      setAnchorPercent(
        media.matches
          ? DEFAULT_FILL_PERCENT_DESKTOP
          : DEFAULT_FILL_PERCENT_MOBILE,
      );
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return anchorPercent;
}

export function WeightCalculatorCard() {
  const [weight, setWeight] = React.useState(DEFAULT_WEIGHT);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const draggingRef = React.useRef(false);
  const anchorPercent = useDefaultFillPercent();
  const projectedLoss = projectedLossLbs(weight);
  const fillPercent = weightToPercent(weight, anchorPercent);

  const updateFromClientX = React.useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      if (rect.width <= 0) return;
      const percent = ((clientX - rect.left) / rect.width) * 100;
      setWeight(percentToWeight(percent, anchorPercent));
    },
    [anchorPercent],
  );

  React.useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (!draggingRef.current) return;
      event.preventDefault();
      updateFromClientX(event.clientX);
    };
    const onUp = () => {
      draggingRef.current = false;
    };

    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [updateFromClientX]);

  return (
    <article className="flex h-full flex-col items-center justify-center gap-7.5 lg:gap-12 rounded-2xl bg-white shadow-[0_4px_20px_0_rgba(0,0,0,0.10)] px-10 py-5">
      <h3 className="font-sf font-medium leading-[120%] lg:leading-[150%] tracking-[0.64px] text-[#232424] text-xl min-[440px]:text-[32px] md:text-xl lg:text-[32px]">
        Let&apos;s see how much you could realistically lose by this fall.
      </h3>

      <div className="w-full" aria-hidden>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1"
          viewBox="0 0 498 1"
          fill="none"
          className="w-full"
        >
          <path d="M0 0.5H498" stroke="#E0E0E0" />
        </svg>
      </div>

      <div className="flex max-h-20.5 w-86.75 md:w-full max-w-86.75 items-center justify-between rounded-full border border-[#E0E0E0] bg-white px-7.5 py-3">
        <p className="max-w-29.5 font-sf text-sm font-medium leading-[150%] text-[#232424] lg:text-base">
          Your current weight:
        </p>
        <p className="font-sf text-3xl md:text-2xl font-bold leading-[160%] text-[#232424] lg:text-[36px]">
          {weight}
          <span className="text-lg font-normal md:text-2xl"> lbs</span>
        </p>
      </div>

      <div
        ref={trackRef}
        className="relative w-full cursor-grab touch-none select-none py-2 active:cursor-grabbing"
        onPointerDown={(event) => {
          if (event.button !== 0 && event.pointerType === "mouse") return;
          event.preventDefault();
          draggingRef.current = true;
          trackRef.current?.setPointerCapture?.(event.pointerId);
          updateFromClientX(event.clientX);
        }}
      >
        <div
          className="pointer-events-none absolute left-0 right-0 top-1/2 h-3.5 -translate-y-1/2 overflow-hidden rounded-full border border-[#E0E0E0] bg-white"
          aria-hidden
        >
          <div
            className="h-full rounded-full bg-[#0F1F5C]"
            style={{ width: `${fillPercent}%` }}
          />
        </div>

        <img
          src={DEFERRED_PLACEHOLDER_SRC}
          data-movyo-src={rangeThumb.src}
          alt=""
          aria-hidden
          className="pointer-events-none absolute top-1/2 z-10 h-9.75 w-9.75 -translate-x-1/2 -translate-y-1/2 object-contain bg-white rounded-full"
          style={{ left: `${fillPercent}%` }}
          draggable={false}
          suppressHydrationWarning
        />

        <input
          type="range"
          min={MIN_WEIGHT}
          max={MAX_WEIGHT}
          step={1}
          value={weight}
          onChange={(event) => setWeight(Number(event.target.value))}
          aria-label="Your current weight in pounds"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
          tabIndex={0}
        />
      </div>

      <div
        className="flex max-h-20.5 w-86.75 md:w-full max-w-86.75 items-center justify-between rounded-full border border-[#E0E0E0] px-7.5 py-3"
        style={{
          background:
            "linear-gradient(135deg, rgba(254, 238, 147, 0.75) -13.89%, rgba(251, 205, 234, 0.75) 58.99%, rgba(223, 182, 255, 0.75) 100%), #FFF",
        }}
      >
        <p className="max-w-24.5 lg:max-w-29.5 font-sf text-sm font-medium leading-[150%] text-[#232424] lg:text-base">
          You could lose up to:
        </p>
        <p className="font-sf text-3xl md:text-2xl font-bold leading-[160%] text-[#232424] lg:text-[36px]">
          {projectedLoss}
          <span className="text-lg font-normal md:text-2xl"> lbs</span>
        </p>
      </div>
    </article>
  );
}
