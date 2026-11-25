'use client';

import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';

const scrollerStyles =
  'text-scroller-track flex w-max items-center whitespace-nowrap py-3 text-base font-medium text-[#292929]';

type WhyMovyoTextScrollerProps = {
  /** Phrases joined with a dot separator; duplicated for seamless loop. */
  phrases?: string[];
  /** Seconds for one full loop. */
  durationSec?: number;
  className?: string;
};

const defaultPhrases = [
  'Why Movyo',
  'Licensed U.S. providers',
  'Prescribed 100% online',
  'Ongoing support included',
  'Care that fits your life',
];

export function WhyMovyoTextScroller({
  phrases = defaultPhrases,
  durationSec = 45,
  className = '',
}: WhyMovyoTextScrollerProps) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const line = phrases.join('  ·  ');

  if (reduceMotion) {
    return (
      <div
        className={`border-y border-gray-200 bg-[#FAFAFA] px-4 py-3 text-center text-base font-medium text-[#292929] ${className}`}
      >
        {line}
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden border-y border-gray-200 bg-[#FAFAFA] ${className}`}
      role="presentation"
    >
      <div
        className={scrollerStyles}
        style={
          {
            '--marquee-duration': `${durationSec}s`,
          } as CSSProperties
        }
      >
        {[0, 1].map((dup) => (
          <span
            key={dup}
            className="inline-block shrink-0 pr-12 md:pr-16"
            aria-hidden={dup === 1}
          >
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}
