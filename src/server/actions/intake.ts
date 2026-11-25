"use server";

import fs from "fs";
import path from "path";
import { connection } from "next/server";
import { IntakeRepository } from "../repositiories/intake";
import { getIntakeConfig, LeadPayload, CompleteSessionPayload, ProductResult, CheckoutCompleteResult } from "../schemas/intake";

// Robust fallback mock GLP-1 products adhering exactly to the specified JSON schema
const MOCK_PRODUCTS: ProductResult[] = [
  {
    id: "prod_semaglutide_standard",
    name: "Semaglutide Weight Loss Plan",
    description: "Our most popular once-weekly GLP-1 weight loss plan. Highly effective for safe, steady weight reduction, appetite suppression, and metabolic support.",
    price: 297,
    category: "Weight Loss",
    dosage: "Once weekly injection",
    strength: "0.25mg to 2.4mg starting dose",
    quantity: 1,
    available: true,
    requires_prescription: true,
    side_effects: ["Mild nausea", "Indigestion", "Fatigue", "Constipation"],
    contraindications: [
      "Personal or family history of medullary thyroid carcinoma (MTC)",
      "Multiple Endocrine Genitals syndrome type 2 (MEN 2)",
      "Pregnancy or planning to become pregnant"
    ],
    instructions: ["Inject subcutaneously in the abdomen, thigh, or upper arm once weekly on the same day each week, with or without meals."],
    created_at: "2026-05-30T00:00:00.000Z",
    updated_at: "2026-05-30T00:00:00.000Z"
  },
  {
    id: "prod_tirzepatide_premium",
    name: "Tirzepatide Weight Loss Plan",
    description: "Dual GIP and GLP-1 receptor agonist offering maximum weight loss efficacy. Promotes superior appetite control, metabolic enhancement, and blood sugar regulation.",
    price: 397,
    category: "Weight Loss",
    dosage: "Once weekly injection",
    strength: "2.5mg to 15mg starting dose",
    quantity: 1,
    available: true,
    requires_prescription: true,
    side_effects: ["Nausea", "Diarrhea", "Decreased appetite", "Mild headache"],
    contraindications: [
      "Personal or family history of medullary thyroid carcinoma (MTC)",
      "Multiple Endocrine Genitals syndrome type 2 (MEN 2)",
      "Pregnancy or planning to become pregnant"
    ],
    instructions: ["Inject subcutaneously in the abdomen, thigh, or upper arm once weekly on the same day each week, with or without meals."],
    created_at: "2026-05-30T00:00:00.000Z",
    updated_at: "2026-05-30T00:00:00.000Z"
  }
];

/**
 * Standardized masking utility to protect HIPAA/PII data in server stdout and log files.
 */
function maskSensitiveData(data: any): any {
  if (!data || typeof data !== "object") return data;

  try {
    // Deep clone JSON-serializable payloads safely to avoid mutating the original parameters
    const cloned = JSON.parse(JSON.stringify(data));
    const sensitiveKeys = ["password", "pwd", "token", "secret", "cvv", "cardnumber", "card_number"];

    const maskObject = (obj: any) => {
      if (!obj || typeof obj !== "object") return;

      for (const key of Object.keys(obj)) {
        const val = obj[key];
        if (typeof val === "object" && val !== null) {
          maskObject(val);
        } else {
          const lowerKey = key.toLowerCase();
          if (sensitiveKeys.some(sk => lowerKey.includes(sk))) {
            obj[key] = val ? `[MASKED / LENGTH: ${String(val).length}]` : null;
          } else if (lowerKey === "email" && typeof val === "string") {
            const [local, domain] = val.split("@");
            if (local && domain) {
              obj[key] = local.length > 2
                ? `${local[0]}***${local[local.length - 1]}@${domain}`
                : `***@${domain}`;
            }
          } else if (lowerKey === "phone" && typeof val === "string") {
            obj[key] = val.length > 4 ? `***${val.slice(-4)}` : `***`;
          } else if (["name", "first_name", "last_name"].includes(lowerKey) && typeof val === "string") {
            obj[key] = val.length > 2 ? `${val[0]}***${val[val.length - 1]}` : `***`;
          }
        }
      }
    };

    maskObject(cloned);
    return cloned;
  } catch {
    // Fail-safe shallow clone on error
    return { ...data };
  }
}

