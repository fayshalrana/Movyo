import type { ReactNode } from "react";
import { AppQueryProvider } from "@/providers/AppQueryProvider";

export default function TestIntakeFormLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <AppQueryProvider>{children}</AppQueryProvider>;
}
