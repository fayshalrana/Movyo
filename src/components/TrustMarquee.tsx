import type { CSSProperties, ReactNode } from 'react';

import {
  DeliveryTruckIcon,
  ScissorsIcon,
  DocumentBadgeIcon,
  HeadsetSupportIcon,
} from '@/components/icons';

export type TrustMarqueeItem = {
  id: string;
  label: string;
  icon: ReactNode;
};

const defaultItems: TrustMarqueeItem[] = [
  {
    id: 'shipping',
    label: 'Free Shipping',
    icon: <DeliveryTruckIcon className="h-[15px] w-5 shrink-0" />,
  },
  {
    id: 'prescribed',
    label: 'Prescribed 100% Online',
    icon: <ScissorsIcon className="h-5 w-5 shrink-0" />,
  },
  {
    id: 'licensed',
    label: 'Licensed U.S. Providers',
    icon: <DocumentBadgeIcon className="h-5 w-5 shrink-0" />,
  },
  {
    id: 'support',
    label: 'Ongoing Support Included',
    icon: <HeadsetSupportIcon className="h-5 w-5 shrink-0" />,
  },
];

function pickItems(all: TrustMarqueeItem[], order: string[]) {
  const map = new Map(all.map((item) => [item.id, item]));
  return order.map((id) => map.get(id)).filter((item): item is TrustMarqueeItem => item != null);
}

function MarqueeRow({
  items,
  durationSec,
  itemGapClass,
}: {
  items: TrustMarqueeItem[];
  durationSec: number;
  itemGapClass: string;
}) {
  return (
    <div className="overflow-hidden py-2.5">
      <div
        className="trust-marquee-track flex w-max"
        style={
          {
            '--marquee-duration': `${durationSec}s`,
          } as CSSProperties
        }
      >
        {[0, 1].map((dup) => (
          <div
            key={dup}
            className={`flex items-center ${itemGapClass} pr-8 md:pr-12`}
            aria-hidden={dup === 1}
          >
            {items.map((item) => (
              <div
                key={`${dup}-${item.id}`}
                className="flex shrink-0 items-center gap-2 text-[#292929]"
              >
                <span className="inline-flex shrink-0 items-center justify-center" aria-hidden>
                  {item.icon}
                </span>
                <span className="whitespace-nowrap text-base font-medium leading-none tracking-tight">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export type TrustMarqueeProps = {
  items?: TrustMarqueeItem[];
  /** Item ids for the top row (default: shipping → prescribed → licensed → support). */
  row1Order?: string[];
  /** Item ids for the bottom row (default: licensed → support → shipping → prescribed). */
  row2Order?: string[];
  /** Seconds for one full loop of the top row. */
  durationRow1Sec?: number;
  /** Seconds for one full loop of the bottom row. */
  durationRow2Sec?: number;
  className?: string;
  /** Gap between value-prop clusters (Tailwind gap class segment, e.g. `gap-10`). */
  itemGapClass?: string;
};

export function TrustMarquee({
  items = defaultItems,
  row1Order = ['shipping', 'prescribed', 'licensed', 'support'],
  row2Order = ['licensed', 'support', 'shipping', 'prescribed'],
  durationRow1Sec = 38,
  durationRow2Sec = 44,
  className = '',
  itemGapClass = 'gap-8 md:gap-12',
}: TrustMarqueeProps) {
  const row1 = pickItems(items, row1Order);
  const row2 = pickItems(items, row2Order);

  return (
    <div
      className={`rounded-lg border border-dashed border-purple-300 bg-white px-2 py-1 md:px-4 ${className}`}
      role="region"
      aria-label="Service benefits"
    >
      <MarqueeRow items={row1} durationSec={durationRow1Sec} itemGapClass={itemGapClass} />
      <div className="border-t border-dashed border-purple-200" />
      <MarqueeRow items={row2} durationSec={durationRow2Sec} itemGapClass={itemGapClass} />
    </div>
  );
}
