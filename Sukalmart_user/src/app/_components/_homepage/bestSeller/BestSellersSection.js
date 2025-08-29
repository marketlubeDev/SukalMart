"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from '@/app/_components/common/Button';

// Product data - you can move this to a separate data file
const bestSellersData = [
  {
    id: 1,
    name: "Dove Nutritive Soap",
    category: "Hair Care",
    price: 1099,
    originalPrice: 1299,
    image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
    badge: "#1"
  },
  {
    id: 2,
    name: "Lux Body Wash",
    category: "Body & Shower",
    price: 1099,
    originalPrice: 1299,
    image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
    badge: "#2"
  },
  {
    id: 3,
    name: "Rexona / Sure",
    category: "Soap & Deodorants",
    price: 1899,
    originalPrice: 2099,
    image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
    badge: "#3"
  },
  {
    id: 4,
    name: "Vaseline Body Lotion",
    category: "Skin Care",
    price: 1099,
    originalPrice: 1299,
    image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg"
  },
  {
    id: 5,
    name: "Sunsilk Pro Repair",
    category: "Hair Care",
    price: 999,
    originalPrice: 1199,
    image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg"
  },
  {
    id: 6,
    name: "Lux Soft Touch",
    category: "Body & Shower",
    price: 899,
    originalPrice: 1099,
    image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp"
  }
];

// Custom hook for cart management
const useCart = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('cartItems') : null;
      const items = raw ? JSON.parse(raw) : [];
      const index = items.findIndex((item) => String(item.id) === String(product.id));
      
      if (index >= 0) {
        const existing = items[index];
        items[index] = { ...existing, quantity: (existing.quantity || 1) + (product.quantity || 1) };
      } else {
        items.push({ ...product, quantity: product.quantity || 1 });
      }
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('cartItems', JSON.stringify(items));
        window.dispatchEvent(new Event('cart-updated'));
        
        if (window.__openCart) {
          window.__openCart();
        } else {
          window.dispatchEvent(new Event('open-cart'));
        }
      }
      
      setCartItems(items);
    } catch (err) {
      console.error('Failed to add to cart', err);
    }
  };

  return { addToCart };
};

// Product Card Component
const ProductCard = ({ product, onAddToCart, onProductClick }) => {
  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      color: product.category,
      plug: 'Default'
    });
  };

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200 flex flex-col min-w-0 lg:min-h-[400px]"
      onClick={() => onProductClick(product.id)}
    >
      <div className="relative">
        {product.image?.includes('marketlube') ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-36 md:h-40 lg:h-56 xl:h-44 object-cover"
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
            className="w-full h-36 md:h-40 lg:h-56 xl:h-44 object-cover"
            priority={product.id <= 3}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300x180?text=Product+Image";
            }}
          />
        )}
        
        {/* Badge for top 3 products */}
        {product.badge && (
          <div className="absolute top-1 md:top-2 left-[-16px]">
            <div className="relative">
              <Image
                src="/badge.svg"
                alt="Badge"
                width={64}
                height={40}
                className="w-12 h-8 md:w-16 md:h-10"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-[10px] md:text-xs font-bold">
                  {product.badge}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-2 md:p-4 lg:p-6 flex-1 flex flex-col">
        <h3 className="text-xs md:text-sm lg:text-base font-semibold text-gray-900 mb-1 lg:mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-xs md:text-sm lg:text-base text-gray-600 mb-2 md:mb-3 lg:mb-4">
          {product.category}
        </p>
        
        <div className="flex items-center gap-1 md:gap-2 lg:gap-3 mb-2 md:mb-3 lg:mb-4">
          <span
            className="text-sm md:text-lg lg:text-xl font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            ₹{product.price.toLocaleString()}
          </span>
          <span className="text-xs md:text-sm lg:text-base text-gray-500 line-through">
            ₹{product.originalPrice.toLocaleString()}
          </span>
        </div>
        
        <div className="flex justify-start mt-auto">
          <Button 
            variant="cart"
            size="small"
            onClick={handleAddToCart}
            className="text-xs md:text-sm lg:text-base"
            style={{
              display: "flex",
              height: "32px",
              padding: "8px 12px",
              justifyContent: "center",
              alignItems: "center",
              gap: "4px",
              borderRadius: "4px"
            }}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function BestSellersSection() {
  const router = useRouter();
  const scrollerRef = useRef(null);
  const { addToCart } = useCart();

  // Scroll behavior effect (simplified and optimized)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const el = scrollerRef.current;
    if (!el) return;

    let timerId;
    const handleScroll = () => {
      el.classList.add('scrolling');
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => {
        el.classList.remove('scrolling');
      }, 700);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      el.removeEventListener('scroll', handleScroll);
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  const handleProductClick = (productId) => {
    router.push(`/products/${productId}`);
  };

  const handleViewAll = () => {
    router.push("/products");
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-10 2xl:px-10 py-4 md:py-6 xl:pb-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="font-bold text-lg md:text-2xl lg:text-3xl text-gray-800">
            Best Sellers
          </h2>
          
          <button
            className="flex items-center gap-2 font-medium transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded"
            style={{ color: "var(--color-primary)" }}
            onClick={handleViewAll}
            aria-label="View all best sellers"
          >
            <span className="text-sm md:text-base">View all</span>
            <span
              className="inline-flex"
              style={{ cursor: "pointer" }}
              tabIndex={0}
              role="button"
              aria-label="View all best sellers"
              onClick={e => {
                e.stopPropagation();
                handleViewAll();
              }}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleViewAll();
                }
              }}
            >
              <Image
                src="/nextarrow.svg"
                alt="Next arrow"
                width={28}
                height={28}
                className="w-5 h-5 md:w-7 md:h-7"
              />
            </span>
          </button>
        </div>

        {/* Products Grid */}
        <div 
          ref={scrollerRef}
          className="
            grid grid-flow-col auto-cols-[45%] gap-4 overflow-x-auto pb-2
            sm:auto-cols-[40%] sm:gap-5
            md:auto-cols-[32%] md:gap-4 md:pb-4
            lg:auto-cols-[30%] lg:gap-5
            xl:grid-cols-6 xl:overflow-visible xl:pb-0
            scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100
          "
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'var(--color-primary) #f1f1f1'
          }}
        >
          {bestSellersData.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onProductClick={handleProductClick}
            />
          ))}
        </div>
        
        {/* Separator */}
        <div className="border-b border-gray-200 w-full mt-6" />
      </div>
    </section>
  );
}