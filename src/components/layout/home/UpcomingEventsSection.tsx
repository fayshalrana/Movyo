import type { ReactNode, SVGProps } from "react";

import { CTAButton, cn } from "@/components/ui";
import { AppLink } from "@/components/ui/AppLink";

type EventAccent = "purple" | "green" | "orange";

type EventCard = {
  date: string;
  tag: string;
  accent: EventAccent;
  title: string;
  body: string;
  meta: { icon: "clock" | "video" | "calendar"; label: string }[];
  registered: string;
  access: { icon: "lock" | "members"; label: string };
  cta: string;
  href: string;
};

const accentStyles: Record<
  EventAccent,
  { border: string; tag: string; tagText: string }
> = {
  purple: {
    border: "before:bg-[#4B0286]",
    tag: "bg-[#F5E9FF]",
    tagText: "text-[#232424] h-[26px] w-[116px] leading-[160%]",
  },
  green: {
    border: "before:bg-[#1D9E75]",
    tag: "bg-[#DFF8F0]",
    tagText: "text-[#232424] h-[26px] w-[90px] leading-[160%]",
  },
  orange: {
    border: "before:bg-[#EA8700]",
    tag: "bg-[#FFE6C3]",
    tagText: "text-[#232424] h-[26px] w-[149px] leading-[160%]",
  },
};
const upcomingEventsPrimaryButtonClass = cn(
  "inline-flex h-auto min-h-0 items-center justify-center gap-2.5 md:gap-4 rounded-full border-2 border-transparent bg-[#2253C7] px-4 md:px-7.5 py-2",
  "font-sf text-center text-sm md:text-[20px] tracking-[0.28px] md:tracking-[0%] font-medium md:font-medium leading-[160%] md:leading-[150%] text-white",
  "hover:border-[#2253C7] hover:bg-transparent hover:text-[#2253C7]",
  "[&_svg]:!h-4 [&_svg]:!w-4 lg:[&_svg]:!h-8 lg:[&_svg]:!w-8 [&_svg]:shrink-0 [&_svg]:aspect-square",
);

