"use client";

import Image from "next/image";
import { useLanguage } from "@/app/_components/context/LanguageContext";
import { t } from "@/lib/translations";

export default function ProductFeaturesBanner({ product }) {
  const { language } = useLanguage();

  // Early return if product is not loaded
  if (!product) return null;

  // Filter banner sections (only image banners)
  const bannerSections =
    product.featuresSections?.filter(
      (section) => section.layout === "banner" && section.mediaType === "image"
    ) || [];

  return (
    <div className="my-8">
      <hr className="mb-6" style={{ borderColor: "#D1D5DB" }} />
      <div
        className="mb-4 font-semibold text-gray-900"
        style={{
          color: "#333",
          fontSize: "clamp(20px, 4.5vw, 24px)",
          fontStyle: "normal",
          lineHeight: "normal",
          letterSpacing: "-0.24px",
        }}
      >
        {t("product.productFeatures", language)}
      </div>

      <div className="space-y-6">
        {bannerSections.map((section, index) => (
          <div
            key={index}
            className="w-full rounded-lg overflow-hidden border border-gray-200 bg-white flex justify-center items-center"
          >
            <Image
              src={section.mediaUrl}
              alt={`Banner ${index + 1}`}
              width={1500}
              height={500}
              className="w-full max-w-[1500px] object-cover object-center h-48 sm:h-56 md:h-72 lg:h-[500px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
