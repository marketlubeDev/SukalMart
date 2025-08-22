"use client";

export default function ProductFeaturesSection2({ productType }) {
  const getTitle = () => {
    switch (productType) {
      case "Hair Care":
        return (
          <>
            Professional Hair Care
            <br />
            Solutions for Every Need
          </>
        );
      case "Skin Care":
        return (
          <>
            Advanced Skincare Science
            <br />
            for Beautiful Skin
          </>
        );
      case "Soap & Deodorants":
        return (
          <>
            Natural Hygiene Products
            <br />
            for Daily Protection
          </>
        );
      case "Body & Wash":
        return (
          <>
            Complete Body Care
            <br />
            for Total Wellness
          </>
        );
      case "Oral Care":
      case "Oral & Misc":
        return (
          <>
            Complete Oral Care
            <br />
            for Dental Excellence
          </>
        );
      default:
        return (
          <>
            Premium Product Solutions
            <br />
            for Outstanding Results
          </>
        );
    }
  };

  const getFeatures = () => {
    switch (productType) {
      case "Hair Care":
        return [
          "Our professional hair care solutions are designed to address specific hair concerns with clinically proven ingredients and advanced technology.",
          "Each product is carefully formulated to restore hair health, promote growth, and maintain natural beauty for all hair types."
        ];
      case "Skin Care":
        return [
          "Our advanced skincare science combines innovative technology with natural ingredients to deliver visible and lasting skin improvements.",
          "Each formulation is designed to target specific skin concerns while promoting overall skin health and natural radiance."
        ];
      case "Soap & Deodorants":
        return [
          "Our natural hygiene products provide effective protection while being gentle on your skin and environmentally conscious.",
          "Each product is crafted with natural ingredients to ensure thorough cleansing and long-lasting freshness throughout the day."
        ];
      case "Body & Wash":
        return [
          "Our complete body care range offers comprehensive solutions for total body wellness and luxurious self-care experiences.",
          "Each product combines therapeutic benefits with indulgent textures to nourish, protect, and rejuvenate your entire body."
        ];
      case "Oral Care":
      case "Oral & Misc":
        return [
          "Our complete oral care system provides comprehensive dental hygiene with advanced cleaning technology and protective formulas.",
          "Each product works synergistically to maintain optimal oral health, from daily care to specialized treatments."
        ];
      default:
        return [
          "Our premium product solutions are crafted with the finest ingredients and cutting-edge technology to deliver exceptional results.",
          "Each formulation is designed to meet your specific needs while providing the quality, reliability, and performance you expect."
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
        {/* Left: Product Image */}
        <div className="flex-1 flex justify-start items-center w-full">
          <img
            src={getImageSrc()}
            alt={`${productType} Features`}
            className="object-contain"
            style={{ width: "100%", maxWidth: "500px", height: "auto" }}
          />
        </div>
        
        {/* Right: Text and Features */}
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
      </div>
    </div>
  );
} 