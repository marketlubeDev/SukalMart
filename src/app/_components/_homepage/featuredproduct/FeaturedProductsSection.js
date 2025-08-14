"use client";
import FeaturedProductCard from "./FeaturedProductCard";
import { featuredProducts } from "../../../../lib/data";
import React from "react";

/**
 * Responsive paddings:
 * - Default: px-4 sm:px-6 md:px-12
 * - BigTablets (992px - 1199.98px): Remove 200px paddings, use px-8
 * - Desktop (>=1200px): Add 200px paddings (px-[200px])
 *
 * Achieved via inline style and a custom CSS class with media queries.
 */

export default function FeaturedProductsSection({ isProductPage = false }) {
  return (
    <>
      <div
        className={
          isProductPage
            ? "py-6 md:py-8 lg:py-10 overflow-hidden md:px-4"
            : "py-6 md:py-8 lg:py-10 overflow-hidden mx-auto w-full max-w-screen-xl px-4 md:px-10 "
        }
      >
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-row gap-2 items-center justify-between w-full">
            <h2
              className="text-[22px] font-bold"
              style={{
                color: "#333333",
                // fontFamily: "'Nunito Sans', sans-serif",
                letterSpacing: "-0.22px",
              }}
            >
              Featured Shampoos
            </h2>
            <button
              className="flex items-center gap-2 font-medium transition-colors"
              style={{ color: "#035F0F" }}
              onClick={() => window.location.href = "/products"}
            >
              <span>View all</span>
              <img src="/nextarrow.svg" alt="Next arrow" className="w-7 h-7" />
            </button>
          </div>

          {/* Product Cards - Mobile: Full width carousel, Desktop: 50:50 Layout */}
          <div className="flex flex-row gap-6 w-full">
            {/* Mobile: Full width carousel container */}
            <div className="flex flex-row gap-0 w-full overflow-x-auto scrollbar-hide md:hidden snap-x snap-mandatory">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-full snap-start px-2"
                >
                  <FeaturedProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Desktop: Original 50:50 layout */}
            <div className="hidden md:flex flex-row gap-6 w-full">
              {featuredProducts.map((product) => (
                <FeaturedProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Mobile scroll indicator */}
          <div className="md:hidden w-full">
            <div className="flex justify-center">
              <div className="w-20 h-1 bg-gray-200 rounded-full">
                <div className="w-5 h-1 bg-[#035F0F] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="border-b border-black/10 w-[80%] mt-6 mx-auto"></div>
    </>
  );
}
