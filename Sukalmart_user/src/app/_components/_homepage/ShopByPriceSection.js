"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useMemo } from "react";

const PRICE_RANGES_CONFIG = {
  "Body & Shower": [
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
  ],
  "Soap & Deodorants": [
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
  ],
  "Hair Care": [
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
  ],
  "Skin Care": [
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
  ],
  "Oral & Misc": [
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
  ],
};

// Default price ranges
const DEFAULT_PRICE_RANGES = [
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

export default function ShopByPriceSection({ selectedCategory }) {
  const router = useRouter();
  
  // Memoize price ranges to avoid recalculation on every render
  const priceRanges = useMemo(() => {
    return PRICE_RANGES_CONFIG[selectedCategory] || DEFAULT_PRICE_RANGES;
  }, [selectedCategory]);

  const handlePriceClick = (priceRange) => {
    router.push(`/products?price=${encodeURIComponent(priceRange)}`);
  };

  return (
    <section className="py-8 container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-10 2xl:px-10">
      <header className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-[28px] font-bold text-gray-800 mb-4">
          Shop by Price
        </h2>
      </header>
      
      {/* Unified Responsive Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 mx-auto">
        {priceRanges.map((item, index) => (
          <div
            key={`${selectedCategory}-${item.range}-${index}`}
            className="flex flex-col items-center justify-center bg-white rounded-lg p-2 sm:p-4 md:p-0 cursor-pointer hover:shadow-md transition-shadow duration-200"
            onClick={() => handlePriceClick(item.range)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handlePriceClick(item.range);
              }
            }}
            aria-label={`Shop products ${item.range}`}
          >
            <div className="w-full aspect-square mb-2 sm:mb-3 overflow-hidden rounded-lg relative">
              <Image
                src={item.image}
                alt={`${item.range} products`}
                fill
                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover"
                priority={index < 6} // Prioritize first 6 images
              />
            </div>
            <div className="text-center">
              <p className="text-[10px] sm:text-sm md:text-xs font-medium sm:font-semibold text-gray-800 leading-tight tracking-tight">
                {item.range}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}