import { AppLink } from '@/components/ui/AppLink';

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-20 text-center">
      <p className="font-sf text-5xl font-semibold tabular-nums tracking-tight text-[#111] md:text-6xl">
        404
      </p>
      <h1 className="mt-6 font-sf text-2xl font-medium text-[#292929] md:text-3xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md font-sf text-base font-normal leading-relaxed text-[#6B7280]">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </p>
      <AppLink
        href="/"
        target="_self"
        className="mt-10 inline-flex items-center justify-center rounded-full bg-[#C32E6D] px-8 py-3 font-sf text-sm font-medium text-white transition-colors hover:bg-[#a8275c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C32E6D] focus-visible:ring-offset-2"
      >
        Back to home
      </AppLink>
    </div>
  );
}
