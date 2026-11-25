import type { Metadata } from "next";
import type { ReactNode } from "react";

import { CurvedCommunityCarousel } from "@/components/layout/CurvedCommunityCarousel";
import { TrustMarquee } from "@/components/TrustMarquee";
import { colorTokens, fontTokens, typeScaleSamples } from "@/design/tokens";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CTAButton,
  HeaderCTA,
  Input,
  MovyoCommunityCarousel,
  Pagination,
  SpecFrame,
  WhyMovyoTextScroller,
} from "@/components/ui";
import {
  DeliveryTruckIcon,
  DocumentBadgeIcon,
  HeadsetSupportIcon,
  ScissorsIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "UI — MovyoHealth design system",
  description:
    "UI components, color tokens, typography, and motion patterns (MOVYO / Allanis prototype alignment).",
};

const ACCORDION_COPY =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const toc = [
  { id: "color-variables", label: "Color variables" },
  { id: "font-typography", label: "Font & typography" },
  { id: "ui-components", label: "UI components" },
] as const;

function DesignSystemSection({
  id,
  number,
  title,
  description,
  children,
}: {
  id: string;
  number: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
        <header className="border-b border-gray-100 px-6 py-8 sm:px-8 sm:py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#C32E6D]">
            {number}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-600">
              {description}
            </p>
          ) : null}
        </header>
        <div className="px-6 py-8 sm:px-8 sm:py-10">{children}</div>
      </div>
    </section>
  );
}

function TocLink({ href, children }: { href: string; children: ReactNode }) {
  const hashOnly = href.startsWith('#');
  return (
    <a
      href={href}
      {...(hashOnly
        ? {}
        : { target: '_blank' as const, rel: 'noopener noreferrer' })}
      className="block rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-[#C32E6D]/5 hover:text-[#C32E6D]"
    >
      {children}
    </a>
  );
}

