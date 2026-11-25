import type { CSSProperties } from 'react';

import { cn } from '@/lib/helper/utils';

/** Neumorphic inset “balls” (static visual only). */
const dotSurface: CSSProperties = {
  borderRadius: '50%',
  background: '#ffffff',
  boxShadow:
    'inset 13px 13px 19px #f2f2f2, inset -13px -13px 19px #ffffff',
};

export type PaginationProps = {
  className?: string;
  /** Ignored — layout is fixed at four dots. */
  totalPages?: number;
  /** Ignored — no interaction. */
  initialPage?: number;
};

/**
 * Static 2×2 grid of four neumorphic dots inside a dashed frame (prototype only — no behavior).
 */
export function Pagination({ className }: PaginationProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-[320px] rounded-xl border-2 border-dashed border-[#D8B4FE] p-8',
        className,
      )}
      aria-hidden
    >
      <div className="mx-auto grid w-max grid-cols-2 gap-x-10 gap-y-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-16 w-16 shrink-0"
            style={dotSurface}
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
}
