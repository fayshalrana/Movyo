import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useQuizStore } from "@/lib/store/useIntakeStore";
import { useCheckoutStore } from "@/lib/store/useCheckoutStore";
import { Product } from "@/app/(site)/complete/components/MedicationPlanSelector";
import {
  createLeadAction,
  completeSessionAction,
  fetchQuestionsAction,
  getSavedAnswerAction,
  getProductsAction,
} from "@/server/actions/intake";
import { STATES_CITIES, getCityCode } from "@/lib/helper/statesCities";
import toast from "react-hot-toast";

export interface CheckoutFormData {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  city: string;
  lead_state: string;
  zip_code: string;
  phone: string;
  birthday: string;
  gender: string;
  agreeTerms: boolean;
  agreePrivacy: boolean;
  agreeShipping: boolean;
}

export const mapApiFieldToFormField = (fe: {
  field: string;
  technical_details?: { field_path?: string };
}): keyof CheckoutFormData | null => {
  const path = fe.technical_details?.field_path?.toLowerCase() || "";
  const name = fe.field?.toLowerCase() || "";

  if (path.includes("first_name") || name.includes("first name") || name === "firstname") return "first_name";
  if (path.includes("last_name") || name.includes("last name") || name === "lastname") return "last_name";
  if (path.includes("birthday") || name.includes("birthday") || name === "birthdate") return "birthday";
  if (path.includes("lead_state") || path.includes("state") || name.includes("state")) return "lead_state";
  if (path.includes("gender") || name.includes("gender") || name === "sex") return "gender";
  if (path.includes("email") || name.includes("email")) return "email";
  if (path.includes("phone") || name.includes("phone")) return "phone";
  if (path.includes("zip_code") || name.includes("zip") || name.includes("postal")) return "zip_code";
  if (path.includes("address") || name.includes("address") || name.includes("street")) return "address";
  if (path.includes("city") || name.includes("city")) return "city";

  return null;
};

