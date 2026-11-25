"use client";

import React from "react";
import { cn } from "@/lib/helper/utils";
import { useCheckout } from "@/lib/hooks/useCheckout";

// Modular SOLID components
import { DeliveryAddressForm } from "./components/DeliveryAddressForm";
import { PaymentMethodSelector } from "./components/PaymentMethodSelector";
import { LegalConsentCheckboxes } from "./components/LegalConsentCheckboxes";
import { MedicationPlanSelector } from "./components/MedicationPlanSelector";
import { CouponApplyForm } from "./components/CouponApplyForm";
import { PriceBreakdown } from "./components/PriceBreakdown";
import { OrderSuccessModal } from "./components/OrderSuccessModal";

function CheckoutFormContent() {
  const {
    register,
    errors,
    isValid,
    watch,
    setValue,
    getValues,
    products,
    selectedProduct,
    setSelectedProduct,
    couponInput,
    setCouponInput,
    appliedCoupon,
    couponDiscount,
    couponMessage,
    validationWarning,
    showSuccessModal,
    setShowSuccessModal,
    paymentMethod,
    setPaymentMethod,
    isSavedExpanded,
    setIsSavedExpanded,
    isNewExpanded,
    setIsNewExpanded,
    selectedCard,
    setSelectedCard,
    newCardNumber,
    setNewCardNumber,
    newCardExpiry,
    setNewCardExpiry,
    newCardCvc,
    setNewCardCvc,
    saveNewCard,
    setSaveNewCard,
    handleApplyCoupon,
    onSubmit,
    submitting,
    activeSessionId,
    loadingProducts,
    productsError,
    subtotal,
    total,
    watchedFirstName,
    submitLead,
  } = useCheckout();

  return (
    <div className="min-h-screen bg-slate-50 font-sf flex flex-col text-[#111111] antialiased">
      {/* Dynamic Sub-header detailing Session link if active */}
      {activeSessionId && (
        <div className="bg-[#0659C4]/10 border-b border-[#0659C4]/20 py-2.5 px-4 text-center">
          <p className="text-xs sm:text-sm font-medium text-[#0659C4] flex items-center justify-center gap-1.5 animate-pulse">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            Staging Medical Session Active:{" "}
            <span className="font-mono bg-white px-2 py-0.5 rounded border border-[#0659C4]/30">
              {activeSessionId}
            </span>
          </p>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex pt-[40px] pb-[80px] px-4 justify-center">
        <div className="flex flex-col-reverse lg:flex-row gap-[40px] w-full max-w-[1200px]">
          {/* Left Column (Forms) */}
          <div className="flex-1 max-w-[672px] flex flex-col gap-[32px] py-[32px] px-6 bg-white border border-[#E2E8F0] shadow-sm rounded-[24px]">
            {validationWarning && (
              <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm font-medium rounded-xl flex items-start gap-2.5 animate-in fade-in slide-in-from-top-2 duration-300">
                <svg
                  className="w-5 h-5 shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                {validationWarning}
              </div>
            )}

            {/* Form Part 1: Delivery Address Form Component */}
            <DeliveryAddressForm
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              onFieldBlur={() => submitLead(false)}
            />

            {/* Form Part 2: Payment Selector Component (Hidden for Checkout Champ integration) */}
            <div className="hidden">
              <PaymentMethodSelector
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                selectedCard={selectedCard}
                setSelectedCard={setSelectedCard}
                isSavedExpanded={isSavedExpanded}
                setIsSavedExpanded={setIsSavedExpanded}
                isNewExpanded={isNewExpanded}
                setIsNewExpanded={setIsNewExpanded}
                newCardNumber={newCardNumber}
                setNewCardNumber={setNewCardNumber}
                newCardExpiry={newCardExpiry}
                setNewCardExpiry={setNewCardExpiry}
                newCardCvc={newCardCvc}
                setNewCardCvc={setNewCardCvc}
                saveNewCard={saveNewCard}
                setSaveNewCard={setSaveNewCard}
              />
            </div>

            {/* Form Part 3: Legal Consent Checkboxes Component */}
            <LegalConsentCheckboxes register={register} errors={errors} />

            {/* Order Action Button */}
            <button
              onClick={() => onSubmit(getValues())}
              disabled={!isValid || !selectedProduct || submitting}
              className={cn(
                "flex items-center justify-center py-[14px] w-full bg-[#0659C4] hover:bg-[#0549A3] text-white rounded-full btn-bounce cursor-pointer font-semibold text-[18px] shadow-lg shadow-[#0659C4]/20 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
              )}
            >
              {submitting ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Completing Session & Redirecting...
                </div>
              ) : (
                "Complete & Proceed to Checkout"
              )}
            </button>
          </div>

          {/* Right Column (Order Summary, Plan Selection & Invoices) */}
          <div className="w-full lg:w-[488px] shrink-0">
            <div className="border border-[#E2E8F0] rounded-[24px] p-6 md:p-8 flex flex-col gap-6 bg-white shadow-sm sticky top-24">
              <div className="flex items-center justify-between">
                <h2 className="text-[18px] leading-[21px] font-semibold text-[#111111] flex items-center">
                  Select Medication Plan
                </h2>
                <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Prescribed
                  Online
                </span>
              </div>

              {/* Sidebar Part 1: Medication Plan Card Selector */}
              <MedicationPlanSelector
                products={products}
                selectedProduct={selectedProduct}
                loading={loadingProducts}
                error={productsError ? productsError.message : null}
                onSelect={setSelectedProduct}
              />

              {/* Sidebar Part 2: Coupon Apply Input Form */}
              <CouponApplyForm
                couponInput={couponInput}
                setCouponInput={setCouponInput}
                onApply={handleApplyCoupon}
                couponMessage={couponMessage}
              />

              {/* Sidebar Part 3: Invoice Price Breakdown */}
              <PriceBreakdown
                subtotal={subtotal}
                couponDiscount={couponDiscount}
                appliedCoupon={appliedCoupon}
                total={total}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Screen Success Modal Overlay */}
      <OrderSuccessModal
        show={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          window.location.href = "/";
        }}
        firstName={watchedFirstName}
        selectedProduct={selectedProduct}
        paymentMethod={paymentMethod}
        amountPaid={total}
        sessionId={activeSessionId}
      />
    </div>
  );
}

export default function CompletePage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sf text-[#111111] antialiased">
          <div className="flex flex-col items-center gap-3">
            <svg className="animate-spin h-8 w-8 text-[#0659C4]" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-sm font-medium text-slate-500">Loading Checkout...</p>
          </div>
        </div>
      }
    >
      <CheckoutFormContent />
    </React.Suspense>
  );
}
