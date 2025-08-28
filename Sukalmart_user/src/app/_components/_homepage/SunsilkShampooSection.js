"use client";
import ProductCard from "./ProductCard";
import { useRouter } from "next/navigation";

export default function SunsilkShampooSection({ selectedCategory }) {
  const router = useRouter();

  const handleViewAllClick = () => {
    // Navigate to products page with Hair Care category selected
    localStorage.setItem('selectedCategory', 'Hair Care');
    router.push('/products');
  };

  const handleProductClick = (productId) => {
    router.push(`/products/${productId}`);
  };

  // Function to get products based on category
  const getProducts = (category) => {
    if (category === "Body & Shower") {
      return [
        {
          id: 1,
          name: "Premium Body Wash Gel",
          type: "Body Care",
          price: 299,
          originalPrice: 399,
          image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
          category: "Body Wash",
        },
        {
          id: 2,
          name: "Luxury Body Wash Cream",
          type: "Body Care",
          price: 349,
          originalPrice: 449,
          image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
          category: "Body Wash",
        },
        {
          id: 3,
          name: "Moisturizing Body Wash",
          type: "Body Care",
          price: 279,
          originalPrice: 379,
          image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
          category: "Body Wash",
        },
        {
          id: 4,
          name: "Refreshing Body Wash",
          type: "Body Care",
          price: 259,
          originalPrice: 359,
          image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
          category: "Body Wash",
        },
        {
          id: 5,
          name: "Exfoliating Body Scrub",
          type: "Body Care",
          price: 329,
          originalPrice: 429,
          image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
          category: "Body Wash",
        },
        {
          id: 6,
          name: "Hydrating Body Lotion",
          type: "Body Care",
          price: 289,
          originalPrice: 389,
          image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
          category: "Body Wash",
        },
      ];
    }
    
    // Sunsilk shampoo products for Hair Care category with unique IDs
    if (category === "Hair Care") {
      return [
        {
          id: 9,
          name: "Sunsilk Naturals Shampoo",
          type: "Hair Care",
          price: 299,
          originalPrice: 399,
          image: "/sunsilk1.jpg",
          category: "Shampoo",
        },
        {
          id: 10,
          name: "Sunsilk Perfect Straight Shampoo",
          type: "Hair Care",
          price: 349,
          originalPrice: 449,
          image: "/sunsilk2.jpg",
          category: "Shampoo",
        },
        {
          id: 11,
          name: "Sunsilk Black Shine Shampoo",
          type: "Hair Care",
          price: 279,
          originalPrice: 379,
          image: "/sunsilk3.jpg",
          category: "Shampoo",
        },
        {
          id: 12,
          name: "Sunsilk Soft & Smooth Shampoo",
          type: "Hair Care",
          price: 259,
          originalPrice: 359,
          image: "/sunsilk4.jpg",
          category: "Shampoo",
        },
        {
          id: 13,
          name: "Sunsilk Anti-Dandruff Shampoo",
          type: "Hair Care",
          price: 319,
          originalPrice: 419,
          image: "/sunsilk1.jpg",
          category: "Shampoo",
        },
        {
          id: 14,
          name: "Sunsilk Volume Boost Shampoo",
          type: "Hair Care",
          price: 339,
          originalPrice: 439,
          image: "/sunsilk2.jpg",
          category: "Shampoo",
        },
      ];
    }
    
    // Default products for other categories
    return [
      {
        id: 1,
        name: "Premium Beauty Product",
        type: "Beauty",
        price: 299,
        originalPrice: 399,
        image: "/sunsilk1.jpg",
        category: "Beauty",
      },
      {
        id: 2,
        name: "Luxury Beauty Product",
        type: "Beauty",
        price: 349,
        originalPrice: 449,
        image: "/sunsilk2.jpg",
        category: "Beauty",
      },
      {
        id: 3,
        name: "Natural Beauty Product",
        type: "Beauty",
        price: 279,
        originalPrice: 379,
        image: "/sunsilk3.jpg",
        category: "Beauty",
      },
      {
        id: 4,
        name: "Organic Beauty Product",
        type: "Beauty",
        price: 259,
        originalPrice: 359,
        image: "/sunsilk4.jpg",
        category: "Beauty",
      },
      {
        id: 5,
        name: "Advanced Beauty Product",
        type: "Beauty",
        price: 329,
        originalPrice: 429,
        image: "/sunsilk1.jpg",
        category: "Beauty",
      },
      {
        id: 6,
        name: "Professional Beauty Product",
        type: "Beauty",
        price: 369,
        originalPrice: 469,
        image: "/sunsilk2.jpg",
        category: "Beauty",
      },
    ];
  };

  const products = getProducts(selectedCategory);

  return (
    <div className="py-8 container mx-auto px-4 sm:px-0 md:px-8 lg:px-10 xl:px-10 2xl:px-10">
      <div className="mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl xl:text-[28px] font-bold text-gray-800">
            {selectedCategory === "Body & Shower" ? "Body Wash" : "Sunsilk Shampoo"}
          </h2>
          <button
              className="flex items-center gap-2 font-medium transition-colors cursor-pointer"
              style={{ color: "var(--color-primary)" }}
              onClick={handleViewAllClick}
            >
              <span>View all</span>
              <img src="/nextarrow.svg" alt="Next arrow" className="w-7 h-7" />
            </button>
        </div>

        {/* Products Grid - Mobile: horizontal scroll with 6 cards in a row */}
        <div className="md:hidden -mx-4 px-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-primary">
            {products.map((product) => (
              <div key={product.id} className="flex-none w-1/3">
                <div 
                  className="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
                  onClick={() => handleProductClick(product.id)}
                >
                  <ProductCard product={product} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Products Grid - Desktop/Tablet */}
        <div className="hidden md:grid grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200 max-w-[200px] mx-auto"
              onClick={() => handleProductClick(product.id)}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 