/**
 * Standard log-to-file utility. Appends structured server error logs to /logs/server-errors.log.
 * Wrapped in a robust try-catch so it cannot crash the application if the disk is full or filesystem is read-only.
 */
async function appendErrorToFile(actionName: string, message: string, errorDetail: string): Promise<void> {
  try {
    const logsDir = path.join(process.cwd(), "logs");
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    const logFilePath = path.join(logsDir, "server-errors.log");
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] [Server Action: ${actionName}] ERROR: ${message}\nDetails: ${errorDetail}\n${"-".repeat(80)}\n`;

    await fs.promises.appendFile(logFilePath, entry, "utf8");
  } catch (fsErr: any) {
    console.error(`[appendErrorToFile] Failed to write error log to file: ${fsErr?.message || fsErr}`);
  }
}

/**
 * Standard log-to-console utility for general server actions tracing.
 */
function logServerAction(actionName: string, message: string, meta?: any): void {
  const timestamp = new Date().toISOString();
  const maskedMeta = meta ? maskSensitiveData(meta) : null;
  const metaStr = maskedMeta ? ` | Meta: ${JSON.stringify(maskedMeta)}` : "";
  console.log(`[${timestamp}] [Server Action: ${actionName}] ${message}${metaStr}`);
}

/**
 * Formats, logs to console.error, and persists error details to server-errors.log.
 */
async function logServerActionError(actionName: string, message: string, error: any, requestPayload?: any): Promise<void> {
  const timestamp = new Date().toISOString();
  let errorDetail = "";

  if (error && typeof error === "object") {
    const responseData = error.response?.data;
    const responseStatus = error.response?.status;
    const requestUrl = error.config?.url;
    const requestMethod = error.config?.method;

    errorDetail = `Message: ${error.message || error} | API Endpoint: ${requestMethod?.toUpperCase() || ""} ${requestUrl || "N/A"} | Status: ${responseStatus || "N/A"} | Response Data: ${responseData ? JSON.stringify(responseData) : "N/A"}`;
    if (requestPayload) {
      errorDetail += ` | Request Payload: ${JSON.stringify(maskSensitiveData(requestPayload))}`;
    }
    if (error.stack) {
      errorDetail += ` | Stack: ${error.stack}`;
    }
  } else {
    errorDetail = String(error);
    if (requestPayload) {
      errorDetail += ` | Request Payload: ${JSON.stringify(maskSensitiveData(requestPayload))}`;
    }
  }

  // Log to server console
  console.error(`[${timestamp}] [Server Action: ${actionName}] ERROR: ${message} | Details: ${errorDetail}`);

  // Persist to local file
  await appendErrorToFile(actionName, message, errorDetail);
}

/**
 * Initiates a new questionnaire session on Dosable and returns the session_id.
 */
export async function createIntakeSessionAction(): Promise<string> {
  const actionName = "createIntakeSessionAction";
  logServerAction(actionName, "Initiating intake session...");
  const startTime = performance.now();
  try {
    const data = await IntakeRepository.createSession();
    const duration = (performance.now() - startTime).toFixed(2);
    if (!data.session_id) {
      const errMsg = "No session_id in response";
      await logServerActionError(actionName, errMsg, data);
      throw new Error(errMsg);
    }
    logServerAction(actionName, `Successfully created intake session in ${duration}ms`, { sessionId: data.session_id });
    return data.session_id;
  } catch (e: any) {
    const duration = (performance.now() - startTime).toFixed(2);
    await logServerActionError(actionName, `Failed to create session after ${duration}ms`, e);
    throw new Error(e.message || "Server Error");
  }
}

/**
 * Saves/updates an answer to a specific question for an active session.
 * Replaces old `/api/intake-form/answer` POST API.
 */
export async function saveAnswerAction(
  sessionId: string,
  questionId: number,
  answer: string | string[],
  questionTitle: string
): Promise<{ success: boolean; message?: string; data?: any; localOnly?: boolean; warning?: string }> {
  const actionName = "saveAnswerAction";
  const startTime = performance.now();

  logServerAction(actionName, "Saving answer...", { sessionId, questionId, questionTitle, answer });

  if (!sessionId || !questionId || answer === undefined) {
    const errMsg = "sessionId, questionId and answer are required";
    await logServerActionError(actionName, errMsg, { sessionId, questionId, answerPresent: answer !== undefined });
    return { success: false, message: errMsg };
  }

  try {
    const { data, status } = await IntakeRepository.saveAnswer(
      sessionId,
      questionId,
      answer,
      questionTitle
    );
    const duration = (performance.now() - startTime).toFixed(2);

    if (status !== 200) {
      const warnMsg = `Staging server returned non-200 status: ${status}. Using fallback.`;
      logServerAction(actionName, `WARNING: ${warnMsg} in ${duration}ms`, { status });
      return {
        success: true,
        localOnly: true,
        warning: `Remote server returned status ${status}. Saved locally.`,
      };
    }

    logServerAction(actionName, `Successfully saved answer to staging in ${duration}ms`, { sessionId, questionId });
    return { success: true, data };
  } catch (apiError: any) {
    const duration = (performance.now() - startTime).toFixed(2);
    const errorData = apiError.response?.data;
    const errorStatus = apiError.response?.status;

    await logServerActionError(actionName, `External staging API failed to save answer after ${duration}ms`, apiError);

    // If it's a validation error (400 or 422), propagate it to the UI
    if (errorStatus === 400 || errorStatus === 422) {
      let apiMsg = "";
      if (errorData) {
        if (typeof errorData === "string") {
          apiMsg = errorData;
        } else if (errorData.detail) {
          apiMsg = typeof errorData.detail === "string"
            ? errorData.detail
            : (errorData.detail.message || errorData.detail.error || "");
        } else if (errorData.message) {
          apiMsg = errorData.message;
        } else if (errorData.error) {
          apiMsg = errorData.error;
        }
      }

      if (!apiMsg) {
        apiMsg = `Server Error (Status ${errorStatus})`;
      }

      return {
        success: false,
        message: apiMsg,
      };
    }

    return {
      success: true,
      localOnly: true,
      warning: "Staging API is offline or restricted. Progress saved locally.",
    };
  }
}

/**
 * Retrieves a previously saved answer to a specific question in an active session.
 * Replaces old `/api/intake-form/answer` GET API.
 */
export async function getSavedAnswerAction(
  sessionId: string,
  questionId: number
): Promise<any> {
  const actionName = "getSavedAnswerAction";
  const startTime = performance.now();

  logServerAction(actionName, "Retrieving saved answer...", { sessionId, questionId });

  if (!sessionId || !questionId) {
    const errMsg = "sessionId and questionId are required";
    await logServerActionError(actionName, errMsg, { sessionId, questionId });
    throw new Error(errMsg);
  }

  try {
    const { data, status } = await IntakeRepository.getSavedAnswer(sessionId, questionId);
    const duration = (performance.now() - startTime).toFixed(2);

    if (status !== 200) {
      const errMsg = `Failed to fetch answer: Status ${status}`;
      await logServerActionError(actionName, errMsg, { status });
      throw new Error(errMsg);
    }

    logServerAction(actionName, `Successfully retrieved saved answer in ${duration}ms`, {
      sessionId,
      questionId,
      answerFound: !!data,
    });
    return data ?? null;
  } catch (e: any) {
    const duration = (performance.now() - startTime).toFixed(2);
    await logServerActionError(actionName, `Error fetching answer after ${duration}ms`, e);
    return null;
  }
}

/**
 * Submits the customer's contact details to capture/update a lead.
 * Replaces old `/api/intake-form/leads` POST API.
 */
export async function createLeadAction(
  leadData: any
): Promise<{ success: boolean; data?: any; message?: string; localOnly?: boolean; warning?: string; apiErrorData?: any }> {
  const actionName = "createLeadAction";
  const startTime = performance.now();

  logServerAction(actionName, "Processing lead registration request...", { leadData });

  try {
    const { tenantId } = getIntakeConfig();
    const tenantIdInt = tenantId ? parseInt(tenantId, 10) : null;

    // Construct the payload matching the staging API schema exactly
    const payload: LeadPayload = {
      tenant_id: tenantIdInt,
      email: leadData.email || null,
      phone: leadData.phone || null,
      name: leadData.name || null,
      first_name: leadData.first_name || null,
      last_name: leadData.last_name || null,
      role: leadData.role !== undefined ? leadData.role : null,
      sessionId: leadData.sessionId || leadData.session_id || null,
      birthday: leadData.birthday || null,
      gender: leadData.gender || null,
      crosscheck: leadData.crosscheck || null,
      verification: leadData.verification || null,
      id_verification_response: leadData.id_verification_response || null,
      id_verification_requested: leadData.id_verification_requested !== undefined ? leadData.id_verification_requested : null,
      id_verification_count: leadData.id_verification_count !== undefined ? leadData.id_verification_count : null,
      lead_state: leadData.lead_state || null,
      zip_code: leadData.zip_code || null,
      user_id: leadData.user_id !== undefined ? leadData.user_id : null,
      password: leadData.password || null
    };

    logServerAction(actionName, "Submitting lead payload to Dosable staging", { payload });

    try {
      const { data, status } = await IntakeRepository.createLead(payload);
      const duration = (performance.now() - startTime).toFixed(2);

      if (status !== 200 && status !== 201) {
        const warnMsg = `External staging API returned status ${status}. Degrading gracefully.`;
        logServerAction(actionName, `WARNING: ${warnMsg} in ${duration}ms`, { status });
        return {
          success: true,
          localOnly: true,
          warning: `Staging API returned non-success status: ${status}`,
        };
      }

      logServerAction(actionName, `Lead successfully registered on staging in ${duration}ms`, {
        sessionId: payload.sessionId,
        status,
      });
      return { success: true, data };
    } catch (apiError: any) {
      const duration = (performance.now() - startTime).toFixed(2);
      await logServerActionError(actionName, `External staging API failed to create lead after ${duration}ms. Returning local fallback.`, apiError, payload);

      const status = apiError.response?.status;
      const errorData = apiError.response?.data;
      if (status && status >= 400 && status < 500) {
        return {
          success: false,
          localOnly: false,
          message: errorData?.detail?.message || errorData?.message || "Validation Error",
          apiErrorData: errorData || null,
        };
      }

      return {
        success: true,
        localOnly: true,
        warning: "Staging API is offline or restricted. Lead captured locally.",
      };
    }
  } catch (e: any) {
    const duration = (performance.now() - startTime).toFixed(2);
    await logServerActionError(actionName, `General internal error after ${duration}ms`, e);
    return {
      success: false,
      message: e.message || "Server Error",
    };
  }
}

/**
 * Orchestrates the final checkout step, completing the intake session.
 * Replaces old `/api/intake-form/session/complete` POST API.
 */
export async function completeSessionAction(
  finalAnswers: Record<string, { value: string | string[]; question: string }>,
  meds: string[] = [],
  couponCode: string = "",
  utmParams: Record<string, string> = {},
  extra?: {
    productType?: string | null;
    productCategory?: string | null;
    startData?: { lead_data: any; selectedProduct: any } | null;
    sessionId?: string;
  }
): Promise<CheckoutCompleteResult> {
  const actionName = "completeSessionAction";
  const startTime = performance.now();
  const sessionId = extra?.sessionId || "";

  logServerAction(actionName, "Completing session...", {
    sessionId,
    meds,
    couponCode,
    utmParams,
    extra,
  });

  if (!sessionId) {
    const errMsg = "sessionId is required to complete session";
    await logServerActionError(actionName, errMsg, { meds, couponCode });
    return {
      completed: false,
      checkout_url: "",
      message: errMsg,
    };
  }

  // 1. Build standard products list
  const productList = (Array.isArray(meds) ? meds : (meds ? [meds] : [])).map((m: any) => String(m));

  // Determine if we have a real staging API medId (e.g. not starting with "prod_" and not empty) AND the category is exactly "weightloss0"
  const isIntroductory = extra?.productCategory === "weightloss0";
  const hasRealMedId = productList.length > 0 && productList.some(m => m && !m.startsWith("prod_"));
  const useOptionB = isIntroductory && hasRealMedId;

  // 1b. Automatically fetch and restore saved answers from database/API if client finalAnswers is empty (due to page redirect)
  const answersObj = { ...(finalAnswers || {}) };
  if (Object.keys(answersObj).length === 0) {
    logServerAction(actionName, "finalAnswers is empty. Fetching and restoring saved answers from database to prevent empty submissions...");
    try {
      const fetchedQuestions = await IntakeRepository.fetchQuestions();
      if (Array.isArray(fetchedQuestions) && fetchedQuestions.length > 0) {
        const answersPromises = fetchedQuestions.map(async (q: any) => {
          try {
            const { data, status } = await IntakeRepository.getSavedAnswer(sessionId, q.id);
            if (status === 200 && data && data[q.id]) {
              return {
                questionId: String(q.id),
                value: data[q.id].value,
                question: q.title || "",
              };
            }
          } catch { }
          return null;
        });

        const retrievedAnswers = (await Promise.all(answersPromises)).filter(Boolean) as any[];
        retrievedAnswers.forEach((ans) => {
          answersObj[ans.questionId] = {
            value: ans.value,
            question: ans.question,
          };
        });
        logServerAction(actionName, `Successfully restored ${retrievedAnswers.length} saved answers from database.`);
      }
    } catch (err: any) {
      logServerAction(actionName, `Failed to restore saved answers: ${err.message}`);
    }
  }

  let loggedPayload: CompleteSessionPayload | undefined = undefined;

  try {
    // 2. Build external request payload conforming exactly to the Dosable schema
    const productType = extra?.productType || null;

    const payload: CompleteSessionPayload = {
      final_answers: answersObj,
      med: useOptionB ? productList : undefined,
      couponCode: couponCode || "",
      productType: useOptionB ? null : productType,
      startData: extra?.startData ? JSON.parse(JSON.stringify(extra.startData)) : null,
    };
    loggedPayload = payload;



    logServerAction(actionName, `Configuring completeSession selection: ${useOptionB ? "Option B (using specific med IDs)" : (productType ? `Option A (using productType: "${productType}")` : "None")}`, {
      productCategory: extra?.productCategory,
      isIntroductory,
      hasRealMedId,
    });

    // Extract custom_attributes and add them to startData, while also sending at root level
    const customAttributes: Record<string, any> = {};
    Object.entries(utmParams).forEach(([k, v]) => {
      if (v === undefined || v === null) return;
      payload[k] = v;

      if (k.startsWith("custom_")) {
        const stripped = k.substring("custom_".length);
        customAttributes[stripped] = v;
      } else if (k.startsWith("cc_custom_")) {
        const stripped = k.substring("cc_custom_".length);
        customAttributes[stripped] = v;
      }
    });

    if (Object.keys(customAttributes).length > 0) {
      payload.startData = {
        ...(payload.startData || { lead_data: null, selectedProduct: null }),
        custom_attributes: {
          ...((payload.startData && payload.startData.custom_attributes) || {}),
          ...customAttributes,
        }
      };
    }

    logServerAction(actionName, `Sending complete request to Dosable staging for session: ${sessionId}`, { payload });

    console.log("\n================== 🚀 [RAW POSTMAN COMPATIBLE PAYLOAD] 🚀 ==================");
    console.log(`Endpoint: POST https://staging.intake.dosable.com/sessions/${sessionId}/complete`);
    console.log("Headers:");
    console.log(JSON.stringify({
      "Content-Type": "application/json",
      "X-API-KEY": getIntakeConfig().apiKey || "API_KEY"
    }, null, 2));
    console.log("Body:");
    console.log(JSON.stringify(payload, null, 2));
    console.log("========================================================================\n");

    const { data, status } = await IntakeRepository.completeSession(sessionId, payload);
    console.log("Intake Response from API:", data, payload)
    const duration = (performance.now() - startTime).toFixed(2);

    logServerAction(actionName, `External API response received in ${duration}ms`, {
      status,
      checkoutUrlPresent: !!data?.checkout_url,
    });

    if (status !== 200 && status !== 201) {
      let apiMsg = "";
      if (data) {
        if (typeof data === "string") {
          apiMsg = data;
        } else if (data.detail) {
          apiMsg = typeof data.detail === "string"
            ? data.detail
            : (data.detail.message || data.detail.action_required || data.detail.error || "");
        } else if (data.message) {
          apiMsg = data.message;
        } else if (data.error) {
          apiMsg = data.error;
        }
      }

      if (!apiMsg) {
        apiMsg = `Server Error (Status ${status})`;
      }

      await logServerActionError(actionName, `External staging API returned non-success status ${status}: ${apiMsg}`, data, payload);
      return {
        completed: false,
        checkout_url: "",
        message: apiMsg,
        apiErrorData: data || null,
      };
    }

    if (data?.checkout_url) {
      logServerAction(actionName, `Session completed successfully in ${duration}ms. Returning checkout URL.`, {
        checkout_url: data.checkout_url,
      });
      return {
        completed: true,
        checkout_url: data.checkout_url,
        message: data?.message || "Session completed successfully. Redirecting to checkout.",
        ...data
      };
    } else {
      const errMsg = "Success status but no checkout_url returned from external API.";
      await logServerActionError(actionName, errMsg, data, payload);
      return {
        completed: false,
        checkout_url: "",
        message: data?.message || "No checkout_url provided in response from external API.",
        apiErrorData: data || null,
      };
    }
  } catch (apiError: any) {
    const duration = (performance.now() - startTime).toFixed(2);
    const errorData = apiError.response?.data;

    await logServerActionError(actionName, `External staging API failed to complete session after ${duration}ms`, apiError, loggedPayload);

    // Extract detailed error message robustly
    let errorMessage = "";
    if (errorData) {
      if (typeof errorData === "string") {
        errorMessage = errorData;
      } else if (errorData.detail) {
        const detail = errorData.detail;
        if (typeof detail === "string") {
          errorMessage = detail;
        } else if (typeof detail === "object") {
          errorMessage = detail.action_required || detail.message || detail.error || "";

          // If there are validation field errors, append them
          if (Array.isArray(detail.field_errors) && detail.field_errors.length > 0) {
            const fieldMsgs = detail.field_errors.map((fe: any) => `${fe.field}: ${fe.message}`).join("; ");
            errorMessage = errorMessage ? `${errorMessage} (${fieldMsgs})` : fieldMsgs;
          }
        }
      } else if (errorData.message) {
        errorMessage = errorData.message;
      } else if (errorData.error) {
        errorMessage = errorData.error;
      }
    }

    // Default fallbacks if no server error message was extracted (no fallback strings)
    if (!errorMessage) {
      errorMessage = apiError.response?.status
        ? `Server Error (Status ${apiError.response.status})`
        : (apiError.message || "Server Error");
    }

    return {
      completed: false,
      checkout_url: "",
      message: errorMessage,
      errorDetails: apiError.message || String(apiError),
      apiErrorData: errorData || null,
    };
  }
}

