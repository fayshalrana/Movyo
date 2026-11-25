import type { Metadata } from "next";

import { DeferredImageHydrator, HomePage } from "@/components/layout/home";

export const metadata: Metadata = {
  title: "Movyo Health",
  description: "Movyo Health — Transforming healthcare with technology.",
};

export default function Home() {
  return (
    <>
      <HomePage />
      <DeferredImageHydrator />
    </>
  );
}
