"use client";

import React from "react";

interface PriceBreakdownProps {
  subtotal: number;
  couponDiscount: number;
  appliedCoupon: string;
  total: number;
}

export function PriceBreakdown({
  subtotal,
  couponDiscount,
  appliedCoupon,
  total,
}: PriceBreakdownProps) {
  return (
    <div className="flex flex-col gap-[10px] w-full border-t border-[#E2E8F0] pt-4">
      <div className="flex justify-between items-center h-[17px]">
        <span className="font-normal text-[14px] text-[#64748B]">Subtotal</span>
        <span className="font-medium text-[14px] text-[#022348]">${subtotal}</span>
      </div>

      {couponDiscount > 0 && (
        <div className="flex justify-between items-center h-[17px]">
          <span className="font-normal text-[14px] text-[#64748B]">Discount ({appliedCoupon})</span>
          <span className="font-medium text-[14px] text-emerald-600">-${couponDiscount}</span>
        </div>
      )}

      <div className="flex justify-between items-center h-[17px]">
        <span className="font-normal text-[14px] text-[#64748B]">Shipping</span>
        <span className="font-semibold text-[14px] text-emerald-600">FREE</span>
      </div>

      <div className="flex justify-between items-center h-[17px]">
        <span className="font-normal text-[14px] text-[#64748B]">Tax</span>
        <span className="font-medium text-[14px] text-[#022348]">$0.00</span>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center h-[29px] border-t border-dashed border-[#E2E8F0] pt-3.5 mt-2">
        <span className="font-semibold text-[15px] text-[#111111]">Total</span>
        <span className="font-bold text-[24px] leading-[29px] text-[#022348]">${total}</span>
      </div>
    </div>
  );
}
