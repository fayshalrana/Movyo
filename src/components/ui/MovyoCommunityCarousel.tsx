'use client';

import { useCallback, useEffect, useState } from 'react';

export type CommunitySlide = {
  id: string;
  quote: string;
  name: string;
  role: string;
};

const defaultSlides: CommunitySlide[] = [
  {
    id: '1',
    quote:
      'The process was straightforward and I felt supported the whole way. Highly recommend Movyo.',
    name: 'Alex M.',
    role: 'Member since 2024',
  },
  {
    id: '2',
    quote:
      'I finally have a care plan I can stick to. The team responds quickly when I have questions.',
    name: 'Jordan K.',
    role: 'Member since 2023',
  },
  {
    id: '3',
    quote:
      'Professional, discreet, and convenient. Exactly what I needed for my busy schedule.',
    name: 'Sam R.',
    role: 'Member since 2025',
  },
  {
    id: '4',
    quote:
      'Clear communication and real follow-up—not just a one-off appointment.',
    name: 'Taylor P.',
    role: 'Member since 2024',
  },
];

type MovyoCommunityCarouselProps = {
  slides?: CommunitySlide[];
  autoPlayMs?: number;
  className?: string;
};

export function MovyoCommunityCarousel({
  slides = defaultSlides,
  autoPlayMs = 6000,
  className = '',
}: MovyoCommunityCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const n = slides.length;
  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + n) % n);
    },
    [n],
  );

  useEffect(() => {
    if (reduceMotion || paused || n <= 1) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % n);
    }, autoPlayMs);
    return () => window.clearInterval(t);
  }, [autoPlayMs, n, paused, reduceMotion]);

  const current = slides[index];

  return (
    <div
      className={`relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8 ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Movyo community stories"
    >
      <div className="min-h-[140px] md:min-h-[120px]">
        <blockquote className="text-lg leading-relaxed text-gray-800 md:text-xl">
          “{current.quote}”
        </blockquote>
        <footer className="mt-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">{current.name}</span>
          <span className="text-gray-400"> · </span>
          <span>{current.role}</span>
        </footer>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex gap-1.5" role="tablist" aria-label="Slide">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === index ? 'w-8 bg-[#C32E6D]' : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C32E6D] focus-visible:ring-offset-2"
            aria-label="Previous slide"
            onClick={() => go(-1)}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C32E6D] focus-visible:ring-offset-2"
            aria-label="Next slide"
            onClick={() => go(1)}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
