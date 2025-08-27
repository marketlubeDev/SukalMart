"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useBanner from "@/lib/hooks/useBanner";

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

  const { banners, loading, error } = useBanner({ bannerFor: "hero" });

  // Auto-slide functionality
  useEffect(() => {
    if (isAutoPlaying && banners.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
      }, 5000); // Change slide every 5 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, banners.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false); // Pause auto-slide
    setCurrentSlide((prev) => (prev + 1) % banners.length);

    // Resume auto-slide after 3 seconds of inactivity
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 3000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false); // Pause auto-slide
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);

    // Resume auto-slide after 3 seconds of inactivity
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 3000);
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false); // Pause auto-slide
    setCurrentSlide(index);

    // Resume auto-slide after 3 seconds of inactivity
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 3000);
  };

  const currentBanner = banners[currentSlide];
  console.log("Current banner:", currentBanner);

  // Show loading state first
  if (loading) {
    return (
      <div className="relative container-fluid w-full overflow-hidden">
        <div className="h-[640px] lg:h-[500px] flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading banners...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state second
  if (error) {
    console.error("Banner loading error:", error);
    return (
      <div className="relative container-fluid w-full overflow-hidden">
        <div className="h-[640px] lg:h-[500px] flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <p className="text-red-600 text-lg">Failed to load banners</p>
            <p className="text-gray-500 text-sm mt-2">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  // Show message when no banners are available third
  if (!banners || banners.length === 0) {
    return (
      <div className="relative container-fluid w-full overflow-hidden">
        <div className="h-[640px] lg:h-[500px] flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <p className="text-gray-600 text-lg">No banners available</p>
            <p className="text-gray-500 text-sm mt-2">
              Please add some banners in the admin panel
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Safety check for currentBanner last
  if (!currentBanner) {
    return (
      <div className="relative container-fluid w-full overflow-hidden">
        <div className="h-[640px] lg:h-[500px] flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <p className="text-gray-600 text-lg">Banner data is invalid</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative container-fluid w-full overflow-hidden">
      {/* Desktop Version */}
      <div className="hidden lg:block relative h-[640px] bg-white">
        {/* Background with banner image */}
        <div
          className="absolute inset-0 bg-contain bg-center bg-no-repeat transition-all duration-500 ease-in-out"
          style={{
            backgroundImage: `url('${currentBanner.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#f8f9fa",
          }}
        ></div>
        {/* Readability overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>

        <div className="w-full flex justify-between items-center top-[45%] absolute z-20">
          <div className=" flex justify-between container mx-auto px-10">
            {/* Previous Icon - Positioned above content with left spacing */}
            <div>
              <button
                onClick={prevSlide}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-md ring-1 ring-black/5 transition cursor-pointer"
                aria-label="Previous slide"
                style={{ cursor: "pointer" }}
              >
                <img
                  src="/previousicon.svg"
                  alt="Previous"
                  className="w-5 h-5"
                />
              </button>
            </div>

            {/* Next Icon - Top Right */}
            <div>
              <button
                onClick={nextSlide}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-md ring-1 ring-black/5 transition cursor-pointer"
                aria-label="Next slide"
                style={{ cursor: "pointer" }}
              >
                <img src="/nexticon.svg" alt="Next" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content - Bottom Left */}
        <div className="relative z-10 h-full flex items-end">
          <div className="container mx-auto pb-16 px-10">
            <div className="max-w-2xl">
              {/* Row 2: Heading */}
              <h1 className="text-[2.8rem] font-semibold text-white mb-6 leading-tight transition-all duration-500">
                {currentBanner.title}
              </h1>

              {/* Row 3: Paragraph 1 */}
              {/* <p className="text-[1.3rem] text-gray-200 mb-0 leading-relaxed transition-all duration-500">
                {currentBanner.subtitle}
              </p> */}

              {/* Row 4: Paragraph 2 */}
              <p className="text-[1.3rem] text-gray-200 mb-8 leading-relaxed transition-all duration-500">
                {currentBanner.description}
              </p>

              {/* Row 5: Shop Now Button */}
              <button
                className="bg-[var(--color-primary)] text-white font-medium px-4 py-3 rounded transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                style={{ cursor: "pointer" }}
                onMouseOver={(e) => (e.currentTarget.style.background = "#520A1E")}
                onMouseOut={(e) => (e.currentTarget.style.background = "var(--color-primary)")}
                onClick={() =>
                  router.push(`/category/${normalizeSlug(currentBanner.title)}`)
                }
              >
                Shop now
              </button>
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-20 h-1 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentSlide
                    ? "bg-[#6D0D26] opacity-70"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Medium Screen Version */}
      <div className="hidden md:block lg:hidden relative h-[500px] bg-white">
        {/* Background with banner image */}
        <div
          className="absolute inset-0 bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${currentBanner.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#f8f9fa",
          }}
        ></div>
        {/* Readability overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>

        {/* Navigation Arrows - Positioned at center */}
        <div className="absolute inset-0 flex items-center justify-between z-20">
          <div className="flex justify-between items-center w-full px-8 -mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-md ring-1 ring-black/5 transition cursor-pointer"
              aria-label="Previous slide"
              style={{ cursor: 'pointer' }}
            >
              <img src="/previousicon.svg" alt="Previous" className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-md ring-1 ring-black/5 transition cursor-pointer"
              aria-label="Next slide"
              style={{ cursor: 'pointer' }}
            >
              <img src="/nexticon.svg" alt="Next" className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Content - Bottom Left */}
        <div className="relative z-10 h-full flex items-end">
          <div className="container mx-auto pb-12 px-8">
            <div className="max-w-xl">
              {/* Heading */}
              <h1 className="text-[2rem] font-semibold text-white mb-4 leading-tight">
                {currentBanner.title}
              </h1>

              {/* Subtitle */}
              <p className="text-[1rem] text-gray-200 mb-2 leading-relaxed">
                {currentBanner.subtitle}
              </p>

              {/* Description */}
              <p className="text-[1rem] text-gray-200 mb-6 leading-relaxed">
                {currentBanner.description}
              </p>

              {/* Shop Now Button */}
              <button 
                className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white font-medium px-4 py-3 rounded transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                style={{ cursor: 'pointer' }}
                onClick={() => router.push(`/category/${normalizeSlug(currentBanner.title)}`)}
              >
                Shop now
              </button>
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-16 h-1 rounded-full transition-all duration-300 cursor-pointer ${index === currentSlide
                    ? "bg-[#6D0D26] opacity-70"
                    : "bg-gray-300"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Version - Clean Layout */}
      <div className="md:hidden relative h-[500px] w-full overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 w-full h-full transition-all duration-500 ease-in-out"
          style={{
            backgroundImage: `url('${currentBanner.image}')`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#f8f9fa",
          }}
        ></div>
        {/* Readability overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>

        {/* Content positioned at bottom */}
        <div className="absolute bottom-8 left-4 right-4">
          <div className="flex flex-col gap-6">
            {/* Navigation Arrows - Above Heading */}
            <div className="flex justify-between items-center mb-2">
              <button
                onClick={prevSlide}
                className="w-8 h-8 flex items-center justify-center transition-colors bg-white/90 hover:bg-white rounded-full shadow ring-1 ring-black/5 cursor-pointer"
                style={{ cursor: "pointer" }}
              >
                <img
                  src="/previousicon.svg"
                  alt="Previous"
                  className="w-3 h-3"
                />
              </button>
              <button
                onClick={nextSlide}
                className="w-8 h-8 flex items-center justify-center transition-colors bg-white/90 hover:bg-white rounded-full shadow ring-1 ring-black/5 cursor-pointer"
                style={{ cursor: "pointer" }}
              >
                <img src="/nexticon.svg" alt="Next" className="w-3 h-3" />
              </button>
            </div>

            {/* Text Content */}
            <div className="flex flex-col gap-3">
              <h1
                className="text-[24px] font-semibold text-white leading-tight transition-all duration-500"
                style={{
                  letterSpacing: "-0.88px",
                }}
              >
                {currentBanner.title}
              </h1>
              <p
                className="text-[12px] font-normal text-gray-200 leading-relaxed transition-all duration-500"
                style={{
                  letterSpacing: "-0.36px",
                }}
              >
                {currentBanner.subtitle}
                <br />
                {currentBanner.description}
              </p>
            </div>

            {/* Shop Now Button */}
            <button
              className="bg-[var(--color-primary)] text-white px-2 py-1 rounded flex items-center justify-center self-start cursor-pointer"
              style={{ cursor: "pointer" }}
              onClick={() =>
                router.push(`/category/${normalizeSlug(currentBanner.title)}`)
              }
            >
              <span
                className="text-[10px] font-medium"
                style={{
                  letterSpacing: "-0.36px",
                }}
              >
                Shop now
              </span>
            </button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="flex gap-1 w-[80px]">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`flex-1 h-0.5 rounded-2xl transition-all duration-300 cursor-pointer ${
                  index === currentSlide
                    ? "bg-[rgba(109,13,38,0.7)]"
                    : "bg-[rgba(51,51,51,0.2)]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