export default function UIPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <header className="max-w-3xl border-b border-gray-200 pb-10">
          <p className="text-sm font-medium text-[#C32E6D]">Design system</p>
          <h1 className="mt-2 font-serif text-4xl font-normal tracking-tight text-[#292929] md:text-5xl">
            Movyo UI
          </h1>
          <p className="mt-4 text-base leading-relaxed text-gray-600">
            Design variables and UI components aligned with the Allanis — MOVYO
            prototype. Tokens live in{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm text-gray-800">
              src/design/tokens.ts
            </code>{" "}
            and are mirrored in{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm text-gray-800">
              globals.css
            </code>
            .
          </p>
        </header>

        {/* Mobile: jump links */}
        <nav
          className="mt-8 flex flex-wrap gap-2 border-b border-gray-200 pb-8 lg:hidden"
          aria-label="On this page"
        >
          {toc.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm transition-colors hover:border-[#C32E6D]/40 hover:text-[#C32E6D]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mt-10 grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
          {/* Desktop TOC */}
          <aside className="hidden lg:block">
            <nav
              className="sticky top-28 space-y-1 border-l-2 border-gray-200 pl-4"
              aria-label="On this page"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">
                Contents
              </p>
              {toc.map((item) => (
                <TocLink key={item.id} href={`#${item.id}`}>
                  {item.label}
                </TocLink>
              ))}
            </nav>
          </aside>

          <div className="flex min-w-0 flex-col gap-14">
            {/* 4.3 Design variables — Color */}
            <DesignSystemSection
              id="color-variables"
              number="01 · Design variables"
              title="Color variables"
              description="Semantic color tokens with live swatches. Values match the prototype and CSS custom properties (e.g. --color-brand-primary)."
            >
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {colorTokens.map((t) => (
                  <div
                    key={t.cssVar}
                    className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-[#F9FAFB] shadow-sm"
                  >
                    <div
                      className="h-24 w-full border-b border-gray-200/80"
                      style={{ backgroundColor: t.value }}
                      title={t.value}
                    />
                    <div className="flex flex-1 flex-col p-4">
                      <p className="font-medium text-gray-900">{t.name}</p>
                      <p className="mt-1 font-mono text-xs text-gray-500">
                        --{t.cssVar}
                      </p>
                      <p className="mt-2 font-mono text-sm font-medium text-gray-800">
                        {t.value}
                      </p>
                      <p className="mt-3 text-xs leading-relaxed text-gray-500">
                        {t.usage}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </DesignSystemSection>

            {/* Font & typography */}
            <DesignSystemSection
              id="font-typography"
              number="02 · Design variables"
              title="Font & typography"
              description="Font stacks loaded in the root layout; use Tailwind font-sans / font-serif or the CSS variables below."
            >
              <div className="space-y-10">
                <div>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
                    Font families
                  </h3>
                  <div className="grid gap-6 lg:grid-cols-2">
                    {fontTokens.map((f) => (
                      <div
                        key={f.cssVar}
                        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                      >
                        <p className="text-sm font-medium text-gray-900">
                          {f.name}
                        </p>
                        <p className="mt-1 font-mono text-xs text-gray-500">
                          {f.cssVar}
                        </p>
                        <p className="mt-2 text-sm text-gray-600">{f.role}</p>
                        <p className="mt-1 font-mono text-xs text-gray-400">
                          {f.stack}
                        </p>
                        <div
                          className={`mt-6 rounded-lg border border-gray-100 bg-[#F9FAFB] p-5 ${
                            f.cssVar === "--font-instrument-serif"
                              ? "font-serif text-3xl text-[#292929]"
                              : "font-sans text-lg text-gray-800"
                          }`}
                        >
                          {f.cssVar === "--font-instrument-serif" ? (
                            <>
                              <span className="block text-5xl leading-none">
                                Aa
                              </span>
                              <span className="mt-3 block text-2xl font-normal">
                                Movyo Health
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Sample
                              </span>
                              <p className="mt-2 font-normal leading-relaxed">
                                The quick brown fox jumps over the lazy dog.
                                0123456789
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
                    Type scale (prototype samples)
                  </h3>
                  <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 bg-[#F9FAFB]">
                          <th className="px-4 py-3 font-semibold text-gray-700 sm:px-6">
                            Style
                          </th>
                          <th className="px-4 py-3 font-semibold text-gray-700 sm:px-6">
                            Preview
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {typeScaleSamples.map((row) => (
                          <tr
                            key={row.label}
                            className="border-b border-gray-100 last:border-0"
                          >
                            <td className="align-top px-4 py-5 text-xs font-medium uppercase tracking-wide text-gray-400 sm:px-6">
                              {row.label}
                            </td>
                            <td className="px-4 py-5 sm:px-6">
                              {row.label === "CTA button" ? (
                                <span className="inline-flex rounded-full bg-[#C32E6D] px-5 py-2.5 text-base font-medium leading-none tracking-[-0.01em] text-white">
                                  {row.sample}
                                </span>
                              ) : (
                                <p className={row.className}>{row.sample}</p>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </DesignSystemSection>

            {/* UI components — grid */}
            <DesignSystemSection
              id="ui-components"
              number="03 · Component library"
              title="UI components"
              description="Each block uses the Figma-style purple label (SpecFrame) so names map to the prototype. Layout is a responsive grid: full-width rows for marquees and carousels; pairs where space allows."
            >
              <div className="grid grid-cols-1 gap-8 xl:grid-cols-2 xl:gap-x-8 xl:gap-y-10">
                <div className="xl:col-span-2">
                  <SpecFrame name="Component 5">
                    <TrustMarquee className="border-0 p-0 shadow-none" />
                  </SpecFrame>
                </div>

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

                <div className="xl:col-span-2">
                  <SpecFrame name="headerCTA">
                    <div className="rounded-xl bg-gradient-to-br from-[#DDD6FE] via-[#E9E4FF] to-[#FCE7F3] p-10">
                      <div className="flex flex-col gap-4">
                        <HeaderCTA href="/get-started" />
                        <HeaderCTA href="/get-started" />
                      </div>
                    </div>
                  </SpecFrame>
                </div>

                <div className="xl:col-span-2">
                  <SpecFrame name="accordion">
                    <Accordion type="single" variant="brand" defaultOpen="3">
                      <AccordionItem
                        value="1"
                        title="How are you different from other telehealth companies?"
                      >
                        {ACCORDION_COPY}
                      </AccordionItem>
                      <AccordionItem
                        value="2"
                        title="How are you different from other telehealth companies?"
                      >
                        {ACCORDION_COPY}
                      </AccordionItem>
                      <AccordionItem
                        value="3"
                        title="How are you different from other telehealth companies?"
                      >
                        {ACCORDION_COPY}
                      </AccordionItem>
                    </Accordion>
                  </SpecFrame>
                </div>

                <SpecFrame name="pagination">
                  <div className="flex justify-center py-2">
                    <Pagination />
                  </div>
                </SpecFrame>

                <div className="xl:col-span-2">
                  <SpecFrame name="curvedCarousel">
                    <CurvedCommunityCarousel sliderOnly />
                  </SpecFrame>
                </div>

                <div className="xl:col-span-2">
                  <SpecFrame name="Component 3">
                    <div className="flex flex-col gap-8">
                      <div>
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Buttons
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <Button variant="primary">Primary</Button>
                          <Button variant="secondary">Secondary</Button>
                          <Button variant="outline">Outline</Button>
                          <Button variant="ghost">Ghost</Button>
                        </div>
                      </div>
                      <div>
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Input
                        </p>
                        <div className="grid max-w-md gap-5">
                          <Input
                            label="Email"
                            type="email"
                            placeholder="you@example.com"
                          />
                          <Input
                            label="Message"
                            placeholder="How can we help?"
                            helperText="We respond within one business day."
                          />
                        </div>
                      </div>
                      <div>
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Card
                        </p>
                        <Card variant="outlined" className="max-w-md">
                          <CardHeader>
                            <CardTitle>Care plan</CardTitle>
                            <CardDescription>
                              Personalized to your goals
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-600">
                              Short supporting copy for layout reference.
                            </p>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" size="sm">
                              View details
                            </Button>
                          </CardFooter>
                        </Card>
                      </div>
                      <div>
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Icons
                        </p>
                        <div className="flex flex-wrap items-end gap-8 text-[#292929]">
                          <div className="flex flex-col items-center gap-2">
                            <DeliveryTruckIcon className="h-8 w-auto" />
                            <span className="text-xs text-gray-500">Truck</span>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <ScissorsIcon className="h-8 w-8" />
                            <span className="text-xs text-gray-500">
                              Rx / care
                            </span>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <DocumentBadgeIcon className="h-8 w-8" />
                            <span className="text-xs text-gray-500">
                              License
                            </span>
                          </div>
                          <div className="flex flex-col items-center gap-2">
                            <HeadsetSupportIcon className="h-8 w-8" />
                            <span className="text-xs text-gray-500">
                              Support
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SpecFrame>
                </div>

                <div className="xl:col-span-2">
                  <p className="mb-4 text-sm font-semibold text-gray-800">
                    Motion & patterns
                  </p>
                  <div className="space-y-8">
                    <div>
                      <p className="mb-3 max-w-2xl text-sm text-gray-600">
                        Why Movyo — continuous horizontal text. Respects{" "}
                        <code className="rounded bg-gray-100 px-1 text-xs">
                          prefers-reduced-motion
                        </code>
                        .
                      </p>
                      <WhyMovyoTextScroller />
                    </div>
                    <div>
                      <p className="mb-3 max-w-2xl text-sm text-gray-600">
                        Movyo Community — testimonial carousel with arrows and
                        dots; pauses on hover.
                      </p>
                      <MovyoCommunityCarousel />
                    </div>
                  </div>
                </div>
              </div>
            </DesignSystemSection>
          </div>
        </div>
      </div>
    </div>
  );
}
