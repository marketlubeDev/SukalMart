"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Button from '@/app/_components/common/Button';
import { useLanguage } from "../context/LanguageContext";
import { t } from "@/lib/translations";

export default function HaircareBanner({ selectedCategory }) {
  const { language } = useLanguage();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle shop now button click
  const handleShopNow = async () => {
    setIsLoading(true);
    try {
      // Use sessionStorage instead of localStorage for better Next.js compatibility
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('selectedCategory', selectedCategory || 'Hair Care');
      }
      // Navigate to products page
      await router.push('/products');
    } catch (error) {
      console.error('Navigation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to get banner content based on category
  const getBannerContent = (category) => {
    const contentMap = {
      "Body & Shower": {
        title: "Body Care That Radiates Confidence",
        description: "Premium body care products deliver transformative results, rich nourishment and immersive care - engineered for true beauty enthusiasts.",
        mainImage: "/bodywah.jpg",
        secondaryImage: "/bodywah.jpg",
        accentImage: "/bodywah.jpg",
        mainAlt: "Premium Body Care Product",
        secondaryAlt: "Body Care Product",
        accentAlt: "Body Care Product"
      },
      "Soap & Deodorants": {
        title: "Premium Beauty Collection",
        description: "Expertly formulated beauty products delivering radiant results, innovative ingredients, and dermatologist-approved performance.",
        mainImage: "/soap1.jpeg",
        secondaryImage: "/soap1.jpeg",
        accentImage: "/soap1.jpeg",
        mainAlt: "Soap & Deodorants Product",
        secondaryAlt: "Soap & Deodorants Product",
        accentAlt: "Soap & Deodorants Product"
      },
      "Skin Care": {
        title: "Premium Beauty Collection",
        description: "Expertly formulated beauty products delivering radiant results, innovative ingredients, and dermatologist-approved performance.",
        mainImage: "/skin1.jpg",
        secondaryImage: "/skin1.jpg",
        accentImage: "/skin1.jpg",
        mainAlt: "Skin Care Product",
        secondaryAlt: "Skin Care Product",
        accentAlt: "Skin Care Product"
      },
      "Oral & Misc": {
        title: "Premium Beauty Collection",
        description: "Expertly formulated beauty products delivering radiant results, innovative ingredients, and dermatologist-approved performance.",
        mainImage: "/tooth1.jpg",
        secondaryImage: "/tooth1.jpg",
        accentImage: "/tooth1.jpg",
        mainAlt: "Oral & Misc Product",
        secondaryAlt: "Oral & Misc Product",
        accentAlt: "Oral & Misc Product"
      },
      "Hair Care": {
        title: "Hair That Speaks With Confidence",
        description: "Precision-crafted haircare products deliver transformative results, rich nourishment and immersive care - engineered for true beauty enthusiasts.",
        mainImage: "/haircare1.jpg",
        secondaryImage: "/haircare2.jpg",
        accentImage: "/haircare3.jpg",
        mainAlt: "Premium Haircare Product",
        secondaryAlt: "Haircare Product",
        accentAlt: "Haircare Product"
      }
    };

    return contentMap[category] || {
      title: "Premium Beauty Collection",
      description: "Expertly formulated beauty products delivering radiant results, innovative ingredients, and dermatologist-approved performance.",
      mainImage: "/haircare1.jpg",
      secondaryImage: "/haircare2.jpg",
      accentImage: "/haircare3.jpg",
      mainAlt: "Premium Beauty Product",
      secondaryAlt: "Beauty Product",
      accentAlt: "Beauty Product"
    };
  };

  const content = getBannerContent(selectedCategory);

  return (
    <div className="py-8 container mx-auto px-4 md:px-8 lg:px-10 xl:px-10 2xl:px-10">
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg">
        {/* Mobile overlay banner (visible on small screens) */}
        <div className="lg:hidden relative w-full h-[260px] md:h-[350px]">
          <div
            className="absolute inset-0 bg-center bg-cover rounded-lg"
            style={{ backgroundImage: `url('${content.mainImage}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent rounded-lg" />
          <div className="absolute inset-0 flex items-center p-4">
            <div className="max-w-md">
              <h2 className="text-white text-xl font-semibold mb-2 leading-snug">
                {content.title}
              </h2>
              <p className="text-white/90 text-sm mb-4 leading-relaxed line-clamp-3">
                {content.description}
              </p>
              <Button 
                variant="secondary"
                size="large"
                onClick={handleShopNow}
                disabled={isLoading}
                className="bg-transparent text-white px-4 py-2 rounded text-sm font-semibold cursor-pointer border-2 border-white hover:text-gray-200 hover:border-white/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? t("common.loading", language) : t("homepage.hero.cta", language)}
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop/Tablet rich layout (visible on large screens) */}
        <div className="hidden lg:block p-8 md:p-12">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent" />
          </div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Section - Text Content */}
            <div className="flex-1 text-gray-800">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 leading-tight">
                {content.title}
              </h2>
              <p className="text-lg md:text-xl mb-6 opacity-90 leading-relaxed">
                {content.description}
              </p>
              <Button 
                variant="secondary"
                size="large"
                onClick={handleShopNow}
                disabled={isLoading}
                className="inline-flex items-center px-6 py-3 bg-transparent text-gray-800 font-semibold rounded-lg hover:text-gray-600 transition-all duration-200 border-2 border-gray-800 hover:border-gray-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? t("common.loading", language) : t("homepage.hero.cta", language)}
              </Button>
            </div>
            
            {/* Right Section - Product Images */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="relative">
                {/* Main Product Image */}
                <div className="relative z-20">
                  <Image
                    src={content.mainImage}
                    alt={content.mainAlt}
                    width={256}
                    height={256}
                    className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-cover rounded-lg shadow-lg"
                    priority
                  />
                </div>
                
                {/* Secondary Product Image */}
                <div className="absolute -top-4 -right-4 z-10">
                  <Image
                    src={content.secondaryImage}
                    alt={content.secondaryAlt}
                    width={160}
                    height={160}
                    className="w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 object-cover rounded-lg shadow-lg"
                  />
                </div>
                
                {/* Accent Product Image */}
                <div className="absolute -bottom-4 -left-4 z-10">
                  <Image
                    src={content.accentImage}
                    alt={content.accentAlt}
                    width={128}
                    height={128}
                    className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}