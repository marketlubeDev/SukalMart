"use client";

export default function ProductFeaturesBanner({ productType }) {
  const getImageSrc = () => {
    switch (productType) {
      case "Hair Care":
        return "/haircarebanner.png";
      case "Skin Care":
        return "/skinacrebanner.png";
      case "Soap & Deodorants":
        return "/soap.png";
      case "Body & Wash":
        return "/bodywash.png";
      case "Oral Care":
      case "Oral & Misc":
        return "/oral&misc.png";
      default:
        return "/skinacrebanner.png";
    }
  };

  return (
    <div className="my-8">
      <hr className="mb-6" style={{ borderColor: "#D1D5DB" }} />
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
        Product features
      </div>
      <div className="w-full rounded-lg overflow-hidden border border-gray-200 bg-white flex justify-center items-center">
        <img
          src={getImageSrc()}
          alt={`${productType} Product Features`}
          className="object-cover"
          style={{
            width: "100%",
            maxWidth: "1500px",
            height: "500px",
            objectPosition: "center",
          }}
        />
      </div>
    </div>
  );
} 