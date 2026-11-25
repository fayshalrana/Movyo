"use client";

import React from "react";
import { cn } from "@/lib/helper/utils";

interface CouponApplyFormProps {
  couponInput: string;
  setCouponInput: (val: string) => void;
  onApply: (e: React.FormEvent) => void;
  couponMessage: string | null;
}

export function CouponApplyForm({
  couponInput,
  setCouponInput,
  onApply,
  couponMessage,
}: CouponApplyFormProps) {
  return (
    <>
      <form
        onSubmit={onApply}
        className="flex items-center justify-between w-full h-[46px] bg-transparent border border-[#E2E8F0] rounded-[12px] py-[4px] pr-[4px] pl-[16px] focus-within:border-[#0659C4] focus-within:ring-1 focus-within:ring-[#0659C4] transition-all duration-200"
      >
        <input
          type="text"
          placeholder="Enter Coupon Code"
          value={couponInput}
          onChange={(e) => setCouponInput(e.target.value)}
          className="flex-1 min-w-0 bg-transparent text-[14px] leading-[130%] font-[300] placeholder:text-[#94A3B8] text-[#111111] focus:outline-none"
        />
        <button
          type="submit"
          className={cn(
            "flex items-center justify-center bg-[#BE185D] hover:bg-[#A3154F] text-white w-[93px] h-[38px] rounded-full active:scale-95 transition-all duration-200 shrink-0 cursor-pointer font-medium text-[13px]",
          )}
        >
          Apply
        </button>
      </form>

      {couponMessage && (
        <div className="px-3.5 py-2.5 bg-emerald-50 border border-emerald-100 rounded-xl text-[12.5px] text-emerald-800 font-medium flex items-center gap-2 animate-in fade-in duration-300">
          <svg
            className="w-4 h-4 shrink-0 text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {couponMessage}
        </div>
      )}
    </>
  );
}
