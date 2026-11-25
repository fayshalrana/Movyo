import Image from 'next/image';
import { AppLink } from '@/components/ui/AppLink';
import { cn } from '@/lib/helper/utils';
import type React from 'react';

import ctaChevronPng from '@/assets/\u2192 (1).png';

type ColorScheme = 'pink' | 'blue';

const motionStyles = 'btn-bounce';

const colorSchemes: Record<
  ColorScheme,
  { solid: string; ghost: string }
> = {
  pink: {
    solid:
      'group inline-flex min-h-9 min-w-[118px] items-center justify-center gap-2 rounded-full border-2 border-transparent bg-[#C32E6D] px-5 py-2.5 font-sans text-base font-medium leading-none tracking-[-0.01em] text-white hover:bg-white hover:text-[#C32E6D] hover:border-[#C32E6D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C32E6D] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    ghost:
      'group inline-flex min-h-9 min-w-[118px] items-center justify-center gap-2 rounded-full border-2 border-[#C32E6D] bg-white px-5 py-2.5 font-sans text-base font-medium leading-none tracking-[-0.01em] text-[#C32E6D] hover:bg-[#C32E6D] hover:text-white hover:border-[#C32E6D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C32E6D] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  },
  blue: {
    solid:
      'group inline-flex min-h-9 min-w-[118px] items-center justify-center gap-2 rounded-full border-2 border-transparent bg-[#2253C7] px-5 py-2.5 font-sans text-base font-medium leading-none tracking-[-0.01em] text-white hover:bg-white hover:text-[#2253C7] hover:border-[#2253C7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2253C7] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    ghost:
      'group inline-flex min-h-9 min-w-[118px] items-center justify-center gap-2 rounded-full border-2 border-[#2253C7] bg-white px-5 py-2.5 font-sans text-base font-medium leading-none tracking-[-0.01em] text-[#2253C7] hover:bg-[#2253C7] hover:text-white hover:border-[#2253C7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2253C7] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  },
};

/** Soft overshoot on scale — reads as a gentle bounce without keyframe loops. */

/** Right arrow — path from `src/assets/arrow-right.svg` (fill uses `currentColor`). */
function ArrowIcon({ color }: { color?: string }) {
  return (
    <svg
      viewBox="0 0 39 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
      style={color ? { color } : undefined}
      aria-hidden
    >
      <path
        d="M34.6734 20.536C35.2462 19.9632 35.2462 19.0369 34.6734 18.4702L24.4359 8.22661C23.8631 7.65379 22.9369 7.65379 22.3702 8.22661C21.8034 8.79942 21.7973 9.72567 22.3702 10.2924L30.1092 18.0315H5.36249C4.55203 18.0315 3.89999 18.6835 3.89999 19.4939C3.89999 20.3044 4.55203 20.9565 5.36249 20.9565H30.1092L22.3702 28.6955C21.7973 29.2683 21.7973 30.1946 22.3702 30.7613C22.943 31.328 23.8692 31.3341 24.4359 30.7613L34.6734 20.536Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Trailing icon for `showChevron` — `src/assets/→ (1).png` */
function ChevronDownIcon() {
  return (
    <Image
      src={ctaChevronPng}
      alt=""
      width={16}
      height={16}
      className="h-4 w-4 shrink-0 object-contain transition-transform duration-300 group-hover:translate-x-1"
      aria-hidden
    />
  );
}

type Shared = {
  variant?: 'solid' | 'ghost';
  colorScheme?: ColorScheme;
  showIcon?: boolean;
  showChevron?: boolean;
  /** Sets the arrow icon color (CSS color). Defaults to the button text color (`currentColor`). */
  iconColor?: string;
  className?: string;
  children?: React.ReactNode;
};

type CTAButtonAsLink = Omit<
  React.ComponentPropsWithoutRef<typeof AppLink>,
  'className' | 'children'
> &
  Shared;

type CTAButtonAsButton = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'className' | 'children'
> &
  Shared & {
    href?: never;
  };

export type CTAButtonProps = CTAButtonAsLink | CTAButtonAsButton;

export function CTAButton(props: CTAButtonProps) {
  const {
    variant = 'solid',
    colorScheme = 'pink',
    showIcon = false,
    showChevron = false,
    iconColor,
    className,
    children,
    ...rest
  } = props;
  const scheme = colorSchemes[colorScheme];
  const base = cn(
    variant === 'ghost' ? scheme.ghost : scheme.solid,
    motionStyles,
  );
  const merged = cn(base, className);

  const trailing =
    showChevron ? (
      <ChevronDownIcon />
    ) : showIcon ? (
      <ArrowIcon color={iconColor} />
    ) : null;

  const content = (
    <>
      {children}
      {trailing}
    </>
  );

  if ('href' in rest && rest.href !== undefined) {
    return (
      <AppLink {...(rest as CTAButtonAsLink)} className={merged}>
        {content}
      </AppLink>
    );
  }

  const buttonProps = rest as Omit<
    CTAButtonAsButton,
    'variant' | 'colorScheme' | 'showIcon' | 'showChevron' | 'iconColor' | 'className' | 'children'
  >;
  const { type = 'button', ...btn } = buttonProps;
  return (
    <button type={type} {...btn} className={merged}>
      {content}
    </button>
  );
}
