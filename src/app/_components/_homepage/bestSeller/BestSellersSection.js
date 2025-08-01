import ProductCard from "../ProductCard";
import { bestSellers } from "../../../../lib/data";
import Image from "next/image";

export default function BestSellersSection() {
  return (
    <div className="bg-white py-8 md:py-16 overflow-hidden">
      <div className="px-4 sm:px-6 md:px-12 lg:px-[200px]">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2
            className="font-bold"
            style={{
              color: "#333",
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: "clamp(18px, 4vw, 24px)",
              fontWeight: 700,
              fontStyle: "normal",
              lineHeight: "normal",
              letterSpacing: "-0.24px",
            }}
          >
            Best Sellers
          </h2>
          <button className="flex items-center gap-1 md:gap-2 font-medium transition-colors" style={{ color: "#035F0F" }}>
            <span className="text-sm md:text-base">View all</span>
            <img
              src="/nextarrow.svg"
              alt="Next arrow"
              className="w-5 h-5 md:w-7 md:h-7"
            />
          </button>
        </div>

        {/* Best Sellers Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {/* Product 1 - A1 Badge */}
          <div className="bg-white rounded-lg overflow-hidden transition-all duration-300">
            <div className="relative">
              <div className="aspect-square bg-gray-50 flex items-center justify-center p-2 md:p-4">
                <img
                  src="/best1.png"
                  alt="7hz Salnotes Zero 2 Wired IEM"
                  className="w-full h-full object-contain"
                />
              </div>
              {/* A1 Badge */}
              <div className="absolute top-1 md:top-2 left-0 flex items-center shadow-lg">
                <div className="text-white px-2 md:px-3 text-sm font-bold flex items-center" style={{ backgroundColor: "#035F0F", height: "24px", fontSize: "12px" }}>
                  A1
                </div>
                <svg width="16" height="24" viewBox="0 0 17 23" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-[20px] md:h-[28px]">
                  <path d="M0 0.593506H14.7537C16.4453 0.593506 17.373 2.56306 16.2956 3.86727L0.708384 22.736C0.46957 23.0251 0 22.8562 0 22.4812V0.593506Z" fill="#035F0F"/>
                </svg>
              </div>
            </div>
            <div className="p-2 md:p-4">
              <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                7hz Salnotes Zero 2 Wired IEM(type c)
              </h3>
              <p className="text-xs text-gray-600 mb-2 md:mb-3">
                In-ear monitors
              </p>
              <div className="flex items-center gap-1 md:gap-2 mb-3 md:mb-4">
                <span className="text-sm md:text-lg font-bold" style={{ color: "#035F0F" }}>
                  ₹1,899
                </span>
                <span className="text-xs md:text-sm text-gray-500 line-through">
                  ₹2,099
                </span>
              </div>
              <div className="flex justify-start">
                <button 
                  className="bg-white text-black font-medium transition-colors text-xs md:text-sm"
                  style={{
                    display: "flex",
                    height: "32px",
                    padding: "8px 12px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "4px",
                    border: "1px solid #035F0F"
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>

          {/* Product 2 - #2 Badge */}
          <div className="bg-white rounded-lg overflow-hidden transition-all duration-300">
            <div className="relative">
              <div className="aspect-square bg-gray-50 flex items-center justify-center p-2 md:p-4">
                <img
                  src="/best2.png"
                  alt="7hz Salnotes Zero 2 Wired IEM"
                  className="w-full h-full object-contain"
                />
              </div>
              {/* #2 Badge */}
              <div className="absolute top-1 md:top-2 left-0 flex items-center shadow-lg">
                <div className="text-white px-2 md:px-3 text-sm font-bold flex items-center" style={{ backgroundColor: "#035F0F", height: "24px", fontSize: "12px" }}>
                  #2
                </div>
                <svg width="16" height="24" viewBox="0 0 17 23" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-[20px] md:h-[28px]">
                  <path d="M0 0.593506H14.7537C16.4453 0.593506 17.373 2.56306 16.2956 3.86727L0.708384 22.736C0.46957 23.0251 0 22.8562 0 22.4812V0.593506Z" fill="#035F0F"/>
                </svg>
              </div>
            </div>
            <div className="p-2 md:p-4">
              <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                7hz Salnotes Zero 2 Wired IEM(type c)
              </h3>
              <p className="text-xs text-gray-600 mb-2 md:mb-3">
                In-ear monitors
              </p>
              <div className="flex items-center gap-1 md:gap-2 mb-3 md:mb-4">
                <span className="text-sm md:text-lg font-bold" style={{ color: "#035F0F" }}>
                  ₹1,899
                </span>
                <span className="text-xs md:text-sm text-gray-500 line-through">
                  ₹2,099
                </span>
              </div>
              <div className="flex justify-start">
                <button 
                  className="bg-white text-black font-medium transition-colors text-xs md:text-sm"
                  style={{
                    display: "flex",
                    height: "32px",
                    padding: "8px 12px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "4px",
                    border: "1px solid #035F0F"
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>

          {/* Product 3 - #3 Badge */}
          <div className="bg-white rounded-lg overflow-hidden transition-all duration-300">
            <div className="relative">
              <div className="aspect-square bg-gray-50 flex items-center justify-center p-2 md:p-4">
                <img
                  src="/best3.png"
                  alt="7hz Salnotes Zero 2 Wired IEM"
                  className="w-full h-full object-contain"
                />
              </div>
              {/* #3 Badge */}
              <div className="absolute top-1 md:top-2 left-0 flex items-center shadow-lg">
                <div className="text-white px-2 md:px-3 text-sm font-bold flex items-center" style={{ backgroundColor: "#035F0F", height: "24px", fontSize: "12px" }}>
                  #3
                </div>
                <svg width="16" height="24" viewBox="0 0 17 23" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-[20px] md:h-[28px]">
                  <path d="M0 0.593506H14.7537C16.4453 0.593506 17.373 2.56306 16.2956 3.86727L0.708384 22.736C0.46957 23.0251 0 22.8562 0 22.4812V0.593506Z" fill="#035F0F"/>
                </svg>
              </div>
            </div>
            <div className="p-2 md:p-4">
              <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                7hz Salnotes Zero 2 Wired IEM(type c)
              </h3>
              <p className="text-xs text-gray-600 mb-2 md:mb-3">
                In-ear monitors
              </p>
              <div className="flex items-center gap-1 md:gap-2 mb-3 md:mb-4">
                <span className="text-sm md:text-lg font-bold" style={{ color: "#035F0F" }}>
                  ₹1,899
                </span>
                <span className="text-xs md:text-sm text-gray-500 line-through">
                  ₹2,099
                </span>
              </div>
              <div className="flex justify-start">
                <button 
                  className="bg-white text-black font-medium transition-colors text-xs md:text-sm"
                  style={{
                    display: "flex",
                    height: "32px",
                    padding: "8px 12px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "4px",
                    border: "1px solid #035F0F"
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>

          {/* Product 4 - No Badge */}
          <div className="bg-white rounded-lg overflow-hidden transition-all duration-300">
            <div className="relative">
              <div className="aspect-square bg-gray-50 flex items-center justify-center p-2 md:p-4">
                <img
                  src="/best4.png"
                  alt="7hz Salnotes Zero 2 Wired IEM"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="p-2 md:p-4">
              <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                7hz Salnotes Zero 2 Wired IEM(type c)
              </h3>
              <p className="text-xs text-gray-600 mb-2 md:mb-3">
                In-ear monitors
              </p>
              <div className="flex items-center gap-1 md:gap-2 mb-3 md:mb-4">
                <span className="text-sm md:text-lg font-bold" style={{ color: "#035F0F" }}>
                  ₹1,899
                </span>
                <span className="text-xs md:text-sm text-gray-500 line-through">
                  ₹2,099
                </span>
              </div>
              <div className="flex justify-start">
                <button 
                  className="bg-white text-black font-medium transition-colors text-xs md:text-sm"
                  style={{
                    display: "flex",
                    height: "32px",
                    padding: "8px 12px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "4px",
                    border: "1px solid #035F0F"
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
