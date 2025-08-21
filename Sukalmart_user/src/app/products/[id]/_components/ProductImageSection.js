"use client";

export default function ProductImageSection({ productType }) {
  const getImageSource = (type) => {
    switch (type) {
      case "Hair Care":
        return "/haircarebanner3.png";
      case "Skin Care":
        return "/skincarebanner3.png";
      case "Soap & Deodorants":
        return "/soapbanner4.png";
      case "Body & Wash":
        return "/body&washbanner3.png";
      case "Oral Care":
      case "Oral & Misc":
        return "/oral&miscbanner3.png";
      default:
        return "/skincarebanner3.png";
    }
  };

  return (
    <div className="flex-1 flex justify-start items-center w-full mb-6 md:mb-0 md:sticky md:top-20 md:self-start">
      <img
        src={getImageSource(productType)}
        alt={`${productType} Advanced Features`}
        className="object-contain"
        style={{
          width: "100%",
          maxWidth: "500px",
          height: "auto",
          transform: "scaleX(-1)",
        }}
      />
    </div>
  );
} 