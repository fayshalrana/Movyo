"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const AppQueryProvider = dynamic(() =>
  import("@/providers/AppQueryProvider").then((m) => ({
    default: m.AppQueryProvider,
  })),
);

const Toaster = dynamic(() =>
  import("react-hot-toast").then((m) => ({ default: m.Toaster })),
);

const toastOptions = {
  duration: 4000,
  style: {
    background: "#363636",
    color: "#fff",
    fontFamily: "inherit",
    fontSize: "14px",
  },
  success: {
    duration: 3000,
    style: {
      background: "#059669",
      color: "#fff",
    },
  },
  error: {
    duration: 5000,
    style: {
      background: "#dc2626",
      color: "#fff",
    },
  },
} as const;

export function MarketingProvidersClient({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Toaster position="bottom-center" toastOptions={toastOptions} />
      <AppQueryProvider>{children}</AppQueryProvider>
    </>
  );
}
