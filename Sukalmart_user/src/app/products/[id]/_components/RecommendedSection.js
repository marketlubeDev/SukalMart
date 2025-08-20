"use client";
  import { bestSellers } from "../../../../lib/data";
  import { useRouter } from "next/navigation";

export default function RecommendedSection() {
  const router = useRouter();
  return (
    <div className="bg-white py-8 md:py-16 overflow-hidden">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2
            className="font-bold"
            style={{
              color: "#333",
             
              fontSize: "clamp(18px, 4vw, 24px)",
              fontWeight: 700,
              fontStyle: "normal",
              lineHeight: "normal",
              letterSpacing: "-0.24px",
            }}
          >
            Recommended for you
          </h2>
          <button onClick={() => router.push('/products')} className="flex items-center gap-1 md:gap-2 font-medium transition-colors cursor-pointer" style={{ color: "#035F0F" }}>
            <span className="text-sm md:text-base">View all</span>
            <img
              src="/nextarrow.svg"
              alt="Next arrow"
              className="w-5 h-5 md:w-7 md:h-7"
            />
          </button>
        </div>

        {/* Recommended Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-2 md:gap-3">
          {/* Product 1 - A1 Badge */}
          <div onClick={() => router.push('/products/1')} className="bg-white rounded-lg overflow-hidden transition-all duration-300 cursor-pointer">
            <div className="relative">
              <img
                src="https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg"
                alt="Dove Nutritive Solutions"
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
                <span className="text-sm md:text-lg font-bold" style={{ color: "#035F0F" }}>
                  ₹1,099
                </span>
                <span className="text-xs md:text-sm text-gray-500 line-through">
                  ₹1,299
                </span>
              </div>
            </div>
          </div>

          {/* Product 2 - #2 Badge */}
          <div onClick={() => router.push('/products/2')} className="bg-white rounded-lg overflow-hidden transition-all duration-300 cursor-pointer">
            <div className="relative">
              <img
                src="https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp"
                alt="Lux Body Wash"
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
                <span className="text-sm md:text-lg font-bold" style={{ color: "#035F0F" }}>
                  ₹1,099
                </span>
                <span className="text-xs md:text-sm text-gray-500 line-through">
                  ₹1,299
                </span>
              </div>
            </div>
          </div>

          {/* Product 3 - #3 Badge */}
          <div onClick={() => router.push('/products/3')} className="bg-white rounded-lg overflow-hidden transition-all duration-300 cursor-pointer">
            <div className="relative">
              <img
                src="https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp"
                alt="Rexona / Sure Deo"
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
                <span className="text-sm md:text-lg font-bold" style={{ color: "#035F0F" }}>
                  ₹1,899
                </span>
                <span className="text-xs md:text-sm text-gray-500 line-through">
                  ₹2,099
                </span>
              </div>
            </div>
          </div>

          {/* Product 4 - No Badge */}
          <div onClick={() => router.push('/products/4')} className="bg-white rounded-lg overflow-hidden transition-all duration-300 cursor-pointer">
            <div className="relative">
                <img
                src="https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg"
                alt="Vaseline Body Lotion"
                className="w-full h-full aspect-square object-cover"
                />
            </div>
            <div className="p-2 md:p-4">
              <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                Vaseline Body Lotion
              </h3>
              <p className="text-xs text-gray-600 mb-2 md:mb-3">Skin Care</p>
              <div className="flex items-center gap-1 md:gap-2 mb-3 md:mb-4">
                <span className="text-sm md:text-lg font-bold" style={{ color: "#035F0F" }}>
                  ₹1,099
                </span>
                <span className="text-xs md:text-sm text-gray-500 line-through">
                  ₹1,299
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 