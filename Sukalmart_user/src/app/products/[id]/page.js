"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import ProductServiceBenefits from "./_components/ProductServiceBenefits";
import FeaturedProductsSection from "../../_components/_homepage/featuredproduct/FeaturedProductsSection";
import BestSellersSection from "../../_components/_homepage/bestSeller/BestSellersSection";
import RecommendedSection from "./_components/RecommendedSection";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id;

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showMoreCoupons, setShowMoreCoupons] = useState(false);

  // Function to get product data based on ID
  const getProductData = (id) => {
    // Sample product database - you can replace this with actual API call
    const productDatabase = [
      		{
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
      },
      		{
			id: "2",
			name: "Lux Body Wash",
			type: "Body & Shower",
			price: 1099,
			originalPrice: 1299,
        discount: 22,
        image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
        images: [
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp"
        ],
        description: "Complete beauty collection featuring premium skincare and makeup essentials. Everything you need for a flawless beauty routine.",
        features: [
          "Complete beauty set",
          "Premium quality products",
          "Travel-friendly packaging",
          "Long-lasting formulas",
          "Suitable for all skin types",
        ],
        specifications: {
          "Set Contents": "5 products",
          "Packaging": "Luxury gift box",
          "Skin Type": "All skin types",
          "Fragrance": "Light floral",
          "Shelf Life": "36 months",
          "Country of Origin": "India",
        },
      },
      		{
			id: "3",
			name: "Rexona / Sure Deo",
			type: "Soap & Deodorants",
			price: 1899,
			originalPrice: 2099,
        discount: 19,
        image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
        images: [
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp"
        ],
        description: "Advanced anti-aging night cream that works while you sleep. Reduces fine lines, wrinkles, and promotes skin regeneration.",
        features: [
          "Advanced anti-aging formula",
          "Night-time repair",
          "Reduces fine lines",
          "Skin regeneration",
          "Rich moisturizing texture",
        ],
        specifications: {
          "Volume": "50ml",
          "Skin Type": "Mature skin",
          "Texture": "Rich cream",
          "Fragrance": "Light herbal",
          "Shelf Life": "24 months",
          "Country of Origin": "India",
        },
      },
      		{
			id: "4",
			name: "Vaseline Body Lotion",
			type: "Skin Care",
			price: 1099,
			originalPrice: 1299,
        discount: 20,
        image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
        images: [
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg"
        ],
        description: "Powerful Vitamin C serum for brightening and evening skin tone. Reduces dark spots and promotes collagen production.",
        features: [
          "High concentration Vitamin C",
          "Brightening formula",
          "Even skin tone",
          "Reduces dark spots",
          "Collagen boosting",
        ],
        specifications: {
          "Volume": "30ml",
          "Skin Type": "All skin types",
          "Texture": "Lightweight serum",
          "Fragrance": "Citrus fresh",
          "Shelf Life": "18 months",
          "Country of Origin": "India",
        },
      },
      {
        id: "5",
        name: "Hyaluronic Acid Moisturizer",
        type: "Skincare",
        price: 699,
        originalPrice: 899,
        discount: 22,
        image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
        images: [
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp"
        ],
        description: "Intensive hydration with Hyaluronic Acid. Provides long-lasting moisture and plumps the skin for a youthful appearance.",
        features: [
          "Hyaluronic Acid formula",
          "Intensive hydration",
          "Plumps skin",
          "Non-comedogenic",
          "Suitable for sensitive skin",
        ],
        specifications: {
          "Volume": "50ml",
          "Skin Type": "All skin types",
          "Texture": "Lightweight gel",
          "Fragrance": "Fragrance-free",
          "Shelf Life": "24 months",
          "Country of Origin": "India",
        },
      },
      {
        id: "6",
        name: "Retinol Eye Cream",
        type: "Anti-Aging",
        price: 999,
        originalPrice: 1299,
        discount: 23,
        image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
        images: [
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg"
        ],
        description: "Targeted eye cream with Retinol to reduce fine lines, dark circles, and puffiness around the delicate eye area.",
        features: [
          "Retinol formula",
          "Targets fine lines",
          "Reduces dark circles",
          "Anti-puffiness",
          "Gentle on sensitive skin",
        ],
        specifications: {
          "Volume": "15ml",
          "Skin Type": "All skin types",
          "Texture": "Light cream",
          "Fragrance": "Fragrance-free",
          "Shelf Life": "24 months",
          "Country of Origin": "India",
        },
      },
      {
        id: "7",
        name: "Gentle Facial Cleanser",
        type: "Skincare",
        price: 599,
        originalPrice: 799,
        discount: 25,
        image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
        images: [
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp"
        ],
        description: "Gentle yet effective facial cleanser that removes impurities without stripping natural oils. Suitable for daily use.",
        features: [
          "Gentle formula",
          "Removes impurities",
          "Maintains natural oils",
          "Suitable for daily use",
          "Non-irritating",
        ],
        specifications: {
          "Volume": "100ml",
          "Skin Type": "All skin types",
          "Texture": "Gel cleanser",
          "Fragrance": "Fresh clean",
          "Shelf Life": "36 months",
          "Country of Origin": "India",
        },
      },
      {
        id: "8",
        name: "SPF 50 Sunscreen",
        type: "Skincare",
        price: 899,
        originalPrice: 1199,
        discount: 25,
        image: "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
        images: [
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg"
        ],
        description: "Broad-spectrum SPF 50 sunscreen that provides superior protection against UVA and UVB rays. Lightweight and non-greasy.",
        features: [
          "SPF 50 protection",
          "Broad-spectrum coverage",
          "Lightweight formula",
          "Non-greasy texture",
          "Water-resistant",
        ],
        specifications: {
          "Volume": "50ml",
          "Skin Type": "All skin types",
          "Texture": "Light lotion",
          "Fragrance": "Fragrance-free",
          "Shelf Life": "24 months",
          "Country of Origin": "India",
        },
      },
      // Sunsilk Shampoo Products
      {
        id: "9",
        name: "Sunsilk Naturals Shampoo",
        type: "Hair Care",
        price: 299,
        originalPrice: 399,
        discount: 25,
        image: "/sunsilk1.jpg",
        images: [
          "/sunsilk1.jpg",
          "/sunsilk1.jpg",
          "/sunsilk1.jpg",
          "/sunsilk1.jpg"
        ],
        description: "Sunsilk Naturals Shampoo with THICK & LONG formula for naturally beautiful hair. Enriched with natural ingredients for healthy hair growth.",
        features: [
          "THICK & LONG formula",
          "Natural ingredients",
          "Suitable for all hair types",
          "Promotes hair growth",
          "Gentle cleansing",
        ],
        specifications: {
          "Volume": "180ml",
          "Hair Type": "All hair types",
          "Texture": "Rich lather",
          "Fragrance": "Fresh natural",
          "Shelf Life": "36 months",
          "Country of Origin": "India",
        },
      },
      {
        id: "10",
        name: "Sunsilk Perfect Straight Shampoo",
        type: "Hair Care",
        price: 349,
        originalPrice: 449,
        discount: 22,
        image: "/sunsilk2.jpg",
        images: [
          "/sunsilk2.jpg",
          "/sunsilk2.jpg",
          "/sunsilk2.jpg",
          "/sunsilk2.jpg"
        ],
        description: "Sunsilk Oil Blends with ONION & JOJOBA OIL for hairfall resistance. Perfect for straight hair with advanced hair care technology.",
        features: [
          "ONION & JOJOBA OIL blend",
          "Hairfall resistance",
          "Perfect for straight hair",
          "Advanced hair care technology",
          "Long-lasting results",
        ],
        specifications: {
          "Volume": "180ml",
          "Hair Type": "Straight hair",
          "Texture": "Smooth lather",
          "Fragrance": "Fresh herbal",
          "Shelf Life": "36 months",
          "Country of Origin": "India",
        },
      },
      {
        id: "11",
        name: "Sunsilk Black Shine Shampoo",
        type: "Hair Care",
        price: 279,
        originalPrice: 379,
        discount: 26,
        image: "/sunsilk3.jpg",
        images: [
          "/sunsilk3.jpg",
          "/sunsilk3.jpg",
          "/sunsilk3.jpg",
          "/sunsilk3.jpg"
        ],
        description: "Sunsilk Black Shine Shampoo for naturally black and shiny hair. Specially formulated to enhance hair color and add natural shine.",
        features: [
          "Black shine formula",
          "Color enhancement",
          "Natural shine",
          "Deep conditioning",
          "Color protection",
        ],
        specifications: {
          "Volume": "180ml",
          "Hair Type": "Black hair",
          "Texture": "Rich creamy",
          "Fragrance": "Fresh floral",
          "Shelf Life": "36 months",
          "Country of Origin": "India",
        },
      },
      {
        id: "12",
        name: "Sunsilk Soft & Smooth Shampoo",
        type: "Hair Care",
        price: 259,
        originalPrice: 359,
        discount: 28,
        image: "/sunsilk4.jpg",
        images: [
          "/sunsilk4.jpg",
          "/sunsilk4.jpg",
          "/sunsilk4.jpg",
          "/sunsilk4.jpg"
        ],
        description: "SUNSILK CO-CREATIONS damage repair shampoo for soft and smooth hair. Advanced damage repair technology for healthy, manageable hair.",
        features: [
          "Damage repair technology",
          "Soft & smooth results",
          "Advanced conditioning",
          "Manageable hair",
          "Long-lasting softness",
        ],
        specifications: {
          "Volume": "180ml",
          "Hair Type": "Damaged hair",
          "Texture": "Smooth gel",
          "Fragrance": "Fresh citrus",
          "Shelf Life": "36 months",
          "Country of Origin": "India",
        },
      },
      // New Launches Products
      {
        id: "13",
        name: "THE ANSWER Super Shampoo",
        type: "Hair Care",
        price: 1299,
        originalPrice: 1599,
        discount: 19,
        image: "/newlaunch1.jpg",
        images: [
          "/newlaunch1.jpg",
          "/newlaunch1.jpg",
          "/newlaunch1.jpg",
          "/newlaunch1.jpg"
        ],
        description: "THE ANSWER Super Lamellar Shampoo with Hydrolyzed Keratin & Ceramide Formula. Advanced hair care technology for professional results.",
        features: [
          "Hydrolyzed Keratin formula",
          "Ceramide technology",
          "Professional hair care",
          "Deep nourishment",
          "Long-lasting results",
        ],
        specifications: {
          "Volume": "250ml",
          "Hair Type": "All hair types",
          "Texture": "Rich lather",
          "Fragrance": "Fresh clean",
          "Shelf Life": "36 months",
          "Country of Origin": "India",
        },
      },
      {
        id: "14",
        name: "NEWEST Onion Protein Shampoo",
        type: "Hair Care",
        price: 899,
        originalPrice: 1199,
        discount: 25,
        image: "/newlaunch2.jpg",
        images: [
          "/newlaunch2.jpg",
          "/newlaunch2.jpg",
          "/newlaunch2.jpg",
          "/newlaunch2.jpg"
        ],
        description: "NEWEST Onion Protein Shampoo with Almond & Onion Ultra Nourishing formula. Promotes hair growth and strengthens hair naturally.",
        features: [
          "Onion protein formula",
          "Almond nourishment",
          "Hair growth promotion",
          "Natural ingredients",
          "Ultra nourishing",
        ],
        specifications: {
          "Volume": "200ml",
          "Hair Type": "All hair types",
          "Texture": "Smooth gel",
          "Fragrance": "Fresh herbal",
          "Shelf Life": "36 months",
          "Country of Origin": "India",
        },
      },
      {
        id: "15",
        name: "FLAKES Anti-Dandruff Shampoo",
        type: "Hair Care",
        price: 699,
        originalPrice: 899,
        discount: 22,
        image: "/newlaunch3.jpg",
        images: [
          "/newlaunch3.jpg",
          "/newlaunch3.jpg",
          "/newlaunch3.jpg",
          "/newlaunch3.jpg"
        ],
        description: "FLAKES Professional Anti-Dandruff Shampoo. Advanced formula to eliminate dandruff and soothe scalp irritation.",
        features: [
          "Anti-dandruff formula",
          "Professional grade",
          "Soothes scalp",
          "Eliminates flakes",
          "Gentle cleansing",
        ],
        specifications: {
          "Volume": "180ml",
          "Hair Type": "All hair types",
          "Texture": "Medicated shampoo",
          "Fragrance": "Medicated fresh",
          "Shelf Life": "24 months",
          "Country of Origin": "India",
        },
      },
      {
        id: "16",
        name: "REDKEN Anti-Dandruff Shampoo",
        type: "Hair Care",
        price: 1499,
        originalPrice: 1899,
        discount: 21,
        image: "/newlaunch4.jpeg",
        images: [
          "/newlaunch4.jpeg",
          "/newlaunch4.jpeg",
          "/newlaunch4.jpeg",
          "/newlaunch4.jpeg"
        ],
        description: "REDKEN Professional Anti-Dandruff Shampoo. Advanced hair care technology for professional anti-dandruff treatment.",
        features: [
          "Professional formula",
          "Anti-dandruff technology",
          "Advanced hair care",
          "Long-lasting relief",
          "Professional results",
        ],
        specifications: {
          "Volume": "250ml",
          "Hair Type": "All hair types",
          "Texture": "Rich lather",
          "Fragrance": "Professional fresh",
          "Shelf Life": "36 months",
          "Country of Origin": "India",
        },
      },
      // EngineeredBy7Hz Products
      {
        id: "17",
        name: "Glow & Hydrate Face Serum",
        type: "Skincare",
        price: 899,
        originalPrice: 1099,
        discount: 18,
        image:
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
        images: [
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp"
        ],
        description: "Advanced hydrating serum with hyaluronic acid and vitamin C for radiant, glowing skin. Suitable for all skin types.",
        features: [
          "Advanced hydration formula",
          "Hyaluronic acid technology",
          "Vitamin C brightening",
          "Suitable for all skin types",
          "Radiant results",
        ],
        specifications: {
          "Volume": "30ml",
          "Skin Type": "All skin types",
          "Texture": "Lightweight serum",
          "Fragrance": "Fragrance-free",
          "Shelf Life": "24 months",
          "Country of Origin": "India",
        },
      },
      {
        id: "18",
        name: "Luxury Beauty Collection Set",
        type: "Beauty Essentials",
        price: 2499,
        originalPrice: 3199,
        discount: 22,
        image:
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
        images: [
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg"
        ],
        description: "Complete beauty routine set including cleanser, toner, moisturizer, and makeup essentials for flawless skin.",
        features: [
          "Complete beauty set",
          "Premium quality products",
          "Travel-friendly packaging",
          "Long-lasting formulas",
          "Suitable for all skin types",
        ],
        specifications: {
          "Set Contents": "5 products",
          "Packaging": "Luxury gift box",
          "Skin Type": "All skin types",
          "Fragrance": "Light floral",
          "Shelf Life": "36 months",
          "Country of Origin": "India",
        },
      },
      {
        id: "19",
        name: "Anti-Aging Night Cream",
        type: "Anti-Aging",
        price: 1299,
        originalPrice: 1599,
        discount: 19,
        image:
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
        images: [
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
          "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp"
        ],
        description: "Advanced anti-aging night cream that works while you sleep. Reduces fine lines, wrinkles, and promotes skin regeneration.",
        features: [
          "Advanced anti-aging formula",
          "Night-time repair",
          "Reduces fine lines",
          "Skin regeneration",
          "Deep hydration",
        ],
        specifications: {
          "Volume": "50ml",
          "Skin Type": "All skin types",
          "Texture": "Rich cream",
          "Fragrance": "Light floral",
          "Shelf Life": "24 months",
          "Country of Origin": "India",
        },
      },
    ];

    // Find product by ID
    let foundProduct = productDatabase.find(p => p.id === id);
    
    // If not found in main database, check category-specific products
    if (!foundProduct) {
      const categoryProducts = {
        // Hair Care products
        "hc1": {
          id: "hc1",
          name: "Professional Hair Shampoo",
          type: "Hair Care",
          price: 899,
          originalPrice: 1099,
          discount: 18,
          image: "/haircare3.jpg",
          images: ["/haircare3.jpg", "/haircare3.jpg", "/haircare3.jpg", "/haircare3.jpg"],
          description: "Professional-grade hair shampoo for all hair types. Deeply cleanses and nourishes hair for healthy, manageable locks.",
          features: [
            "Professional formula",
            "Suitable for all hair types",
            "Deep cleansing",
            "Nourishing ingredients",
            "Long-lasting freshness",
          ],
          specifications: {
            "Volume": "250ml",
            "Hair Type": "All hair types",
            "Texture": "Rich lather",
            "Fragrance": "Fresh herbal",
            "Shelf Life": "36 months",
            "Country of Origin": "India",
          },
        },
        "hc2": {
          id: "hc2",
          name: "Nourishing Hair Conditioner",
          type: "Hair Care",
          price: 799,
          originalPrice: 999,
          discount: 20,
          image: "/haircare2.jpg",
          images: ["/haircare2.jpg", "/haircare2.jpg", "/haircare2.jpg", "/haircare2.jpg"],
          description: "Intensive nourishing conditioner that detangles and moisturizes hair, leaving it soft, smooth, and manageable.",
          features: [
            "Intensive nourishment",
            "Detangles hair",
            "Moisturizing formula",
            "Smooth texture",
            "Easy to rinse",
          ],
          specifications: {
            "Volume": "200ml",
            "Hair Type": "All hair types",
            "Texture": "Creamy conditioner",
            "Fragrance": "Floral fresh",
            "Shelf Life": "36 months",
            "Country of Origin": "India",
          },
        },
        "hc3": {
          id: "hc3",
          name: "Anti-Dandruff Treatment",
          type: "Hair Care",
          price: 699,
          originalPrice: 899,
          discount: 22,
          image: "/haircare3.jpg",
          images: ["/haircare3.jpg", "/haircare3.jpg", "/haircare3.jpg", "/haircare3.jpg"],
          description: "Effective anti-dandruff treatment that eliminates flakes and soothes scalp irritation for healthy hair.",
          features: [
            "Anti-dandruff formula",
            "Soothes scalp",
            "Eliminates flakes",
            "Gentle on hair",
            "Long-lasting relief",
          ],
          specifications: {
            "Volume": "150ml",
            "Hair Type": "All hair types",
            "Texture": "Medicated shampoo",
            "Fragrance": "Medicated fresh",
            "Shelf Life": "24 months",
            "Country of Origin": "India",
          },
        },
        "hc4": {
          id: "hc4",
          name: "Hair Growth Serum",
          type: "Hair Care",
          price: 1299,
          originalPrice: 1599,
          discount: 19,
          image: "/haircare2.jpg",
          images: ["/haircare2.jpg", "/haircare2.jpg", "/haircare2.jpg", "/haircare2.jpg"],
          description: "Advanced hair growth serum with natural ingredients that promote hair growth and strengthen hair follicles.",
          features: [
            "Promotes hair growth",
            "Strengthens follicles",
            "Natural ingredients",
            "Non-greasy formula",
            "Easy application",
          ],
          specifications: {
            "Volume": "50ml",
            "Hair Type": "All hair types",
            "Texture": "Light serum",
            "Fragrance": "Natural herbal",
            "Shelf Life": "24 months",
            "Country of Origin": "India",
          },
        },
        // Soap & Deodorants products
        "sd1": {
          id: "sd1",
          name: "Natural Handmade Soap",
          type: "Soap & Deodorants",
          price: 299,
          originalPrice: 399,
          discount: 25,
          image: "/soap1.jpeg",
          images: ["/soap1.jpeg", "/soap1.jpeg", "/soap1.jpeg", "/soap1.jpeg"],
          description: "Handcrafted natural soap made with pure ingredients for gentle cleansing and moisturizing skin.",
          features: [
            "Handcrafted natural soap",
            "Pure ingredients",
            "Gentle cleansing",
            "Moisturizing formula",
            "Eco-friendly",
          ],
          specifications: {
            "Weight": "100g",
            "Skin Type": "All skin types",
            "Texture": "Solid bar",
            "Fragrance": "Natural essential oils",
            "Shelf Life": "24 months",
            "Country of Origin": "India",
          },
        },
        "sd2": {
          id: "sd2",
          name: "Antibacterial Body Wash",
          type: "Soap & Deodorants",
          price: 449,
          originalPrice: 599,
          discount: 25,
          image: "/soap2.jpg",
          images: ["/soap2.jpg", "/soap2.jpg", "/soap2.jpg", "/soap2.jpg"],
          description: "Antibacterial body wash that provides thorough cleansing while protecting against germs and bacteria.",
          features: [
            "Antibacterial protection",
            "Thorough cleansing",
            "Germ protection",
            "Refreshing formula",
            "Long-lasting freshness",
          ],
          specifications: {
            "Volume": "300ml",
            "Skin Type": "All skin types",
            "Texture": "Gel wash",
            "Fragrance": "Fresh clean",
            "Shelf Life": "36 months",
            "Country of Origin": "India",
          },
        },
        "sd3": {
          id: "sd3",
          name: "Long-lasting Deodorant",
          type: "Soap & Deodorants",
          price: 199,
          originalPrice: 299,
          discount: 33,
          image: "/soap3.jpg",
          images: ["/soap3.jpg", "/soap3.jpg", "/soap3.jpg", "/soap3.jpg"],
          description: "Long-lasting deodorant that provides 48-hour protection against odor and wetness.",
          features: [
            "48-hour protection",
            "Odor control",
            "Wetness protection",
            "Gentle on skin",
            "Non-staining",
          ],
          specifications: {
            "Volume": "150ml",
            "Skin Type": "All skin types",
            "Texture": "Roll-on",
            "Fragrance": "Fresh sport",
            "Shelf Life": "36 months",
            "Country of Origin": "India",
          },
        },
        "sd4": {
          id: "sd4",
          name: "Moisturizing Bath Soap",
          type: "Soap & Deodorants",
          price: 349,
          originalPrice: 449,
          discount: 22,
          image: "/soap1.jpeg",
          images: ["/soap1.jpeg", "/soap1.jpeg", "/soap1.jpeg", "/soap1.jpeg"],
          description: "Moisturizing bath soap enriched with natural oils for soft, hydrated skin after every wash.",
          features: [
            "Moisturizing formula",
            "Natural oils",
            "Soft skin",
            "Hydrated feel",
            "Gentle cleansing",
          ],
          specifications: {
            "Weight": "125g",
            "Skin Type": "All skin types",
            "Texture": "Solid bar",
            "Fragrance": "Floral fresh",
            "Shelf Life": "24 months",
            "Country of Origin": "India",
          },
        },
        // Skin Care products
        "sc1": {
          id: "sc1",
          name: "Hydrating Face Moisturizer",
          type: "Skin Care",
          price: 899,
          originalPrice: 1099,
          discount: 18,
          image: "/skin1.jpg",
          images: ["/skin1.jpg", "/skin1.jpg", "/skin1.jpg", "/skin1.jpg"],
          description: "Intensive hydrating face moisturizer that provides long-lasting moisture for soft, supple skin.",
          features: [
            "Intensive hydration",
            "Long-lasting moisture",
            "Soft skin",
            "Non-greasy formula",
            "Suitable for daily use",
          ],
          specifications: {
            "Volume": "50ml",
            "Skin Type": "All skin types",
            "Texture": "Light cream",
            "Fragrance": "Fragrance-free",
            "Shelf Life": "24 months",
            "Country of Origin": "India",
          },
        },
        "sc2": {
          id: "sc2",
          name: "Vitamin C Brightening Serum",
          type: "Skin Care",
          price: 1299,
          originalPrice: 1599,
          discount: 19,
          image: "/skin2.jpg",
          images: ["/skin2.jpg", "/skin2.jpg", "/skin2.jpg", "/skin2.jpg"],
          description: "Powerful Vitamin C serum that brightens skin tone and reduces dark spots for radiant complexion.",
          features: [
            "Vitamin C formula",
            "Brightens skin",
            "Reduces dark spots",
            "Radiant complexion",
            "Antioxidant protection",
          ],
          specifications: {
            "Volume": "30ml",
            "Skin Type": "All skin types",
            "Texture": "Light serum",
            "Fragrance": "Citrus fresh",
            "Shelf Life": "18 months",
            "Country of Origin": "India",
          },
        },
        "sc3": {
          id: "sc3",
          name: "Gentle Facial Cleanser",
          type: "Skin Care",
          price: 599,
          originalPrice: 799,
          discount: 25,
          image: "/skin3.jpg",
          images: ["/skin3.jpg", "/skin3.jpg", "/skin3.jpg", "/skin3.jpg"],
          description: "Gentle facial cleanser that removes impurities without stripping natural oils from your skin.",
          features: [
            "Gentle formula",
            "Removes impurities",
            "Maintains natural oils",
            "Non-irritating",
            "Suitable for sensitive skin",
          ],
          specifications: {
            "Volume": "150ml",
            "Skin Type": "All skin types",
            "Texture": "Gel cleanser",
            "Fragrance": "Fresh clean",
            "Shelf Life": "36 months",
            "Country of Origin": "India",
          },
        },
        "sc4": {
          id: "sc4",
          name: "Anti-Aging Night Cream",
          type: "Skin Care",
          price: 1499,
          originalPrice: 1899,
          discount: 21,
          image: "/skin5.jpg",
          images: ["/skin5.jpg", "/skin5.jpg", "/skin5.jpg", "/skin5.jpg"],
          description: "Advanced anti-aging night cream that works while you sleep to reduce fine lines and wrinkles.",
          features: [
            "Anti-aging formula",
            "Night-time repair",
            "Reduces fine lines",
            "Wrinkle reduction",
            "Skin regeneration",
          ],
          specifications: {
            "Volume": "50ml",
            "Skin Type": "Mature skin",
            "Texture": "Rich cream",
            "Fragrance": "Light herbal",
            "Shelf Life": "24 months",
            "Country of Origin": "India",
          },
        },
        // Oral Care products
        "oc1": {
          id: "oc1",
          name: "Whitening Toothpaste",
          type: "Oral Care",
          price: 199,
          originalPrice: 299,
          discount: 33,
          image: "/tooth1.jpg",
          images: ["/tooth1.jpg", "/tooth1.jpg", "/tooth1.jpg", "/tooth1.jpg"],
          description: "Advanced whitening toothpaste that removes stains and brightens your smile for confident oral hygiene.",
          features: [
            "Whitening formula",
            "Stain removal",
            "Brightens smile",
            "Fresh breath",
            "Gentle on enamel",
          ],
          specifications: {
            "Volume": "100g",
            "Usage": "Daily brushing",
            "Texture": "Paste",
            "Fragrance": "Fresh mint",
            "Shelf Life": "36 months",
            "Country of Origin": "India",
          },
        },
        "oc2": {
          id: "oc2",
          name: "Electric Toothbrush",
          type: "Oral Care",
          price: 899,
          originalPrice: 1199,
          discount: 25,
          image: "/tooth2.jpg",
          images: ["/tooth2.jpg", "/tooth2.jpg", "/tooth2.jpg", "/tooth2.jpg"],
          description: "Advanced electric toothbrush with multiple cleaning modes for thorough oral hygiene and gum care.",
          features: [
            "Multiple cleaning modes",
            "Thorough cleaning",
            "Gum care",
            "Rechargeable battery",
            "Smart timer",
          ],
          specifications: {
            "Battery": "Rechargeable",
            "Modes": "3 cleaning modes",
            "Timer": "2-minute smart timer",
            "Charging": "USB charging",
            "Shelf Life": "60 months",
            "Country of Origin": "India",
          },
        },
        "oc3": {
          id: "oc3",
          name: "Mouthwash Fresh Mint",
          type: "Oral Care",
          price: 299,
          originalPrice: 399,
          discount: 25,
          image: "/tooth3.jpg",
          images: ["/tooth3.jpg", "/tooth3.jpg", "/tooth3.jpg", "/tooth3.jpg"],
          description: "Refreshing mouthwash with fresh mint flavor that kills bacteria and provides long-lasting fresh breath.",
          features: [
            "Fresh mint flavor",
            "Kills bacteria",
            "Long-lasting freshness",
            "Alcohol-free",
            "Gentle formula",
          ],
          specifications: {
            "Volume": "500ml",
            "Usage": "Daily rinse",
            "Texture": "Liquid",
            "Fragrance": "Fresh mint",
            "Shelf Life": "36 months",
            "Country of Origin": "India",
          },
        },
        "oc4": {
          id: "oc4",
          name: "Dental Floss Set",
          type: "Oral Care",
          price: 149,
          originalPrice: 249,
          discount: 40,
          image: "/tooth4.jpg",
          images: ["/tooth4.jpg", "/tooth4.jpg", "/tooth4.jpg", "/tooth4.jpg"],
          description: "Complete dental floss set with waxed floss and floss picks for thorough interdental cleaning.",
          features: [
            "Waxed floss",
            "Floss picks included",
            "Thorough cleaning",
            "Easy to use",
            "Portable design",
          ],
          specifications: {
            "Contents": "50 floss picks + 30m floss",
            "Type": "Waxed",
            "Texture": "Smooth",
            "Fragrance": "Mint fresh",
            "Shelf Life": "60 months",
            "Country of Origin": "India",
          },
        },
      };
      
      foundProduct = categoryProducts[id];
    }
    
    // Return found product or default product
    return foundProduct || {
      id: productId,
      name: "Product Not Found",
      type: "Unknown",
      price: 0,
      originalPrice: 0,
      discount: 0,
      image: "/banner1.png",
      images: ["/banner1.png", "/banner2.png", "/banner3.jpg"],
      description: "This product could not be found.",
      features: [],
      specifications: {},
    };
  };

  const product = getProductData(productId);

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
        if (window.__openCart) {
          window.__openCart();
        } else {
          window.dispatchEvent(new Event('open-cart'));
        }
      }
    } catch (err) {
      console.error('Failed to add to cart', err);
    }
  };

  const buyNow = () => {
    // Buy now functionality
    console.log(`Buying ${quantity} of ${product.name} now`);
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <style jsx>{`
        .sticky-left {
          position: sticky;
          top: 6rem;
          align-self: flex-start;
          height: fit-content;
        }
        @media (max-width: 768px) {
          .sticky-left {
            position: static;
          }
        }
      `}</style>
      <div className="container mx-auto px-4 py-8">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Product Images */}
                     <div className="flex flex-col md:flex-row lg:sticky lg:top-0 lg:self-start gap-4">
            {/* Thumbnail Images - Left Side */}
            <div className="hidden md:flex flex-col gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index
                      ? "border-[#035F0F]"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image - Right Side */}
            <div className="flex-1">
              <div className="aspect-square rounded-lg overflow-hidden relative">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
                {/* Like Button */}
                <button className="absolute top-4 right-4 w-10 h-10 bg-opacity-30 rounded-full flex items-center justify-center hover:bg-opacity-50 transition-all cursor-pointer">
                  <img
                    src="/blacklike.svg"
                    alt="Add to wishlist"
                    className="w-5 h-5"
                  />
                </button>
              </div>
              {/* Mobile Thumbnails Row */}
              <div className="md:hidden mt-3">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? "border-[#035F0F]" : "border-gray-200"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-gray-600 mb-1">{product.type}</p>
              <h1
                className="mb-2"
                style={{
                  color: "#333333",
                  //  fontFamily: '"Nunito Sans", sans-serif',
                  fontSize: "40px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "normal",
                  letterSpacing: "-0.8px",
                  textTransform: "capitalize",
                }}
              >
                {product.name}
              </h1>

              {/* Rating Section */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <img
                      key={star}
                      src={star <= 4 ? "/filledstar.svg" : "/star.svg"}
                      alt="star"
                      className="w-4 h-4"
                    />
                  ))}
                </div>
                <span className="text-sm">
                  <span className="text-black">4.5</span>
                  <span className="text-gray-600"> (220 reviews)</span>
                </span>
              </div>

              {/* Price */}
              <div className="mb-4 border-b border-gray-200 pb-4">
                <div className="flex items-center gap-3">
                  <span
                    className="text-3xl font-bold text-green-600"
                    style={{
                      overflow: "hidden",
                      color: "#333333",
                      textOverflow: "ellipsis",
                      // fontFamily: '"Nunito Sans", sans-serif',
                      fontSize: "24px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "100%",
                      letterSpacing: "-0.48px",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                    }}
                  >
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span
                    className="px-2 py-1 rounded text-sm font-medium"
                    style={{ color: "#035F0F" }}
                  >
                    {product.discount}-% OFF
                  </span>
                </div>
                <span
                  className="text-xs text-gray-400 block mt-1 text-left"
                  style={{ lineHeight: "1.2" }}
                >
                  (inclusive of all tax)
                </span>
              </div>

              {/* Coupon Section */}
              {coupons.length > 0 && (
              <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3 min-w-0">
                    {visibleCoupons.map((c, idx) => (
                <div
                        key={idx}
                  className="px-2 py-3 rounded flex items-center gap-2"
                  style={{
                    borderRadius: "4px",
                    border: "1px dashed rgba(3, 95, 15, 0.64)",
                    background: "rgba(3, 95, 15, 0.02)",
                    minWidth: "0",
                  }}
                >
                  <div className="flex items-center justify-center">
                    <img src="/coupon.svg" alt="coupon" className="w-5 h-5" />
                  </div>
                        <div className="truncate">
                          <h4 className="font-semibold text-333333 text-sm truncate">{c.code}</h4>
                          <p className="text-xs truncate" style={{ color: "rgba(51, 51, 51, 0.80)" }}>
                            {c.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {remainingCouponsCount > 0 && !showMoreCoupons && (
                                         <button
                      className="text-sm font-medium hover:underline ml-4 whitespace-nowrap cursor-pointer"
                      style={{ color: "#035F0F" }}
                      onClick={() => setShowMoreCoupons(true)}
                    >
                      +{remainingCouponsCount} more
                    </button>
                  )}
                                </div>
              )}
              {showMoreCoupons && remainingCoupons.length > 0 && (
                  <>
                    <div className="flex items-center gap-3 mt-3">
                      {remainingCoupons.map((c, idx) => (
                        <div
                          key={`rest-${idx}`}
                          className="px-2 py-3 rounded flex items-center gap-2"
                          style={{
                            borderRadius: "4px",
                            border: "1px dashed rgba(3, 95, 15, 0.64)",
                            background: "rgba(3, 95, 15, 0.02)",
                            minWidth: "0",
                          }}
                        >
                          <div className="flex items-center justify-center">
                            <img src="/coupon.svg" alt="coupon" className="w-5 h-5" />
                          </div>
                          <div className="truncate">
                            <h4 className="font-semibold text-333333 text-sm truncate">{c.code}</h4>
                            <p className="text-xs truncate" style={{ color: "rgba(51, 51, 51, 0.80)" }}>
                              {c.description}
                    </p>
                  </div>
                </div>
                      ))}
                    </div>
                    <div className="mt-2">
                <button
                        className="text-sm font-medium hover:underline cursor-pointer"
                  style={{ color: "#035F0F" }}
                        onClick={() => setShowMoreCoupons(false)}
                >
                        Show less
                </button>
              </div>
                  </>
                )}

              {/* Volume Selection */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-gray-700 font-medium">Volume:</span>
                  <span className="text-gray-900 font-semibold">{selectedVolume}</span>
                </div>
                <div className="flex items-center gap-3">
                                     {volumes.map((vol) => (
                  <button
                      key={vol}
                      onClick={() => setSelectedVolume(vol)}
                      className={`px-4 py-2 rounded-md text-sm font-medium border cursor-pointer ${selectedVolume === vol ? "border-2" : "border"}`}
                      style={{ borderColor: selectedVolume === vol ? "#02490C" : "#D1D5DB", color: "#333" }}
                  >
                      {vol}
                  </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4 w-full md:max-w-[260px]">
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700">
                  Qty :
                </label>
                <div className="flex items-center bg-[#F4F8F5] border border-[#B6D7C9] rounded-md px-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-1.5 py-1 text-gray-600 hover:bg-gray-100 rounded cursor-pointer"
                  >
                    -
                  </button>
                  <span
                    className="px-2 py-1 text-black font-semibold text-base"
                    style={{ minWidth: "2ch", textAlign: "center" }}
                  >
                    {quantity.toString().padStart(2, "0")}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-1.5 py-1 text-gray-600 hover:bg-gray-100 rounded cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4 w-full md:w-[460px]">
                <button
                  onClick={buyNow}
                   className="flex items-center justify-center gap-2 flex-1 md:w-[220px] cursor-pointer"
                  style={{
                    padding: "16px 24px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    borderRadius: "4px",
                    background: "#035F0F",
                    color: "#fff",
                    fontWeight: 500,
                    fontSize: "15px",
                    border: "none",
                    transition: "background 0.2s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background = "#02420A")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background = "#035F0F")
                  }
                >
                  Buy now
                </button>
                <button
                  onClick={addToCart}
                  className="flex items-center justify-center gap-2 flex-1 md:w-[220px] cursor-pointer"
                  style={{
                    padding: "16px 24px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    borderRadius: "4px",
                    border: "1px solid #035F0F",
                    fontSize: "15px",
                    background: "#fff",
                    color: "#035F0F",
                    fontWeight: 500,
                    transition: "background 0.2s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background = "#F4F8F5")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background = "#fff")
                  }
                >
                  Add to cart
                </button>
              </div>
              <div className="mt-2">
                <span
                  className="text-[#FF5722] font-medium"
                  style={{ fontSize: "16px" }}
                >
                  Only <span className="font-semibold">5 stocks left</span>,
                </span>
                <span
                  className="text-black font-medium"
                  style={{ fontSize: "16px" }}
                >
                  {" "}
                  Hurry up!
                </span>
              </div>
            </div>

            <ProductServiceBenefits />

            {/* About product */}
            <div className="rounded-lg py-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                About product
              </h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                {product.type === "Hair Care" && (
                  <>
                    Our premium hair care products are formulated with advanced ingredients to address specific hair concerns. Whether you're dealing with dryness, dandruff, or hair loss, our scientifically-backed formulas work to restore hair health and vitality. Each product is carefully crafted to provide deep nourishment, strengthen hair follicles, and promote natural growth while maintaining the perfect balance for your hair type.
                  </>
                )}
                {product.type === "Soap & Deodorants" && (
                  <>
                    Experience the perfect blend of natural ingredients and modern science in our soap and deodorant collection. Our products are designed to provide thorough cleansing while being gentle on your skin. From antibacterial protection to long-lasting freshness, each item is crafted to meet your daily hygiene needs. We use carefully selected natural oils and essential ingredients to ensure your skin stays healthy, clean, and refreshed throughout the day.
                  </>
                )}
                {product.type === "Skin Care" && (
                  <>
                    Transform your skincare routine with our advanced formulations designed to address various skin concerns. Our products combine cutting-edge dermatological science with natural ingredients to deliver visible results. From hydration and brightening to anti-aging and acne treatment, each product is formulated to work harmoniously with your skin's natural processes, promoting healthy, radiant, and youthful-looking skin.
                  </>
                )}
                {product.type === "Oral Care" && (
                  <>
                    Maintain optimal oral health with our comprehensive range of dental care products. Our oral care solutions are designed to provide thorough cleaning, fresh breath, and long-term dental health benefits. From advanced whitening formulas to gentle yet effective cleaning systems, each product is engineered to work together for complete oral hygiene. We prioritize both effectiveness and comfort to ensure your daily dental routine is both beneficial and enjoyable.
                  </>
                )}
                {!["Hair Care", "Soap & Deodorants", "Skin Care", "Oral Care"].includes(product.type) && (
                  <>
                    Discover our carefully curated collection of premium products designed to enhance your daily routine. Each item is crafted with attention to detail, using quality ingredients and innovative formulations to deliver exceptional results. Whether you're looking for personal care essentials or specialized treatments, our products are designed to meet your needs while providing the quality and reliability you deserve.
                  </>
                )}
              </p>
              <a
                href="#"
                className="text-green-700 text-sm font-medium underline hover:underline"
                style={{ display: "inline-block", marginTop: "4px" }}
              >
                See more product details
              </a>
            </div>

            {/* Specification */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Specification
              </h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                {product.type === "Hair Care" && (
                  <>
                    <li>Formulated with advanced hair care technology</li>
                    <li>Suitable for all hair types and textures</li>
                    <li>Contains natural and nourishing ingredients</li>
                    <li>Free from harmful chemicals and sulfates</li>
                    <li>Clinically tested for safety and effectiveness</li>
                    <li>Designed for daily use and long-term results</li>
                  </>
                )}
                {product.type === "Soap & Deodorants" && (
                  <>
                    <li>Made with natural and gentle ingredients</li>
                    <li>Provides long-lasting freshness and protection</li>
                    <li>Suitable for sensitive skin types</li>
                    <li>Antibacterial and antimicrobial properties</li>
                    <li>Eco-friendly and biodegradable formulas</li>
                    <li>Dermatologically tested for safety</li>
                  </>
                )}
                {product.type === "Skin Care" && (
                  <>
                    <li>Advanced dermatological formulations</li>
                    <li>Contains active ingredients for targeted results</li>
                    <li>Suitable for various skin concerns and types</li>
                    <li>Non-comedogenic and hypoallergenic</li>
                    <li>Clinically proven effectiveness</li>
                    <li>Designed for daily skincare routines</li>
                  </>
                )}
                {product.type === "Oral Care" && (
                  <>
                    <li>Advanced dental care technology</li>
                    <li>Provides comprehensive oral hygiene</li>
                    <li>Suitable for daily use and maintenance</li>
                    <li>Contains fluoride and protective ingredients</li>
                    <li>Dentist-recommended formulations</li>
                    <li>Designed for long-term oral health benefits</li>
                  </>
                )}
                {!["Hair Care", "Soap & Deodorants", "Skin Care", "Oral Care"].includes(product.type) && (
                  <>
                    <li>Premium quality ingredients and formulations</li>
                    <li>Designed for optimal performance and results</li>
                    <li>Suitable for regular daily use</li>
                    <li>Safety tested and approved</li>
                    <li>Long-lasting effectiveness and reliability</li>
                    <li>User-friendly and convenient application</li>
                  </>
                )}
              </ul>
            </div>

            {/* Return & Refund Policy */}
            <div className="mt-8">
              <div className="border-t border-gray-200 mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Return &amp; Refund Policy
              </h3>
              <p className="text-gray-700 mb-2">
                Returns are accepted within{" "}
                <span className="font-semibold">7 days</span> for unused items
                in original packaging. Damaged or incorrect products are
                eligible for a full refund or replacement.
              </p>
              <p className="text-gray-700" style={{ textIndent: "2em" }}>
                Refunds are processed after inspection. To start a return,
                contact our support team with your order ID.
              </p>
            </div>
          </div>
        </div>
        {/* Product Features Banner */}
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
              src={
                product.type === "Hair Care" ? "/haircarebanner.png" :
                product.type === "Skin Care" ? "/skinacrebanner.png" :
                product.type === "Soap & Deodorants" ? "/soap.png" :
                product.type === "Body & Wash" ? "/bodywash.png" :
                product.type === "Oral Care" || product.type === "Oral & Misc" ? "/oral&misc.png" :
                "/skinacrebanner.png"
              }
              alt={`${product.type} Product Features`}
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

        <div className="my-8">
          <div className="w-full rounded-lg overflow-hidden bg-white flex flex-col md:flex-row items-center justify-center gap-8">
            {/* Left: Text and Features */}
            <div className="flex-1 flex flex-col justify-center items-start max-w-md w-full mb-6 md:mb-0">
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
                {product.type === "Hair Care" && (
                  <>
                    Advanced Hair Care Technology
                <br />
                    for Professional Results
                  </>
                )}
                {product.type === "Skin Care" && (
                  <>
                    Advanced Skincare Formulations
                    <br />
                    for Radiant Skin
                  </>
                )}
                {product.type === "Soap & Deodorants" && (
                  <>
                    Natural Cleansing Solutions
                    <br />
                    for Daily Hygiene
                  </>
                )}
                {product.type === "Body & Wash" && (
                  <>
                    Premium Body Care Products
                    <br />
                    for Complete Wellness
                  </>
                )}
                {product.type === "Oral Care" || product.type === "Oral & Misc" && (
                  <>
                    Advanced Oral Care Technology
                    <br />
                    for Complete Dental Health
                  </>
                )}
                {!["Hair Care", "Skin Care", "Soap & Deodorants", "Body & Wash", "Oral Care", "Oral & Misc"].includes(product.type) && (
                  <>
                    Premium Product Technology
                    <br />
                    for Optimal Results
                  </>
                )}
              </div>
              <ul className="list-disc pl-5 text-gray-700 space-y-2 text-base">
                {product.type === "Hair Care" && (
                  <>
                <li>
                      Our advanced hair care technology uses scientifically proven ingredients to address specific hair concerns and promote healthy growth.
                </li>
                <li>
                      Each product is formulated with natural extracts and advanced compounds that work together to restore hair vitality and strength.
                </li>
                  </>
                )}
                {product.type === "Skin Care" && (
                  <>
                    <li>
                      Our dermatologically tested formulations combine cutting-edge science with natural ingredients for visible skin improvements.
                    </li>
                    <li>
                      Each product targets specific skin concerns while maintaining the skin's natural balance and promoting long-term health.
                    </li>
                  </>
                )}
                {product.type === "Soap & Deodorants" && (
                  <>
                    <li>
                      Our natural cleansing solutions provide thorough hygiene while being gentle on your skin and environmentally friendly.
                    </li>
                    <li>
                      Each product is crafted with carefully selected natural ingredients for effective cleansing and long-lasting freshness.
                    </li>
                  </>
                )}
                {product.type === "Body & Wash" && (
                  <>
                    <li>
                      Our premium body care products are designed to nourish and protect your skin while providing a luxurious bathing experience.
                    </li>
                    <li>
                      Each formulation combines therapeutic ingredients with indulgent textures for complete body wellness and care.
                    </li>
                  </>
                )}
                {product.type === "Oral Care" || product.type === "Oral & Misc" && (
                  <>
                    <li>
                      Our advanced oral care technology provides comprehensive dental hygiene with innovative cleaning systems and protective formulas.
                    </li>
                    <li>
                      Each product is designed to work together for complete oral health, from daily maintenance to specialized treatments.
                    </li>
                  </>
                )}
                {!["Hair Care", "Skin Care", "Soap & Deodorants", "Body & Wash", "Oral Care", "Oral & Misc"].includes(product.type) && (
                  <>
                    <li>
                      Our premium products are crafted with the highest quality ingredients and advanced technology to deliver exceptional results.
                    </li>
                    <li>
                      Each formulation is designed to meet your specific needs while providing the quality and reliability you deserve.
                    </li>
                  </>
                )}
              </ul>
            </div>
            {/* Right: Product Image */}
            <div className="flex-1 flex justify-center items-center w-full">
              <img
                src={
                  product.type === "Hair Care" ? "/haircarebanner2.png" :
                  product.type === "Skin Care" ? "/skincarebanner2.png" :
                  product.type === "Soap & Deodorants" ? "/soapbanner2.png" :
                  product.type === "Body & Wash" ? "/body&washbanner2.png" :
                  product.type === "Oral Care" || product.type === "Oral & Misc" ? "/oral&miscbanner2.png" :
                  "/skincarebanner2.png"
                }
                alt={`${product.type} Features`}
                className="object-contain"
                style={{ width: "100%", maxWidth: "500px", height: "auto" }}
              />
            </div>
          </div>
        </div>

        {/* Category-specific Features Section */}
        <div className="my-8">
          <div className="w-full rounded-lg overflow-hidden bg-white flex flex-col md:flex-row items-stretch justify-center py-8 ">
            {/* Left: Product Image (aligned left most) */}
            <div className="flex-1 flex justify-start items-center w-full mb-6 md:mb-0">
              <img
                src={
                  product.type === "Hair Care" ? "/haircarebanner3.png" :
                  product.type === "Skin Care" ? "/skincarebanner3.png" :
                  product.type === "Soap & Deodorants" ? "/soapbanner4.png" :
                  product.type === "Body & Wash" ? "/body&washbanner3.png" :
                  product.type === "Oral Care" || product.type === "Oral & Misc" ? "/oral&miscbanner3.png" :
                  "/skincarebanner3.png"
                }
                alt={`${product.type} Advanced Features`}
                className="object-contain"
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  height: "auto",
                  transform: "scaleX(-1)",
                }}
              />
            </div>
            {/* Right: Text and Features */}
            <div className="flex-1 flex flex-col justify-center items-start max-w-md w-full md:pl-8 sm:pl-6">
              <div
                className="mb-4 self-start"
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
                {product.type === "Hair Care" && (
                  <>Advanced Hair Growth Technology</>
                )}
                {product.type === "Skin Care" && (
                  <>Advanced Anti-Aging Technology</>
                )}
                {product.type === "Soap & Deodorants" && (
                  <>Advanced Cleansing Technology</>
                )}
                {product.type === "Body & Wash" && (
                  <>Advanced Body Care Technology</>
                )}
                {product.type === "Oral Care" || product.type === "Oral & Misc" ? (
                  <>Advanced Dental Care Technology</>
                ) : (
                  <>Advanced Anti-Aging Technology</>
                )}
              </div>
              <p className="text-gray-700 text-base self-start">
                {product.type === "Hair Care" && (
                  <>
                    Our advanced hair growth technology utilizes cutting-edge formulations that penetrate deep into hair follicles to stimulate natural growth and strengthen hair from the roots. Each product is scientifically formulated to address specific hair concerns and promote healthy, vibrant hair.
                  </>
                )}
                {product.type === "Skin Care" && (
                  <>
                    Our advanced anti-aging technology combines revolutionary ingredients with proven dermatological science to target fine lines, wrinkles, and age spots. Each formulation is designed to work at the cellular level to promote skin regeneration and maintain youthful radiance.
                  </>
                )}
                {product.type === "Soap & Deodorants" && (
                  <>
                    Our advanced cleansing technology provides superior hygiene protection while maintaining skin's natural moisture balance. Each product is engineered with antibacterial properties and natural ingredients to ensure thorough cleansing without compromising skin health.
                  </>
                )}
                {product.type === "Body & Wash" && (
                  <>
                    Our advanced body care technology delivers comprehensive skin nourishment and protection through innovative formulations. Each product combines therapeutic ingredients with luxurious textures to provide complete body wellness and rejuvenation.
                  </>
                )}
                {product.type === "Oral Care" || product.type === "Oral & Misc" ? (
                  <>
                    Our advanced dental care technology provides superior oral hygiene through innovative cleaning systems and protective formulas. Each product is designed to work together for complete oral health, from daily maintenance to specialized treatments.
                  </>
                ) : (
                  <>
                  Our advanced anti-aging technology combines revolutionary ingredients with proven dermatological science to target fine lines, wrinkles, and age spots. Each formulation is designed to work at the cellular level to promote skin regeneration and maintain youthful radiance.

                  </>
                )}
              </p>
            </div>
          </div>
        </div>

       
        <div className="my-8">
          <div className="w-full rounded-lg overflow-hidden border border-gray-200 bg-white relative">
            <video
              src="/video2.mp4"
              className="w-full h-[600px] object-cover"
              style={{ objectPosition: "center" }}
              controls
              poster="/soapbanner3.png" // Updated thumbnail image
            >
              Your browser does not support the video tag.
            </video>
            {/* Optionally, you can add a custom play button overlay if you want to control playback via JS */}
          </div>
        </div>

        {/* Category-specific Features Section */}
        <div className="my-8">
          <div className="w-full rounded-lg overflow-hidden bg-white flex flex-col md:flex-row items-stretch justify-center py-8">
            {/* Left: Text Content */}
            <div className="flex-1 flex flex-col justify-center items-start max-w-md w-full md:pr-8 mb-6 md:mb-0">
              <div
                className="mb-4 self-start"
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
                {product.type === "Hair Care" && (
                  <>
                    Professional Hair Care <br />
                    Solutions
                  </>
                )}
                {product.type === "Skin Care" && (
                  <>
                    Advanced Skincare <br />
                    Technology
                  </>
                )}
                {product.type === "Soap & Deodorants" && (
                  <>
                    Natural Hygiene <br />
                    Solutions
                  </>
                )}
                {product.type === "Body & Wash" && (
                  <>
                    Premium Body Care <br />
                    Technology
                  </>
                )}
                {product.type === "Oral Care" || product.type === "Oral & Misc" ? (
                  <>
                    Advanced Dental Care <br />
                    Technology
                  </>
                ) : (
                  <>
                    Detachable High-Purity OFC <br />
                    Cable
                  </>
                )}
              </div>
              <ul className="list-disc pl-5 text-gray-700 text-base self-start space-y-2">
                {product.type === "Hair Care" && (
                  <>
                    <li>
                      Our professional hair care solutions are designed to address specific hair concerns with scientifically proven formulations that deliver visible results.
                    </li>
                    <li>
                      Each product is crafted with premium ingredients and advanced technology to provide salon-quality results in the comfort of your home.
                    </li>
                  </>
                )}
                {product.type === "Skin Care" && (
                  <>
                    <li>
                      Our advanced skincare technology combines cutting-edge dermatological science with natural ingredients to target specific skin concerns effectively.
                    </li>
                    <li>
                      Each formulation is designed to work harmoniously with your skin's natural processes, promoting healthy, radiant, and youthful-looking skin.
                    </li>
                  </>
                )}
                {product.type === "Soap & Deodorants" && (
                  <>
                    <li>
                      Our natural hygiene solutions provide thorough cleansing while being gentle on your skin and environmentally friendly for daily use.
                    </li>
                    <li>
                      Each product is crafted with carefully selected natural ingredients to ensure effective hygiene without compromising skin health.
                    </li>
                  </>
                )}
                {product.type === "Body & Wash" && (
                  <>
                    <li>
                      Our premium body care technology delivers comprehensive skin nourishment and protection through innovative formulations and luxurious textures.
                    </li>
                    <li>
                      Each product combines therapeutic ingredients with indulgent formulations to provide complete body wellness and rejuvenation.
                    </li>
                  </>
                )}
                {product.type === "Oral Care" || product.type === "Oral & Misc" ? (
                  <>
                    <li>
                      Our advanced dental care technology provides superior oral hygiene through innovative cleaning systems and protective formulas.
                    </li>
                    <li>
                      Each product is designed to work together for complete oral health, from daily maintenance to specialized treatments.
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      Choose your cable termination: 3.5mm or Type-C (with mic). You
                      can now choose the termination and choose design during your
                      purchase.
                    </li>
                    <li>
                      The advantage of a detachable termination is you can pair
                      these with a preferred DAC & Amp or cable for further
                      performance if you ever wanted to in the near future.
                    </li>
                  </>
                )}
              </ul>
            </div>
            {/* Right: Product Image */}
            <div className="flex-1 flex justify-center items-center w-full">
              <img
                src={
                  product.type === "Hair Care" ? "/haircarebanner2.png" :
                  product.type === "Skin Care" ? "/skincarebanner2.png" :
                  product.type === "Soap & Deodorants" ? "/soapbanner2.png" :
                  product.type === "Body & Wash" ? "/body&washbanner2.png" :
                  product.type === "Oral Care" || product.type === "Oral & Misc" ? "/oral&miscbanner2.png" :
                  "/productfeaturesimage5.png"
                }
                alt={`${product.type} Advanced Features`}
                className="object-contain"
                style={{ width: "100%", maxWidth: "500px", height: "auto" }}
              />
            </div>
          </div>
        </div>

        <FeaturedProductsSection isProductPage={true} />

        {/* Reviews & Ratings Section */}
        <div className="my-12 w-full mx-auto md:px-0">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Left: Ratings Summary */}
            <div className="md:w-1/3 w-full flex flex-col items-start md:items-start sticky-left">
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "#333" }}
              >
                Reviews & Rating
              </h3>
              <div className="flex items-center mb-2">
                <span
                  className="text-3xl font-bold mr-2"
                  style={{ color: "#035F0F" }}
                >
                  4.0
                </span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <img
                      key={star}
                      src={star <= 4 ? "/filledstar.svg" : "/star.svg"}
                      alt="star"
                      className="w-5 h-5"
                    />
                  ))}
                </div>
              </div>
                              <span className="text-gray-600 mb-4 text-sm">Based on 181 reviews</span>
              {/* Ratings Bar */}
                              <div className="w-full max-w-xs space-y-1 mb-4 md:max-w-none">
                {[5, 4, 3, 2, 1].map((star, idx) => (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-sm text-gray-700 w-4">{star}</span>
                    <img src="/filledstar.svg" alt="star" className="w-3 h-3" />
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full">
                      <div
                        className="h-1.5 bg-[#035F0F] rounded-full"
                        style={{
                          width: ["60%", "20%", "10%", "5%", "5%"][idx],
                        }}
                      ></div>
                    </div>
                    <span className="text-[10px] text-gray-500 ml-2">
                      {[73, 38, 52, 13, 105][idx]}
                    </span>
                  </div>
                ))}
              </div>
                              <button className="mt-2 px-4 py-2 border border-[#035F0F] text-[#035F0F] rounded font-medium hover:bg-[#035F0F] hover:text-white transition text-sm cursor-pointer">
                Rate Product
              </button>
            </div>

            {/* Right: Review Images & Customer Reviews */}
            <div className="md:w-2/3 w-full">
              {/* Review Images */}
              <div className="mb-4">
                <div>
                  <h5
                    className="mb-2"
                    style={{
                      color: "#333",
                      leadingTrim: "both",
                      textEdge: "cap",
                      // fontFamily: '"Nunito Sans", sans-serif',
                      fontSize: "20px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "normal",
                      letterSpacing: "-0.2px",
                    }}
                  >
                    Review images
                  </h5>
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                    {Array.from({ length: 6 }).map((_, idx) => (
                      <img
                        key={idx}
                        src={product.images && product.images.length > 0 ? product.images[selectedImage] : product.image}
                        alt="Selected product"
                        className="w-16 h-16 rounded object-cover border border-gray-200"
                      />
                    ))}
                  </div>
                  <hr
                    style={{
                      border: "none",
                      borderTop: "1.5px solid #E5E7EB",
                      backgroundColor: "#E5E7EB",
                      height: "1.5px",
                      margin: "16px 0",
                    }}
                  />
                </div>
              </div>
              {/* Customer Reviews */}
              <div>
                <h4
                  className="mb-3"
                  style={{
                    color: "#333",
                    leadingTrim: "both",
                    textEdge: "cap",
                    // fontFamily: '"Nunito Sans", sans-serif',
                    fontSize: "20px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "normal",
                    letterSpacing: "-0.2px",
                  }}
                >
                  Customer Reviews
                </h4>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#17632D] text-white text-xs font-semibold">
                    <span className="mr-0.5">5</span>
                    <img
                      src="/whitestar.svg"
                      alt="5 star"
                      className="w-3 h-3 inline"
                    />
                  </span>
                  <span className="text-gray-800 text-sm font-medium">
                    Good Sound, But Not For Bass Lovers
                  </span>
                  <span className="text-xs text-gray-500 ml-auto">18 Jan</span>
                </div>
                <div className="flex items-start gap-2 mt-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2">
                      <img
                        src={product.images && product.images[selectedImage] ? product.images[selectedImage] : product.image}
                        alt="Selected product review 1"
                        className="w-12 h-12 rounded object-cover border border-gray-200"
                      />
                      <img
                        src={product.images && product.images[0] ? product.images[0] : product.image}
                        alt="Selected product review 2"
                        className="w-12 h-12 rounded object-cover border border-gray-200"
                      />
                    </div>
                    <p className="text-sm text-gray-700 mt-2">
                      I bought these after reading all the hype. The sound is
                      clear, but the bass was too light for my taste. I listen
                      mostly to hip-hop and pop, and it didn't give me that
                      satisfying thump. However, for podcasts or instrumental
                      music, it's really clean.
                    </p>
                    <span className="block text-xs text-gray-500 mt-1">
                      -Sample user
                    </span>
                  </div>
                </div>
                <hr className="mb-6 mt-6" style={{ borderColor: "#D1D5DB" }} />

                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#17632D] text-white text-xs font-semibold">
                    <span className="mr-0.5">4</span>
                    <img
                      src="/whitestar.svg"
                      alt="5 star"
                      className="w-3 h-3 inline"
                    />
                  </span>
                  <span className="text-gray-800 text-sm font-medium">
                    Good Sound, But Not For Bass Lovers
                  </span>
                  <span className="text-xs text-gray-500 ml-auto">18 Jan</span>
                </div>
                <div className="flex items-start gap-2 mt-2">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-gray-700 mt-2">
                      I bought these after reading all the hype. The sound is
                      clear, but the bass was too light for my taste. I listen
                      mostly to hip-hop and pop, and it didn't give me that
                      satisfying thump. However, for podcasts or instrumental
                      music, it's really clean.
                    </p>
                    <span className="block text-xs text-gray-500 mt-1">
                      -Sample user
                    </span>
                  </div>
                </div>
                <hr className="mb-6 mt-6" style={{ borderColor: "#D1D5DB" }} />

                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#F9A825] text-white text-xs font-semibold">
                    <span className="mr-0.5">3</span>
                    <img
                      src="/whitestar.svg"
                      alt="5 star"
                      className="w-3 h-3 inline"
                    />
                  </span>
                  <span className="text-gray-800 text-sm font-medium">
                    Good Sound, But Not For Bass Lovers
                  </span>
                  <span className="text-xs text-gray-500 ml-auto">18 Jan</span>
                </div>

                <div className="flex items-start gap-2 mt-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-2">
                      <img
                        src={product?.images?.[selectedImage] || product?.image || "/shop2.png"}
                        alt="Selected product image"
                        className="w-12 h-12 rounded object-cover border border-gray-200"
                      />
                    </div>
                    <p className="text-sm text-gray-700 mt-2">
                      I bought these after reading all the hype. The sound is
                      clear, but the bass was too light for my taste. I listen
                      mostly to hip-hop and pop, and it didn't give me that
                      satisfying thump. However, for podcasts or instrumental
                      music, it's really clean.
                    </p>
                    <span className="block text-xs text-gray-500 mt-1">
                      -Sample user
                    </span>
                  </div>
                </div>

                <hr className="mb-6 mt-6" style={{ borderColor: "#D1D5DB" }} />

                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#F57C00] text-white text-xs font-semibold">
                    <span className="mr-0.5">2</span>
                    <img
                      src="/whitestar.svg"
                      alt="5 star"
                      className="w-3 h-3 inline"
                    />
                  </span>
                  <span className="text-gray-800 text-sm font-medium">
                    Good Sound, But Not For Bass Lovers
                  </span>
                  <span className="text-xs text-gray-500 ml-auto">18 Jan</span>
                </div>

                <div className="flex items-start gap-2 mt-2">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-gray-700 mt-2">
                      I bought these after reading all the hype. The sound is
                      clear, but the bass was too light for my taste. I listen
                      mostly to hip-hop and pop, and it didn't give me that
                      satisfying thump. However, for podcasts or instrumental
                      music, it's really clean.
                    </p>
                    <span className="block text-xs text-gray-500 mt-1">
                      -Sample user
                    </span>
                  </div>
                </div>
                <hr className="mb-6 mt-6" style={{ borderColor: "#D1D5DB" }} />

                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#B71C1C] text-white text-xs font-semibold">
                    <span className="mr-0.5">1</span>
                    <img
                      src="/whitestar.svg"
                      alt="5 star"
                      className="w-3 h-3 inline"
                    />
                  </span>
                  <span className="text-gray-800 text-sm font-medium">
                    Good Sound, But Not For Bass Lovers
                  </span>
                  <span className="text-xs text-gray-500 ml-auto">18 Jan</span>
                </div>

                <div className="flex items-start gap-2 mt-2">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-gray-700 mt-2">
                      I bought these after reading all the hype. The sound is
                      clear, but the bass was too light for my taste. I listen
                      mostly to hip-hop and pop, and it didn't give me that
                      satisfying thump. However, for podcasts or instrumental
                      music, it's really clean.
                    </p>
                    <span className="block text-xs text-gray-500 mt-1">
                      -Sample user
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <RecommendedSection />
        </div>
      </div>
    </div>
  );
}