function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442Z"
        stroke="#2F2F2F"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 12L15 10"
        stroke="#2F2F2F"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 7V12"
        stroke="#2F2F2F"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VideoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M15 10.0006L19.553 7.72461C19.7054 7.64844 19.8748 7.61249 20.045 7.62015C20.2152 7.62782 20.3806 7.67885 20.5256 7.76841C20.6706 7.85797 20.7902 7.98308 20.8733 8.13188C20.9563 8.28067 20.9999 8.44822 21 8.61861V15.3826C20.9999 15.553 20.9563 15.7205 20.8733 15.8693C20.7902 16.0181 20.6706 16.1432 20.5256 16.2328C20.3806 16.3224 20.2152 16.3734 20.045 16.3811C19.8748 16.3887 19.7054 16.3528 19.553 16.2766L15 14.0006V10.0006Z"
        stroke="#2F2F2F"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H13C13.5304 6 14.0391 6.21071 14.4142 6.58579C14.7893 6.96086 15 7.46957 15 8V16C15 16.5304 14.7893 17.0391 14.4142 17.4142C14.0391 17.7893 13.5304 18 13 18H5C4.46957 18 3.96086 17.7893 3.58579 17.4142C3.21071 17.0391 3 16.5304 3 16V8Z"
        stroke="#2F2F2F"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M4 7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 6 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21H6C5.46957 21 4.96086 20.7893 4.58579 20.4142C4.21071 20.0391 4 19.5304 4 19V7Z"
        stroke="#2F2F2F"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 3V7"
        stroke="#2F2F2F"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 3V7"
        stroke="#2F2F2F"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 11H20"
        stroke="#2F2F2F"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 15H10V17H8V15Z"
        stroke="#2F2F2F"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M5 13C5 12.4696 5.21071 11.9609 5.58579 11.5858C5.96086 11.2107 6.46957 11 7 11H17C17.5304 11 18.0391 11.2107 18.4142 11.5858C18.7893 11.9609 19 12.4696 19 13V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V13Z"
        stroke="#2F2F2F"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 16C11 16.2652 11.1054 16.5196 11.2929 16.7071C11.4804 16.8946 11.7348 17 12 17C12.2652 17 12.5196 16.8946 12.7071 16.7071C12.8946 16.5196 13 16.2652 13 16C13 15.7348 12.8946 15.4804 12.7071 15.2929C12.5196 15.1054 12.2652 15 12 15C11.7348 15 11.4804 15.1054 11.2929 15.2929C11.1054 15.4804 11 15.7348 11 16Z"
        stroke="#2F2F2F"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 11V7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7V11"
        stroke="#2F2F2F"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MembersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M10 13C10 13.5304 10.2107 14.0391 10.5858 14.4142C10.9609 14.7893 11.4696 15 12 15C12.5304 15 13.0391 14.7893 13.4142 14.4142C13.7893 14.0391 14 13.5304 14 13C14 12.4696 13.7893 11.9609 13.4142 11.5858C13.0391 11.2107 12.5304 11 12 11C11.4696 11 10.9609 11.2107 10.5858 11.5858C10.2107 11.9609 10 12.4696 10 13Z"
        stroke="#2F2F2F"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 21V20C8 19.4696 8.21071 18.9609 8.58579 18.5858C8.96086 18.2107 9.46957 18 10 18H14C14.5304 18 15.0391 18.2107 15.4142 18.5858C15.7893 18.9609 16 19.4696 16 20V21"
        stroke="#2F2F2F"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5858 6.41421C15.2107 6.03914 15 5.53043 15 5C15 4.46957 15.2107 3.96086 15.5858 3.58579C15.9609 3.21071 16.4696 3 17 3C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5C19 5.53043 18.7893 6.03914 18.4142 6.41421C18.0391 6.78929 17.5304 7 17 7C16.4696 7 15.9609 6.78929 15.5858 6.41421Z"
        stroke="#2F2F2F"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 10H19C19.5304 10 20.0391 10.2107 20.4142 10.5858C20.7893 10.9609 21 11.4696 21 12V13"
        stroke="#2F2F2F"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.58579 6.41421C5.21071 6.03914 5 5.53043 5 5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3C7.53043 3 8.03914 3.21071 8.41421 3.58579C8.78929 3.96086 9 4.46957 9 5C9 5.53043 8.78929 6.03914 8.41421 6.41421C8.03914 6.78929 7.53043 7 7 7C6.46957 7 5.96086 6.78929 5.58579 6.41421Z"
        stroke="#2F2F2F"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 13V12C3 11.4696 3.21071 10.9609 3.58579 10.5858C3.96086 10.2107 4.46957 10 5 10H7"
        stroke="#2F2F2F"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const metaIcons = {
  clock: ClockIcon,
  video: VideoIcon,
  calendar: CalendarIcon,
} as const;

const accessIcons = {
  lock: LockIcon,
  members: MembersIcon,
} as const;

const events: EventCard[] = [
  {
    date: "MAY 17",
    tag: "Provider Q&A",
    accent: "purple",
    title: "GLP-1 Q&A with Beluga Health: Your First 90 Days",
    body: "Live with a licensed Beluga Health provider — side effects, dosage adjustments, and what progress actually looks like.",
    meta: [
      { icon: "clock", label: "7:00 PM ET" },
      { icon: "video", label: "Virtual" },
    ],
    registered: "847 women already registered",
    access: { icon: "lock", label: "Members only" },
    cta: "RSVP now",
    href: "/get-started",
  },
  {
    date: "MAY 24",
    tag: "Workshop",
    accent: "green",
    title: "Mindful Eating & Hormones After 40",
    body: "How estrogen decline affects hunger signals, cravings, and emotional eating — and what to do about it.",
    meta: [
      { icon: "clock", label: "6:30 PM ET" },
      { icon: "video", label: "Virtual" },
    ],
    registered: "312 women already registered",
    access: { icon: "lock", label: "Members only" },
    cta: "RSVP now",
    href: "/get-started",
  },
  {
    date: "JUN 3",
    tag: "30-Day Challenge",
    accent: "orange",
    title: "June Kickstart: 30-Day Movement & Sleep Reset",
    body: "A community-wide 30-day challenge. Daily prompts, group accountability, and prizes.",
    meta: [{ icon: "calendar", label: "Jun 3 – Jul 3" }],
    registered: "1,024 women already registered",
    access: { icon: "members", label: "All Members" },
    cta: "Join the challenge",
    href: "/get-started",
  },
];

