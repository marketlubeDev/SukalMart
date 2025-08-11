"use client";

import { useState } from "react";
import Image from "next/image";

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

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
        "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/banner/basnner5.jpg",
      title: "Oral & Misc",
      subtitle: "Toothpaste, brushes, and essentials",
      description: "Brighten your smile with daily care",
    },
  ];

  const nextSlide = () => {
    console.log("Next button clicked, current slide:", currentSlide);
    setCurrentSlide((prev) => {
      const newSlide = (prev + 1) % banners.length;
      console.log("New slide:", newSlide);
      return newSlide;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const currentBanner = banners[currentSlide];
  console.log("Current banner:", currentBanner);

  return (
    <div className="relative w-full overflow-hidden">
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

        {/* Content - Bottom Left with Previous Button */}
        <div className="relative z-10 h-full flex items-end">
          <div className="container mx-auto px-8 pb-16">
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

        {/* Prev/Next Buttons - aligned center vertically */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20">
          <button
            onClick={prevSlide}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-md ring-1 ring-black/5 transition cursor-pointer"
            aria-label="Previous slide"
          >
            <img src="/previousicon.svg" alt="Previous" className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20">
          <button
            onClick={nextSlide}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-md ring-1 ring-black/5 transition cursor-pointer"
            aria-label="Next slide"
          >
            <img src="/nexticon.svg" alt="Next" className="w-5 h-5" />
          </button>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-20 h-1 rounded-full transition-all duration-300 ${
                  index === currentSlide
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
                className="w-10 h-10 flex items-center justify-center transition-colors bg-white/90 hover:bg-white rounded-full shadow ring-1 ring-black/5"
              >
                <img
                  src="/previousicon.svg"
                  alt="Previous"
                  className="w-4 h-4"
                />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 flex items-center justify-center transition-colors bg-white/90 hover:bg-white rounded-full shadow ring-1 ring-black/5"
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
            <button className="bg-[#035f0f] text-white px-4 py-3 rounded flex items-center justify-center self-start">
              <span
                className="text-[12px] font-medium"
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
                className={`flex-1 h-0.5 rounded-2xl transition-all duration-300 ${
                  index === currentSlide
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
