"use client";

export default function ProductFeaturesSection({ productType }) {
  const getTitle = () => {
    switch (productType) {
      case "Hair Care":
        return (
          <>
            Advanced Hair Care Technology
            <br />
            for Professional Results
          </>
        );
      case "Skin Care":
        return (
          <>
            Advanced Skincare Formulations
            <br />
            for Radiant Skin
          </>
        );
      case "Soap & Deodorants":
        return (
          <>
            Natural Cleansing Solutions
            <br />
            for Daily Hygiene
          </>
        );
      case "Body & Wash":
        return (
          <>
            Premium Body Care Products
            <br />
            for Complete Wellness
          </>
        );
      case "Oral Care":
      case "Oral & Misc":
        return (
          <>
            Advanced Oral Care Technology
            <br />
            for Complete Dental Health
          </>
        );
      default:
        return (
          <>
            Premium Product Technology
            <br />
            for Optimal Results
          </>
        );
    }
  };

  const getFeatures = () => {
    switch (productType) {
      case "Hair Care":
        return [
          "Our advanced hair care technology uses scientifically proven ingredients to address specific hair concerns and promote healthy growth.",
          "Each product is formulated with natural extracts and advanced compounds that work together to restore hair vitality and strength."
        ];
      case "Skin Care":
        return [
          "Our dermatologically tested formulations combine cutting-edge science with natural ingredients for visible skin improvements.",
          "Each product targets specific skin concerns while maintaining the skin's natural balance and promoting long-term health."
        ];
      case "Soap & Deodorants":
        return [
          "Our natural cleansing solutions provide thorough hygiene while being gentle on your skin and environmentally friendly.",
          "Each product is crafted with carefully selected natural ingredients for effective cleansing and long-lasting freshness."
        ];
      case "Body & Wash":
        return [
          "Our premium body care products are designed to nourish and protect your skin while providing a luxurious bathing experience.",
          "Each formulation combines therapeutic ingredients with indulgent textures for complete body wellness and care."
        ];
      case "Oral Care":
      case "Oral & Misc":
        return [
          "Our advanced oral care technology provides comprehensive dental hygiene with innovative cleaning systems and protective formulas.",
          "Each product is designed to work together for complete oral health, from daily maintenance to specialized treatments."
        ];
      default:
        return [
          "Our premium products are crafted with the highest quality ingredients and advanced technology to deliver exceptional results.",
          "Each formulation is designed to meet your specific needs while providing the quality and reliability you deserve."
        ];
    }
  };

  const getImageSrc = () => {
    switch (productType) {
      case "Hair Care":
        return "/haircarebanner2.png";
      case "Skin Care":
        return "/skincarebanner2.png";
      case "Soap & Deodorants":
        return "/soapbanner2.png";
      case "Body & Wash":
        return "/body&washbanner2.png";
      case "Oral Care":
      case "Oral & Misc":
        return "/oral&miscbanner2.png";
      default:
        return "/skincarebanner2.png";
    }
  };

  return (
    <div className="my-8">
      <div className="w-full rounded-lg overflow-hidden bg-white flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Left: Text and Features */}
        <div className="flex-1 flex flex-col justify-center items-start max-w-md w-full mb-6 md:mb-0">
          <div
            className="mb-4"
            style={{
              color: "#333",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              letterSpacing: "-0.24px",
              leadingTrim: "both",
              textEdge: "cap",
            }}
          >
            {getTitle()}
          </div>
          <ul className="list-disc pl-5 text-gray-700 space-y-2 text-base">
            {getFeatures().map((feature, index) => (
              <li key={index}>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        {/* Right: Product Image */}
        <div className="flex-1 flex justify-end items-center w-full">
          <img
            src={getImageSrc()}
            alt={`${productType} Features`}
            className="object-contain"
            style={{ width: "100%", maxWidth: "500px", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
} 