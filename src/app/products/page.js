"use client";

import { useState } from "react";
import ProductCard from "../_components/_homepage/ProductCard";
import ProductSidebar from "./_components/ProductSidebar";
import ProductGrid from "./_components/ProductGrid";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Skincare");
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 1000, max: 12999 });
  const [sortBy, setSortBy] = useState("Featured");

  // Sample product data - you can replace this with your actual data
  const products = [
    {
      id: 1,
      name: "Glow & Hydrate Face Serum",
      type: "Skincare",
      price: 899,
      originalPrice: 1099,
      image:
        "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
      category: "Skincare",
      discount: 18,
    },
    {
      id: 2,
      name: "Luxury Beauty Collection Set",
      type: "Beauty Essentials",
      price: 2499,
      originalPrice: 3199,
      image:
        "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
      category: "Beauty Essentials",
      discount: 22,
    },
    {
      id: 3,
      name: "Anti-Aging Night Cream",
      type: "Anti-Aging",
      price: 1299,
      originalPrice: 1599,
      image:
        "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
      category: "Anti-Aging",
      discount: 19,
    },
    {
      id: 4,
      name: "Vitamin C Brightening Serum",
      type: "Skincare",
      price: 799,
      originalPrice: 999,
      image:
        "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
      category: "Skincare",
      discount: 20,
    },
    {
      id: 5,
      name: "Hyaluronic Acid Moisturizer",
      type: "Skincare",
      price: 699,
      originalPrice: 899,
      image:
        "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
      category: "Skincare",
      discount: 22,
    },
    {
      id: 6,
      name: "Retinol Eye Cream",
      type: "Anti-Aging",
      price: 999,
      originalPrice: 1299,
      image:
        "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
      category: "Anti-Aging",
      discount: 23,
    },
    {
      id: 7,
      name: "Gentle Facial Cleanser",
      type: "Skincare",
      price: 599,
      originalPrice: 799,
      image:
        "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
      category: "Skincare",
      discount: 25,
    },
    {
      id: 8,
      name: "SPF 50 Sunscreen",
      type: "Skincare",
      price: 899,
      originalPrice: 1199,
      image:
        "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
      category: "Skincare",
      discount: 25,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/5">
            <ProductSidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedDiscount={selectedDiscount}
              setSelectedDiscount={setSelectedDiscount}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          </div>

          {/* Main Content */}
          <div className="lg:w-4/5">
            <ProductGrid
              products={products}
              selectedCategory={selectedCategory}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
