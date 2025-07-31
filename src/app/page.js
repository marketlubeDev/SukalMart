"use client";

import Footer from "@/layout/user/Footer";
import BestSellersSection from "./_components/_homepage/bestSeller/BestSellersSection";
import CategorySection from "./_components/_homepage/categroy/CategorySection";
import FeaturedProductsSection from "./_components/_homepage/featuredproduct/FeaturedProductsSection";
import HeroBanner from "./_components/_homepage/hero/HeroBanner";
import ServiceBenefits from "./_components/_homepage/service/ServiceBenefits";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeroBanner />
      <CategorySection />
      <BestSellersSection />
      <ServiceBenefits />
      <FeaturedProductsSection />
      <Footer />
    </div>
  );
}
