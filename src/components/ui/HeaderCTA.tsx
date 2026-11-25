import { AppLink } from '@/components/ui/AppLink';
import { cn } from '@/lib/helper/utils';
import type React from 'react';

import headerCtaArrow from '@/assets/\u2192.png';

const arrowMaskUrl =
  typeof headerCtaArrow === 'object' && 'src' in headerCtaArrow
    ? headerCtaArrow.src
    : String(headerCtaArrow);

/** Neumorphic pill — soft inset shadow on white. */
const headerCtaSurface: React.CSSProperties = {
  borderRadius: 38,
  background: '#ffffff',
  boxShadow:
    'inset 13px 13px 19px #fcfcfc, inset -13px -13px 19px #ffffff',
};

const headerCtaBase =
  'inline-flex max-w-[187px] w-full items-center justify-center gap-1 px-[30px] py-4 text-center capitalize text-[#F9FAFB] transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F9FAFB]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-50';

const headerCtaFont: React.CSSProperties = {
  fontFamily: '"SF Pro Display", var(--font-inter), system-ui, sans-serif',
  fontSize: 15,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '20px',
  letterSpacing: '-1px',
};

/** Raster arrow tinted with `currentColor` so it always matches label text. */
function HeaderArrow() {
  const mask = `url(${arrowMaskUrl})`;
  return (
    <span
      className="inline-block h-2.5 w-4 shrink-0 bg-current"
      style={{
        maskImage: mask,
        WebkitMaskImage: mask,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
      }}
      aria-hidden
    />
  );
}

type HeaderCTAAsLink = Omit<
  React.ComponentPropsWithoutRef<typeof AppLink>,
  'className' | 'children'
> & {
  className?: string;
  children?: React.ReactNode;
};

type HeaderCTAAsButton = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'className' | 'children'
> & {
  href?: never;
  className?: string;
  children?: React.ReactNode;
};

export type HeaderCTAProps = HeaderCTAAsLink | HeaderCTAAsButton;

export function HeaderCTA(props: HeaderCTAProps) {
  const {
    className,
    children = "Let's Get Started",
    ...rest
  } = props;
  const merged = cn(headerCtaBase, className);

  const mergedStyle = (extra?: React.CSSProperties) => ({
    ...headerCtaSurface,
    ...headerCtaFont,
    ...extra,
  });

  const content = (
    <>
      <span>{children}</span>
      <HeaderArrow />
    </>
  );

  if ('href' in rest && rest.href !== undefined) {
    const { style: linkStyle, ...linkRest } = rest as HeaderCTAAsLink;
    return (
      <AppLink
        {...linkRest}
        className={merged}
        style={mergedStyle(linkStyle)}
      >
        {content}
      </AppLink>
    );
  }

  const btn = rest as Omit<
    HeaderCTAAsButton,
    'className' | 'children' | 'href'
  >;
  const { type = 'button', style: btnStyle, ...buttonProps } = btn;
  return (
    <button
      type={type}
      {...buttonProps}
      className={merged}
      style={mergedStyle(btnStyle)}
    >
      {content}
    </button>
  );
}
