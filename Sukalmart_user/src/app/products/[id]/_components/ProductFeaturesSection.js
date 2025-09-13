"use client";

import Image from "next/image";

export default function ProductFeaturesSection({ product }) {
  console.log(product?.featuresSections, "ewrewrfsdfdsfdsfdfds");

  // Early return if product is not loaded
  if (!product) return null;

  // Filter split sections with imagePosition: 'right'
  const splitSections =
    product.featuresSections?.filter(
      (section) =>
        section.layout === "split" && section.imagePosition === "right"
    ) || [];

  // If no split sections found, return null (don't render anything)
  if (splitSections.length === 0) {
    return null;
  }

  // Render dynamic content from featuresSections
  return (
    <div className="my-8">
      <div className="space-y-8">
        {splitSections.map((section, index) => (
          <div
            key={index}
            className="w-full rounded-lg overflow-hidden bg-white flex flex-col md:flex-row items-center justify-center gap-8"
          >
            {/* Left: Text and Features */}
            <div className="flex-1 flex flex-col justify-center items-start max-w-md w-full mb-6 md:mb-0">
              <div
                className="mb-4 font-semibold text-gray-900"
                style={{
                  color: "#333",
                  fontSize: "clamp(18px, 4.5vw, 24px)",
                  fontStyle: "normal",
                  lineHeight: "normal",
                  letterSpacing: "-0.24px",
                  leadingTrim: "both",
                  textEdge: "cap",
                }}
              >
                {section.title}
              </div>
              {section.description && (
                <div className="text-gray-700 text-sm sm:text-base">
                  {section.description}
                </div>
              )}
            </div>
            {/* Right: Product Image */}
            <div className="flex-1 flex justify-center items-center w-full">
              <Image
                src={section.mediaUrl}
                alt={section.title}
                width={1500}
                height={350}
                className="w-full max-w-[1500px] object-cover object-center h-48 sm:h-56 md:h-72 lg:h-[350px]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
