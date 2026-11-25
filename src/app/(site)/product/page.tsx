import { ProductHealthSection } from "@/components/layout";
import { ProductChooseProgramSection, WellnessPlatformSection, WhatYouGetSection } from "@/components/layout/product";

export default function ProductPage() {
  return (
    <>
      <ProductHealthSection
        title="Movyo Health"
        priceLabel="Starting at $147/month"
        benefits={[
          "Licensed providers prescribe and monitor your treatment",
          "Compounded semaglutide or tirzepatide delivered to your door",
          "Ongoing care coaching and medical support included",
        ]}
        dosageBody={
          <>
            Compounded Semaglutide: Weekly injections starting at 0.25 mg,
            gradually increasing to maintenance dose of 1.0–2.4 mg.
            <br />
            Compounded Tirzepatide: Weekly injections starting at 2.5 mg,
            gradually increasing to maintenance dose of 5–15 mg.
          </>
        }
      />
      <ProductChooseProgramSection />

      <WellnessPlatformSection />

      <WhatYouGetSection />
    </>
  );
}
