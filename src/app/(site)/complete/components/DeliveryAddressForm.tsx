"use client";

import React from "react";
import Image from "next/image";
import {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import { CheckoutFormData } from "@/lib/hooks/useCheckout";
import usFlagImg from "@/assets/us-flag.png";
import { STATES_CITIES, getCityCode } from "@/lib/helper/statesCities";
import { cn } from "@/lib/helper/utils";

import { DatePicker } from "@/components/ui";

interface DeliveryAddressFormProps {
  register: UseFormRegister<CheckoutFormData>;
  errors: FieldErrors<CheckoutFormData>;
  watch: UseFormWatch<CheckoutFormData>;
  setValue: UseFormSetValue<CheckoutFormData>;
  onFieldBlur?: () => void;
}

export function DeliveryAddressForm({
  register,
  errors,
  watch,
  setValue,
  onFieldBlur,
}: DeliveryAddressFormProps) {
  // Watch State and City to render dynamic dependent select dropdowns
  const selectedState = watch("lead_state");
  const currentCityValue = watch("city");

  const stateData = STATES_CITIES[selectedState];
  const cities = stateData ? stateData.cities : [];

  // Combine static list of full names with any pre-populated value
  const displayCities = [...cities];
  if (currentCityValue) {
    const hasMatch = displayCities.some(
      (c) => getCityCode(c) === currentCityValue || c === currentCityValue,
    );
    if (!hasMatch) {
      displayCities.unshift(currentCityValue);
    }
  }

  // Synchronize pre-populated hook-form state (e.g., restored session) back to custom text field
  const registeredBirthday = watch("birthday");

  // Safely synchronize and validate the dependent City dropdown value when State changes to prevent React Hook Form race conditions
  React.useEffect(() => {
    if (selectedState) {
      const stateData = STATES_CITIES[selectedState];
      const citiesList = stateData ? stateData.cities : [];
      if (citiesList.length > 0) {
        // If current city value is valid for the current state (either as code or name), keep it. Otherwise, default to first city's code.
        const hasValidCity = citiesList.some(
          (c) => getCityCode(c) === currentCityValue || c === currentCityValue,
        );
        if (!hasValidCity) {
          setValue("city", getCityCode(citiesList[0]), {
            shouldValidate: true,
          });
        }
      } else {
        setValue("city", "", { shouldValidate: false });
      }
    } else {
      setValue("city", "", { shouldValidate: false });
    }
  }, [selectedState, currentCityValue, setValue]);

  // Custom Input Styling Base Tokens
  const hasError = !!errors.birthday;
  const inputBaseStyle =
    "h-[46px] border rounded-[12px] px-[16px] placeholder:text-[#94A3B8] font-[300] text-[14px] bg-white focus:outline-none focus:ring-1 transition-all duration-200 text-[#111111]";
  const stateStyle = hasError
    ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500"
    : "border-[#E2E8F0] focus:border-[#0659C4] focus:ring-[#0659C4]";

  return (
    <section className="flex flex-col gap-[16px] w-full rounded-[12px]">
      <h2 className="text-[20px] leading-[24px] font-semibold flex items-center text-[#111111] font-sf">
        Delivery Address
      </h2>

      <div className="flex flex-col gap-[16px]">
        {/* First & Last Name */}
        <div className="flex flex-col sm:flex-row w-full gap-[12px]">
          <div className="flex-1 flex flex-col gap-1">
            <input
              type="text"
              placeholder="First Name"
              {...register("first_name", {
                required: "First Name is required to complete intake",
              })}
              onBlur={onFieldBlur}
              className={`w-full h-[46px] border rounded-[12px] px-[16px] placeholder:text-[#94A3B8] font-[300] text-[14px] bg-transparent focus:outline-none focus:ring-1 transition-all duration-200 ${
                errors.first_name
                  ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500"
                  : "border-[#E2E8F0] focus:border-[#0659C4] focus:ring-[#0659C4]"
              }`}
            />
            {errors.first_name && (
              <span className="text-xs text-rose-500 px-1 font-medium">
                {errors.first_name.message}
              </span>
            )}
          </div>

          <div className="flex-1 flex flex-col gap-1">
            <input
              type="text"
              placeholder="Last Name"
              {...register("last_name", {
                required: "Last Name is required to complete intake",
              })}
              onBlur={onFieldBlur}
              className={`w-full h-[46px] border rounded-[12px] px-[16px] placeholder:text-[#94A3B8] font-[300] text-[14px] bg-transparent focus:outline-none focus:ring-1 transition-all duration-200 ${
                errors.last_name
                  ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500"
                  : "border-[#E2E8F0] focus:border-[#0659C4] focus:ring-[#0659C4]"
              }`}
            />
            {errors.last_name && (
              <span className="text-xs text-rose-500 px-1 font-medium">
                {errors.last_name.message}
              </span>
            )}
          </div>
        </div>

        {/* Email & Phone */}
        <div className="flex flex-col sm:flex-row w-full gap-[12px]">
          <div className="flex-1 flex flex-col gap-1">
            <input
              type="email"
              placeholder="Email Address"
              {...register("email", {
                required: "Email address is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address",
                },
              })}
              onBlur={onFieldBlur}
              className={`w-full h-[46px] border rounded-[12px] px-[16px] placeholder:text-[#94A3B8] font-[300] text-[14px] bg-transparent focus:outline-none focus:ring-1 transition-all duration-200 ${
                errors.email
                  ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500"
                  : "border-[#E2E8F0] focus:border-[#0659C4] focus:ring-[#0659C4]"
              }`}
            />
            {errors.email && (
              <span className="text-xs text-rose-500 px-1 font-medium">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex-1 flex flex-col gap-1">
            <div
              className={`flex items-center h-[46px] border rounded-[12px] px-[16px] gap-[8px] bg-transparent focus-within:ring-1 transition-all duration-200 ${
                errors.phone
                  ? "border-rose-300 focus-within:border-rose-500 focus-within:ring-rose-500"
                  : "border-[#E2E8F0] focus-within:border-[#0659C4] focus-within:ring-[#0659C4]"
              }`}
            >
              <div className="flex items-center gap-[6px] shrink-0 cursor-pointer">
                <Image
                  src={usFlagImg}
                  alt="US Flag"
                  className="w-[18px] h-auto object-cover shrink-0 rounded-[2px]"
                />
                <span className="text-[14px] font-normal text-[#111111] leading-none mt-px">
                  +1
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#94A3B8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 ml-1"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <div className="w-px h-[20px] bg-[#E2E8F0] shrink-0 mx-[4px]"></div>
              <input
                type="tel"
                placeholder="(555) 000-0000"
                {...register("phone", {
                  required: "Phone number is required",
                  validate: (value) => {
                    const digits = value.replace(/\D/g, "");
                    if (digits.length !== 10) {
                      return "Phone must be exactly 10 digits (e.g. (555) 123-4567)";
                    }
                    return true;
                  },
                })}
                onBlur={onFieldBlur}
                className="flex-1 h-full min-w-0 font-[300] text-[14px] text-[#111111] placeholder:text-[#94A3B8] bg-transparent focus:outline-none"
              />
            </div>
            {errors.phone && (
              <span className="text-xs text-rose-500 px-1 font-medium">
                {errors.phone.message}
              </span>
            )}
          </div>
        </div>

        {/* Premium Google-Style Date of Birth Input */}
        <DatePicker
          value={registeredBirthday}
          onChange={(isoDate) =>
            setValue("birthday", isoDate, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          error={errors.birthday?.message}
          id="birthday"
          name="birthday"
        />

        {/* Hidden element registered to react-hook-form to preserve validation */}
        <input
          type="hidden"
          {...register("birthday", {
            required: "Date of Birth is required",
            validate: (value) => {
              if (!value) return "Date of Birth is required";
              const regex = /^\d{4}-\d{2}-\d{2}$/;
              if (!regex.test(value)) {
                return "Please complete Date of Birth selection (MM/DD/YYYY)";
              }
              const [y, m, d] = value.split("-").map(Number);
              const birthDate = new Date(y, m - 1, d);
              if (
                isNaN(birthDate.getTime()) ||
                birthDate.getFullYear() !== y ||
                birthDate.getMonth() !== m - 1 ||
                birthDate.getDate() !== d
              ) {
                return "Please enter a valid calendar date";
              }
              const today = new Date();
              let age = today.getFullYear() - birthDate.getFullYear();
              const monthDiff = today.getMonth() - birthDate.getMonth();
              if (
                monthDiff < 0 ||
                (monthDiff === 0 && today.getDate() < birthDate.getDate())
              ) {
                age--;
              }
              if (age < 18) {
                return "You must be at least 18 years old to proceed";
              }
              return true;
            },
          })}
        />

        {/* Street Address */}
        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="Street Address"
            {...register("address", { required: "Street Address is required" })}
            className={`w-full h-[46px] border rounded-[12px] px-[16px] placeholder:text-[#94A3B8] font-[300] text-[14px] bg-transparent focus:outline-none focus:ring-1 transition-all duration-200 ${
              errors.address
                ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500"
                : "border-[#E2E8F0] focus:border-[#0659C4] focus:ring-[#0659C4]"
            }`}
          />
          {errors.address && (
            <span className="text-xs text-rose-500 px-1 font-medium">
              {errors.address.message}
            </span>
          )}
        </div>

        {/* City, State, Zip Code */}
        <div className="flex flex-col sm:flex-row w-full gap-[12px]">
          {/* State */}
          <div className="flex-1 flex flex-col gap-1">
            <div className="relative">
              <select
                {...register("lead_state", {
                  required: "State is required",
                  onChange: () => {
                    if (onFieldBlur) onFieldBlur();
                  },
                })}
                onBlur={onFieldBlur}
                className={`w-full h-[46px] border rounded-[12px] px-[16px] font-[300] text-[14px] bg-white text-[#111111] focus:outline-none focus:ring-1 transition-all duration-200 appearance-none pr-[36px] cursor-pointer ${
                  errors.lead_state
                    ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500"
                    : "border-[#E2E8F0] focus:border-[#0659C4] focus:ring-[#0659C4]"
                }`}
                style={{
                  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                  backgroundSize: "16px",
                }}
              >
                <option value="" disabled>
                  Select State
                </option>
                {Object.entries(STATES_CITIES).map(([code, info]) => (
                  <option key={code} value={code}>
                    {code} - {info.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.lead_state && (
              <span className="text-xs text-rose-500 px-1 font-medium">
                {errors.lead_state.message}
              </span>
            )}
          </div>

          {/* City */}
          <div className="flex-[2] flex flex-col gap-1">
            <div className="relative">
              <select
                {...register("city", {
                  required: "City is required",
                  onChange: () => {
                    if (onFieldBlur) onFieldBlur();
                  },
                })}
                onBlur={onFieldBlur}
                className={`w-full h-[46px] border rounded-[12px] px-[16px] font-[300] text-[14px] bg-white text-[#111111] focus:outline-none focus:ring-1 transition-all duration-200 appearance-none pr-[36px] cursor-pointer ${
                  errors.city
                    ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500"
                    : "border-[#E2E8F0] focus:border-[#0659C4] focus:ring-[#0659C4]"
                }`}
                style={{
                  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                  backgroundSize: "16px",
                }}
              >
                <option value="" disabled>
                  Select City
                </option>
                {displayCities.map((cityOption) => (
                  <option key={cityOption} value={getCityCode(cityOption)}>
                    {cityOption}
                  </option>
                ))}
              </select>
            </div>
            {errors.city && (
              <span className="text-xs text-rose-500 px-1 font-medium">
                {errors.city.message}
              </span>
            )}
          </div>

          {/* Zip Code */}
          <div className="flex-[1.5] flex flex-col gap-1">
            <input
              type="text"
              placeholder="Zip Code"
              {...register("zip_code", {
                required: "Zip Code is required",
                validate: (value) => {
                  const regex = /^\d{5}$/;
                  if (!regex.test(value)) {
                    return "Zip Code must be exactly 5 digits, numbers only";
                  }
                  return true;
                },
              })}
              onBlur={onFieldBlur}
              className={`w-full h-[46px] border rounded-[12px] px-[16px] placeholder:text-[#94A3B8] font-[300] text-[14px] bg-transparent focus:outline-none focus:ring-1 transition-all duration-200 ${
                errors.zip_code
                  ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500"
                  : "border-[#E2E8F0] focus:border-[#0659C4] focus:ring-[#0659C4]"
              }`}
            />
            {errors.zip_code && (
              <span className="text-xs text-rose-500 px-1 font-medium">
                {errors.zip_code.message}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
