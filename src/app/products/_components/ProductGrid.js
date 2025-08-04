"use client";

import PromotionalBanner from "@/app/_components/_homepage/promotion/PromotionalBanner";
import ProductShowcaseBanner from "@/app/_components/_homepage/promotion/ProductShowcaseBanner";
import ProductCard from "../../_components/_homepage/ProductCard";


export default function ProductGrid({ products, selectedCategory, sortBy, setSortBy }) {
  const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Newest", "Popular"];

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold text-gray-800">
            Showing result for "{selectedCategory}"
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-1 relative">
            <span className="text-sm text-gray-600">Sort by :</span>
            <div className="relative flex items-center" style={{ marginRight: "12px" }}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-0 pr-6 py-0 text-sm bg-white appearance-none focus:outline-none font-semibold text-gray-800"
                style={{
                  border: "none",
                  boxShadow: "none",
                  outline: "none",
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  appearance: "none",
                  paddingLeft: "0rem",
                  paddingRight: "1.5rem", // increased for icon gap
                  height: "24px",
                  lineHeight: "24px",
                  minWidth: "80px",
                  cursor: "pointer",
                }}
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option} className="font-normal">
                    {option}
                  </option>
                ))}
              </select>
              <img
                src="/dropdownicon.svg"
                alt="dropdown"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
                style={{ minWidth: "12px", minHeight: "12px" }}
              />
            </div>
            <div
              className="h-5 border-l border-gray-200 ml-1"
              style={{ height: "20px" }}
            />
          </div>

          {/* Grid View Toggle */}
          <div className="flex items-center gap-3">
            {/* 8 green card, 6 gray card grid icon */}
            <button
              className="p-0 focus:outline-none"
              aria-label="Grid View"
              style={{ width: 56, height: 24, display: "flex", alignItems: "center", background: "transparent" }}
            >
              <svg width="56" height="24" viewBox="0 0 56 24" fill="none">
                {/* 8 Green cards */}
                <g>
                  <rect x="2" y="2" width="6" height="6" rx="1.5" fill="#0B6612"/>
                  <rect x="10" y="2" width="6" height="6" rx="1.5" fill="#0B6612"/>
                  <rect x="18" y="2" width="6" height="6" rx="1.5" fill="#0B6612"/>
                  <rect x="26" y="2" width="6" height="6" rx="1.5" fill="#0B6612"/>
                  <rect x="2" y="10" width="6" height="6" rx="1.5" fill="#0B6612"/>
                  <rect x="10" y="10" width="6" height="6" rx="1.5" fill="#0B6612"/>
                  <rect x="18" y="10" width="6" height="6" rx="1.5" fill="#0B6612"/>
                  <rect x="26" y="10" width="6" height="6" rx="1.5" fill="#0B6612"/>
                </g>
                {/* 6 Gray cards */}
                <g>
                  <rect x="36" y="2" width="6" height="6" rx="1.5" fill="#BDBDBD"/>
                  <rect x="44" y="2" width="6" height="6" rx="1.5" fill="#BDBDBD"/>
                  <rect x="52" y="2" width="6" height="6" rx="1.5" fill="#BDBDBD"/>
                  <rect x="36" y="10" width="6" height="6" rx="1.5" fill="#BDBDBD"/>
                  <rect x="44" y="10" width="6" height="6" rx="1.5" fill="#BDBDBD"/>
                  <rect x="52" y="10" width="6" height="6" rx="1.5" fill="#BDBDBD"/>
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg overflow-hidden">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="mt-8 w-full">
        <PromotionalBanner fullWidth={true} />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg overflow-hidden">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="mt-8 w-full">
        <ProductShowcaseBanner fullWidth={true} />
      </div>

      <div className="mt-8 grid grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg overflow-hidden">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

     
    </div>
  );
} 