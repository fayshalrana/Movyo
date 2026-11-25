import { CommunityPlanSection } from "@/components/layout/home/CommunityPlanSection";
import { CtaJourneySection } from "@/components/layout/home/CtaJourneySection";
import { FaqSection } from "@/components/layout/home/FaqSection";
import { FeaturedInSection } from "@/components/layout/home/FeaturedInSection";
import { HeroBanner } from "@/components/layout/home/HeroBanner";
import { MemberSpotlightsSection } from "@/components/layout/home/MemberSpotlightsSection";
import { ProductsInStockSection } from "@/components/layout/home/ProductsInStockSection";
import { ProgramStepsSection } from "@/components/layout/home/ProgramStepsSection";
import { SuccessFeaturesSection } from "@/components/layout/home/SuccessFeaturesSection";
import { UpcomingEventsSection } from "@/components/layout/home/UpcomingEventsSection";
import { WeightManagementSection } from "@/components/layout/home/WeightManagementSection";

export function HomePage() {
  return (
    <>
      <HeroBanner />
      <FeaturedInSection />
      <WeightManagementSection />
      <CommunityPlanSection />
      <SuccessFeaturesSection />
      <UpcomingEventsSection />
      <MemberSpotlightsSection />
      <ProgramStepsSection />
      <ProductsInStockSection />
      <FaqSection />
      <CtaJourneySection />
    </>
  );
}
