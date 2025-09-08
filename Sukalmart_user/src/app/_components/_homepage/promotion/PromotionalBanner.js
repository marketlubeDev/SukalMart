"use client";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/app/_components/common/Button";
import { useLanguage } from "@/app/_components/context/LanguageContext";
import { t } from "@/lib/translations";

export default function PromotionalBanner({ fullWidth = false }) {
  const router = useRouter();
  const pathname = usePathname();
  const [currentBanner, setCurrentBanner] = useState(0);
  const { language } = useLanguage();

  const banners = [
    {
      id: 1,
      productId: "2",
      title: "Glow Up Your Skin, 20% OFF!",
      description: "Premium skincare essentials for radiant, healthy skin",
      image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
      alt: "Skincare Products",
      background: "linear-gradient(90deg, #FFE5F1, #FFF0F5)",
      buttonText: "Shop now",
    },
    {
      id: 2,
      productId: "1",
      title: "Anti-Aging Collection, 25% OFF!",
      description: "Advanced anti-aging formulas to restore youthful radiance. Limited time offer",
      image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
      alt: "Anti-Aging Products",
      background: "linear-gradient(90deg, #FFF8DC, #FFF5E6)",
      buttonText: "Shop now",
    },
  ];

  const handleShopNowClick = (productId) => {
    router.push(`/products/${productId}`);
  };

  // Auto-rotate banners every 5 seconds for mobile/tablet only
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const containerClasses = fullWidth 
    ? 'px-0 sm:px-0 md:px-0 lg:px-0 2xl:px-0' 
    : 'px-4 sm:px-10 md:px-8 lg:px-10 2xl:px-10';

  return (
    <div className={`${containerClasses} container mx-auto pt-4 pb-0 md:py-8 lg:py-10 overflow-hidden`}>
      {/* Mobile to Large screens: Auto-rotating single banner */}
      <div className="xl:hidden">
        <div
          className="relative overflow-hidden rounded-lg md:p-4 h-[200px] md:h-[250px] lg:h-[240px]"
          style={{ background: banners[currentBanner].background }}
        >
          {/* Product Image - Right Side */}
          <div className="absolute right-3 sm:right-4 md:right-6 lg:right-4 top-1/2 transform -translate-y-1/2">
            <Image
              src={banners[currentBanner].image}
              alt={banners[currentBanner].alt}
              width={192}
              height={192}
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain"
            />
          </div>

          {/* Content - Left Side */}
          <div className="absolute left-4 sm:left-6 md:left-8 lg:left-6 top-1/2 transform -translate-y-1/2 max-w-[200px] sm:max-w-xs lg:max-w-xs">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold mb-2 sm:mb-3 lg:mb-3 text-[#333333]">
              {banners[currentBanner].title}
            </h3>
            <p className="text-xs sm:text-sm md:text-base lg:text-base mb-3 sm:mb-4 lg:mb-4 text-[#333333]">
              {banners[currentBanner].description}
            </p>
            <Button
              variant="secondary"
              size="large"
              onClick={() => handleShopNowClick(banners[currentBanner].productId)}
              className="text-xs sm:text-sm md:text-base lg:text-base rounded-md"
            >
              {t("homepage.hero.cta", language)}
            </Button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mt-3 lg:mt-6">
          <div className="w-20 h-1 bg-gray-200 rounded-full">
            <div 
              className="h-1 bg-[var(--color-primary,#007bff)] rounded-full transition-all duration-300"
              style={{ width: `${(currentBanner + 1) * (100 / banners.length)}%` }}
            />
          </div>
        </div>
      </div>

      {/* XL screens and above: Side-by-side banners */}
      <div className="hidden xl:flex xl:gap-0">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`flex-1 relative overflow-hidden h-[240px] ${
              index === 0 ? 'rounded-l-lg' : ''
            } ${
              index === banners.length - 1 ? 'rounded-r-lg' : ''
            }`}
            style={{ background: banner.background }}
          >
            {/* Product Image - Right Side */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Image
                src={banner.image}
                alt={banner.alt}
                width={192}
                height={192}
                className="w-48 h-48 object-contain"
              />
            </div>

            {/* Content - Left Side */}
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2 max-w-xs">
              <h3 className="text-2xl font-bold mb-3 text-[#333333]">
                {banner.title}
              </h3>
              <p className="text-base mb-4 text-[#333333]">
                {banner.description}
              </p>
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => handleShopNowClick(banner.productId)}
                  className="text-xs sm:text-sm md:text-base lg:text-base rounded-md"
                >
                  {t("homepage.hero.cta", language)}
                </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Border */}
      <div className="border-b border-black/10 w-full mt-6" />
    </div>
  );
}