"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaHeart } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { Modal, Rate, Input, Button } from "antd";
import { useWishlist } from "../../_components/context/WishlistContext";
import ProductServiceBenefits from "./_components/ProductServiceBenefits";
import ProductImageSection from "./_components/ProductImageSection";
import ProductFeaturesText from "./_components/ProductFeaturesText";
import FeaturedProductsSection from "../../_components/_homepage/featuredproduct/FeaturedProductsSection";
import BestSellersSection from "../../_components/_homepage/bestSeller/BestSellersSection";
import RecommendedSection from "./_components/RecommendedSection";
import ReviewsSection from "./_components/ReviewsSection";
import CategoryFeaturesSection from "./_components/CategoryFeaturesSection";
import ProductVideoSection from "./_components/ProductVideoSection";
import ProductFeaturesSection from "./_components/ProductFeaturesSection";
import ProductFeaturesBanner from "./_components/ProductFeaturesBanner";
import ProductImagesSection from "./_components/ProductImagesSection";
import ProductInfoSection from "./_components/ProductInfoSection";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id;

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showMoreCoupons, setShowMoreCoupons] = useState(false);
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  
  const { toggleWishlistItem, isInWishlist } = useWishlist();

  // Static product data - single product details
  const getProductData = () => {
    return {
      id: "1",
      name: "Dove Nutritive Solutions",
      type: "Hair Care",
      price: 1099,
      originalPrice: 1299,
      discount: 18,
      image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
      images: [
        "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
        "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
        "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
        "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg"
      ],
      description: "Experience radiant, hydrated skin with our premium face serum. Formulated with advanced ingredients for deep hydration and natural glow.",
      features: [
        "Deep hydration formula",
        "Natural ingredients",
        "Suitable for all skin types",
        "Non-greasy texture",
        "Fast absorption",
      ],
      specifications: {
        "Volume": "30ml",
        "Skin Type": "All skin types",
        "Texture": "Lightweight serum",
        "Fragrance": "Fragrance-free",
        "Shelf Life": "24 months",
        "Country of Origin": "India",
      },
    };
  };

  const product = getProductData();

  // Volume options
  const defaultVolumes = ["100ml", "200ml", "500ml"];
  const initialVolume = product?.specifications?.Volume || defaultVolumes[0];
  const volumes = Array.from(new Set([initialVolume, ...defaultVolumes]));
  const [selectedVolume, setSelectedVolume] = useState(initialVolume);

  // Dynamic coupons for this product (replace with API data when available)
  const coupons = [
    { code: "FLAT20", description: "Get 20% discount on products above ₹1,999" },
    { code: "SAVE100", description: "Flat ₹100 OFF on orders above ₹999" },
    { code: "GET250", description: "₹250 OFF when you spend ₹2,499 or more" },
  ];
  const visibleCoupons = coupons.slice(0, 2);
  const remainingCouponsCount = Math.max(coupons.length - visibleCoupons.length, 0);
  const remainingCoupons = coupons.slice(2);
  
  // Debug logging
  console.log("Product ID:", productId);
  console.log("Product Data:", product);
  console.log("Coupons:", coupons);

  const addToCart = () => {
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem('cartItems') : null;
      const items = raw ? JSON.parse(raw) : [];
      const idx = items.findIndex((it) => String(it.id) === String(product.id));
      if (idx >= 0) {
        const existing = items[idx];
        items[idx] = { ...existing, quantity: (existing.quantity || 1) + quantity };
      } else {
        items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image || (product.images && product.images[0]) || '/banner1.png',
          color: product.type,
          plug: 'Default',
          quantity,
        });
      }
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('cartItems', JSON.stringify(items));
        window.dispatchEvent(new Event('cart-updated'));
        // Try multiple ways to open the cart sidebar
        try { if (window.__openCart) window.__openCart(); } catch {}
        try { window.dispatchEvent(new Event('open-cart')); } catch {}
        // Fallback: small delay to ensure listeners mount
        setTimeout(() => {
          try { if (window.__openCart) window.__openCart(); } catch {}
          try { window.dispatchEvent(new Event('open-cart')); } catch {}
        }, 50);
      }
    } catch (err) {
      console.error('Failed to add to cart', err);
    }
  };

  const buyNow = () => {
    try {
      const checkoutItems = [
        {
          id: product.id,
          name: product.name,
          color: product.type,
          plug: selectedVolume || 'Default',
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image || (product.images && product.images[0]) || '/banner1.png',
          quantity,
        },
      ];
      localStorage.setItem('checkout_items', JSON.stringify(checkoutItems));
    } catch {}
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Product Images */}
          <ProductImagesSection 
            product={product}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            toggleWishlistItem={toggleWishlistItem}
            isInWishlist={isInWishlist}
          />

          {/* Product Info */}
          <ProductInfoSection
            product={product}
            coupons={coupons}
            visibleCoupons={visibleCoupons}
            remainingCouponsCount={remainingCouponsCount}
            showMoreCoupons={showMoreCoupons}
            setShowMoreCoupons={setShowMoreCoupons}
            remainingCoupons={remainingCoupons}
            volumes={volumes}
            selectedVolume={selectedVolume}
            setSelectedVolume={setSelectedVolume}
            quantity={quantity}
            setQuantity={setQuantity}
            addToCart={addToCart}
            buyNow={buyNow}
            showMoreDetails={showMoreDetails}
            setShowMoreDetails={setShowMoreDetails}
          />
        </div>
        
        {/* Product Features Banner */}
        <ProductFeaturesBanner productType={product.type} />

        <ProductFeaturesSection productType={product.type} />

        <ProductVideoSection />

        <FeaturedProductsSection isProductPage={true} />

        {/* Reviews & Ratings Section */}
        <ReviewsSection product={product} selectedImage={selectedImage} />

        <RecommendedSection />
      </div>
    </div>
  );
}
