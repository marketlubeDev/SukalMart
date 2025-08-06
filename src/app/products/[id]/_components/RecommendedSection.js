import { bestSellers } from "../../../../lib/data";

export default function RecommendedSection() {
  return (
    <div className="bg-white py-8 md:py-16 overflow-hidden">
      <div className="px-4 sm:px-6 md:px-12 lg:px-8 xl:px-[200px]">
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
          <button className="flex items-center gap-1 md:gap-2 font-medium transition-colors" style={{ color: "#035F0F" }}>
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
          {/* Product 1 */}
          <div className="bg-white rounded-lg overflow-hidden transition-all duration-300">
            <div className="relative">
              <div className="aspect-square bg-gray-50 flex items-center justify-center p-2 md:p-4">
                <img
                  src="/best1.png"
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
            </div>
          </div>

          {/* Product 2 */}
          <div className="bg-white rounded-lg overflow-hidden transition-all duration-300">
            <div className="relative">
              <div className="aspect-square bg-gray-50 flex items-center justify-center p-2 md:p-4">
                <img
                  src="/best2.png"
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
            </div>
          </div>

          {/* Product 3 */}
          <div className="bg-white rounded-lg overflow-hidden transition-all duration-300">
            <div className="relative">
              <div className="aspect-square bg-gray-50 flex items-center justify-center p-2 md:p-4">
                <img
                  src="/best3.png"
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
            </div>
          </div>

          {/* Product 4 */}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 