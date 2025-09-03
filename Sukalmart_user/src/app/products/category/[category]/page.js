"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import ProductCard from "../../../_components/_homepage/ProductCard";
import ProductSidebar from "../../_components/ProductSidebar";
import ProductGrid from "../../_components/ProductGrid";

export default function CategoryPage() {
  const params = useParams();
  const category = params.category;

  const [selectedCategory, setSelectedCategory] = useState(
    decodeURIComponent(category)
  );
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 1000, max: 12999 });
  const [sortBy, setSortBy] = useState("Featured");

  // Sample product data filtered by category
  const products = [
    {
      id: 1,
      name: "7hz Salnotes Zero 2 Wired IEM",
      type: "In-ear monitors",
      price: 1899,
      originalPrice: 2099,
      image: "/iem1.jpg",
      category: "In-Ear Monitors",
      discount: 10,
    },
    {
      id: 2,
      name: "7hz Salnotes Zero 2 Wired IEM",
      type: "In-ear monitors",
      price: 1899,
      originalPrice: 2099,
      image: "/iem1.jpg",
      category: "In-Ear Monitors",
      discount: 10,
    },
    {
      id: 3,
      name: "7hz Salnotes Zero 2 Wired IEM",
      type: "In-ear monitors",
      price: 1899,
      originalPrice: 2099,
      image: "/iem1.jpg",
      category: "In-Ear Monitors",
      discount: 10,
    },
    {
      id: 4,
      name: "7hz Salnotes Zero 2 Wired IEM",
      type: "In-ear monitors",
      price: 1899,
      originalPrice: 2099,
      image: "/iem1.jpg",
      category: "In-Ear Monitors",
      discount: 10,
    },
  ].filter((product) => product.category === selectedCategory);

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
