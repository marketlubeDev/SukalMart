"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);

  const banners = [
    {
      id: 1,
      image:
        "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/banner/banner1.jpg",
      title: "Hair Care",
      subtitle: "Shampoos, conditioners, and treatments",
      description: "Nourish, strengthen, and style with top brands",
    },
    {
      id: 2,
      image:
        "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/banner/banner2.jpg",
      title: "Body & Shower",
      subtitle: "Body wash, scrubs, and lotions",
      description: "Refresh your daily ritual",
    },
    {
      id: 3,
      image:
        "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/banner/banner3.jpg",
      title: "Soap & Deodorants",
      subtitle: "Bars, liquids, and long‑lasting freshness",
      description: "Stay clean and confident all day",
    },
    {
      id: 4,
      image:
        "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/banner/banner4.jpg",
      title: "Skin Care",
      subtitle: "Cleansers, serums, and moisturizers",
      description: "Healthy, glowing skin starts here",
    },
    {
      id: 5,
      image:
        "/banner5.png",
      title: "Oral & Misc",
      subtitle: "Toothpaste, brushes, and essentials",
      description: "Brighten your smile with daily care",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (isAutoPlaying) {
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


        <div className="w-full flex justify-between items-center top-50 absolute z-10 ">
        <div className=" flex justify-between container mx-auto px-10">
          {/* Previous Icon - Positioned above content with left spacing */}
          <div>
            <button
              onClick={prevSlide}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-md ring-1 ring-black/5 transition cursor-pointer"
              aria-label="Previous slide"
            >
              <img src="/previousicon.svg" alt="Previous" className="w-5 h-5" />
            </button>
          </div>

          {/* Next Icon - Top Right */}
          <div>
            <button
              onClick={nextSlide}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-md ring-1 ring-black/5 transition cursor-pointer"
              aria-label="Next slide"
            >
              <img src="/nexticon.svg" alt="Next" className="w-5 h-5" />
            </button>
          </div>
        </div>

        </div>
        
        {/* Content - Bottom Left */}
        <div className="relative z-10 h-full flex items-end">
          <div className="container mx-auto pb-18 px-10">
            <div className="max-w-2xl">
              {/* Row 2: Heading */}
              <h1 className="text-[2.8rem] font-semibold text-white mb-6 leading-tight transition-all duration-500">
                {currentBanner.title}
              </h1>

              {/* Row 3: Paragraph 1 */}
              <p className="text-[1.3rem] text-gray-200 mb-0 leading-relaxed transition-all duration-500">
                {currentBanner.subtitle}
              </p>

              {/* Row 4: Paragraph 2 */}
              <p className="text-[1.3rem] text-gray-200 mb-8 leading-relaxed transition-all duration-500">
                {currentBanner.description}
              </p>

              {/* Row 5: Shop Now Button */}
              <button className="bg-[#035F0F] hover:bg-[#035F0F]/90 text-white font-medium px-6 py-4 rounded transition-colors duration-200 flex items-center justify-center gap-2">
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
                className={`w-20 h-1 rounded-full transition-all duration-300 cursor-pointer ${index === currentSlide
                    ? "bg-green-700 opacity-70"
                    : "bg-gray-300"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Version - Clean Layout */}
      <div className="lg:hidden relative h-[500px] w-full overflow-hidden">
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
                className="w-10 h-10 flex items-center justify-center transition-colors bg-white/90 hover:bg-white rounded-full shadow ring-1 ring-black/5 cursor-pointer"
              >
                <img
                  src="/previousicon.svg"
                  alt="Previous"
                  className="w-4 h-4"
                />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 flex items-center justify-center transition-colors bg-white/90 hover:bg-white rounded-full shadow ring-1 ring-black/5 cursor-pointer"
              >
                <img src="/nexticon.svg" alt="Next" className="w-4 h-4" />
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
            <button className="bg-[#035f0f] text-white px-2 py-1 rounded flex items-center justify-center self-start cursor-pointer">
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
                className={`flex-1 h-0.5 rounded-2xl transition-all duration-300 cursor-pointer ${index === currentSlide
                    ? "bg-[rgba(3,95,15,0.7)]"
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
