"use client";

import type { StaticImageData } from "next/image";
import React from "react";

import afterBtn from "@/assets/after-btn.webp";
import afterPhoto from "@/assets/after-compare.webp";
import beforeBtn from "@/assets/before-btn.webp";
import beforePhoto from "@/assets/before-compare.webp";
import { HomeStaticImage } from "@/components/layout/home/HomeStaticImage";
import { cn } from "@/components/ui";

type BeforeAfterCompareProps = {
  beforeSrc?: StaticImageData;
  afterSrc?: StaticImageData;
  className?: string;
};

export function BeforeAfterCompare({
  beforeSrc = beforePhoto,
  afterSrc = afterPhoto,
  className,
}: BeforeAfterCompareProps) {
  const [position, setPosition] = React.useState(50);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const afterClipRef = React.useRef<HTMLDivElement>(null);
  const dividerRef = React.useRef<HTMLDivElement>(null);
  const handleRef = React.useRef<HTMLDivElement>(null);
  const draggingRef = React.useRef(false);
  const activePointerIdRef = React.useRef<number | null>(null);
  const positionRef = React.useRef(50);
  const rafRef = React.useRef<number | null>(null);

  const applyPosition = React.useCallback((pct: number) => {
    positionRef.current = pct;
    if (afterClipRef.current) {
      afterClipRef.current.style.clipPath = `inset(0 0 0 ${pct}%)`;
    }
    if (dividerRef.current) {
      dividerRef.current.style.left = `${pct}%`;
    }
    if (handleRef.current) {
      handleRef.current.style.left = `${pct}%`;
    }
  }, []);

  const updateFromClientX = React.useCallback(
    (clientX: number) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0) return;
      const next = Math.min(
        100,
        Math.max(0, ((clientX - rect.left) / rect.width) * 100),
      );

      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        applyPosition(next);
      });
    },
    [applyPosition],
  );

  const endDrag = React.useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    activePointerIdRef.current = null;
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setPosition(positionRef.current);
  }, []);

  React.useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (!draggingRef.current) return;
      if (
        activePointerIdRef.current != null &&
        event.pointerId !== activePointerIdRef.current
      ) {
        return;
      }
      event.preventDefault();
      updateFromClientX(event.clientX);
    };

    const onUp = (event: PointerEvent) => {
      if (
        activePointerIdRef.current != null &&
        event.pointerId !== activePointerIdRef.current
      ) {
        return;
      }
      endDrag();
    };

    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [endDrag, updateFromClientX]);

  const startDrag = (event: React.PointerEvent<HTMLElement>) => {
    if (event.button !== 0 && event.pointerType === "mouse") return;

    event.preventDefault();
    draggingRef.current = true;
    activePointerIdRef.current = event.pointerId;

    const target = containerRef.current;
    target?.setPointerCapture?.(event.pointerId);
    updateFromClientX(event.clientX);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-4/5 w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-2xl bg-[#0B1840] max-h-99 lg:max-h-160.75 shadow-[0_4px_20px_0_rgba(0,0,0,0.10)]",
        className,
      )}
      onPointerDown={startDrag}
    >
      <HomeStaticImage
        src={beforeSrc}
        alt="Before weight loss transformation"
        fill
        className="pointer-events-none object-cover object-center"
      />

      <div
        ref={afterClipRef}
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      >
        <HomeStaticImage
          src={afterSrc}
          alt="After weight loss transformation"
          fill
          className="object-cover object-center"
        />
      </div>

      <HomeStaticImage
        src={beforeBtn}
        alt="Before"
        className="pointer-events-none absolute left-3.75 md:left-6.25 top-4 z-20 h-10 md:h-auto w-22.5 object-contain"
      />
      <HomeStaticImage
        src={afterBtn}
        alt="After"
        className="pointer-events-none absolute right-3.75 md:right-5.75 top-4 z-20 h-10 md:h-auto w-22.5 object-contain"
      />

      <div
        ref={dividerRef}
        className="pointer-events-none absolute inset-y-0 z-10 w-1.25 -translate-x-1/2 bg-white"
        style={{ left: `${position}%` }}
        aria-hidden
      />

      <div
        ref={handleRef}
        className="pointer-events-none absolute top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center"
        style={{ left: `${position}%`, gap: 25 }}
      >
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center"
          aria-hidden
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
          >
            <path
              d="M20 0C31.0457 0 40 8.9543 40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0ZM25.4141 9.25293C24.633 8.47207 23.3669 8.47202 22.5859 9.25293L13.2529 18.5859C12.4719 19.3669 12.472 20.633 13.2529 21.4141L22.5859 30.748C23.3669 31.5288 24.6331 31.5287 25.4141 30.748C26.195 29.9671 26.1949 28.701 25.4141 27.9199L17.4941 20L25.4141 12.0811C26.195 11.3001 26.1949 10.034 25.4141 9.25293Z"
              fill="white"
            />
          </svg>
        </span>
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center"
          aria-hidden
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
          >
            <path
              d="M20 0C8.95431 0 0 8.9543 0 20C0 31.0457 8.95431 40 20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0ZM14.5859 9.25293C15.367 8.47207 16.6331 8.47202 17.4141 9.25293L26.7471 18.5859C27.5281 19.3669 27.528 20.633 26.7471 21.4141L17.4141 30.748C16.6331 31.5288 15.3669 31.5287 14.5859 30.748C13.805 29.9671 13.8051 28.701 14.5859 27.9199L22.5059 20L14.5859 12.0811C13.805 11.3001 13.8051 10.034 14.5859 9.25293Z"
              fill="white"
            />
          </svg>
        </span>
      </div>

      <span className="sr-only">Drag to compare before and after</span>
    </div>
  );
}
