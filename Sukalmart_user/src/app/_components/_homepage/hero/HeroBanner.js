"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import useBanner from "@/lib/hooks/useBanner"; // BACKEND INTERACTION: Removed dynamic banner fetching
import Button from "@/app/_components/common/Button";

export default function HeroBanner() {
  const router = useRouter();

  const normalizeSlug = (value) =>
    String(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);

  // BACKEND INTERACTION: Previously used useBanner hook to fetch banners from API
  // const { banners, loading, error } = useBanner({ bannerFor: "hero" });
  // 
  // The useBanner hook would:
  // 1. Make API call to /api/banners?bannerFor=hero
  // 2. Fetch banner data from database (MongoDB)
  // 3. Handle loading states while fetching
  // 4. Handle error states if API fails
  // 5. Return banners array with image URLs, titles, descriptions, etc.

  // STATIC BANNERS: Replaced dynamic fetching with static banner data
  // This eliminates the need for:
  // - API calls to backend
  // - Database queries
  // - Loading states
  // - Error handling for network issues
  // - Admin panel banner management
  const banners = [
    {
      id: 1,
      image: "/banners1.jpg", // Static image from public folder
      title: "Discover Your Perfect Style",
      subtitle: "Premium Beauty Collection",
      description: "Explore our curated selection of premium beauty products designed to enhance your natural beauty and boost your confidence."
    },
    {
      id: 2,
      image: "/banners2.jpg", // Static image from public folder
      title: "Summer Beauty Essentials",
      subtitle: "Fresh & Radiant Look",
      description: "Get ready for summer with our essential beauty products that keep you looking fresh and radiant all day long."
    },
    {
      id: 3,
      image: "/banners1.jpg", // Reusing first image with different content
      title: "Professional Hair Care",
      subtitle: "Salon-Quality Results",
      description: "Transform your hair with our professional-grade hair care products that deliver salon-quality results at home."
    },
    {
      id: 4,
      image: "/banners2.jpg", // Reusing second image with different content
      title: "Skincare Revolution",
      subtitle: "Advanced Formulations",
      description: "Experience the future of skincare with our advanced formulations that target your specific skin concerns."
    }
  ];

  // Auto-slide functionality (unchanged from original implementation)
  useEffect(() => {
    if (isAutoPlaying && banners.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, banners.length]);

  const handleSlideChange = (newSlide) => {
    setIsAutoPlaying(false);
    setCurrentSlide(newSlide);
    
    // Resume auto-slide after 3 seconds of inactivity
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 3000);
  };

  const nextSlide = () => {
    handleSlideChange((currentSlide + 1) % banners.length);
  };

  const prevSlide = () => {
    handleSlideChange((currentSlide - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index) => {
    handleSlideChange(index);
  };

  const currentBanner = banners[currentSlide];

  // BACKEND INTERACTION REMOVED: Previously had loading, error, and empty states
  // 
  // Loading State (Removed):
  // if (loading) {
  //   return (
  //     <div className="relative w-full overflow-hidden">
  //       <div className="h-[500px] md:h-[500px] lg:h-[640px] flex items-center justify-center bg-gray-100">
  //         <div className="text-center">
  //           <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-[var(--color-primary)] mx-auto mb-4"></div>
  //           <p className="text-gray-600 text-sm md:text-base">Loading banners...</p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
  //
  // Error State (Removed):
  // if (error) {
  //   return (
  //     <div className="relative w-full overflow-hidden">
  //       <div className="h-[500px] md:h-[500px] lg:h-[640px] flex items-center justify-center bg-gray-100">
  //         <div className="text-center">
  //           <p className="text-red-600 text-base md:text-lg">Failed to load banners</p>
  //           <p className="text-gray-500 text-xs md:text-sm mt-2">Please try again later</p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
  //
  // Empty State (Removed):
  // if (!banners || banners.length === 0) {
  //   return (
  //     <div className="relative w-full overflow-hidden">
  //       <div className="h-[500px] md:h-[500px] lg:h-[640px] flex items-center justify-center bg-gray-100">
  //         <div className="text-center">
  //           <p className="text-gray-600 text-base md:text-lg">No banners available</p>
  //           <p className="text-gray-500 text-xs md:text-sm mt-2">
  //             Please add some banners in the admin panel
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="relative w-full overflow-hidden">
      {/* Main banner container with responsive height */}
      <div className="relative h-[500px] md:h-[500px] lg:h-[640px] bg-white overflow-hidden">
        
        {/* Background image with responsive sizing */}
        {/* BACKEND INTERACTION: Previously used dynamic image URLs from database */}
        {/* Now uses static image paths from public folder */}
        <div
          className="absolute inset-0 transition-all duration-500 ease-in-out"
          style={{
            backgroundImage: `url('${currentBanner.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#f8f9fa",
          }}
        />
        
        {/* Responsive overlay gradients */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: `
              linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 30%, transparent 50%),
              linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 30%, transparent 50%)
            `
          }}
        />

        {/* Navigation arrows - responsive positioning */}
        <div className="absolute inset-0 flex items-center justify-between z-20 md:top-1/2 md:-translate-y-1/2">
          <div className="container mx-auto flex justify-between items-center px-4 md:px-8 lg:px-10">
            {/* Previous button */}
            <button
              onClick={prevSlide}
              className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-md ring-1 ring-black/5 transition cursor-pointer"
              aria-label="Previous slide"
            >
              <Image
                src="/previousicon.svg"
                alt="Previous"
                width={12}
                height={12}
                className="w-3 h-3 md:w-5 md:h-5"
              />
            </button>

            {/* Next button */}
            <button
              onClick={nextSlide}
              className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-md ring-1 ring-black/5 transition cursor-pointer"
              aria-label="Next slide"
            >
              <Image
                src="/nexticon.svg"
                alt="Next"
                width={12}
                height={12}
                className="w-3 h-3 md:w-5 md:h-5"
              />
            </button>
          </div>
        </div>

        {/* Content - responsive positioning and sizing */}
        <div className="relative z-10 h-full flex items-end">
          <div className="container mx-auto pb-8 md:pb-12 lg:pb-16 px-4 md:px-8 lg:px-10">
            <div className="max-w-full md:max-w-xl lg:max-w-2xl">
              
              {/* Heading with responsive text sizes */}
              {/* BACKEND INTERACTION: Previously used dynamic title from database */}
              <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold text-white mb-3 md:mb-4 lg:mb-6 leading-tight transition-all duration-500">
                {currentBanner.title}
              </h1>

              {/* Subtitle - hidden on mobile, shown on tablet+ */}
              {/* BACKEND INTERACTION: Previously used dynamic subtitle from database */}
              {currentBanner.subtitle && (
                <p className="hidden md:block text-base lg:text-xl text-gray-200 mb-2 lg:mb-0 leading-relaxed transition-all duration-500">
                  {currentBanner.subtitle}
                </p>
              )}

              {/* Description with responsive text sizes */}
              {/* BACKEND INTERACTION: Previously used dynamic description from database */}
              <p className="text-xs md:text-base lg:text-xl text-gray-200 mb-6 md:mb-6 lg:mb-8 leading-relaxed transition-all duration-500">
                {/* Show both subtitle and description on mobile, just description on larger screens */}
                <span className="md:hidden">
                  {currentBanner.subtitle}
                  {currentBanner.subtitle && <br />}
                </span>
                {/* {currentBanner.description} */}
              </p>

              {/* Shop now button with responsive sizing */}
              {/* BACKEND INTERACTION: Previously used dynamic category slug from database */}
              <Button
                variant="primary"
                size="large"
                onClick={() => router.push(`/category/${normalizeSlug(currentBanner.title)}`)}
                className="self-start md:self-auto text-xs md:text-sm lg:text-base rounded-md"
              >
                Shop now
              </Button>
            </div>
          </div>
        </div>

        {/* Progress indicator with responsive sizing */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="flex gap-1 md:gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-0.5 md:h-1 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentSlide
                    ? "bg-[rgba(109,13,38,0.7)] md:bg-[#6D0D26] md:opacity-70"
                    : "bg-[rgba(51,51,51,0.2)] md:bg-gray-300"
                } ${
                  // Responsive widths
                  banners.length <= 4 
                    ? "w-16 md:w-16 lg:w-20" 
                    : "w-12 md:w-14 lg:w-16"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}