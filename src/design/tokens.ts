/**
 * MovyoHealth design tokens — align with globals.css :root and Figma “Allanis — MOVYO”.
 * Update here and mirror CSS variables when the brand system changes.
 */

export type ColorToken = {
  name: string;
  /** CSS variable name (without leading --) */
  cssVar: string;
  /** Hex or CSS color */
  value: string;
  usage: string;
};

export const colorTokens: ColorToken[] = [
  {
    name: 'Brand primary',
    cssVar: 'color-brand-primary',
    value: '#C32E6D',
    usage: 'Primary CTAs, accents, focus rings',
  },
  {
    name: 'Brand primary hover',
    cssVar: 'color-brand-primary-hover',
    value: '#A8275C',
    usage: 'Hover states (optional)',
  },
  {
    name: 'Text primary',
    cssVar: 'color-text-primary',
    value: '#292929',
    usage: 'Icons, strong body, trust bar',
  },
  {
    name: 'Text default',
    cssVar: 'color-foreground',
    value: '#171717',
    usage: 'Default body text (light theme)',
  },
  {
    name: 'Background',
    cssVar: 'color-background',
    value: '#FFFFFF',
    usage: 'Page and card surfaces',
  },
  {
    name: 'Surface muted',
    cssVar: 'color-surface-muted',
    value: '#F9FAFB',
    usage: 'Section backgrounds (gray-50)',
  },
  {
    name: 'Border default',
    cssVar: 'color-border-default',
    value: '#E5E7EB',
    usage: 'Cards, inputs (gray-200)',
  },
  {
    name: 'Prototype frame',
    cssVar: 'color-frame-dashed',
    value: '#D8B4FE',
    usage: 'Dashed dev / spec frames (purple-300)',
  },
];

export type FontToken = {
  name: string;
  role: string;
  stack: string;
  cssVar: string;
};

export const fontTokens: FontToken[] = [
  {
    name: 'Sans — UI & body',
    role: 'Navigation, buttons, forms, paragraphs',
    stack: 'Inter, system-ui, sans-serif',
    cssVar: '--font-inter',
  },
  {
    name: 'Serif — display',
    role: 'Wordmark “MOVYO”, editorial headings',
    stack: 'Instrument Serif, Georgia, serif',
    cssVar: '--font-instrument-serif',
  },
];

export type TypeScaleSample = {
  label: string;
  className: string;
  sample: string;
};

export const typeScaleSamples: TypeScaleSample[] = [
  {
    label: 'Display / serif',
    className: 'font-serif text-4xl font-normal tracking-tight text-[#292929]',
    sample: 'Movyo Health',
  },
  {
    label: 'Heading 1',
    className: 'text-3xl font-bold tracking-tight text-gray-900',
    sample: 'Care that meets you where you are',
  },
  {
    label: 'Heading 2',
    className: 'text-2xl font-semibold text-gray-900',
    sample: 'Section title',
  },
  {
    label: 'Heading 3',
    className: 'text-xl font-semibold text-gray-900',
    sample: 'Card title',
  },
  {
    label: 'Body',
    className: 'text-base font-normal text-gray-600 leading-relaxed',
    sample:
      'Body copy uses Inter at 16px with relaxed line height for readability on long pages.',
  },
  {
    label: 'Caption / label',
    className: 'text-sm font-medium text-gray-500',
    sample: 'Form label · metadata',
  },
  {
    label: 'CTA button',
    className:
      'text-base font-medium leading-none tracking-[-0.01em] text-white',
    sample: 'Get Started',
  },
];
