"use client";

import React from "react";
import { cn } from "@/lib/helper/utils";

export interface Product {
  id: string | number;
  tenant_id?: number | null;
  name: string;
  description?: string;
  short_description?: string;
  long_description?: string;
  medId?: string;
  parentMedId?: string;
  authMedId?: string;
  campaign_product_id?: number;
  category?: string;
  secondaryCategory?: string;
  price: string | number;
  image?: string;
  model?: boolean;
  type?: string;
  popular?: boolean;
  pharmacy_id?: number;
  lfProductID?: number;
  lfdrugName?: string;
  lfdrugStrength?: string;
  lfquantity?: string | number;
  lfquantityUnits?: string;
  lfdrugForm?: string;
  instructions?: string | string[];
  refills?: string;
  daysSupply?: number;
  otc?: boolean;
  trial?: boolean;
  displayName?: string;
  shipping?: string;
  pendingApproval?: boolean;
  pendingChanges?: any;
  portalDisplay?: boolean;
  image_source?: any;
  createdAt?: string;
  updatedAt?: string;

  // Mock fields (optional)
  dosage?: string;
  strength?: string;
  quantity?: number;
  available?: boolean;
  requires_prescription?: boolean;
  side_effects?: string[];
  contraindications?: string[];
  created_at?: string;
  updated_at?: string;
}

interface MedicationPlanSelectorProps {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  onSelect: (p: Product) => void;
}

export function MedicationPlanSelector({
  products,
  selectedProduct,
  loading,
  error,
  onSelect,
}: MedicationPlanSelectorProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [showScrollUp, setShowScrollUp] = React.useState(false);
  const [showScrollDown, setShowScrollDown] = React.useState(false);

  const handleScroll = React.useCallback(() => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      setShowScrollUp(scrollTop > 10);
      setShowScrollDown(scrollHeight - scrollTop - clientHeight > 10);
    }
  }, []);

  // Set up scroll listener triggers when products change
  React.useEffect(() => {
    if (products.length > 4) {
      const timer = setTimeout(() => {
        handleScroll();
      }, 150);
      return () => clearTimeout(timer);
    } else {
      setShowScrollUp(false);
      setShowScrollDown(false);
    }
  }, [products, handleScroll]);

  return (
    <div className="flex flex-col gap-4 w-full">
      {loading ? (
        /* Loading Skeletons */
        <div className="flex flex-col gap-3.5">
          {[1, 2].map((i) => (
            <div key={i} className="border border-slate-100 rounded-xl p-4 space-y-3 animate-pulse">
              <div className="flex justify-between items-center">
                <div className="h-5 w-44 bg-slate-200 rounded"></div>
                <div className="h-5 w-16 bg-slate-200 rounded"></div>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded"></div>
              <div className="h-3 w-2/3 bg-slate-100 rounded"></div>
              <div className="flex gap-2 pt-1">
                <div className="h-4 w-16 bg-slate-100 rounded"></div>
                <div className="h-4 w-20 bg-slate-100 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="p-4 border border-rose-100 rounded-xl bg-rose-50 text-rose-700 text-sm">
          {error}
        </div>
      ) : (
        /* Relative Wrapper for absolute indicators */
        <div className="relative w-full">
          {/* Scroll Up Indicator - shows up when scrolling down */}
          <div
            className={cn(
              "absolute top-3 left-1/2 -translate-x-1/2 z-10 transition-all duration-300 pointer-events-none",
              showScrollUp ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-2 scale-90"
            )}
          >
            <div className="bg-[#022348]/90 backdrop-blur-md text-white text-[10px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border border-white/10">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
              <span>More plans above</span>
            </div>
          </div>

          {/* Scroll Down Indicator - shows down when going up */}
          <div
            className={cn(
              "absolute bottom-3 left-1/2 -translate-x-1/2 z-10 transition-all duration-300 pointer-events-none",
              showScrollDown ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-90"
            )}
          >
            <div className="bg-[#022348]/90 backdrop-blur-md text-white text-[10px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border border-white/10">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
              <span>More plans below</span>
            </div>
          </div>


          <div
            ref={containerRef}
            onScroll={handleScroll}
            className={cn(
              "flex flex-col gap-3 p-1 -m-1",
              products.length > 4 && "max-h-[500px] overflow-y-auto pr-1.5 premium-scrollbar scroll-smooth"
            )}
          >
            {products.map((p) => {
              const isSelected = selectedProduct?.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => onSelect(p)}
                  className={cn(
                    "relative border rounded-xl p-4 cursor-pointer transition-all duration-300 flex flex-col gap-2 bg-white",
                    isSelected
                      ? "border-[#0659C4] bg-[#0659C4]/[0.02] ring-1 ring-[#0659C4] shadow-sm shadow-[#0659C4]/5 scale-[1.01]"
                      : "border-[#E2E8F0] hover:border-[#0659C4]/40"
                  )}
                >
                  {/* Selection Glow Indicator */}
                  {isSelected && (
                    <span className="absolute top-3.5 right-4 w-5 h-5 rounded-full bg-[#0659C4] flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  )}

                  <div className="flex justify-between items-start pr-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[16px] text-[#022348]">
                          {p.name || p.displayName}
                        </h3>
                        {p.id === "prod_semaglutide_standard" && (
                          <span className="bg-pink-50 text-[#C32E6D] text-[10px] font-bold px-2 py-0.5 rounded-full border border-pink-100">
                            Popular
                          </span>
                        )}
                        {p.id === "prod_tirzepatide_premium" && (
                          <span className="bg-indigo-50 text-[#0659C4] text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-100">
                            High Efficacy
                          </span>
                        )}
                      </div>
                      <p className="text-[12px] text-[#64748B] mt-0.5 leading-normal max-w-[280px]">
                        {p.description || p.short_description || p.long_description || ""}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-bold text-[18px] text-[#022348]">
                        ${p.price}
                      </span>
                      <span className="text-[11px] text-[#94A3B8] block mt-0.5">/month</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 pt-2 border-t border-slate-50 text-[11px] text-[#475569]">
                    <span className="flex items-center gap-1">
                      <span className="font-semibold text-[#022348]">Dose:</span> {p.dosage || p.lfdrugStrength || "Weekly"}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                    <span className="flex items-center gap-1">
                      <span className="font-semibold text-[#022348]">Supply:</span> {p.strength || (p.daysSupply ? `${p.daysSupply}-day supply` : "30-day supply")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
