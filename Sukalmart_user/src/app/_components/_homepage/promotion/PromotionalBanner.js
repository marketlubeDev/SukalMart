"use client";
import { useRouter } from "next/navigation";

export default function PromotionalBanner({ fullWidth = false }) {
  const router = useRouter();
  
  const banners = [
    {
      id: 1,
      productId: "2", // Corresponds to "Lux Body Wash" in product database
      title: "Glow Up Your Skin, 20% OFF!",
      description: "Premium skincare essentials for radiant, healthy skin",
      image:
        "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
      alt: "Skincare Products",
      background: "linear-gradient(90deg, #FFE5F1, #FFF0F5)",
      buttonText: "Shop now",
    },
    {
      id: 2,
      productId: "1", // Corresponds to "Dove Nutritive Solutions" in product database
      title: "Anti-Aging Collection, 25% OFF!",
      description:
        "Advanced anti-aging formulas to restore youthful radiance. Limited time offer",
      image:
        "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
      alt: "Anti-Aging Products",
      background: "linear-gradient(90deg, #FFF8DC, #FFF5E6)",
      buttonText: "Shop now",
    },
  ];

  const handleShopNowClick = (productId) => {
    router.push(`/products/${productId}`);
  };

  return (
    <>
      <div
        className={`px-0 sm:px-10 md:px-4 lg:px-8 py-6 md:py-8 lg:py-10 mx-auto w-full max-w-screen-xl`}
      >
        {/* Mobile: Carousel with one banner at a time */}
        <div className="lg:hidden">
          <div className="flex flex-row gap-0 w-full overflow-x-auto scrollbar-hide snap-x snap-mandatory">
            {banners.map((banner) => (
              <div key={banner.id} className="flex-shrink-0 w-full snap-start">
                <div
                  className="relative overflow-hidden rounded-lg"
                  style={{
                    height: "200px sm:h-[250px]",
                    background: banner.background,
                  }}
                >
                  {/* Product Image - Right Side */}
                  <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
                    <img
                      src={banner.image}
                      alt={banner.alt}
                      className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
                    />
                  </div>

                  {/* Content - Left Side */}
                  <div className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 max-w-[200px] sm:max-w-xs">
                    <h3
                      className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3"
                      style={{ color: "#333333" }}
                    >
                      {banner.title}
                    </h3>
                    <p
                      className="text-xs sm:text-sm md:text-base mb-3 sm:mb-4 text-gray-600"
                      style={{ color: "#333333" }}
                    >
                      {banner.description}
                    </p>
                    <button
                      onClick={() => handleShopNowClick(banner.productId)}
                      className="text-gray-800 font-medium px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded text-xs sm:text-sm md:text-base transition-colors duration-200 cursor-pointer"
                      style={{
                        color: "#333333",
                        border: "1px solid #333",
                      }}
                    >
                      {banner.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile scroll indicator */}
          <div className="w-full mt-4">
            <div className="flex justify-center">
              <div className="w-20 h-1 bg-gray-200 rounded-full">
                <div className="w-10 h-1 bg-[#035F0F] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: Side by side layout */}
        <div className="hidden lg:flex flex-row gap-0">
          {banners.map((banner, index) => {
            const isFirst = index === 0;
            const isLast = index === banners.length - 1;
            return (
              <div
                key={banner.id}
                className={`flex-1 relative overflow-hidden ${
                  isFirst ? "rounded-l-lg" : ""
                } ${isLast ? "rounded-r-lg" : ""}`}
                style={{
                  height: "240px",
                  flex: "1 0 0",
                  borderRadius: isFirst
                    ? "4px 0 0 4px"
                    : isLast
                    ? "0 4px 4px 0"
                    : undefined,
                  background: banner.background,
                }}
              >
                {/* Product Image - Right Side */}
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <img
                    src={banner.image}
                    alt={banner.alt}
                    className="w-48 h-48 xl:w-48 xl:h-48 object-contain"
                  />
                </div>

                {/* Content - Left Side */}
                <div className="absolute left-6 top-1/2 transform -translate-y-1/2 max-w-xs">
                  <h3
                    className="text-2xl xl:text-2xl font-bold mb-3"
                    style={{ color: "#333333" }}
                  >
                    {banner.title}
                  </h3>
                  <p
                    className="text-base xl:text-base mb-4 text-gray-600"
                    style={{ color: "#333333" }}
                  >
                    {banner.description}
                  </p>
                  <button
                    onClick={() => handleShopNowClick(banner.productId)}
                    className="text-gray-800 font-medium px-4 py-2 xl:px-4 xl:py-2 rounded text-base xl:text-base transition-colors duration-200 cursor-pointer"
                    style={{
                      color: "#333333",
                      border: "1px solid #333",
                    }}
                  >
                    {banner.buttonText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="border-b border-black/10 w-full mt-6"></div>
      </div>
    </>
  );
}
