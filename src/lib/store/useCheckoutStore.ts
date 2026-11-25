import { create } from "zustand";
import { Product } from "@/app/(site)/complete/components/MedicationPlanSelector";

export interface CheckoutState {
  // State
  selectedProduct: Product | null;
  couponInput: string;
  appliedCoupon: string;
  couponDiscount: number;
  couponMessage: string;
  validationWarning: React.ReactNode | null;
  lastSubmittedLead: string | null;
  showSuccessModal: boolean;

  // Payment Method States (preserved for system integrity)
  paymentMethod: string;
  isSavedExpanded: boolean;
  isNewExpanded: boolean;
  selectedCard: string;
  newCardNumber: string;
  newCardExpiry: string;
  newCardCvc: string;
  saveNewCard: boolean;

  // Actions
  setSelectedProduct: (product: Product | null) => void;
  setCouponInput: (val: string) => void;
  setAppliedCoupon: (code: string) => void;
  setCouponDiscount: (discount: number) => void;
  setCouponMessage: (msg: string) => void;
  setValidationWarning: (warning: React.ReactNode | null) => void;
  setLastSubmittedLead: (lead: string | null) => void;
  setShowSuccessModal: (show: boolean) => void;
  setPaymentMethod: (val: string) => void;
  setIsSavedExpanded: (val: boolean) => void;
  setIsNewExpanded: (val: boolean) => void;
  setSelectedCard: (val: string) => void;
  setNewCardNumber: (val: string) => void;
  setNewCardExpiry: (val: string) => void;
  setNewCardCvc: (val: string) => void;
  setSaveNewCard: (val: boolean) => void;

  applyCoupon: (code: string) => void;
  resetCheckout: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  selectedProduct: null,
  couponInput: "",
  appliedCoupon: "",
  couponDiscount: 0,
  couponMessage: "",
  validationWarning: null,
  lastSubmittedLead: null,
  showSuccessModal: false,

  paymentMethod: "saved",
  isSavedExpanded: false,
  isNewExpanded: false,
  selectedCard: "8785",
  newCardNumber: "",
  newCardExpiry: "",
  newCardCvc: "",
  saveNewCard: false,

  setSelectedProduct: (product) => set({ selectedProduct: product }),
  setCouponInput: (val) => set({ couponInput: val }),
  setAppliedCoupon: (code) => set({ appliedCoupon: code }),
  setCouponDiscount: (discount) => set({ couponDiscount: discount }),
  setCouponMessage: (msg) => set({ couponMessage: msg }),
  setValidationWarning: (warning) => set({ validationWarning: warning }),
  setLastSubmittedLead: (lead) => set({ lastSubmittedLead: lead }),
  setShowSuccessModal: (show) => set({ showSuccessModal: show }),
  setPaymentMethod: (val) => set({ paymentMethod: val }),
  setIsSavedExpanded: (val) => set({ isSavedExpanded: val }),
  setIsNewExpanded: (val) => set({ isNewExpanded: val }),
  setSelectedCard: (val) => set({ selectedCard: val }),
  setNewCardNumber: (val) => set({ newCardNumber: val }),
  setNewCardExpiry: (val) => set({ newCardExpiry: val }),
  setNewCardCvc: (val) => set({ newCardCvc: val }),
  setSaveNewCard: (val) => set({ saveNewCard: val }),

  applyCoupon: (code) => {
    const upperCode = code.trim().toUpperCase();
    if (!upperCode) return;

    let discount = 94;
    let msg = `Promo code ${upperCode} applied: $94.00 off!`;

    if (upperCode === "MOVY50") {
      discount = 50;
      msg = "Coupon MOVY50 applied: $50.00 off!";
    } else if (upperCode === "WELCOME94" || upperCode === "MOVY94") {
      discount = 94;
      msg = `Coupon ${upperCode} applied: $94.00 off!`;
    } else if (upperCode === "DOSABLE100" || upperCode === "FREE100") {
      discount = 100;
      msg = `Coupon ${upperCode} applied: $100.00 off!`;
    }

    set({
      appliedCoupon: upperCode,
      couponDiscount: discount,
      couponMessage: msg,
      couponInput: "",
    });
  },

  resetCheckout: () => set({
    selectedProduct: null,
    couponInput: "",
    appliedCoupon: "",
    couponDiscount: 0,
    couponMessage: "",
    validationWarning: null,
    lastSubmittedLead: null,
    showSuccessModal: false,
    paymentMethod: "saved",
    isSavedExpanded: false,
    isNewExpanded: false,
    selectedCard: "8785",
    newCardNumber: "",
    newCardExpiry: "",
    newCardCvc: "",
    saveNewCard: false,
  }),
}));
