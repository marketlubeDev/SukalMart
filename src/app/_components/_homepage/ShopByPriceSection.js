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

  return (
    <div className="py-8 container mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
          Shop by Price
        </h2>
      </div>
      
      {/* Price Range Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
        {priceRanges.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-white rounded-lg p-4 cursor-pointer"
          >
            <div className="w-full aspect-square mb-3 overflow-hidden rounded-lg">
              <img
                src={item.image}
                alt={`${item.range} products`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <p className="text-sm md:text-base font-semibold text-gray-800">
                {item.range}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 