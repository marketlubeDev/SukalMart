"use client";

export default function ProductSidebar({
  selectedCategory,
  setSelectedCategory,
  selectedDiscount,
  setSelectedDiscount,
  priceRange,
  setPriceRange,
}) {
  const categories = [
    "Hair Care",
    "Body & Shower",
    "Soap & Deodorants",
    "Skin Care",
    "Oral & Misc",
  ];

  const discountOptions = [
    "10% off & more",
    "20% off & more",
    "30% off & more",
    "40% off & more",
    "50% off & more",
  ];

  const priceRanges = [
    "Under ₹1000",
    "₹1000 - ₹2000",
    "₹2000 - ₹3000",
    "₹3000 - ₹4000",
    "Over ₹4000",
  ];

  return (
    <div className="bg-white p-4 rounded-lg">
      {/* Categories */}
      <div className="mb-4">
        <h3
          className="mb-2"
          style={{
            color: "#333",
            leadingTrim: "both",
            textEdge: "cap",
            // fontFamily: "Nunito Sans",
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "normal",
            letterSpacing: "-0.18px",
          }}
        >
          Categories
        </h3>
        <div className="space-y-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                selectedCategory === category
                  ? "bg-green-100"
                  : "hover:bg-gray-50"
              }`}
              style={{
                color:
                  selectedCategory === category
                    ? "#035F0F"
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
            // fontFamily: "Nunito Sans",
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "normal",
            letterSpacing: "-0.18px",
          }}
        >
          Discount
        </h3>
        <div className="space-y-0">
          {discountOptions.map((discount) => (
            <button
              key={discount}
              onClick={() => setSelectedDiscount(discount)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                selectedDiscount === discount
                  ? "bg-green-100"
                  : "hover:bg-gray-50"
              }`}
              style={{
                color:
                  selectedDiscount === discount
                    ? "#035F0F"
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
              {discount}
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
            // fontFamily: "Nunito Sans",
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "normal",
            letterSpacing: "-0.18px",
          }}
        >
          Price Range
        </h3>

        {/* Price Range Slider */}
        <div className="mb-4">
          <div className="relative">
            {/* Background track */}
            <div className="w-full h-1 bg-gray-300 rounded-lg relative">
              {/* Green selected portion */}
              <div
                className="h-1 bg-[#035F0F] rounded-lg absolute top-0 left-0"
                style={{
                  width: `${
                    ((priceRange.max - priceRange.min) / (20000 - 0)) * 100
                  }%`,
                  left: `${(priceRange.min / 20000) * 100}%`,
                }}
              />

              {/* Start circle */}
              <div
                className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2"
                style={{ left: `${(priceRange.min / 20000) * 100}%` }}
              >
                <img src="/pricecircle.svg" alt="start" className="w-3 h-3" />
              </div>

              {/* End circle */}
              <div
                className="absolute top-1/2 transform -translate-y-1/2 translate-x-1/2"
                style={{ left: `${(priceRange.max / 20000) * 100}%` }}
              >
                <img src="/pricecircle.svg" alt="end" className="w-3 h-3" />
              </div>
            </div>

            {/* Hidden range inputs for interaction */}
            <input
              type="range"
              min="0"
              max="20000"
              value={priceRange.min}
              onChange={(e) =>
                setPriceRange((prev) => ({
                  ...prev,
                  min: parseInt(e.target.value),
                }))
              }
              className="absolute top-0 w-full h-1 opacity-0 cursor-pointer"
            />
            <input
              type="range"
              min="0"
              max="20000"
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange((prev) => ({
                  ...prev,
                  max: parseInt(e.target.value),
                }))
              }
              className="absolute top-0 w-full h-1 opacity-0 cursor-pointer"
            />
          </div>

          <div className="flex justify-center items-center gap-2 mt-2">
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
            <img
              src="/doublearrow.svg"
              alt="range"
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
        <div className="space-y-0">
          {priceRanges.map((range) => (
            <button
              key={range}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
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
              {range}
            </button>
          ))}
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
      `}</style>
    </div>
  );
}
