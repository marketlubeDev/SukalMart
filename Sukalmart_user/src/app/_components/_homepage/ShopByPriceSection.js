"use client";
export default function ShopByPriceSection({ selectedCategory }) {
  console.log("ShopByPriceSection - selectedCategory:", selectedCategory);
  
  // Function to get price ranges based on selected category
  const getPriceRanges = (category) => {
    console.log("getPriceRanges called with category:", category);
    console.log("category === 'Body & Shower':", category === "Body & Shower");
    
    if (category === "Body & Shower") {
      return [
        {
          range: "Under ₹500",
          image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
        },
        {
          range: "₹500 - ₹1000",
          image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
        },
        {
          range: "₹1000 - ₹1500",
          image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
        },
        {
          range: "₹1500 - ₹2000",
          image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
        },
        {
          range: "₹2000 - ₹2500",
          image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
        },
        {
          range: "Over ₹2500",
          image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
        },
      ];
    }
    
    // Soap & Deodorants-specific price ranges
    if (category === "Soap & Deodorants") {
      return [
        {
          range: "Under ₹500",
          image: "/soap1.jpeg",
        },
        {
          range: "₹500 - ₹1000",
          image: "/soap2.jpg",
        },
        {
          range: "₹1000 - ₹1500",
          image: "/soap1.jpeg",
        },
        {
          range: "₹1500 - ₹2000",
          image: "/soap2.jpg",
        },
        {
          range: "₹2000 - ₹2500",
          image: "/soap1.jpeg",
        },
        {
          range: "Over ₹2500",
          image: "/soap2.jpg",
        },
      ];
    }
    
    // Haircare-specific price ranges, otherwise use default
    if (category === "Hair Care") {
      return [
        {
          range: "Under ₹1000",
          image: "/haircare1.jpg",
        },
        {
          range: "₹1000 - ₹2000",
          image: "/haircare2.jpg",
        },
        {
          range: "₹2000 - ₹3000",
          image: "/haircare3.jpg",
        },
        {
          range: "₹3000 - ₹4000",
          image: "/haircare1.jpg",
        },
        {
          range: "₹4000 - ₹5000",
          image: "/haircare2.jpg",
        },
        {
          range: "Over ₹5000",
          image: "/haircare3.jpg",
        },
      ];
    }
    
    // Skin Care-specific price ranges
    if (category === "Skin Care") {
      return [
        {
          range: "Under ₹500",
          image: "/skin1.jpg",
        },
        {
          range: "₹500 - ₹1000",
          image: "/skin2.jpg",
        },
        {
          range: "₹1000 - ₹1500",
          image: "/skin1.jpg",
        },
        {
          range: "₹1500 - ₹2000",
          image: "/skin2.jpg",
        },
        {
          range: "₹2000 - ₹2500",
          image: "/skin1.jpg",
        },
        {
          range: "Over ₹2500",
          image: "/skin2.jpg",
        },
      ];
    }
    
    // Oral & Misc-specific price ranges
    if (category === "Oral & Misc") {
      return [
        {
          range: "Under ₹500",
          image: "/tooth1.jpg",
        },
        {
          range: "₹500 - ₹1000",
          image: "/tooth2.jpg",
        },
        {
          range: "₹1000 - ₹1500",
          image: "/tooth1.jpg",
        },
        {
          range: "₹1500 - ₹2000",
          image: "/tooth2.jpg",
        },
        {
          range: "₹2000 - ₹2500",
          image: "/tooth1.jpg",
        },
        {
          range: "Over ₹2500",
          image: "/tooth2.jpg",
        },
      ];
    }
    
    // Default price ranges for other categories
    return [
      {
        range: "Under ₹500",
        image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
      },
      {
        range: "₹500 - ₹1000",
        image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
      },
      {
        range: "₹1000 - ₹1500",
        image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
      },
      {
        range: "₹1500 - ₹2000",
        image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
      },
      {
        range: "₹2000 - ₹2500",
        image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
      },
      {
        range: "Over ₹2500",
        image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
      },
    ];
  };

  const priceRanges = getPriceRanges(selectedCategory);
  console.log("Final priceRanges:", priceRanges);

  // Prepare rows for mobile (3 per row)
  const firstRow = priceRanges.slice(0, 3);
  const secondRow = priceRanges.slice(3, 6);

  return (
    <div className="py-8 container mx-auto px-4 sm:px-0 md:px-8 lg:px-12 xl:px-10 2xl:px-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-[28px] font-bold text-gray-800 mb-4">
          Shop by Price
        </h2>
      </div>
      
      {/* Mobile Layout - mirror CategorySection style */}
      <div className="w-full sm:hidden">
        {/* First row - 3 items */}
        <div
          className="flex w-full mb-2"
          style={{ justifyContent: "space-between", gap: "8px" }}
        >
          {firstRow.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-start cursor-pointer"
              style={{ flex: "0 0 32%", maxWidth: "120px" }}
            >
              <div className="flex flex-col items-center justify-center overflow-hidden rounded w-[100px] h-[100px]">
                <img src={item.image} alt={item.range} className="w-full h-full object-cover" />
              </div>
              <div className="text-[#000000] text-center mt-2 text-[10px] font-medium leading-normal tracking-[-0.28px]">
                {item.range}
              </div>
            </div>
          ))}
        </div>
        {/* Second row - 3 items */}
        <div
          className="flex w-full"
          style={{ justifyContent: "space-between", gap: "8px" }}
        >
          {secondRow.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-start cursor-pointer"
              style={{ flex: "0 0 32%", maxWidth: "120px" }}
            >
              <div className="flex flex-col items-center justify-center overflow-hidden rounded w-[100px] h-[100px]">
                <img src={item.image} alt={item.range} className="w-full h-full object-cover" />
              </div>
              <div className="text-[#000000] text-center mt-2 text-[10px] font-medium leading-normal tracking-[-0.28px]">
                {item.range}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Desktop/Tablet Grid */}
      <div className="hidden sm:grid grid-cols-3 lg:grid-cols-6 gap-4 mx-auto">
        {priceRanges.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-white rounded-lg p-4 md:p-0 cursor-pointer"
          >
            <div className="w-full aspect-square mb-3 overflow-hidden rounded-lg md:w-40 md:h-40">
              <img
                src={item.image}
                alt={`${item.range} products`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <p className="text-sm md:text-xs font-semibold text-gray-800">
                {item.range}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 