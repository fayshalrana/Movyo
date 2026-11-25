// src/server/schemas/intake.ts

/**
 * Interface representing the dynamic intake configurations resolved based on APP_MODE.
 */
export interface IntakeConfig {
  mode: string;
  apiKey: string;
  tenantId: string;
  intakeApiUrl: string;
}

/**
 * Helper to dynamically resolve environment configuration based on APP_MODE.
 * This guarantees proper keys, tenant IDs, and URLs are served for dev, staging, or production.
 */
export function getIntakeConfig(): IntakeConfig {
  const mode = (process.env.APP_MODE || "development").trim().toLowerCase();

  let apiKey = process.env.API_KEY || "";
  let tenantId = process.env.TENANT_ID || "";
  const intakeApiUrl = process.env.INTAKE_API_URL || "";

  if (mode === "staging") {
    apiKey = process.env.API_KEY_STAGING || "";
    tenantId = process.env.TENANT_ID_STAGING || "";
  } else if (mode === "production") {
    apiKey = process.env.API_KEY_PROD || "";
    tenantId = process.env.TENANT_ID_PROD || "";
  } else {
    // development / default
    apiKey = process.env.API_KEY || "";
    tenantId = process.env.TENANT_ID || "";
  }

  return {
    mode,
    apiKey,
    tenantId,
    intakeApiUrl,
  };
}

/**
 * Payload interface for registering or updating a lead in Dosable.
 */
export interface LeadPayload {
  tenant_id?: number | null;
  email: string | null;
  phone: string | null;
  name: string | null;
  first_name: string | null;
  last_name: string | null;
  role?: number | null;
  sessionId: string | null;
  birthday?: string | null;
  gender?: string | null;
  crosscheck?: any;
  verification?: any;
  id_verification_response?: any;
  id_verification_requested?: number | null;
  id_verification_count?: number | null;
  lead_state?: string | null;
  zip_code: string | null;
  user_id?: number | null;
  password?: string | null;
}

/**
 * Payload structure for answering a question.
 */
export interface SaveAnswerPayload {
  value: string | string[];
  question: string;
}

/**
 * Structure of each final answer in a completed session.
 */
export interface FinalAnswer {
  value: string | string[];
  question: string;
}

/**
 * Payload interface for completing an intake session.
 */
export interface CompleteSessionPayload {
  final_answers: Record<string, FinalAnswer>;
  med?: string[];
  couponCode?: string;
  productType?: string | null;
  startData?: {
    lead_data: any;
    selectedProduct: any;
    custom_attributes?: Record<string, any>;
  } | null;
  [key: string]: any; // Allow indexing for tracking and custom parameters
}

export interface ProductResult {
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

/**
 * Response structure for a completed session.
 */
export interface CheckoutCompleteResult {
  completed: boolean;
  checkout_url: string;
  message: string;
  localOnly?: boolean;
  warning?: string;
  errorDetails?: string;
  apiErrorData?: any;
  [key: string]: any;
}
