import type { ReactNode } from "react";

import { DEFERRED_IMAGE_BOOTSTRAP } from "@/lib/deferred-image";

import "@/components/layout/home/home-fonts.css";

type HomeLayoutProps = {
  children: ReactNode;
};

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <>
      {children}
      <script dangerouslySetInnerHTML={{ __html: DEFERRED_IMAGE_BOOTSTRAP }} />
    </>
  );
}
