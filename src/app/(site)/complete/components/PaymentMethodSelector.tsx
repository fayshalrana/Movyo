"use client";

import React from "react";
import Image from "next/image";
import paymentsImg from "@/assets/payments.png";
import googlepayImg from "@/assets/googlepay.png";
import squareImg from "@/assets/square.png";

interface PaymentMethodSelectorProps {
  paymentMethod: string;
  setPaymentMethod: (val: string) => void;
  selectedCard: string;
  setSelectedCard: (val: string) => void;
  isSavedExpanded: boolean;
  setIsSavedExpanded: (val: boolean) => void;
  isNewExpanded: boolean;
  setIsNewExpanded: (val: boolean) => void;
  newCardNumber: string;
  setNewCardNumber: (val: string) => void;
  newCardExpiry: string;
  setNewCardExpiry: (val: string) => void;
  newCardCvc: string;
  setNewCardCvc: (val: string) => void;
  saveNewCard: boolean;
  setSaveNewCard: (val: boolean) => void;
}

export function PaymentMethodSelector({
  paymentMethod,
  setPaymentMethod,
  selectedCard,
  setSelectedCard,
  isSavedExpanded,
  setIsSavedExpanded,
  isNewExpanded,
  setIsNewExpanded,
  newCardNumber,
  setNewCardNumber,
  newCardExpiry,
  setNewCardExpiry,
  newCardCvc,
  setNewCardCvc,
  saveNewCard,
  setSaveNewCard,
}: PaymentMethodSelectorProps) {
  return (
    <section className="flex flex-col gap-[16px] w-full rounded-[12px]">
      <div className="flex flex-col gap-[8px]">
        <h2 className="text-[20px] leading-[24px] font-semibold text-[#111111]">
          Payment Method
        </h2>
        <p className="text-[14px] leading-[21px] font-normal text-[#64748B]">
          All transactions are secure and encrypted. Credit card information is
          never stored on our servers.
        </p>
      </div>

      <div className="flex flex-col gap-[16px]">
        {/* Saved Payment Method */}
        <div
          className={`border-2 rounded-[12px] transition-all duration-300 p-[16px] flex flex-col gap-[12px] ${
            paymentMethod === "saved"
              ? "border-[#0659C4] bg-[#0659C4]/5"
              : "border-[#E2E8F0]"
          }`}
        >
          <div className="flex flex-row items-center justify-between w-full">
            <div
              className="flex flex-col items-start grow cursor-pointer"
              onClick={() => {
                setPaymentMethod("saved");
                setIsSavedExpanded(!isSavedExpanded);
              }}
            >
              <span className="font-semibold text-[15px] text-[#111111] leading-[150%]">
                Saved Payment Method
              </span>

              {!isSavedExpanded && (
                <div className="flex items-center gap-[8px] mt-1">
                  <span className="text-[12px] text-[#64748B] leading-[150%] font-mono">
                    •••• •••• •••• {selectedCard}
                  </span>
                  <Image
                    src={googlepayImg}
                    alt="Google Pay"
                    className="h-[12px] w-auto object-contain"
                  />
                </div>
              )}
            </div>

            <div
              className="w-[24px] h-[24px] flex items-center justify-center cursor-pointer text-[#94A3B8]"
              onClick={() => {
                setPaymentMethod("saved");
                setIsSavedExpanded(!isSavedExpanded);
              }}
            >
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${
                  isSavedExpanded && paymentMethod === "saved"
                    ? "rotate-180"
                    : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </div>
          </div>

          {paymentMethod === "saved" && isSavedExpanded && (
            <div className="flex flex-col gap-[12px] w-full pt-2 border-t border-[#E2E8F0] animate-in fade-in slide-in-from-top-2 duration-300">
              {/* Radio 1 */}
              <label className="flex flex-row items-center justify-between p-3 rounded-[10px] bg-white border border-[#E2E8F0] cursor-pointer hover:border-[#0659C4]/40 transition-colors duration-200">
                <div className="flex items-center gap-[12px]">
                  <div className="relative w-[20px] h-[20px] flex items-center justify-center shrink-0">
                    <input
                      type="radio"
                      name="saved_card"
                      value="8785"
                      checked={selectedCard === "8785"}
                      onChange={() => setSelectedCard("8785")}
                      className="w-full h-full appearance-none absolute inset-0 cursor-pointer z-10"
                    />
                    <div
                      className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center transition-all duration-300 ${
                        selectedCard === "8785"
                          ? "border-[#0659C4] bg-[#0659C4]"
                          : "border-[#CBD5E1] bg-white"
                      }`}
                    >
                      {selectedCard === "8785" && (
                        <div className="w-[6px] h-[6px] rounded-full bg-white z-10 animate-in zoom-in-50 duration-300"></div>
                      )}
                    </div>
                  </div>
                  <span className="text-[14px] text-[#334155] font-mono leading-[150%]">
                    •••• •••• •••• 8785
                  </span>
                </div>
                <Image
                  src={googlepayImg}
                  alt="Google Pay"
                  className="h-[12px] w-auto object-contain"
                />
              </label>

              {/* Radio 2 */}
              <label className="flex flex-row items-center justify-between p-3 rounded-[10px] bg-white border border-[#E2E8F0] cursor-pointer hover:border-[#0659C4]/40 transition-colors duration-200">
                <div className="flex items-center gap-[12px]">
                  <div className="relative w-[20px] h-[20px] flex items-center justify-center shrink-0">
                    <input
                      type="radio"
                      name="saved_card"
                      value="5677"
                      checked={selectedCard === "5677"}
                      onChange={() => setSelectedCard("5677")}
                      className="w-full h-full appearance-none absolute inset-0 cursor-pointer z-10"
                    />
                    <div
                      className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center transition-all duration-300 ${
                        selectedCard === "5677"
                          ? "border-[#0659C4] bg-[#0659C4]"
                          : "border-[#CBD5E1] bg-white"
                      }`}
                    >
                      {selectedCard === "5677" && (
                        <div className="w-[6px] h-[6px] rounded-full bg-white z-10 animate-in zoom-in-50 duration-300"></div>
                      )}
                    </div>
                  </div>
                  <span className="text-[14px] text-[#334155] font-mono leading-[150%]">
                    •••• •••• •••• 5677
                  </span>
                </div>
                <Image
                  src={googlepayImg}
                  alt="Google Pay"
                  className="h-[12px] w-auto object-contain"
                />
              </label>
            </div>
          )}
        </div>

        {/* Add New Payment Method */}
        <div
          className={`border-2 rounded-[12px] transition-all duration-300 p-[16px] flex flex-col gap-[16px] ${
            paymentMethod === "new"
              ? "border-[#0659C4] bg-[#0659C4]/5"
              : "border-[#E2E8F0]"
          }`}
        >
          <div className="flex flex-row items-center justify-between w-full h-[47px]">
            <div
              className="flex flex-col items-start justify-center h-[47px] cursor-pointer grow"
              onClick={() => {
                setPaymentMethod("new");
                setIsNewExpanded(!isNewExpanded);
              }}
            >
              <span className="font-semibold text-[15px] text-[#111111] leading-[150%]">
                Add New Payment Method
              </span>
              <Image
                src={paymentsImg}
                alt="Payment Methods"
                width={142}
                height={18}
                className="w-[142px] h-[18px] mt-1 object-left object-contain"
              />
            </div>

            <div
              className="flex items-center justify-center w-[24px] h-[24px] cursor-pointer text-[#94A3B8]"
              onClick={() => {
                setPaymentMethod("new");
                setIsNewExpanded(!isNewExpanded);
              }}
            >
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${
                  isNewExpanded && paymentMethod === "new" ? "rotate-180" : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </div>
          </div>

          {paymentMethod === "new" && isNewExpanded && (
            <div className="flex flex-col gap-[16px] w-full pt-4 border-t border-[#E2E8F0] animate-in fade-in slide-in-from-top-2 duration-300">
              {/* Card Number */}
              <div className="flex flex-col items-start justify-center px-[12px] py-[6px] gap-[2px] w-full border border-[#E2E8F0] bg-white rounded-[10px] h-[58px] focus-within:border-[#0659C4] transition-all duration-200">
                <span className="text-[11px] font-medium text-[#64748B] tracking-wider uppercase leading-none">
                  Card Number
                </span>
                <input
                  type="text"
                  maxLength={19}
                  value={newCardNumber}
                  onChange={(e) => setNewCardNumber(e.target.value)}
                  placeholder="4111 2222 3333 4444"
                  className="w-full text-[14px] font-[300] text-[#111111] bg-transparent outline-none ring-0 placeholder:text-[#94A3B8] border-none p-0 leading-[130%]"
                />
              </div>

              {/* Expiration and Security Code Row */}
              <div className="flex flex-row items-center gap-[16px] w-full">
                {/* Expiration */}
                <div className="flex flex-col items-start justify-center px-[12px] py-[6px] gap-[2px] w-full flex-1 border border-[#E2E8F0] bg-white rounded-[10px] h-[58px] focus-within:border-[#0659C4] transition-all duration-200">
                  <span className="text-[11px] font-medium text-[#64748B] tracking-wider uppercase leading-none">
                    Expiration
                  </span>
                  <input
                    type="text"
                    maxLength={5}
                    value={newCardExpiry}
                    onChange={(e) => setNewCardExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full text-[14px] font-[300] text-[#111111] bg-transparent outline-none ring-0 placeholder:text-[#94A3B8] border-none p-0 leading-[130%]"
                  />
                </div>

                {/* Security Code */}
                <div className="flex flex-col items-start justify-center px-[12px] py-[6px] gap-[2px] w-full flex-1 border border-[#E2E8F0] bg-white rounded-[10px] h-[58px] focus-within:border-[#0659C4] transition-all duration-200">
                  <span className="text-[11px] font-medium text-[#64748B] tracking-wider uppercase leading-none">
                    Security Code
                  </span>
                  <input
                    type="password"
                    maxLength={4}
                    value={newCardCvc}
                    onChange={(e) => setNewCardCvc(e.target.value)}
                    placeholder="CVC"
                    className="w-full text-[14px] font-[300] text-[#111111] bg-transparent outline-none ring-0 placeholder:text-[#94A3B8] border-none p-0 leading-[130%]"
                  />
                </div>
              </div>

              {/* Save checkbox */}
              <label className="flex flex-row items-center gap-[8px] py-[4px] w-fit cursor-pointer group mt-[2px]">
                <div className="relative w-[24px] h-[24px] flex items-center justify-center shrink-0">
                  <input
                    type="checkbox"
                    checked={saveNewCard}
                    onChange={(e) => setSaveNewCard(e.target.checked)}
                    className="peer w-full h-full absolute inset-0 opacity-0 cursor-pointer z-20"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-100 peer-checked:opacity-0 transition-opacity duration-300 z-10">
                    <Image
                      src={squareImg}
                      alt=""
                      width={24}
                      height={24}
                      className="w-[24px] h-[24px] object-contain"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                    <div className="w-[17px] h-[17px] bg-[#0659C4] rounded-[3px] flex items-center justify-center border border-[#0659C4] transition-all duration-300">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path
                          d="M1 4L3.5 6.5L9 1"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <span className="text-[14px] text-[#475569] group-hover:text-[#0659C4] transition-colors duration-200">
                  Save for future payments
                </span>
              </label>
            </div>
          )}
        </div>

        {/* Cash on Delivery */}
        <div
          className={`border-2 rounded-[12px] transition-all duration-300 p-[16px] flex flex-col justify-center min-h-[64px] cursor-pointer ${
            paymentMethod === "cash"
              ? "border-[#0659C4] bg-[#0659C4]/5"
              : "border-[#E2E8F0]"
          }`}
          onClick={() => setPaymentMethod("cash")}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col items-start justify-center gap-[4px]">
              <span className="font-semibold text-[15px] text-[#111111] leading-[150%]">
                Cash
              </span>
              <span className="text-[13px] text-[#64748B] text-left leading-normal">
                Pay upon the delivery of your order
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
