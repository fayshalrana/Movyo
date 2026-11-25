"use client";

import { FormEvent, useState } from "react";

import { cn } from "@/components/ui";

type FooterNewsletterFormProps = {
  variant?: "default" | "v2";
};

export function FooterNewsletterForm({
  variant = "default",
}: FooterNewsletterFormProps) {
  const isV2 = variant === "v2";
  const [email, setEmail] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const normalizedEmail = email.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);
    if (!isValidEmail) return;

    const subject = encodeURIComponent("Newsletter Subscription");
    const body = encodeURIComponent(
      `Please subscribe this email to the newsletter:\n\n${normalizedEmail}`,
    );
    window.location.href = `mailto:Support@Movyohealth.Com?subject=${subject}&body=${body}`;
    setEmail("");
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "flex items-stretch justify-between self-stretch",
        isV2
          ? "mt-auto w-full max-w-full rounded-md border border-[#E5E7EB] bg-white py-1 pl-2 pr-1"
          : "mt-1 max-h-10.5 max-w-md rounded-[10px] border-2 border-white bg-[#f3f4f6]/10 py-1 pl-5 pr-1 backdrop-blur-[2px] md:border",
      )}
      aria-label="Newsletter subscription"
    >
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Send Email Newsletter"
        autoComplete="email"
        className={cn(
          "footer-newsletter-input min-w-0 flex-1 border-0 bg-transparent py-3 pr-2 font-sf text-sm leading-[130%] outline-none",
          isV2
            ? "text-[#8F8F8F] placeholder:font-medium placeholder:text-[#8F8F8F] placeholder:text-[14px] placeholder:leading-[160%] placeholder:font-sf"
            : "font-[300] text-[#545454] placeholder:font-[300] placeholder:text-[#545454]",
        )}
      />
      <button
        type="submit"
        className={cn(
          "btn-bounce inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 self-stretch rounded-full border-0 text-center font-sf not-italic focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          isV2
            ? "bg-[#000000] px-4 py-2.5 text-[16px] font-regular leading-[150%] tracking-[0.02em] text-white hover:bg-[#c48b76] focus-visible:ring-[#D9A48D]"
            : "bg-[#BE185D] px-7.5 py-2 text-[14px] font-[300] capitalize leading-[130%] text-white hover:bg-[#a61350] focus-visible:ring-[#BE185D]",
        )}
      >
        Subscribe
      </button>
    </form>
  );
}
