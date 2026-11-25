/** Offset used when scrolling to key sections so the headline clears the header. */
export const PRICING_SECTION_SCROLL_OFFSET_PX = -80;
const SECTION_SCROLL_OFFSET_IDS = new Set([
  "pricing",
  "how-it-works",
  "faq",
]);
const HEADER_SCROLL_GAP_PX = 0;

function getFixedHeaderOffsetPx() {
  const header = document.getElementById('site-header');
  if (!header) return 0;
  return header.getBoundingClientRect().height + HEADER_SCROLL_GAP_PX;
}

function getScrollBehavior(): ScrollBehavior {
  if (typeof window === 'undefined') return 'auto';
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 'auto'
    : 'smooth';
}

/**
 * Scroll so the element starts below the fixed header, plus optional extra offset.
 */
export function scrollToSectionTop(
  sectionId: string,
  extraOffsetPx = -80,
) {
  const el = document.getElementById(sectionId);
  if (!el) return;
  const headerOffsetPx = getFixedHeaderOffsetPx();
  const top =
    el.getBoundingClientRect().top +
    window.scrollY -
    headerOffsetPx -
    extraOffsetPx;
  window.scrollTo({ top: Math.max(0, top), behavior: getScrollBehavior() });
}

export function getSectionScrollOffset(sectionId: string): number {
  return SECTION_SCROLL_OFFSET_IDS.has(sectionId)
    ? PRICING_SECTION_SCROLL_OFFSET_PX
    : 0;
}

export function scrollToHomeSection(sectionId: string) {
  scrollToSectionTop(sectionId, getSectionScrollOffset(sectionId));
}

export const CLOSE_MOBILE_MENU_EVENT = 'movyo:close-mobile-menu';

/** Intercept same-page hash links so nav/footer scroll smoothly instead of jumping. */
export function setupSmoothHashClickNavigation(): () => void {
  function handleClick(event: MouseEvent) {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const anchor = (event.target as Element | null)?.closest('a');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;

    let url: URL;
    try {
      url = new URL(href, window.location.href);
    } catch {
      return;
    }

    const hash = url.hash.slice(1);
    if (!hash) return;
    if (url.origin !== window.location.origin) return;
    if (url.pathname !== window.location.pathname) return;

    event.preventDefault();

    const id = decodeURIComponent(hash);
    history.pushState(null, '', `${url.pathname}${url.search}#${hash}`);
    scrollToHomeSection(id);

    if (anchor.closest('#site-header')) {
      document.dispatchEvent(new CustomEvent(CLOSE_MOBILE_MENU_EVENT));
      document
        .querySelectorAll<HTMLDetailsElement>('details[data-mobile-nav][open]')
        .forEach((el) => {
          el.open = false;
        });
    }
  }

  document.addEventListener('click', handleClick, true);
  return () => document.removeEventListener('click', handleClick, true);
}
