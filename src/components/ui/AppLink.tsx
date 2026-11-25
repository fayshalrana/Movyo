import Link from 'next/link';
import type { ComponentProps } from 'react';

export type AppLinkProps = ComponentProps<typeof Link>;

/**
 * Next.js `Link` with defaults: `target="_blank"` and `rel="noopener noreferrer"`.
 * Pass `target="_self"` to navigate in the same tab.
 */
export function AppLink({
  target = '_blank',
  prefetch = false,
  rel,
  ...props
}: AppLinkProps) {
  const safeRel =
    target === '_blank' ? (rel ?? 'noopener noreferrer') : rel;
  return <Link target={target} rel={safeRel} prefetch={prefetch} {...props} />;
}
