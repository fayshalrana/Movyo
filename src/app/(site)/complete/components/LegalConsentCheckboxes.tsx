"use client";

import React from "react";
import Image from "next/image";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CheckoutFormData } from "@/lib/hooks/useCheckout";
import squareImg from "@/assets/square.png";

interface LegalConsentCheckboxesProps {
  register: UseFormRegister<CheckoutFormData>;
  errors: FieldErrors<CheckoutFormData>;
}

export function LegalConsentCheckboxes({
  register,
  errors,
}: LegalConsentCheckboxesProps) {
  return (
    <section className="flex flex-col w-full border-t border-[#E2E8F0] pt-4 gap-[8px]">
      {/* Terms & Conditions */}
      <div className="flex flex-col gap-0.5">
        <label className="flex items-start gap-[8px] py-[4px] cursor-pointer group min-[350px]:items-center">
          <div className="relative w-[24px] h-[24px] flex items-center justify-center shrink-0">
            <input
              type="checkbox"
              {...register("agreeTerms", { required: "You must agree to the Terms & Conditions" })}
              className="peer w-full h-full absolute inset-0 opacity-0 cursor-pointer z-20"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-100 peer-checked:opacity-0 transition-opacity duration-300 z-10">
              <Image src={squareImg} alt="" width={24} height={24} className="w-[24px] h-[24px] object-contain" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
              <div className="w-[17px] h-[17px] bg-[#0659C4] rounded-[3px] flex items-center justify-center border border-[#0659C4] transition-all duration-300">
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
          <span className="text-[14px] leading-normal font-normal text-[#475569] group-hover:text-[#0659C4] transition-colors duration-200">
            I agree to the Terms & Conditions<span className="text-[#EB001B]">*</span>
          </span>
        </label>
        {errors.agreeTerms && (
          <span className="text-xs text-rose-500 px-[32px] font-medium leading-none mb-1">{errors.agreeTerms.message}</span>
        )}
      </div>

      {/* Privacy Policy */}
      <div className="flex flex-col gap-0.5">
        <label className="flex items-start gap-[8px] py-[4px] cursor-pointer group min-[350px]:items-center">
          <div className="relative w-[24px] h-[24px] flex items-center justify-center shrink-0">
            <input
              type="checkbox"
              {...register("agreePrivacy", { required: "You must agree to the Privacy Policy" })}
              className="peer w-full h-full absolute inset-0 opacity-0 cursor-pointer z-20"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-100 peer-checked:opacity-0 transition-opacity duration-300 z-10">
              <Image src={squareImg} alt="" width={24} height={24} className="w-[24px] h-[24px] object-contain" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
              <div className="w-[17px] h-[17px] bg-[#0659C4] rounded-[3px] flex items-center justify-center border border-[#0659C4] transition-all duration-300">
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
          <span className="text-[14px] leading-normal font-normal text-[#475569] group-hover:text-[#0659C4] transition-colors duration-200">
            I agree to the Privacy Policy<span className="text-[#EB001B]">*</span>
          </span>
        </label>
        {errors.agreePrivacy && (
          <span className="text-xs text-rose-500 px-[32px] font-medium leading-none mb-1">{errors.agreePrivacy.message}</span>
        )}
      </div>

      {/* Shipping & Refund Policy */}
      <div className="flex flex-col gap-0.5">
        <label className="flex items-start gap-[8px] py-[4px] cursor-pointer group min-[350px]:items-center">
          <div className="relative w-[24px] h-[24px] flex items-center justify-center shrink-0">
            <input
              type="checkbox"
              {...register("agreeShipping", { required: "You must agree to the Shipping & Refund Policy" })}
              className="peer w-full h-full absolute inset-0 opacity-0 cursor-pointer z-20"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-100 peer-checked:opacity-0 transition-opacity duration-300 z-10">
              <Image src={squareImg} alt="" width={24} height={24} className="w-[24px] h-[24px] object-contain" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
              <div className="w-[17px] h-[17px] bg-[#0659C4] rounded-[3px] flex items-center justify-center border border-[#0659C4] transition-all duration-300">
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
          <span className="text-[14px] leading-normal font-normal text-[#475569] group-hover:text-[#0659C4] transition-colors duration-200">
            I agree to the Shipping & Refund Policy<span className="text-[#EB001B]">*</span>
          </span>
        </label>
        {errors.agreeShipping && (
          <span className="text-xs text-rose-500 px-[32px] font-medium leading-none mb-1">{errors.agreeShipping.message}</span>
        )}
      </div>
    </section>
  );
}
