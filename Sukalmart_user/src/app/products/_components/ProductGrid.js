"use client";

import PromotionalBanner from "../../_components/_homepage/promotion/PromotionalBanner";
import ProductShowcaseBanner from "../../_components/_homepage/promotion/ProductShowcaseBanner";
import ProductCard from "../../_components/_homepage/ProductCard";

export default function ProductGrid({
  products,
  selectedCategory,
  sortBy,
  setSortBy,
}) {
  const sortOptions = [
    "Featured",
    "Price: Low to High",
    "Price: High to Low",
    "Newest",
    "Popular",
  ];

  console.log(products, "ajsgdlhlagshl");

  // Use products from parent directly
  const modifiedProducts = Array.isArray(products) ? products : [];

  return (
    <div className="bg-white px-4 sm:px-10 md:px-0 lg:px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        {/* md-only Filter/Sort triggers aligned to the end */}
        <div className="order-2 sm:order-2 self-end sm:self-auto hidden md:flex lg:hidden items-center gap-4">
          <button
            onClick={() => window.dispatchEvent(new Event("open-filter"))}
            className="flex items-center gap-2 text-gray-900"
          >
            <img src="/filtericon.svg" alt="Filter" className="w-5 h-5" />
            <span className="font-semibold text-sm">Filter</span>
          </button>
          <div className="h-5 w-px bg-gray-200" />
          <button
            onClick={() => window.dispatchEvent(new Event("open-sort"))}
            className="flex items-center gap-2 text-gray-900"
          >
            <img src="/sorticon.svg" alt="Sort" className="w-5 h-5" />
            <span className="font-semibold text-sm">Sort</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
            Showing result for &quot;{selectedCategory || "All Products"}&quot;
          </h1>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {/* Sort Dropdown visible from sm+; hidden on mobile */}
          <div className="flex items-center gap-1 relative">
            <span className="text-sm text-gray-600">Sort by :</span>
            <div
              className="relative flex items-center"
              style={{ marginRight: "12px" }}
            >
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
                  paddingRight: "1.5rem",
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
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {modifiedProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg overflow-hidden">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="mt-8 w-full">
        <PromotionalBanner fullWidth={true} />
      </div>

      {/* Second row of products */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {modifiedProducts.map((product, index) => (
          <div
            key={`second-${product.id}`}
            className="bg-white rounded-lg overflow-hidden"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="mt-8 w-full">
        <ProductShowcaseBanner fullWidth={true} category={selectedCategory} />
      </div>

      {/* Third row of products */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {modifiedProducts.map((product, index) => (
          <div
            key={`third-${product.id}`}
            className="bg-white rounded-lg overflow-hidden"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
