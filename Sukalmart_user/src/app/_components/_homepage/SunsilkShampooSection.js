"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";
import { t } from "@/lib/translations";

// ProductCard component - inline to avoid separate file dependency
function ProductCard({ product, onClick }) {
  return (
    <div 
      className="group bg-white rounded-lg overflow-hidden cursor-pointer shadow-none flex flex-col min-w-0"
      onClick={() => onClick(product.id)}
    >
      {/* Product Image */}
      <div className="relative">
        {product.image?.includes('marketlube') ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-36 md:h-40 lg:h-56 xl:h-44 object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300x180?text=Product+Image";
            }}
          />
        ) : (
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={180}
            className="w-full h-36 md:h-40 lg:h-56 xl:h-44 object-cover transition-transform duration-300 group-hover:scale-110"
          />
        )}
      </div>

      {/* Product Info */}
      <div className="pt-4 px-1 flex-1 flex flex-col">
        <h3 className="text-xs md:text-sm lg:text-base font-semibold text-gray-900 mb-1 lg:mb-2 line-clamp-2" style={{ lineHeight: "1.1" }}>
          {product.name}
        </h3>
        <p className="text-xs md:text-sm lg:text-base text-gray-600 mb-2 md:mb-3 lg:mb-4" style={{ lineHeight: "1.1" }}>
          {product.type || product.category}
        </p>

        {/* Price */}
        <div className="flex items-center gap-1 md:gap-2 lg:gap-3 mb-0 whitespace-nowrap">
          <span
            className="text-xs md:text-sm lg:text-base font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            <span className="align-baseline text-[9px] md:text-[10px] lg:text-xs">AED</span>
            <span className="ml-1">{String(product.price).replace(/AED\s*/, '').toLocaleString()}</span>
          </span>
          {product.originalPrice && Number(product.price) < Number(product.originalPrice) && (
            <span className="relative inline-flex items-center text-gray-500">
              <span className="align-baseline text-[9px] md:text-[10px] lg:text-xs">AED</span>
              <span className="text-[10px] md:text-xs lg:text-sm ml-1">{String(product.originalPrice).replace(/AED\s*/, '').toLocaleString()}</span>
              <span aria-hidden="true" className="absolute left-0 right-0 top-1/2 -translate-y-1/2 transform h-px bg-gray-700"></span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductSection({ selectedCategory = "Hair Care" }) {
  const { language } = useLanguage();
  const router = useRouter();
  const [sessionData, setSessionData] = useState({});

  const handleViewAllClick = () => {
    // Store category in component state instead of localStorage
    setSessionData({ selectedCategory: 'Hair Care' });
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
    
    // Sunsilk shampoo products for Hair Care category
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
    <div className="py-8 container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-10">
      <div className="mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
            {selectedCategory === "Body & Shower" ? t("homepage.bodyWash", language) : t("homepage.sunsilkShampoo", language)}
          </h2>
          <button
            className="flex items-center gap-2 font-medium transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded"
            style={{ color: "var(--color-primary)" }}
            onClick={handleViewAllClick}
            aria-label="View all best sellers"
          >
            <span className="text-sm sm:text-base">{t("common.viewAll", language)}</span>
            <Image
              src="/nextarrow.svg"
              alt="Next arrow"
              width={28}
              height={28}
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
          </button>
        </div>

        {/* Unified Responsive Grid with Mobile Scrolling */}
        <div className="flex sm:grid sm:grid-cols-3 md:flex lg:flex xl:grid xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-5 overflow-x-auto sm:overflow-x-visible md:overflow-x-auto lg:overflow-x-auto xl:overflow-x-visible pb-4 sm:pb-0 md:pb-4 lg:pb-4 xl:pb-0 scrollbar-hide sm:scrollbar-auto md:scrollbar-auto lg:scrollbar-auto xl:scrollbar-auto">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="flex-shrink-0 w-[calc(50%-6px)] sm:w-full sm:max-w-[200px] sm:mx-auto md:w-[200px] lg:w-[200px] xl:w-full xl:max-w-[200px] xl:mx-auto"
            >
              <ProductCard 
                product={product} 
                onClick={handleProductClick}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS for scrollbar styling */}
      <style jsx>{`
        .scrollbar-primary {
          scrollbar-width: thin;
          scrollbar-color: var(--color-primary, #007bff) #f1f1f1;
        }
        
        .scrollbar-primary::-webkit-scrollbar {
          height: 4px;
        }
        
        .scrollbar-primary::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        
        .scrollbar-primary::-webkit-scrollbar-thumb {
          background: var(--color-primary, #007bff);
          border-radius: 4px;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}