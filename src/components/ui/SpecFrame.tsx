import type { ReactNode } from 'react';

import { cn } from '@/lib/helper/utils';

/** Figma-style “component” marker: purple pill + diamond cluster, overlapping top edge. */
function FigmaComponentGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={12}
      height={12}
      viewBox="0 0 12 12"
      fill="currentColor"
      aria-hidden
    >
      <path d="M6 0 7.2 1.8 6 3.6 4.8 1.8z" />
      <path d="M1.8 4.2 3 6 1.8 7.8.6 6z" />
      <path d="M10.2 4.2 11.4 6 10.2 7.8 9 6z" />
      <path d="M6 8.4 7.2 10.2 6 12 4.8 10.2z" />
    </svg>
  );
}

export type SpecFrameProps = {
  /** Figma component name (e.g. logIn, CTA, accordion). */
  name: string;
  children: ReactNode;
  className?: string;
};

export function SpecFrame({ name, children, className }: SpecFrameProps) {
  return (
    <div className={cn('relative pt-4', className)}>
      <div
        className="absolute left-4 top-0 z-10 flex -translate-y-1/2 items-center gap-1.5 rounded-md bg-[#7C3AED] px-2.5 py-1 text-xs font-medium tracking-tight text-white shadow-sm"
        aria-label={`Component: ${name}`}
      >
        <FigmaComponentGlyph className="shrink-0 opacity-95" />
        <span className="leading-none">{name}</span>
      </div>
      <div className="rounded-lg border border-dashed border-[#D8B4FE] bg-white px-5 pb-5 pt-7 shadow-sm md:px-6 md:pb-6 md:pt-8">
        {children}
      </div>
    </div>
  );
}
