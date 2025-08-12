"use client";

import { useParams } from "next/navigation";
import HeroBanner from "../../_components/_homepage/hero/HeroBanner";
import ShopByPriceSection from "../../_components/_homepage/ShopByPriceSection";
import HaircareBanner from "../../_components/_homepage/HaircareBanner";
import SunsilkShampooSection from "../../_components/_homepage/SunsilkShampooSection";
import NewLaunchesSection from "../../_components/_homepage/NewLaunchesSection";
import ShopOtherCategoriesSection from "../../_components/_homepage/ShopOtherCategoriesSection";
import CategorySection from "../../_components/_homepage/categroy/CategorySection";
import BestSellersSection from "../../_components/_homepage/bestSeller/BestSellersSection";
import FeaturedProductsSection from "../../_components/_homepage/featuredproduct/FeaturedProductsSection";
import ServiceBenefits from "../../_components/_homepage/service/ServiceBenefits";
import PromotionalBanner from "../../_components/_homepage/promotion/PromotionalBanner";
import CrystalClearBanner from "../../_components/_homepage/promotion/CrystalClearBanner";
import EngineeredBy7Hz from "../../_components/_homepage/EngineeredBy7Hz";
import InstagramSection from "../../_components/_homepage/InstagramSection";

export default function CategoryPage() {
  const params = useParams();
  const categoryName = params.category;

  // Convert URL slug back to readable category name
  const getCategoryDisplayName = (slug) => {
    const categoryMap = {
      'hair-care': 'Hair Care',
      'body-shower': 'Body & Shower',
      'body-&-shower': 'Body & Shower', // Handle URL encoded version
      'soap-deodorants': 'Soap & Deodorants',
      'soap-&-deodorants': 'Soap & Deodorants', // Handle URL encoded version
      'skin-care': 'Skin Care',
      'oral-misc': 'Oral & Misc'
    };
    return categoryMap[slug] || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const displayName = getCategoryDisplayName(categoryName);
  console.log("CategoryPage - categoryName:", categoryName, "displayName:", displayName);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner as the first component */}
      <HeroBanner />
      
      {/* Shop by Price Section */}
      <ShopByPriceSection key={displayName} selectedCategory={displayName} />
      
      {/* Haircare Banner Section */}
      <HaircareBanner selectedCategory={displayName} />
      
      {/* Sunsilk Shampoo Section */}
      <SunsilkShampooSection selectedCategory={displayName} />
      
      {/* New Launches Section */}
      <NewLaunchesSection />

      <FeaturedProductsSection />
    

    
      {/* Shop Other Categories Section */}
      <ShopOtherCategoriesSection currentCategory={categoryName} />

    </div>
  );
} 