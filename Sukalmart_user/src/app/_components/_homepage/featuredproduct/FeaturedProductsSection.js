"use client";
import FeaturedProductCard from "./FeaturedProductCard";
import { featuredProducts } from "../../../../lib/data";
import React, { useState, useRef, useEffect } from "react";

export default function FeaturedProductsSection({ isProductPage = false }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const containerRef = useRef(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const diff = startX - currentX;
    const threshold = 50; // minimum swipe distance
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide(); // swipe left
      } else {
        prevSlide(); // swipe right
      }
    }
    
    setIsDragging(false);
  };

  return (
    <>
      <div
        className={
          isProductPage
            ? "py-6 md:py-8 lg:py-10 overflow-hidden px-0 sm:px-0 lg:px-4 xl:px-4"
            : "py-6 md:py-8 lg:py-10 overflow-hidden mx-auto w-full max-w-screen-xl px-4 sm:px-0 lg:px-4 xl:px-10"
        }
      >
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-row gap-2 items-center justify-between w-full">
            <h2
              className="text-[20px] sm:text-[22px] md:text-[24px] xl:text-[28px] font-bold"
              style={{
                color: "#333333",
                letterSpacing: "-0.22px",
              }}
            >
              Featured Shampoos
            </h2>
            <button
              className="flex items-center gap-2 font-medium transition-colors cursor-pointer"
              style={{ color: "#035F0F", cursor: 'pointer' }}
              onClick={() => window.location.href = "/products"}
            >
              <span className="text-sm sm:text-base">View all</span>
              <img src="/nextarrow.svg" alt="Next arrow" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </button>
          </div>

          {/* Product Cards */}
          <div className="w-full">
            {/* Mobile: Full width carousel */}
            <div className="flex flex-row gap-0 w-full overflow-x-auto scrollbar-hide sm:hidden snap-x snap-mandatory">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-full snap-start px-0 sm:px-2"
                >
                  <FeaturedProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Tablet: Single card swiper */}
            <div className="hidden sm:block md:hidden w-full">
              <div 
                ref={containerRef}
                className="relative w-full"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Current Product Card */}
                <div className="w-full">
                  <FeaturedProductCard product={featuredProducts[currentSlide]} />
                </div>
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Pagination Dots */}
              <div className="flex justify-center mt-6 gap-3">
                {featuredProducts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-[#035F0F]' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop: Original 50:50 layout */}
            <div className="hidden md:flex flex-row gap-6 w-full">
              {featuredProducts.map((product) => (
                <FeaturedProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Mobile scroll indicator */}
          <div className="sm:hidden w-full">
            <div className="flex justify-center">
              <div className="w-20 h-1 bg-gray-200 rounded-full">
                <div className="w-5 h-1 bg-[#035F0F] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-black/10 w-full mt-6"></div>
      </div>
    </>
  );
}