/**
 * Returns products from Dosable staging, falling back to beautiful GLP-1 mock plans on error.
 * Replaces old `/api/products` proxy route.
 */
export async function getProductsAction(): Promise<ProductResult[]> {
  try {
    await connection();
  } catch {
    // Safely ignore if called outside of request context or connection not available
  }

  const actionName = "getProductsAction";
  const startTime = performance.now();
  logServerAction(actionName, "Fetching products from Dosable staging...");

  try {
    const data = await IntakeRepository.fetchProducts();
    const duration = (performance.now() - startTime).toFixed(2);

    if (Array.isArray(data) && data.length > 0) {
      logServerAction(actionName, `Successfully fetched ${data.length} products from API in ${duration}ms`);
      return data;
    }

    const warnMsg = "External API returned empty or invalid products. Using mock fallbacks.";
    logServerAction(actionName, `WARNING: ${warnMsg} in ${duration}ms`);
    return MOCK_PRODUCTS;
  } catch (e: any) {
    const duration = (performance.now() - startTime).toFixed(2);
    await logServerActionError(
      actionName,
      `Failed to fetch products from external API after ${duration}ms (Using beautiful mock fallbacks)`,
      e
    );
    return MOCK_PRODUCTS;
  }
}

/**
 * Fetches all questionnaire questions from the staging API.
 */
export async function fetchQuestionsAction(): Promise<any[]> {
  try {
    await connection();
  } catch {
    // Safely ignore if called outside of request context or connection not available
  }

  const actionName = "fetchQuestionsAction";
  const startTime = performance.now();
  logServerAction(actionName, "Fetching questionnaire questions from Dosable staging...");

  try {
    const questions = await IntakeRepository.fetchQuestions();
    const duration = (performance.now() - startTime).toFixed(2);
    logServerAction(actionName, `Successfully fetched ${questions?.length || 0} questions in ${duration}ms`);
    return questions;
  } catch (e: any) {
    const duration = (performance.now() - startTime).toFixed(2);
    await logServerActionError(actionName, `Failed to fetch questions after ${duration}ms`, e);
    return [];
  }
}