export function useCheckout() {
  const { sessionId, answers, questions } = useQuizStore();
  const searchParams = useSearchParams();
  const urlSessionId = searchParams ? searchParams.get("restoresession") : null;
  const activeSessionId = urlSessionId || sessionId || "";

  const {
    selectedProduct,
    setSelectedProduct,
    couponInput,
    setCouponInput,
    appliedCoupon,
    couponDiscount,
    couponMessage,
    validationWarning,
    setValidationWarning,
    lastSubmittedLead,
    setLastSubmittedLead,
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
    applyCoupon,
  } = useCheckoutStore();

  const {
    register,
    setValue,
    getValues,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<CheckoutFormData>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      address: "",
      city: "",
      lead_state: "",
      zip_code: "",
      phone: "",
      birthday: "",
      gender: "",
      agreeTerms: false,
      agreePrivacy: false,
      agreeShipping: false,
    },
    mode: "all",
  });

  const watchedFirstName = watch("first_name");

  const watchedAgreeTerms = watch("agreeTerms");
  const watchedAgreePrivacy = watch("agreePrivacy");
  const watchedAgreeShipping = watch("agreeShipping");
  const errorKeysCount = Object.keys(errors).length;

  useEffect(() => {
    if (!validationWarning) return;

    if (
      watchedAgreeTerms &&
      watchedAgreePrivacy &&
      watchedAgreeShipping &&
      typeof validationWarning === "string" &&
      validationWarning.includes("Please agree to the Terms")
    ) {
      setValidationWarning(null);
    }

    if (
      selectedProduct &&
      typeof validationWarning === "string" &&
      validationWarning.includes("Please select a medication plan")
    ) {
      setValidationWarning(null);
    }

    const isTermsWarning = typeof validationWarning === "string" && validationWarning.includes("Please agree to the Terms");
    const isProductWarning = typeof validationWarning === "string" && validationWarning.includes("Please select a medication plan");

    if (errorKeysCount === 0 && !isTermsWarning && !isProductWarning) {
      setValidationWarning(null);
    }
  }, [
    errorKeysCount,
    watchedAgreeTerms,
    watchedAgreePrivacy,
    watchedAgreeShipping,
    selectedProduct,
    validationWarning,
    setValidationWarning,
  ]);


  // React Query to fetch products list
  const {
    data: products = [],
    isLoading: loadingProducts,
    error: productsError,
  } = useQuery<Product[]>({
    queryKey: ["checkout-products"],
    queryFn: getProductsAction as any,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Pre-select the first product if products are available and none is currently selected
  useEffect(() => {
    if (products.length > 0 && !selectedProduct) {
      setSelectedProduct(products[0]);
    }
  }, [products, selectedProduct, setSelectedProduct]);

  // Helper to extract and normalize gender
  const getNormalizedGender = (): string => {
    if (answers && answers.length > 0 && questions) {
      let foundGender: string | null = null;
      answers.forEach((ans) => {
        const q = questions.get(ans.questionId);
        if (!q) return;

        const title = q.title?.toLowerCase() || "";
        const val = String(ans.value || "").trim();

        if (title.includes("sex") || title.includes("gender")) {
          if (val.toLowerCase().startsWith("m")) foundGender = "Male";
          else if (val.toLowerCase().startsWith("f")) foundGender = "Female";
          else if (val.toLowerCase().startsWith("o") || val) foundGender = "Other";
        }
      });
      if (foundGender) return foundGender;
    }

    const formGender = getValues("gender");
    if (formGender && ["Male", "Female", "Other"].includes(formGender)) {
      return formGender;
    }

    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("user-gender");
      if (cached && ["Male", "Female", "Other"].includes(cached)) {
        return cached;
      }
    }

    return "Female"; // bulletproof default
  };

  // Sync initial values from the global Zustand intake answers store
  useEffect(() => {
    if (answers && answers.length > 0 && questions) {
      let foundFirstName = "";
      let foundLastName = "";
      let foundEmail = "";
      let foundPhone = "";
      let foundBirthday = "";
      let foundZip = "";
      let foundState = "";
      let foundCity = "";
      let foundGender = "";

      answers.forEach((ans) => {
        const q = questions.get(ans.questionId);
        if (!q) return;

        const title = q.title?.toLowerCase() || "";
        const val = String(ans.value || "").trim();

        if (title.includes("first name")) {
          foundFirstName = val;
        } else if (title.includes("last name")) {
          foundLastName = val;
        } else if (title.includes("email")) {
          foundEmail = val;
        } else if (title.includes("phone")) {
          foundPhone = val;
        } else if (title.includes("birthday") || title.includes("birth date")) {
          const trimmedVal = val.trim();
          if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(trimmedVal)) {
            const parts = trimmedVal.split("/");
            const mm = parts[0].padStart(2, "0");
            const dd = parts[1].padStart(2, "0");
            const yyyy = parts[2];
            foundBirthday = `${yyyy}-${mm}-${dd}`;
          } else {
            foundBirthday = trimmedVal;
          }
        } else if (title.includes("zip")) {
          foundZip = val;
        } else if (title.includes("state")) {
          const cleanVal = val.toUpperCase().trim();
          if (cleanVal.length === 2 && STATES_CITIES[cleanVal]) {
            foundState = cleanVal;
          } else {
            const match = Object.entries(STATES_CITIES).find(
              ([code, info]) => info.name.toUpperCase() === cleanVal
            );
            if (match) {
              foundState = match[0];
            } else if (cleanVal.length >= 2) {
              foundState = cleanVal.slice(0, 2);
            }
          }
        } else if (title.includes("city")) {
          foundCity = val;
        } else if (title.includes("sex") || title.includes("gender")) {
          if (val.toLowerCase().startsWith("m")) foundGender = "Male";
          else if (val.toLowerCase().startsWith("f")) foundGender = "Female";
          else if (val.toLowerCase().startsWith("o") || val) foundGender = "Other";
        }
      });

      if (foundFirstName) setValue("first_name", foundFirstName, { shouldValidate: true });
      if (foundLastName) setValue("last_name", foundLastName, { shouldValidate: true });
      if (foundEmail) setValue("email", foundEmail, { shouldValidate: true });
      if (foundPhone) setValue("phone", foundPhone, { shouldValidate: true });
      if (foundBirthday) setValue("birthday", foundBirthday, { shouldValidate: true });
      if (foundZip) setValue("zip_code", foundZip, { shouldValidate: true });
      if (foundState) setValue("lead_state", foundState, { shouldValidate: true });
      if (foundCity) setValue("city", getCityCode(foundCity), { shouldValidate: true });
      if (foundGender) setValue("gender", foundGender, { shouldValidate: true });
    }
  }, [answers, questions, setValue]);

  // Synchronizer 2: Robust Loader to restore form details and gender on restore/refresh
  useEffect(() => {
    const restoreFormFromSessionOrCache = async () => {
      if (!activeSessionId) return;
      if (answers && answers.length > 0) return;

      console.log("[useCheckout] Store answers are empty. Attempting to restore checkout details...");

      if (typeof window !== "undefined") {
        const cachedGender = localStorage.getItem("user-gender");
        const cachedBirthday = localStorage.getItem("user-birthday");
        if (cachedGender) {
          setValue("gender", cachedGender, { shouldValidate: true });
        }
        if (cachedBirthday) {
          let formattedBirthday = cachedBirthday;
          if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(cachedBirthday)) {
            const parts = cachedBirthday.split("/");
            formattedBirthday = `${parts[2]}-${parts[0].padStart(2, "0")}-${parts[1].padStart(2, "0")}`;
          }
          setValue("birthday", formattedBirthday, { shouldValidate: true });
        }
      }

      try {
        const fetchedQuestions = await fetchQuestionsAction();
        if (!fetchedQuestions || fetchedQuestions.length === 0) return;

        const relevantKeywords = ["first name", "last name", "email", "phone", "birthday", "birth date", "zip", "state", "city", "sex", "gender"];
        const targetQuestions = fetchedQuestions.filter((q: any) => {
          const title = (q.title || "").toLowerCase();
          return relevantKeywords.some(kw => title.includes(kw));
        });

        const answersPromises = targetQuestions.map(async (q: any) => {
          try {
            const res = await getSavedAnswerAction(activeSessionId, q.id);
            if (res && res[q.id]) {
              return {
                questionId: q.id,
                title: q.title,
                value: res[q.id].value,
              };
            }
          } catch (err) { }
          return null;
        });

        const retrievedAnswers = (await Promise.all(answersPromises)).filter(Boolean) as any[];

        retrievedAnswers.forEach((ans) => {
          const title = (ans.title || "").toLowerCase();
          const val = String(ans.value || "").trim();

          if (title.includes("first name")) {
            setValue("first_name", val, { shouldValidate: true });
          } else if (title.includes("last name")) {
            setValue("last_name", val, { shouldValidate: true });
          } else if (title.includes("email")) {
            setValue("email", val, { shouldValidate: true });
          } else if (title.includes("phone")) {
            setValue("phone", val, { shouldValidate: true });
          } else if (title.includes("birthday") || title.includes("birth date")) {
            let apiBday = val;
            if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(val)) {
              const parts = val.split("/");
              apiBday = `${parts[2]}-${parts[0].padStart(2, "0")}-${parts[1].padStart(2, "0")}`;
            }
            setValue("birthday", apiBday, { shouldValidate: true });
          } else if (title.includes("zip")) {
            setValue("zip_code", val, { shouldValidate: true });
          } else if (title.includes("state")) {
            const cleanVal = val.toUpperCase().trim();
            if (cleanVal.length === 2 && STATES_CITIES[cleanVal]) {
              setValue("lead_state", cleanVal, { shouldValidate: true });
            } else {
              const match = Object.entries(STATES_CITIES).find(
                ([code, info]) => info.name.toUpperCase() === cleanVal
              );
              if (match) {
                setValue("lead_state", match[0], { shouldValidate: true });
              }
            }
          } else if (title.includes("city")) {
            setValue("city", getCityCode(val), { shouldValidate: true });
          } else if (title.includes("sex") || title.includes("gender")) {
            let normGender = "Other";
            if (val.toLowerCase().startsWith("m")) normGender = "Male";
            else if (val.toLowerCase().startsWith("f")) normGender = "Female";
            setValue("gender", normGender, { shouldValidate: true });
            if (typeof window !== "undefined") {
              localStorage.setItem("user-gender", normGender);
            }
          }
        });
      } catch (err) {
        console.warn("[useCheckout] Failed to fetch saved answers:", err);
      }
    };

    restoreFormFromSessionOrCache();
  }, [activeSessionId, answers, setValue]);

  // TanStack React Query mutation for Lead Submission
  const createLeadMutation = useMutation({
    mutationFn: async (payload: any) => {
      return createLeadAction(payload);
    },
  });

  // Master Lead Sync helper
  const submitLead = async (force = false): Promise<boolean> => {
    const values = getValues();
    const {
      first_name = "",
      last_name = "",
      email = "",
      phone = "",
      zip_code = "",
      birthday = "",
      lead_state = "",
    } = values;

    const hasContactData = email.trim() || phone.trim() || first_name.trim() || last_name.trim();
    if (!hasContactData) return true;

    const cleanPhone = phone.replace(/\D/g, "");
    const cleanZipCode = zip_code.replace(/\D/g, "");
    const cleanGender = getNormalizedGender();

    const leadRepresentation = JSON.stringify({
      email: email.trim(),
      phone: cleanPhone,
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      zip_code: cleanZipCode,
      birthday: birthday.trim(),
      gender: cleanGender || "",
      lead_state: lead_state.trim().toUpperCase(),
      activeSessionId,
    });

    if (!force && leadRepresentation === lastSubmittedLead) {
      return true;
    }

    try {
      let apiBirthday = null;
      if (birthday && /^\d{4}-\d{2}-\d{2}$/.test(birthday.trim())) {
        const parts = birthday.trim().split("-");
        apiBirthday = `${parts[1]}/${parts[2]}/${parts[0]}`;
      } else if (birthday) {
        apiBirthday = birthday.trim();
      }

      const payload = {
        email: email.trim() || null,
        phone: cleanPhone || null,
        name: (first_name.trim() || last_name.trim()) ? `${first_name.trim()} ${last_name.trim()}`.trim() : null,
        first_name: first_name.trim() || null,
        last_name: last_name.trim() || null,
        sessionId: activeSessionId || null,
        zip_code: cleanZipCode || null,
        birthday: apiBirthday,
        gender: cleanGender,
        lead_state: lead_state.trim().toUpperCase() || null,
      };

      console.log("[useCheckout] Syncing lead:", payload);

      const res = await createLeadMutation.mutateAsync(payload);

      if (res.success && res.data) {
        setLastSubmittedLead(leadRepresentation);
        if (res.data.redirect_required && res.data.redirect_url) {
          window.location.href = res.data.redirect_url;
          return false;
        }
        // Lead synced successfully on final submit
        return true;
      } else if (!res.success) {
        const apiErrorData = res.apiErrorData;
        const fieldErrors: any[] = apiErrorData?.detail?.field_errors || apiErrorData?.field_errors || [];

        if (fieldErrors.length > 0) {
          fieldErrors.forEach((fe: any) => {
            const formField = mapApiFieldToFormField(fe);
            if (formField) {
              setError(formField, {
                type: "server",
                message: fe.message || `Invalid ${fe.field}`,
              });
            }
          });

          setValidationWarning(
            <div className="flex flex-col gap-2 w-full text-left">
              <span className="font-semibold text-rose-800">
                {apiErrorData?.detail?.message || res.message || "Cannot complete checkout — please correct the following registration errors:"}
              </span>
              <ul className="list-disc pl-5 flex flex-col gap-1.5 text-rose-700 text-xs sm:text-sm">
                {fieldErrors.map((fe: any, idx: number) => (
                  <li key={idx}>
                    <span className="font-semibold">{fe.field}:</span> {fe.message}
                  </li>
                ))}
              </ul>
            </div>
          );
          // Show toast error for field validation failures
          toast.error(res.message || "Lead validation failed. Please check the highlighted fields.");
        } else {
          setValidationWarning(res.message || "Lead registration failed on staging.");
          toast.error(res.message || "Failed to save lead. Please try again.");
        }
        return false;
      }
      return true;
    } catch (err: any) {
      console.warn("[useCheckout] Lead sync failed gracefully:", err.message || err);
      const status = err.response?.status;
      if (status && status >= 400 && status < 500) {
        setValidationWarning(err.message || "Lead registration validation failed.");
        toast.error(err.message || "Lead validation failed. Please check your information.");
        return false;
      }
      // For server errors, continue gracefully (degraded mode)
      return true;
    }
  };

  // TanStack React Query mutation for Session Completion
  const completeSessionMutation = useMutation({
    mutationFn: async (payload: {
      finalAnswers: any;
      meds: string[];
      couponCode: string;
      utmParams: any;
      extra: any;
    }) => {
      return completeSessionAction(
        payload.finalAnswers,
        payload.meds,
        payload.couponCode,
        payload.utmParams,
        payload.extra
      );
    },
  });

  // Form submission handler
  const onSubmit = async (data: CheckoutFormData) => {
    clearErrors();
    setValidationWarning(null);

    if (!data.agreeTerms || !data.agreePrivacy || !data.agreeShipping) {
      setValidationWarning("Please agree to the Terms, Privacy Policy, and Refund Policy to proceed.");
      return;
    }

    if (!selectedProduct) {
      setValidationWarning("Please select a medication plan from the order summary.");
      return;
    }

    try {
      const leadSuccess = await submitLead(true);
      if (!leadSuccess) return;

      const finalAnswers: Record<string, { value: string | string[]; question: string }> = {};
      if (answers && answers.length > 0) {
        answers.forEach((ans) => {
          const q = questions.get(ans.questionId);
          if (q) {
            finalAnswers[String(ans.questionId)] = {
              value: ans.value,
              question: q.title || "",
            };
          }
        });
      }

      const utmParams: Record<string, string> = {};
      if (typeof window !== "undefined") {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.forEach((val, key) => {
          if (
            key.startsWith("utm_") ||
            key.startsWith("custom_") ||
            key.startsWith("cc_custom_")
          ) {
            utmParams[key] = val;
          }
        });
      }

      let apiBirthday = null;
      if (data.birthday && /^\d{4}-\d{2}-\d{2}$/.test(data.birthday.trim())) {
        const parts = data.birthday.trim().split("-");
        apiBirthday = `${parts[1]}/${parts[2]}/${parts[0]}`;
      } else if (data.birthday) {
        apiBirthday = data.birthday.trim();
      }

      const lead_data = {
        first_name: data.first_name.trim() || null,
        last_name: data.last_name.trim() || null,
        email: data.email.trim() || null,
        phone: data.phone.replace(/\D/g, "") || null,
        address: data.address.trim() || null,
        city: data.city.trim() || null,
        lead_state: data.lead_state.toUpperCase() || null,
        zip_code: data.zip_code.replace(/\D/g, "") || null,
        country: "United States",
        gender: getNormalizedGender(),
        birthday: apiBirthday,
      };

      const selectedProductData = {
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        description: selectedProduct.description || selectedProduct.short_description || selectedProduct.long_description || "",
      };

      let productType = null;
      if (selectedProduct.id === "prod_semaglutide_standard") {
        productType = "semaglutide";
      } else if (selectedProduct.id === "prod_tirzepatide_premium") {
        productType = "tirzepatide";
      } else if (selectedProduct.name.toLowerCase().includes("semaglutide")) {
        productType = "semaglutide";
      } else if (selectedProduct.name.toLowerCase().includes("tirzepatide")) {
        productType = "tirzepatide";
      }

      const medIdToSubmit = selectedProduct.medId || String(selectedProduct.id);

      const resData = await completeSessionMutation.mutateAsync({
        finalAnswers,
        meds: [medIdToSubmit],
        couponCode: appliedCoupon || "",
        utmParams,
        extra: {
          productType,
          productCategory: selectedProduct.category,
          startData: {
            lead_data,
            selectedProduct: selectedProductData,
          },
          sessionId: activeSessionId,
        },
      });

      console.log("[useCheckout] Completion response:", resData);

      if (resData.completed && resData.checkout_url) {
        toast.success("Session completed! Redirecting to checkout...");
        window.location.href = resData.checkout_url;
      } else {
        const apiErrorData = resData.apiErrorData;
        const fieldErrors: any[] = apiErrorData?.detail?.field_errors || apiErrorData?.field_errors || [];

        if (fieldErrors.length > 0) {
          fieldErrors.forEach((fe: any) => {
            const formField = mapApiFieldToFormField(fe);
            if (formField) {
              setError(formField, {
                type: "server",
                message: fe.message || `Invalid ${fe.field}`,
              });
            }
          });

          setValidationWarning(
            <div className="flex flex-col gap-2 w-full text-left">
              <span className="font-semibold text-rose-800">
                {apiErrorData?.detail?.message || resData.message || "Cannot complete checkout — please correct the following validation errors:"}
              </span>
              <ul className="list-disc pl-5 flex flex-col gap-1.5 text-rose-700 text-xs sm:text-sm">
                {fieldErrors.map((fe: any, idx: number) => (
                  <li key={idx}>
                    <span className="font-semibold">{fe.field}:</span> {fe.message}
                  </li>
                ))}
              </ul>
            </div>
          );
        } else {
          setValidationWarning(resData.message || "Server Error");
        }
      }
    } catch (err: any) {
      console.error("[useCheckout] Error completing session:", err);
      setValidationWarning(err.message || String(err));
    }
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    applyCoupon(couponInput);
  };

  // Pricing calculations
  const subtotal = selectedProduct
    ? (typeof selectedProduct.price === "string" ? parseFloat(selectedProduct.price) : selectedProduct.price)
    : 0;
  const total = Math.max(0, subtotal - couponDiscount);

  const submitting = completeSessionMutation.isPending;

  return {
    // Hook Form properties
    register,
    setValue,
    getValues,
    watch,
    setError,
    clearErrors,
    errors,
    isValid,
    watchedFirstName,

    // Store states
    products,
    selectedProduct,
    setSelectedProduct,
    couponInput,
    setCouponInput,
    appliedCoupon,
    couponDiscount,
    couponMessage,
    validationWarning,
    setValidationWarning,
    showSuccessModal,
    setShowSuccessModal,

    // Payment states
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

    // Handlers
    handleApplyCoupon,
    onSubmit,
    submitLead,

    // Derived states
    submitting,
    activeSessionId,
    loadingProducts,
    productsError,
    subtotal,
    total,
  };
}
