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
    <div
      className={
        isProductPage ? "py-6 md:py-8 lg:py-10 overflow-hidden" : "featured-products-section-base py-6 md:py-8 lg:py-10 overflow-hidden"
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
            Featured IEM's
          </h2>
          <button
            className="flex items-center gap-2 font-medium transition-colors"
            style={{ color: "#035F0F" }}
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
              <div key={product.id} className="flex-shrink-0 w-full snap-start px-2">
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
      <style jsx>{`
        .featured-products-section-base {
          padding-left: 1rem;
          padding-right: 1rem;
        }
        @media (min-width: 640px) {
          .featured-products-section-base {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
        }
        @media (min-width: 768px) {
          .featured-products-section-base {
            padding-left: 3rem;
            padding-right: 3rem;
          }
        }
        /* BigTablets: 992px - 1199.98px, remove 200px paddings, use px-8 */
        @media (min-width: 992px) and (max-width: 1199.98px) {
          .featured-products-section-base {
            padding-left: 2rem;
            padding-right: 2rem;
          }
        }
        /* Desktop: >=1200px, add 200px paddings */
        @media (min-width: 1200px) {
          .featured-products-section-base {
            padding-left: 200px;
            padding-right: 200px;
          }
        }
      `}</style>
    </div>
  );
}
