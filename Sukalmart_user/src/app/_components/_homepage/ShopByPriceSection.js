"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";
import { t } from "@/lib/translations";

const PRICE_RANGES_CONFIG = {
  "Body & Shower": [
    {
      range: "Under AED 500",
      image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
    },
    {
      range: "AED 500 - AED 1000",
      image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
    },
    {
      range: "AED 1000 - AED 1500",
      image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
    },
    {
      range: "AED 1500 - AED 2000",
      image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
    },
    {
      range: "AED 2000 - AED 2500",
      image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
    },
    {
      range: "Over AED 2500",
      image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
    },
  ],
  "Soap & Deodorants": [
    {
      range: "Under AED 500",
      image: "/soap1.jpeg",
    },
    {
      range: "AED 500 - AED 1000",
      image: "/soap2.jpg",
    },
    {
      range: "AED 1000 - AED 1500",
      image: "/soap1.jpeg",
    },
    {
      range: "AED 1500 - AED 2000",
      image: "/soap2.jpg",
    },
    {
      range: "AED 2000 - AED 2500",
      image: "/soap1.jpeg",
    },
    {
      range: "Over AED 2500",
      image: "/soap2.jpg",
    },
  ],
  "Hair Care": [
    {
      range: "Under AED 1000",
      image: "/haircare1.jpg",
    },
    {
      range: "AED 1000 - AED 2000",
      image: "/haircare2.jpg",
    },
    {
      range: "AED 2000 - AED 3000",
      image: "/haircare3.jpg",
    },
    {
      range: "AED 3000 - AED 4000",
      image: "/haircare1.jpg",
    },
    {
      range: "AED 4000 - AED 5000",
      image: "/haircare2.jpg",
    },
    {
      range: "Over AED 5000",
      image: "/haircare3.jpg",
    },
  ],
  "Skin Care": [
    {
      range: "Under AED 500",
      image: "/skin1.jpg",
    },
    {
      range: "AED 500 - AED 1000",
      image: "/skin2.jpg",
    },
    {
      range: "AED 1000 - AED 1500",
      image: "/skin1.jpg",
    },
    {
      range: "AED 1500 - AED 2000",
      image: "/skin2.jpg",
    },
    {
      range: "AED 2000 - AED 2500",
      image: "/skin1.jpg",
    },
    {
      range: "Over AED 2500",
      image: "/skin2.jpg",
    },
  ],
  "Oral & Misc": [
    {
      range: "Under AED 500",
      image: "/tooth1.jpg",
    },
    {
      range: "AED 500 - AED 1000",
      image: "/tooth2.jpg",
    },
    {
      range: "AED 1000 - AED 1500",
      image: "/tooth1.jpg",
    },
    {
      range: "AED 1500 - AED 2000",
      image: "/tooth2.jpg",
    },
    {
      range: "AED 2000 - AED 2500",
      image: "/tooth1.jpg",
    },
    {
      range: "Over AED 2500",
      image: "/tooth2.jpg",
    },
  ],
};

// Default price ranges
const DEFAULT_PRICE_RANGES = [
  {
    range: "Under AED 500",
    image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
  },
  {
    range: "AED 500 - AED 1000",
    image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
  },
  {
    range: "AED 1000 - AED 1500",
    image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
  },
  {
    range: "AED 1500 - AED 2000",
    image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
  },
  {
    range: "AED 2000 - AED 2500",
    image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
  },
  {
    range: "Over AED 2500",
    image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
  },
];

export default function ShopByPriceSection({ selectedCategory }) {
  const { language } = useLanguage();
  const formatRange = (label) => {
    if (language !== 'AR') return label;
    if (label.startsWith('Under')) {
      return label.replace('Under', 'أقل من').replace('AED', 'د.إ');
    }
    if (label.startsWith('Over')) {
      return label.replace('Over', 'أكثر من').replace('AED', 'د.إ');
    }
    return label.replace('AED', 'د.إ').replace('-', ' - ');
  };
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
          {t("homepage.shopByPrice", language)}
        </h2>
      </header>
      
      {/* Unified Responsive Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 mx-auto">
        {priceRanges.map((item, index) => (
          <div
            key={`${selectedCategory}-${item.range}-${index}`}
            className="flex flex-col items-center justify-center bg-white rounded-lg p-2 sm:p-4 md:p-0 cursor-pointer duration-200 group hover:scale-105 transition-transform"
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
                alt={`${formatRange(item.range)} products`}
                fill
                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover transition-transform duration-200 group-hover:scale-110"
                priority={index < 6} // Prioritize first 6 images
              />
            </div>
            <div className="text-center">
              <p className="text-[#000000] font-medium text-center mt-2 leading-normal tracking-[-0.28px] transition-colors duration-200 group-hover:text-[var(--color-primary)]
                   text-[10px] 
                   sm:text-xs 
                   md:text-[13px] 
                   lg:text-xs 
                   xl:text-sm">
                {formatRange(item.range)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}