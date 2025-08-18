"use client";
import ProductCard from "../ProductCard";
import { bestSellers } from "../../../../lib/data";
import Image from "next/image";

export default function BestSellersSection() {
  return (
    <div className="bg-white container mx-auto px-4 py-8 md:py-16 overflow-hidden mb-6 md:mb-6">
      <div>
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2
            className="font-bold"
            style={{
              color: "#333",
              // fontFamily: "'Nunito Sans', sans-serif",
              fontSize: "clamp(18px, 4vw, 24px)",
              fontWeight: 700,
              fontStyle: "normal",
              lineHeight: "normal",
              letterSpacing: "-0.24px",
            }}
          >
            Best Sellers
          </h2>
          <button
            className="flex items-center gap-1 md:gap-2 font-medium transition-colors"
            style={{ color: "#035F0F" }}
            onClick={() => window.location.href = "/products"}
          >
            <span className="text-sm md:text-base">View all</span>
            <img
              src="/nextarrow.svg"
              alt="Next arrow"
              className="w-5 h-5 md:w-7 md:h-7"
            />
          </button>
        </div>

        {/* Best Sellers Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-3 md:gap-6">
          {/* Product 1 - A1 Badge */}
          <div className="bg-white rounded-lg overflow-hidden transition-all duration-300">
            <div className="relative">
              <img
                src="https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg"
                alt="7hz Salnotes Zero 2 Wired IEM"
                className="w-full h-full aspect-square object-cover"
              />
              {/* A1 Badge */}
              <div className="absolute top-1 md:top-2 left-[-16px]">
                <div className="relative">
                  <img
                    src="/badge.svg"
                    alt="Badge"
                    className="w-16 h-10 md:w-20 md:h-12"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xs md:text-sm font-bold">
                      #1
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-2 md:p-4">
              <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                Dove Nutritive Solutions
              </h3>
              <p className="text-xs text-gray-600 mb-2 md:mb-3">Hair Care</p>
              <div className="flex items-center gap-1 md:gap-2 mb-3 md:mb-4">
                <span
                  className="text-sm md:text-lg font-bold"
                  style={{ color: "#035F0F" }}
                >
                  ₹1,099
                </span>
                <span className="text-xs md:text-sm text-gray-500 line-through">
                  ₹1,299
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
                    border: "1px solid #035F0F",
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
              <img
                src="https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp"
                alt="7hz Salnotes Zero 2 Wired IEM"
                className="w-full h-full aspect-square object-cover"
              />
              {/* #2 Badge */}
              <div className="absolute top-1 md:top-2 left-[-16px]">
                <div className="relative">
                  <img
                    src="/badge.svg"
                    alt="Badge"
                    className="w-16 h-10 md:w-20 md:h-12"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xs md:text-sm font-bold">
                      #2
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-2 md:p-4">
              <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                Lux Body Wash
              </h3>
              <p className="text-xs text-gray-600 mb-2 md:mb-3">
                Body & Shower
              </p>
              <div className="flex items-center gap-1 md:gap-2 mb-3 md:mb-4">
                <span
                  className="text-sm md:text-lg font-bold"
                  style={{ color: "#035F0F" }}
                >
                  ₹1,099
                </span>
                <span className="text-xs md:text-sm text-gray-500 line-through">
                  ₹1,299
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
                    border: "1px solid #035F0F",
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
              <img
                src="https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp"
                alt="7hz Salnotes Zero 2 Wired IEM"
                className="w-full h-full aspect-square object-cover"
              />
              {/* #3 Badge */}
              <div className="absolute top-1 md:top-2 left-[-16px]">
                <div className="relative">
                  <img
                    src="/badge.svg"
                    alt="Badge"
                    className="w-16 h-10 md:w-20 md:h-12"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xs md:text-sm font-bold">
                      #3
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-2 md:p-4">
              <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                Rexona / Sure Deo
              </h3>
              <p className="text-xs text-gray-600 mb-2 md:mb-3">
                Soap & Deodorants
              </p>
              <div className="flex items-center gap-1 md:gap-2 mb-3 md:mb-4">
                <span
                  className="text-sm md:text-lg font-bold"
                  style={{ color: "#035F0F" }}
                >
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
                    border: "1px solid #035F0F",
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
              <img
                src="https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg"
                alt="7hz Salnotes Zero 2 Wired IEM"
                className="w-full h-full aspect-square object-cover"
              />
            </div>
            <div className="p-2 md:p-4">
              <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                Vaseline Body Lotion
              </h3>
              <p className="text-xs text-gray-600 mb-2 md:mb-3">Skin Care</p>
              <div className="flex items-center gap-1 md:gap-2 mb-3 md:mb-4">
                <span
                  className="text-sm md:text-lg font-bold"
                  style={{ color: "#035F0F" }}
                >
                  ₹1,099
                </span>
                <span className="text-xs md:text-sm text-gray-500 line-through">
                  ₹1,299
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
                    border: "1px solid #035F0F",
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b border-black/10 w-[80%] mt-10 mx-auto"></div>
    </div>
  );
}
