import type { Metadata } from "next";

import { CurvedCommunityCarousel } from "@/components/layout/CurvedCommunityCarousel";
import { TrustMarquee } from "@/components/TrustMarquee";
import {
  Accordion,
  AccordionItem,
  CTAButton,
  HeaderCTA,
  Pagination,
  SpecFrame,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Components — MovyoHealth",
  description: "UI components",
};

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.";

const LANDING_COLOR_ROWS: {
  label: string;
  cssVar: string;
  note: string;
  swatch: string;
}[] = [
  {
    label: "Primary (magenta)",
    cssVar: "--color-landing-primary",
    note: "#BC336A",
    swatch: "var(--color-landing-primary)",
  },
  {
    label: "Secondary (navy)",
    cssVar: "--color-landing-secondary",
    note: "#1A3251",
    swatch: "var(--color-landing-secondary)",
  },
  {
    label: "Background gradient (hero)",
    cssVar: "--color-landing-bg-blue-start → --color-landing-bg-blue-end",
    note: "#E1F0F9 → #FFFFFF",
    swatch:
      "linear-gradient(to bottom, var(--color-landing-bg-blue-start), var(--color-landing-bg-blue-end))",
  },
  {
    label: "Background (light pink)",
    cssVar: "--color-landing-bg-pink",
    note: "#FDF2F7",
    swatch: "var(--color-landing-bg-pink)",
  },
  {
    label: "Text (headings)",
    cssVar: "--color-landing-text-heading",
    note: "#1A3251",
    swatch: "var(--color-landing-text-heading)",
  },
  {
    label: "Text (body)",
    cssVar: "--color-landing-text-body",
    note: "#4A5568",
    swatch: "var(--color-landing-text-body)",
  },
  {
    label: "Text (muted)",
    cssVar: "--color-landing-text-muted",
    note: "#718096",
    swatch: "var(--color-landing-text-muted)",
  },
  {
    label: "Text (strong / dark)",
    cssVar: "--color-landing-text-strong",
    note: "#2D3748",
    swatch: "var(--color-landing-text-strong)",
  },
  {
    label: "Border / divider",
    cssVar: "--color-landing-border",
    note: "#E2E8F0",
    swatch: "var(--color-landing-border)",
  },
  {
    label: "Surface (white)",
    cssVar: "--color-landing-surface",
    note: "#FFFFFF",
    swatch: "var(--color-landing-surface)",
  },
];

