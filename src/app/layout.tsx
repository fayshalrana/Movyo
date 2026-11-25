import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import "./globals.css";
import { SiteAuthGate } from "@/components/auth/SiteAuthGate";
import { AppShell } from "@/components/layout/AppShell";
import {
  SITE_AUTH_GATE_COOKIE_NAME,
  SITE_AUTH_REQUIRED_HEADER,
  SITE_PUBLIC_ROUTE_HEADER,
} from "@/lib/requests/siteAuth";
import { MarketingProviders } from "@/components/providers/MarketingProviders";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "MovyoHealth - Your Trusted Digital Healthcare Partner",
  description:
    "MovyoHealth provides quality medical care from the comfort of your home. Access telehealth services, mental health support, and primary care online.",
};

async function AuthWrapper({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const cookieStore = await cookies();
  const isPublicHome = h.get(SITE_PUBLIC_ROUTE_HEADER) === "1";
  const needsAuth =
    !isPublicHome &&
    (h.get(SITE_AUTH_REQUIRED_HEADER) === "1" ||
      cookieStore.get(SITE_AUTH_GATE_COOKIE_NAME)?.value === "1");

  return (
    <>
      {needsAuth ? (
        <SiteAuthGate needsAuth={needsAuth}>
          <AppShell>{children}</AppShell>
        </SiteAuthGate>
      ) : (
        <AppShell>{children}</AppShell>
      )}
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white font-sans">
        <Suspense fallback={<AppShell>{children}</AppShell>}>
          <MarketingProviders>
            <AuthWrapper>{children}</AuthWrapper>
          </MarketingProviders>
        </Suspense>
      </body>
    </html>
  );
}
