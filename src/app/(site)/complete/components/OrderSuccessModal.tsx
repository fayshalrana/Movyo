"use client";

import React from "react";
import { Product } from "./MedicationPlanSelector";

interface OrderSuccessModalProps {
  show: boolean;
  onClose: () => void;
  firstName: string;
  selectedProduct: Product | null;
  paymentMethod: string;
  amountPaid: number;
  sessionId: string | null;
}

export function OrderSuccessModal({
  show,
  onClose,
  firstName,
  selectedProduct,
  paymentMethod,
  amountPaid,
  sessionId,
}: OrderSuccessModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="relative bg-white rounded-[24px] shadow-2xl max-w-[500px] w-full p-8 text-center border border-slate-100 flex flex-col items-center gap-6 animate-in zoom-in-95 duration-300">
        
        {/* Dynamic visual checkmark animation */}
        <div className="relative w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 animate-bounce">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
          <span className="absolute -inset-1 rounded-full border-2 border-emerald-400 border-dashed animate-spin"></span>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-[#022348]">Order Placed Successfully!</h3>
          <p className="text-sm text-[#64748B] leading-relaxed max-w-[340px] mx-auto">
            Thank you, <span className="font-semibold text-[#111111]">{firstName}</span>. Your prescription request has been successfully created.
          </p>
        </div>

        {/* Micro receipt panel */}
        <div className="w-full bg-[#F8FAFC] border border-slate-100 rounded-2xl p-4 text-left space-y-2.5">
          <div className="flex justify-between text-xs text-[#64748B]">
            <span>Medication Plan</span>
            <span className="font-semibold text-[#022348]">{selectedProduct?.name}</span>
          </div>
          <div className="flex justify-between text-xs text-[#64748B]">
            <span>Supply Period</span>
            <span className="font-semibold text-[#022348]">Monthly Plan</span>
          </div>
          <div className="flex justify-between text-xs text-[#64748B]">
            <span>Paid via {paymentMethod === "saved" ? "Google Pay" : paymentMethod === "cash" ? "Cash" : "Credit Card"}</span>
            <span className="font-bold text-[#022348]">${amountPaid}</span>
          </div>
          {sessionId && (
            <div className="flex justify-between text-[11px] text-[#64748B] border-t border-slate-200/60 pt-2 font-mono">
              <span>Session Key</span>
              <span>{sessionId}</span>
            </div>
          )}
        </div>

        {/* Timeline progression */}
        <div className="w-full space-y-3 text-left">
          <h4 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Next Steps to Go-Live:</h4>
          <div className="grid grid-cols-1 gap-2.5">
            {[
              { step: "1", title: "Complete Medical Intake", desc: "Our board-certified US doctors review your details." },
              { step: "2", title: "Upload Identity Verification", desc: "Securely upload ID & photos in your Patient Portal." },
              { step: "3", title: "Pharmacy Dispense", desc: "Discreet thermal shipping straight to your doorstep." }
            ].map((item) => (
              <div key={item.step} className="flex gap-3">
                <span className="w-5 h-5 rounded-full bg-[#0659C4]/10 text-[#0659C4] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  {item.step}
                </span>
                <div>
                  <p className="text-xs font-semibold text-[#022348]">{item.title}</p>
                  <p className="text-[11px] text-[#64748B]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pulse Button CTA */}
        <button
          onClick={onClose}
          className="w-full py-3.5 bg-[#0659C4] hover:bg-[#0549A3] text-white rounded-full font-semibold text-sm transition-all duration-200 active:scale-[0.98] shadow-lg shadow-[#0659C4]/20 animate-pulse"
        >
          Go to Patient Portal
        </button>
      </div>
    </div>
  );
}
