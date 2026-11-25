import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// Factory function to create axios instance lazily
function createItServerApi() {
  return axios.create({
    baseURL: process.env.INTAKE_API_URL,
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": process.env.API_KEY,
      tenantId: process.env.TENANT_ID,
    },
  });
}

let cachedApi: ReturnType<typeof createItServerApi> | null = null;
function getItServerApi() {
  if (!cachedApi) {
    cachedApi = createItServerApi();
  }
  return cachedApi;
}

export async function POST(req: NextRequest) {
  let requestBody: any = null;
  try {
    const body = await req.json();
    requestBody = body;
    const { sessionId, session_id, final_answers, med, couponCode, startData, productType, ...utmParams } = body;

    const id = sessionId || session_id;
    if (!id) {
      return NextResponse.json(
        { error: "sessionId or session_id is required" },
        { status: 400 },
      );
    }

    // Build standard products parameter for Checkout Champ: productId:quantity separated by semicolons
    const rawMedList = Array.isArray(med) ? med : (med ? [med] : []);
    const productList = rawMedList.map(String);
    const productParam = productList
      .map((m: string) => {
        // Map mock IDs to sample Checkout Champ IDs if needed
        if (m === "prod_semaglutide_standard") return "2:1";
        if (m === "prod_tirzepatide_premium") return "4:1";
        return `${m}:1`;
      })
      .join(";");

    // Build URL parameters for Checkout Champ fallback
    const urlParams = new URLSearchParams();
    urlParams.set("products", productParam);
    urlParams.set("session_id", id);

    // Process coupons for checkout URL
    const couponVal = Array.isArray(couponCode)
      ? couponCode.join(",")
      : (couponCode || "");
    if (couponVal) {
      urlParams.set("couponCode", couponVal);
    }

    // Process tracking/custom params for the checkout URL
    Object.entries(utmParams).forEach(([key, val]) => {
      if (val === undefined || val === null) return;
      const valueStr = String(val);

      if (key.startsWith("utm_")) {
        urlParams.set(key, valueStr);
      } else if (key.startsWith("custom_")) {
        const name = key.substring("custom_".length);
        urlParams.set(`cc_custom_${name}`, valueStr);
      } else if (key.startsWith("cc_custom_")) {
        urlParams.set(key, valueStr);
      } else {
        urlParams.set(key, valueStr);
      }
    });

    const checkoutBase = process.env.CHECKOUT_URL || "https://checkout-staging.movyhealth.com/checkout";
    const generatedCheckoutUrl = `${checkoutBase}?${urlParams.toString()}`;

    try {
      // Build external request payload conforming exactly to the Dosable schema
      const payload: Record<string, any> = {
        final_answers: final_answers || {},
        med: med || [],
        couponCode: couponCode || "",
        productType: productType || null,
        startData: startData ? { ...startData } : null,
      };

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
          ...(payload.startData || {}),
          custom_attributes: {
            ...((payload.startData && payload.startData.custom_attributes) || {}),
            ...customAttributes,
          }
        };
      }

      console.log(`[session complete] Sending complete request to Dosable staging for session: ${id}`, payload);

      const { data, status } = await getItServerApi().post(
        `/sessions/${id}/complete`,
        payload
      );

      // If remote staging returned a checkout URL, use it, otherwise use our generated Checkout Champ URL
      const finalCheckoutUrl = data?.checkout_url || generatedCheckoutUrl;

      if (status !== 200) {
        console.warn(`[session complete] External staging API returned status ${status}. Degrading gracefully.`);
        return NextResponse.json({
          completed: true,
          checkout_url: finalCheckoutUrl,
          message: "Session completed successfully. Redirecting to checkout.",
          localOnly: true,
          warning: `Remote API returned non-200 status: ${status}`,
        });
      }

      return NextResponse.json({
        completed: true,
        checkout_url: finalCheckoutUrl,
        message: data?.message || "Session completed successfully. Redirecting to checkout.",
        ...data
      });
    } catch (apiError: any) {
      const errorData = apiError.response?.data;
      console.warn(
        "[session complete] External staging API failed to complete session. Error message:",
        apiError.message,
        "Response data:",
        errorData ? JSON.stringify(errorData) : "none"
      );

      return NextResponse.json({
        completed: true,
        checkout_url: generatedCheckoutUrl,
        message: "Session completed successfully. Redirecting to checkout.",
        localOnly: true,
        warning: "Staging API offline/restricted. Proceeding with Checkout Champ redirection fallback.",
        errorDetails: apiError.message || String(apiError),
        apiErrorData: errorData || null,
      }, { status: 200 });
    }
  } catch (e: any) {
    console.error("[session complete] General parsing/internal error:", e);
    return NextResponse.json(
      { error: "Failed to process complete request", details: e.message || String(e) },
      { status: 500 },
    );
  }
}
