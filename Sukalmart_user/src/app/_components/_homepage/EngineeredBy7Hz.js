import React from "react";
import Image from "next/image";

export default function EngineeredBy7Hz() {
  return (
    <>
      <div className="py-6 md:py-8 lg:py-10 overflow-hidden container mx-auto px-4 engineered-7hz-container" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
        <style jsx>{`
          @media (min-width: 640px) and (max-width: 819px) {
            .engineered-7hz-container {
              padding-left: 2.5rem !important;
              padding-right: 2.5rem !important;
            }
          }
        `}</style>
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* Left Section - Text Content */}
          <div className="flex-1 lg:max-w-[400px]">
            <h2
              className="mb-4 sm:mb-6 text-[24px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-semibold leading-normal tracking-[-0.56px] sm:tracking-[-0.64px] md:tracking-[-0.72px] lg:tracking-[-0.8px]"
              style={{
                color: "#333",

                fontStyle: "normal",
              }}
            >
              Premium Beauty Collection
            </h2>
            <p
              className="mb-6 sm:mb-8 text-[14px] sm:text-[16px] md:text-[17px] lg:text-[18px] font-medium leading-normal tracking-[-0.14px] sm:tracking-[-0.16px] md:tracking-[-0.17px] lg:tracking-[-0.18px]"
              style={{
                color: "rgba(51, 51, 51, 0.8)",
                fontStyle: "normal",
                letterSpacing: "-0.28px",
              }}
            >
              Expertly formulated skincare and beauty products delivering radiant
              results, innovative ingredients, and dermatologist-approved
              performance. Experience the transformation.
            </p>
            <button
              className="flex justify-center items-center gap-2 px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-4 lg:py-2 text-xs sm:text-sm md:text-base lg:text-base font-medium cursor-pointer"
              style={{
                borderRadius: "4px",
                background: "#035F0F",
                color: "#fff",
                transition: "background 0.2s",
                cursor: 'pointer'
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "#035F0FE6")
              }
              onMouseOut={(e) => (e.currentTarget.style.background = "#035F0F")}
            >
              Shop all
            </button>
          </div>

          {/* Right Section - Product Cards */}
          <div className="flex-1 w-full">
            <div className="flex flex-row w-full overflow-x-auto scrollbar-hide lg:overflow-visible snap-x snap-mandatory engineered-by-7hz-cards-row gap-0">
              {/* Product Card 1 */}
              <div className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 snap-start px-0">
                <div className="bg-white rounded-lg p-3 sm:p-4 h-full flex flex-col">
                  <div className="relative aspect-square bg-gray-50 flex items-center justify-center p-3 sm:p-4 mb-3 sm:mb-4">
                    <Image
                      src="https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp"
                      alt="Glow & Hydrate Face Serum"
                      fill
                      sizes="(max-width: 639px) 50vw, (max-width: 1024px) 33vw, 33vw"
                      className="object-contain"
                    />
                  </div>
                  <h3
                    className="text-sm sm:text-base font-semibold text-gray-900 mb-2"
                    style={{
                      // fontFamily: "'Nunito Sans', sans-serif",
                      letterSpacing: "-0.32px",
                    }}
                  >
                    Glow & Hydrate Face Serum
                  </h3>
                  <p
                    className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3"
                    style={{
                      // fontFamily: "'Nunito Sans', sans-serif",
                      letterSpacing: "-0.28px",
                    }}
                  >
                    Skincare
                  </p>
                  <div className="flex items-center gap-2 mt-auto">
                    <span
                      className="text-base sm:text-lg font-bold"
                      style={{ color: "#035F0F" }}
                    >
                      ₹899
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 line-through">
                      ₹1,099
                    </span>
                  </div>
                </div>
              </div>
              {/* Product Card 2 */}
              <div className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 snap-start px-0">
                <div className="bg-white rounded-lg p-3 sm:p-4 h-full flex flex-col">
                  <div className="relative aspect-square bg-gray-50 flex items-center justify-center p-3 sm:p-4 mb-3 sm:mb-4">
                    <Image
                      src="https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg"
                      alt="Luxury Beauty Collection Set"
                      fill
                      sizes="(max-width: 639px) 50vw, (max-width: 1024px) 33vw, 33vw"
                      className="object-contain"
                    />
                  </div>
                  <h3
                    className="text-sm sm:text-base font-semibold text-gray-900 mb-2"
                    style={{
                      // fontFamily: "'Nunito Sans', sans-serif",
                      letterSpacing: "-0.32px",
                    }}
                  >
                    Luxury Beauty Collection Set
                  </h3>
                  <p
                    className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3"
                    style={{
                      // fontFamily: "'Nunito Sans', sans-serif",
                      letterSpacing: "-0.28px",
                    }}
                  >
                    Beauty Essentials
                  </p>
                  <div className="flex items-center gap-2 mt-auto">
                    <span
                      className="text-base sm:text-lg font-bold"
                      style={{ color: "#035F0F" }}
                    >
                      ₹2,499
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 line-through">
                      ₹3,199
                    </span>
                  </div>
                </div>
              </div>
              {/* Product Card 3 */}
              <div className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 snap-start px-0">
                <div className="bg-white rounded-lg p-3 sm:p-4 h-full flex flex-col">
                  <div className="relative aspect-square bg-gray-50 flex items-center justify-center p-3 sm:p-4 mb-3 sm:mb-4">
                    <Image
                      src="https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp"
                      alt="Anti-Aging Night Cream"
                      fill
                      sizes="(max-width: 639px) 50vw, (max-width: 1024px) 33vw, 33vw"
                      className="object-contain"
                    />
                  </div>
                  <h3
                    className="text-sm sm:text-base font-semibold text-gray-900 mb-2"
                    style={{
                      // fontFamily: "'Nunito Sans', sans-serif",
                      letterSpacing: "-0.32px",
                    }}
                  >
                    Anti-Aging Night Cream
                  </h3>
                  <p
                    className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3"
                    style={{
                      // fontFamily: "'Nunito Sans', sans-serif",
                      letterSpacing: "-0.28px",
                    }}
                  >
                    Anti-Aging
                  </p>
                  <div className="flex items-center gap-2 mt-auto">
                    <span
                      className="text-base sm:text-lg font-bold"
                      style={{ color: "#035F0F" }}
                    >
                      ₹1,299
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 line-through">
                      ₹1,599
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Mobile scroll indicator */}
            <div className="lg:hidden w-full mt-4">
              <div className="flex justify-center">
                <div className="w-20 h-1 bg-gray-200 rounded-full">
                  <div className="w-7 h-1 bg-[#035F0F] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          /* Card layout fix for desktop and big tablets */
          @media (min-width: 992px) {
            .flex-1 > .flex {
              flex-wrap: nowrap;
              gap: 0;
            }
            .flex-1 > .flex > div {
              min-width: 0;
              width: 33.3333%;
              max-width: 33.3333%;
            }
          }
          /* Remove gap for all screen sizes */
            .engineered-by-7hz-cards-row {
            gap: 0 !important;
          }
          /* Show two cards per screen on mobile */
          @media (max-width: 639.98px) {
            .engineered-by-7hz-cards-row > div {
              width: 50% !important;
              max-width: 50% !important;
            }
          }
        `}</style>
      </div>
    
    </>
  );
}
