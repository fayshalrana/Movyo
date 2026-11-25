import { headers } from "next/headers";
import type { ReactNode } from "react";

import { HOME_ROUTE_HEADER } from "@/components/layout/home/homePath";

import { MarketingProvidersClient } from "./MarketingProvidersClient";

export async function MarketingProviders({
  children,
}: {
  children: ReactNode;
}) {
  const headerStore = await headers();
  const isHome = headerStore.get(HOME_ROUTE_HEADER) === "1";

  if (isHome) {
    return children;
  }

  return <MarketingProvidersClient>{children}</MarketingProvidersClient>;
}
