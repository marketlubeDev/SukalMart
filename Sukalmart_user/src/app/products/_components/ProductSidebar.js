"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/app/_components/context/LanguageContext";
import { t } from "@/lib/translations";

export default function ProductSidebar({
  selectedCategory,
  setSelectedCategory,
  selectedDiscount,
  setSelectedDiscount,
  priceRange,
  setPriceRange,
}) {
  const router = useRouter();
  const [sessionData, setSessionData] = useState({});
  const { language } = useLanguage();

  const categories = [
    "Hair Care",
    "Body & Shower",
    "Soap & Deodorants",
    "Skin Care",
    "Oral & Misc",
  ];

  const discountOptions = [
    "homepage.productSidebar.pdiscount10",
    "homepage.productSidebar.discount20",
    "homepage.productSidebar.discount30",
    "homepage.productSidebar.discount40",
    "homepage.productSidebar.discount50",
  ];

  const priceRanges = [
    "homepage.productSidebar.under1000",
    "homepage.productSidebar.range1000to2000",
    "homepage.productSidebar.range2000to3000",
    "homepage.productSidebar.range3000to4000",
    "homepage.productSidebar.over4000",
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // Store in component state instead of localStorage
    setSessionData({ selectedCategory: category });
  };

  return (
    <div
      className="bg-white p-4 rounded-lg w-full"
      style={{
        overscrollBehavior: "contain",
        minWidth: "320px",
        maxWidth: "100%",
      }}
      onWheel={(e) => {
        // Prevent scroll propagation to parent elements
        e.stopPropagation();
      }}
    >
      {/* Categories */}
      <div className="mb-4">
        <h3
          className="mb-2"
          style={{
            color: "#333",
            leadingTrim: "both",
            textEdge: "cap",
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "normal",
            letterSpacing: "-0.18px",
          }}
        >
          {t("homepage.productSidebar.categories", language)}
        </h3>
        <div className="space-y-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors cursor-pointer ${
                selectedCategory === category
                  ? "bg-green-100"
                  : "hover:bg-gray-50"
              }`}
              style={{
                color:
                  selectedCategory === category
                    ? "var(--color-primary)"
                    : "rgba(51, 51, 51, 0.70)",
                leadingTrim: "both",
                textEdge: "cap",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "600",
                lineHeight: "normal",
                letterSpacing: "-0.16px",
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Discount */}
      <div className="mb-4">
        <h3
          className="mb-2"
          style={{
            color: "#333",
            leadingTrim: "both",
            textEdge: "cap",
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "normal",
            letterSpacing: "-0.18px",
          }}
        >
          {t("homepage.productSidebar.discount", language)}
        </h3>
        <div className="space-y-0">
          {discountOptions.map((discount) => (
            <button
              key={discount}
              onClick={() => setSelectedDiscount(discount)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors cursor-pointer ${
                selectedDiscount === discount
                  ? "bg-green-100"
                  : "hover:bg-gray-50"
              }`}
              style={{
                color:
                  selectedDiscount === discount
                    ? "var(--color-primary)"
                    : "rgba(51, 51, 51, 0.70)",
                leadingTrim: "both",
                textEdge: "cap",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "600",
                lineHeight: "normal",
                letterSpacing: "-0.16px",
              }}
            >
              {t(discount, language)}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <h3
          className="mb-4"
          style={{
            color: "#333",
            leadingTrim: "both",
            textEdge: "cap",
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "normal",
            letterSpacing: "-0.18px",
          }}
        >
          {t("homepage.productSidebar.priceRange", language)}
        </h3>

        {/* Price Range Slider */}
        <div className="mb-4 px-4">
          <div className="relative max-w-[200px]">
            {/* Background track */}
            <div className="w-full h-1 bg-gray-300 rounded-lg relative">
              {/* Green selected portion */}
              <div
                className="h-1 bg-[var(--color-primary)] absolute top-0 left-0"
                style={{
                  width: `${
                    ((priceRange.max - priceRange.min) / (20000 - 0)) * 100
                  }%`,
                  left: `${(priceRange.min / 20000) * 100}%`,
                  borderRadius:
                    priceRange.min === 0
                      ? "4px 0 0 4px"
                      : priceRange.max === 20000
                      ? "0 4px 4px 0"
                      : "0",
                }}
              />

              {/* Start circle */}
              <div
                className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10"
                style={{ left: `${(priceRange.min / 20000) * 100}%` }}
              >
                <Image
                  src="/pricecircle.svg"
                  alt="start"
                  width={12}
                  height={12}
                  className="w-3 h-3"
                />
              </div>

              {/* End circle */}
              <div
                className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10"
                style={{ left: `${(priceRange.max / 20000) * 100}%` }}
              >
                <Image
                  src="/pricecircle.svg"
                  alt="end"
                  width={12}
                  height={12}
                  className="w-3 h-3"
                />
              </div>
            </div>

            {/* Full width range inputs for complete control */}
            <input
              type="range"
              min="0"
              max="20000"
              value={priceRange.min}
              onChange={(e) => {
                const newMin = parseInt(e.target.value);
                if (newMin <= priceRange.max) {
                  setPriceRange((prev) => ({
                    ...prev,
                    min: newMin,
                  }));
                }
              }}
              className="absolute top-0 w-full h-1 opacity-0 cursor-pointer z-20"
              style={{
                pointerEvents: "auto",
              }}
            />
            <input
              type="range"
              min="0"
              max="20000"
              value={priceRange.max}
              onChange={(e) => {
                const newMax = parseInt(e.target.value);
                if (newMax >= priceRange.min) {
                  setPriceRange((prev) => ({
                    ...prev,
                    max: newMax,
                  }));
                }
              }}
              className="absolute top-0 w-full h-1 opacity-0 cursor-pointer z-30"
              style={{
                pointerEvents: "auto",
              }}
            />
          </div>

          <div className="flex justify-start items-center gap-2 mt-2">
            <div
              style={{
                display: "flex",
                padding: "6px 6px",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                minWidth: "80px",
                borderRadius: "4px",
                background: "rgba(0, 0, 0, 0.06)",
                color: "rgba(51, 51, 51, 0.70)",
                leadingTrim: "both",
                textEdge: "cap",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "600",
                lineHeight: "normal",
                letterSpacing: "-0.16px",
              }}
            >
              ₹ {priceRange.min.toLocaleString()}
            </div>
            <Image
              src="/doublearrow.svg"
              alt="range"
              width={20}
              height={8}
              className="w-5 h-2 mx-2 flex-shrink-0"
            />
            <div
              style={{
                display: "flex",
                padding: "6px 6px",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                minWidth: "80px",
                borderRadius: "4px",
                background: "rgba(0, 0, 0, 0.06)",
                color: "rgba(51, 51, 51, 0.70)",
                leadingTrim: "both",
                textEdge: "cap",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "600",
                lineHeight: "normal",
                letterSpacing: "-0.16px",
              }}
            >
              ₹ {priceRange.max.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Predefined Price Ranges */}
        <div className="space-y-0 px-4">
          <div className="max-w-[200px]">
            {priceRanges.map((range) => (
              <button
                key={range}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                style={{
                  color: "rgba(51, 51, 51, 0.70)",
                  leadingTrim: "both",
                  textEdge: "cap",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "600",
                  lineHeight: "normal",
                  letterSpacing: "-0.16px",
                }}
              >
                {t(range, language)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          outline: none;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 12px;
          width: 12px;
          background: transparent;
          cursor: pointer;
        }

        input[type="range"]::-moz-range-thumb {
          height: 12px;
          width: 12px;
          background: transparent;
          cursor: pointer;
          border: none;
        }

        /* Hide scrollbar for the sidebar */
        .overflow-y-auto::-webkit-scrollbar {
          display: none;
        }

        .overflow-y-auto {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Enhanced scroll isolation */
        div[style*="overscroll-behavior"] {
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </div>
  );
}