function MetaLine({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <p className="flex items-center gap-1.5 font-satoshi text-base md:text-lg font-normal leading-[160%] text-[#2F2F2F] tracking-[0.36px]">
      <span className="inline-flex shrink-0 text-[#2F2F2F]">{icon}</span>
      {children}
    </p>
  );
}

function RegisteredText({ text }: { text: string }) {
  const match = text.match(/^([\d,]+ women)(.*)$/);
  if (!match) return text;

  return (
    <>
      <span className="font-bold">{match[1]}</span>
      {match[2]}
    </>
  );
}

function EventCardBlock({ event }: { event: EventCard }) {
  const styles = accentStyles[event.accent];
  const AccessIcon = accessIcons[event.access.icon];

  return (
    <article
      className={cn(
        "relative flex h-full min-h-0 w-full max-w-108 flex-col overflow-hidden rounded-2xl border border-[#E0E0E0] bg-white px-4 py-6 md:px-4 md:py-6",
        "before:absolute before:top-0 before:left-0 before:h-2 before:w-full before:content-['']",
        styles.border,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="font-satoshi text-base md:text-abse font-medium uppercase leading-[160%] tracking-[0.08em] text-[#232424]">
          {event.date}
        </p>
        <p
          className={cn(
            "rounded-full px-2 flex items-center justify-center font-satoshi text-sm md:text-base font-medium",
            styles.tag,
            styles.tagText,
          )}
        >
          {event.tag}
        </p>
      </div>

      <h3 className="mt-4 font-sf text-xl font-bold leading-[150%] text-[#0F1F5C] md:text-2xl tracking-[0.4px] md:tracking-[0.48px]">
        {event.title}
      </h3>

      <p className="mt-3 min-h-[80px] flex items-start font-sf text-base font-normal leading-[150%] text-[#2F2F2F] tracking-[0.32px] md:tracking-[0.36px] md:text-lg">
        {event.body}
      </p>

      <div className="w-full py-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="1"
          viewBox="0 0 100 1"
          preserveAspectRatio="none"
          fill="none"
        >
          <path d="M0 0.5H100" stroke="#E0E0E0" strokeWidth="1" />
        </svg>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        {event.meta.map((item) => {
          const Icon = metaIcons[item.icon];
          return (
            <MetaLine key={item.label} icon={<Icon className="h-3.5 w-3.5" />}>
              {item.label}
            </MetaLine>
          );
        })}
      </div>

      <p className="mt-4 font-satoshi text-base md:text-lg font-normal leading-[160%] text-[#2F2F2F] tracking-[0.36px]">
        <RegisteredText text={event.registered} />
      </p>

      <div className="mt-auto flex items-center justify-between gap-3 pt-4">
        <MetaLine icon={<AccessIcon className="h-3.5 w-3.5" />}>
          {event.access.label}
        </MetaLine>

        <AppLink
          href={event.href}
          className="inline-flex shrink-0 items-center justify-center rounded-md bg-[#111111] px-4 py-2 md:px-5 font-sf text-sm font-medium leading-[160%] text-white transition-colors hover:bg-[#2A2A2A] lg:text-lg "
        >
          {event.cta}
        </AppLink>
      </div>
    </article>
  );
}

export function UpcomingEventsSection() {
  return (
    <section
      className="scroll-mt-20 bg-[#F5F7FF] px-5 py-12.5"
      aria-labelledby="upcoming-events-heading"
    >
      <div className="mx-auto w-full max-w-346 md:px-5">
        <div className="flex flex-col gap-8 sm:flex-row items-center sm:justify-between sm:gap-6">
          <div>
            <h2
              id="upcoming-events-heading"
              className="font-satoshi text-[32px] font-bold leading-[130%] text-[#0F1F5C] lg:text-[60px]"
            >
              Upcoming Events
            </h2>
          </div>

          <CTAButton
            href="/get-started"
            colorScheme="blue"
            showIcon
            className={upcomingEventsPrimaryButtonClass}
          >
            See all events
          </CTAButton>
        </div>

        <div className="mt-7.5 grid grid-cols-1 items-stretch justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 md:mt-12.5">
          {events.map((event) => (
            <EventCardBlock key={event.title} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