export default function ComponentShowcasePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Components
        </h1>

        <div className="mt-10 flex flex-col gap-12">
          <SpecFrame name="landingTokens">
            <div className="flex flex-col gap-10 text-left">
              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Colors (shared tokens in globals.css)
                </h3>
                <ul className="space-y-3">
                  {LANDING_COLOR_ROWS.map((row) => (
                    <li
                      key={row.label}
                      className="flex flex-wrap items-center gap-3 rounded-lg border border-gray-100 bg-[#FAFAFA] px-3 py-2.5"
                    >
                      <span
                        className="h-10 w-10 shrink-0 rounded-md border border-gray-200 shadow-inner"
                        style={{ background: row.swatch }}
                        title={row.note}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {row.label}
                        </p>
                        <p className="mt-0.5 font-mono text-xs text-gray-500">
                          {row.cssVar}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-400">
                          {row.note}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Fonts & variables
                </h3>
                <ul className="list-inside list-disc space-y-2 text-sm text-gray-700">
                  <li>
                    <code className="rounded bg-gray-100 px-1 font-mono text-xs">
                      --font-landing-sans
                    </code>{" "}
                    — SF Pro Display, Inter, system UI (navigation, body,
                    buttons)
                  </li>
                  <li>
                    <code className="rounded bg-gray-100 px-1 font-mono text-xs">
                      --font-landing-serif
                    </code>{" "}
                    — Instrument Serif (italic emphasis, e.g. “weight loss”)
                  </li>
                  <li>
                    Type scale: use Tailwind in components (e.g. hero headline{" "}
                    <code className="font-mono text-xs">
                      text-[clamp(2.5rem,4vw+1rem,3.5rem)]
                    </code>
                    , section titles{" "}
                    <code className="font-mono text-xs">
                      text-3xl md:text-4xl
                    </code>
                    , body <code className="font-mono text-xs">text-base</code>,
                    nav <code className="font-mono text-xs">text-sm</code>).
                  </li>
                  <li>
                    Pills / CTAs:{" "}
                    <code className="font-mono text-xs">rounded-full</code> on
                    buttons and chips.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Typography examples
                </h3>
                <ul className="space-y-6">
                  <li className="rounded-lg border border-gray-100 p-4">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                      Hero (navy on white)
                    </p>
                    <p className="max-w-xl font-sans text-[clamp(2.5rem,4vw+1rem,3.5rem)] font-bold leading-snug tracking-tight text-(--color-landing-text-heading)">
                      Care for your{" "}
                      <span className="font-serif font-normal italic text-(--color-landing-primary)">
                        weight loss
                      </span>{" "}
                      journey
                    </p>
                  </li>
                  <li className="rounded-lg bg-gradient-to-b from-(--color-landing-bg-blue-start) to-(--color-landing-bg-blue-end) p-4">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wide text-white/80">
                      Hero (white on gradient)
                    </p>
                    <p className="max-w-xl font-sans text-[clamp(2.5rem,4vw+1rem,3.5rem)] font-bold leading-snug tracking-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.25)]">
                      MOVYO Health
                    </p>
                  </li>
                  <li className="rounded-lg border border-gray-100 p-4">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                      Section title
                    </p>
                    <p className="font-sans text-4xl font-bold text-(--color-landing-text-heading) md:text-5xl">
                      Three simple steps
                    </p>
                  </li>
                  <li className="rounded-lg border border-gray-100 p-4">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                      Card title
                    </p>
                    <p className="font-sans text-2xl font-semibold text-(--color-landing-text-strong)">
                      Step 1 — Get started
                    </p>
                  </li>
                  <li className="rounded-lg border border-gray-100 p-4">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                      Body
                    </p>
                    <p className="max-w-prose font-sans text-base leading-relaxed text-(--color-landing-text-body)">
                      {LOREM}
                    </p>
                  </li>
                  <li className="rounded-lg border border-gray-100 p-4">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                      Nav / labels
                    </p>
                    <p className="font-sans text-sm font-medium text-(--color-landing-text-heading)">
                      Programs · FAQ · Contact
                    </p>
                  </li>
                  <li className="rounded-lg border border-gray-100 bg-[#FDF2F7] p-4">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                      Button label (capitalize)
                    </p>
                    <span className="inline-flex rounded-full bg-(--color-landing-primary) px-6 py-3 font-sans text-base font-semibold capitalize tracking-wide text-white">
                      Get started
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </SpecFrame>

          <SpecFrame name="Component 5">
            <TrustMarquee className="border-0 p-0 shadow-none" />
          </SpecFrame>

          <SpecFrame name="logIn">
            <div className="flex flex-wrap items-center gap-4">
              <CTAButton href="/get-started">Get Started</CTAButton>
              <CTAButton href="/get-started" variant="ghost">
                Get Started
              </CTAButton>
            </div>
          </SpecFrame>

          <SpecFrame name="CTA">
            <div className="flex flex-wrap items-center gap-4">
              <CTAButton href="/get-started" showIcon>
                Get Started
              </CTAButton>
              <CTAButton href="/get-started" variant="ghost" showChevron>
                Get Started
              </CTAButton>
            </div>
          </SpecFrame>

          <SpecFrame name="headerCTA">
            <div className="flex flex-col gap-4">
              <HeaderCTA href="/get-started" />
              <HeaderCTA href="/get-started" />
            </div>
          </SpecFrame>

          <SpecFrame name="accordion">
            <div className="max-w-full">
              <Accordion type="single" variant="brand" defaultOpen="3">
                <AccordionItem
                  value="1"
                  title="How are you different from other telehealth companies?"
                >
                  {LOREM}
                </AccordionItem>
                <AccordionItem
                  value="2"
                  title="How are you different from other telehealth companies?"
                >
                  {LOREM}
                </AccordionItem>
                <AccordionItem
                  value="3"
                  title="How are you different from other telehealth companies?"
                >
                  {LOREM}
                </AccordionItem>
              </Accordion>
            </div>
          </SpecFrame>

          <SpecFrame name="pagination">
            <div className="flex justify-center py-2">
              <Pagination />
            </div>
          </SpecFrame>

          <SpecFrame name="curvedCarousel">
            <CurvedCommunityCarousel sliderOnly />
          </SpecFrame>
        </div>
      </div>
    </div>
  );
}
