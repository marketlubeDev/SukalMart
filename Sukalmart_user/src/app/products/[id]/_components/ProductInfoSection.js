"use client";

import ProductServiceBenefits from "./ProductServiceBenefits";
import Button from "@/app/_components/common/Button";
import Image from "next/image";
import { useLanguage } from "@/app/_components/context/LanguageContext";
import { t } from "@/lib/translations";

export default function ProductInfoSection({
  product,
  coupons,
  visibleCoupons,
  remainingCouponsCount,
  showMoreCoupons,
  setShowMoreCoupons,
  remainingCoupons,
  volumes,
  selectedVolume,
  setSelectedVolume,
  quantity,
  setQuantity,
  addToCart,
  buyNow,
  showMoreDetails,
  setShowMoreDetails
}) {
  const { language } = useLanguage();
  return (
    <div className="space-y-6">
      <div>
        <p className="text-gray-600 mb-1" style={{ fontSize: "clamp(12px, 2vw, 16px)" }}>{product.type}</p>
        <h1
          className="mb-2"
          style={{
            color: "#333333",
            fontSize: "clamp(23px, 5vw, 40px)",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "normal",
            letterSpacing: "-0.8px",
            textTransform: "capitalize",
          }}
        >
          {product.name}
        </h1>

        {/* Rating Section */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Image
                key={star}
                src={star <= 4 ? "/filledstar.svg" : "/star.svg"}
                alt="star"
                width={16}
                height={16}
                className="w-3 h-3 sm:w-4 sm:h-4"
              />
            ))}
          </div>
          <span className="text-xs sm:text-sm">
            <span className="text-black">4.5</span>
            <span className="text-gray-600"> (220 reviews)</span>
          </span>
        </div>

        {/* Price */}
        <div className="mb-4 border-b border-gray-200 pb-4">
          <div className="flex items-center gap-3">
            <span
              className="font-bold text-xl sm:text-2xl md:text-3xl"
              style={{
                overflow: "hidden",
                color: "#333333",
                textOverflow: "ellipsis",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "100%",
                letterSpacing: "-0.48px",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
              }}
            >
              ₹{product.price.toLocaleString()}
            </span>
            <span className="text-sm sm:text-lg text-gray-500 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
            <span
              className="px-2 py-1 rounded text-xs sm:text-sm font-medium"
              style={{ color: "var(--color-primary)" }}
            >
              -{product.discount}% OFF
            </span>
          </div>
          <span
            className="text-xs text-gray-400 block mt-1 text-left"
            style={{ lineHeight: "1.2" }}
          >
            {t("product.inclusiveOfAllTax", language)}
          </span>
        </div>

        {/* Coupon Section */}
        {coupons.length > 0 && (
          <div className="mb-6 pt-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3 min-w-0">
                {/* Show first 2 coupons on small screens with smaller size */}
                {visibleCoupons.slice(0, 2).map((c, idx) => (
                  <div
                    key={idx}
                    className="px-2 py-2 md:px-3 md:py-3 xl:px-4 xl:py-3 rounded flex items-center gap-1 md:gap-2 flex-shrink-0 border-1 xl:min-w-[200px] xl:max-w-[280px]"
                    style={{
                      borderRadius: "4px",
                      borderStyle: "dashed",
                      borderColor: "#6D0D26",
                      background: "#F7F3F4",
                      minWidth: "100px",
                      maxWidth: "140px",
                      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div className="flex items-center justify-center flex-shrink-0">
                      <Image src="/coupon.svg" alt="coupon" width={20} height={20} className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-333333 text-xs md:text-sm truncate">{c.code}</h4>
                      <p className="text-xs truncate" style={{ color: "rgba(51, 51, 51, 0.80)" }}>
                        {c.description}
                      </p>
                    </div>
                  </div>
                ))}
                {/* Show remaining coupons on md+ screens (but not xl) */}
                {remainingCoupons.map((c, idx) => (
                  <div
                    key={`md-${idx}`}
                    className="hidden md:flex xl:hidden px-3 py-3 rounded items-center gap-2 flex-shrink-0 border-1"
                    style={{
                      borderRadius: "4px",
                      borderStyle: "dashed",
                      borderColor: "#6D0D26",
                      background: "#F7F3F4",
                      minWidth: "140px",
                      maxWidth: "200px",
                      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div className="flex items-center justify-center flex-shrink-0">
                      <Image src="/coupon.svg" alt="coupon" width={20} height={20} className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-333333 text-sm truncate">{c.code}</h4>
                      <p className="text-xs truncate" style={{ color: "rgba(51, 51, 51, 0.80)" }}>
                        {c.description}
                      </p>
                    </div>
                  </div>
                ))}
                {/* Show remaining coupons on xl screens only when expanded */}
                {showMoreCoupons && remainingCoupons.map((c, idx) => (
                  <div
                    key={`xl-${idx}`}
                    className="hidden xl:flex px-4 py-3 rounded items-center gap-2 flex-shrink-0 border-1"
                    style={{
                      borderRadius: "4px",
                      borderStyle: "dashed",
                      borderColor: "#6D0D26",
                      background: "#F7F3F4",
                      minWidth: "200px",
                      maxWidth: "280px",
                      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div className="flex items-center justify-center flex-shrink-0">
                      <Image src="/coupon.svg" alt="coupon" width={20} height={20} className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-333333 text-sm truncate">{c.code}</h4>
                      <p className="text-xs truncate" style={{ color: "rgba(51, 51, 51, 0.80)" }}>
                        {c.description}
                      </p>
                    </div>
                  </div>
                ))}
                {/* Show "Show less" button inline with coupons on xl screens */}
                {showMoreCoupons && (
                  <button
                    className="text-sm font-medium hover:underline cursor-pointer hidden xl:block self-center ml-3"
                    style={{ color: "var(--color-primary)" }}
                    onClick={() => setShowMoreCoupons(false)}
                  >
                    Show less
                  </button>
                )}
              </div>
              {/* Show "+1 more" on small screens and xl screens */}
              {coupons.length > 2 && !showMoreCoupons && (
                <button
                  className="text-sm font-medium hover:underline whitespace-nowrap cursor-pointer self-start md:hidden xl:block"
                  style={{ color: "var(--color-primary)" }}
                  onClick={() => setShowMoreCoupons(true)}
                >
                  +1 more
                </button>
              )}
            </div>
          </div>
        )}
        {/* Show remaining coupons for small and md screens when expanded */}
        {showMoreCoupons && coupons.length > 2 && (
          <>
            <div className="flex flex-wrap items-center gap-3 mt-3 xl:hidden">
              {coupons.slice(2).map((c, idx) => (
                <div
                  key={`rest-${idx}`}
                  className="px-2 py-2 md:px-3 md:py-3 rounded flex items-center gap-1 md:gap-2 flex-shrink-0 border-1"
                  style={{
                    borderRadius: "4px",
                    borderStyle: "dashed",
                    borderColor: "#6D0D26",
                    background: "#F7F3F4",
                    minWidth: "100px",
                    maxWidth: "140px",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="flex items-center justify-center flex-shrink-0">
                    <Image src="/coupon.svg" alt="coupon" width={20} height={20} className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-333333 text-xs md:text-sm truncate">{c.code}</h4>
                    <p className="text-xs truncate" style={{ color: "rgba(51, 51, 51, 0.80)" }}>
                      {c.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 xl:hidden">
              <button
                className="text-sm font-medium hover:underline cursor-pointer"
                style={{ color: "var(--color-primary)" }}
                onClick={() => setShowMoreCoupons(false)}
              >
                Show less
              </button>
            </div>
          </>
        )}

        {/* Volume Selection */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-gray-700 font-medium text-sm sm:text-base">{t("product.volume", language)}:</span>
            <span className="text-gray-900 font-semibold text-xs sm:text-sm">{selectedVolume}</span>
          </div>
          <div className="flex items-center gap-3">
            {volumes.map((vol) => (
              <button
                key={vol}
                onClick={() => setSelectedVolume(vol)}
                className={`px-4 py-2 rounded-md text-xs sm:text-sm font-medium border cursor-pointer ${selectedVolume === vol ? "border-2" : "border"}`}
                style={{ borderColor: selectedVolume === vol ? "#6D0D26" : "#D1D5DB", color: "#333" }}
              >
                {vol}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quantity and Add to Cart */}
      <div className="space-y-4 w-full">
        <div className="flex items-center gap-3">
          <label className="text-xs sm:text-sm font-medium text-gray-700">
            {t("common.qty", language)} :
          </label>
          <div className="flex items-center bg-[#F7F3F4] border border-[#6D0D26] rounded-md px-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-1.5 py-1 text-xs sm:text-sm text-gray-600 hover:bg-gray-100 rounded cursor-pointer"
            >
              -
            </button>
            <span
              className="px-2 py-1 text-black font-semibold text-sm sm:text-base"
              style={{ minWidth: "2ch", textAlign: "center" }}
            >
              {quantity.toString().padStart(2, "0")}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-1.5 py-1 text-xs sm:text-sm text-gray-600 hover:bg-gray-100 rounded cursor-pointer"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <Button
            variant="buy"
            size="large"
            onClick={buyNow}
            className="flex-1 text-sm sm:text-base"
          >
            {t("product.buyNow", language)}
          </Button>
          <Button
            variant="cart"
            size="large"
            onClick={addToCart}
            className="flex-1 text-sm sm:text-base"
          >
            {t("product.addToCart", language)}
          </Button>
        </div>
        <div className="mt-2">
          <span
            className="text-[#FF5722] font-medium text-xs sm:text-base"
            style={{ fontSize: "13px" }}
          >
            Only <span className="font-semibold">5 stocks left</span>,
          </span>
          <span
            className="text-black font-medium text-xs sm:text-base"
            style={{ fontSize: "13px" }}
          >
            {" "}
            Hurry up!
          </span>
        </div>
      </div>

      <ProductServiceBenefits />

      {/* About product */}
      <div className="rounded-lg py-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {t("product.aboutProduct", language)}
        </h3>
        <p className="text-gray-700 leading-relaxed mb-2 text-sm sm:text-base">
          {product.type === "Hair Care" && (
            <>
              Our premium hair care products are formulated with advanced ingredients to address specific hair concerns. Whether you're dealing with dryness, dandruff, or hair loss, our scientifically-backed formulas work to restore hair health and vitality. Each product is carefully crafted to provide deep nourishment, strengthen hair follicles, and promote natural growth while maintaining the perfect balance for your hair type.
            </>
          )}
          {product.type === "Soap & Deodorants" && (
            <>
              Experience the perfect blend of natural ingredients and modern science in our soap and deodorant collection. Our products are designed to provide thorough cleansing while being gentle on your skin. From antibacterial protection to long-lasting freshness, each item is crafted to meet your daily hygiene needs. We use carefully selected natural oils and essential ingredients to ensure your skin stays healthy, clean, and refreshed throughout the day.
            </>
          )}
          {product.type === "Skin Care" && (
            <>
              Transform your skincare routine with our advanced formulations designed to address various skin concerns. Our products combine cutting-edge dermatological science with natural ingredients to deliver visible results. From hydration and brightening to anti-aging and acne treatment, each product is formulated to work harmoniously with your skin's natural processes, promoting healthy, radiant, and youthful-looking skin.
            </>
          )}
          {product.type === "Oral Care" && (
            <>
              Maintain optimal oral health with our comprehensive range of dental care products. Our oral care solutions are designed to provide thorough cleaning, fresh breath, and long-term dental health benefits. From advanced whitening formulas to gentle yet effective cleaning systems, each product is engineered to work together for complete oral hygiene. We prioritize both effectiveness and comfort to ensure your daily dental routine is both beneficial and enjoyable.
            </>
          )}
          {!["Hair Care", "Soap & Deodorants", "Skin Care", "Oral Care"].includes(product.type) && (
            <>
              Discover our carefully curated collection of premium products designed to enhance your daily routine. Each item is crafted with attention to detail, using quality ingredients and innovative formulations to deliver exceptional results. Whether you're looking for personal care essentials or specialized treatments, our products are designed to meet your needs while providing the quality and reliability you deserve.
            </>
          )}
        </p>
        <button
          onClick={() => setShowMoreDetails((v) => !v)}
          className="text-[#6D0D26] text-sm font-medium underline hover:underline cursor-pointer"
          style={{ display: "inline-block", marginTop: "4px", background: 'none', border: 'none', padding: 0 }}
        >
          {showMoreDetails ? 'Show less' : 'See more product details'}
        </button>
        {showMoreDetails && (
              <div className="mt-3 text-gray-700 leading-relaxed space-y-2 text-sm sm:text-base md:text-base">
                <p>
                  This is a premium formulation crafted with care to deliver visible results. It blends advanced active ingredients with gentle, skin-friendly bases for daily use.
                </p>
                <p>
                  Key highlights: dermatologist-inspired formula, lightweight texture, non-greasy finish, and suitable for most skin and hair types. Ideal for regular routines or as a targeted treatment.
                </p>
                <p>
                  Directions for best results: apply an appropriate amount, massage gently, and allow to absorb. Use consistently and pair with complementary products from the same category for maximum benefits.
                </p>
                <p>
                  Note: this is a sample description for demonstration purposes only. Replace with real content fetched from your backend in production.
                </p>
              </div>
        )}
      </div>

      {/* Specification */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {t("product.specifications", language)}
        </h3>
        <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm sm:text-base">
          {product.type === "Hair Care" && (
            <>
              <li>Formulated with advanced hair care technology</li>
              <li>Suitable for all hair types and textures</li>
              <li>Contains natural and nourishing ingredients</li>
              <li>Free from harmful chemicals and sulfates</li>
              <li>Clinically tested for safety and effectiveness</li>
              <li>Designed for daily use and long-term results</li>
            </>
          )}
          {product.type === "Soap & Deodorants" && (
            <>
              <li>Made with natural and gentle ingredients</li>
              <li>Provides long-lasting freshness and protection</li>
              <li>Suitable for sensitive skin types</li>
              <li>Antibacterial and antimicrobial properties</li>
              <li>Eco-friendly and biodegradable formulas</li>
              <li>Dermatologically tested for safety</li>
            </>
          )}
          {product.type === "Skin Care" && (
            <>
              <li>Advanced dermatological formulations</li>
              <li>Contains active ingredients for targeted results</li>
              <li>Suitable for various skin concerns and types</li>
              <li>Non-comedogenic and hypoallergenic</li>
              <li>Clinically proven effectiveness</li>
              <li>Designed for daily skincare routines</li>
            </>
          )}
          {product.type === "Oral Care" && (
            <>
              <li>Advanced dental care technology</li>
              <li>Provides comprehensive oral hygiene</li>
              <li>Suitable for daily use and maintenance</li>
              <li>Contains fluoride and protective ingredients</li>
              <li>Dentist-recommended formulations</li>
              <li>Designed for long-term oral health benefits</li>
            </>
          )}
          {!["Hair Care", "Soap & Deodorants", "Skin Care", "Oral Care"].includes(product.type) && (
            <>
              <li>Premium quality ingredients and formulations</li>
              <li>Designed for optimal performance and results</li>
              <li>Suitable for regular daily use</li>
              <li>Safety tested and approved</li>
              <li>Long-lasting effectiveness and reliability</li>
              <li>User-friendly and convenient application</li>
            </>
          )}
        </ul>
      </div>

      {/* Return & Refund Policy */}
      <div className="mt-8">
        <div className="border-t border-gray-200 mb-4"></div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {t("product.returnRefundPolicy", language)}
        </h3>
        <p className="text-gray-700 mb-2 text-sm sm:text-base">
          Returns are accepted within{" "}
          <span className="font-semibold">7 days</span> for unused items
          in original packaging. Damaged or incorrect products are
          eligible for a full refund or replacement.
        </p>
        <p className="text-gray-700 text-sm sm:text-base" style={{ textIndent: "2em" }}>
          Refunds are processed after inspection. To start a return,
          contact our support team with your order ID.
        </p>
      </div>
    </div>
  );
} 