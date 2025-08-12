"use client";

import PromotionalBanner from "@/app/_components/_homepage/promotion/PromotionalBanner";
import ProductShowcaseBanner from "@/app/_components/_homepage/promotion/ProductShowcaseBanner";
import ProductCard from "../../_components/_homepage/ProductCard";

export default function ProductGrid({
  products,
  selectedCategory,
  sortBy,
  setSortBy,
}) {
  const sortOptions = [
    "Featured",
    "Price: Low to High",
    "Price: High to Low",
    "Newest",
    "Popular",
  ];

  // Function to get modified products based on selected category
  const getModifiedProducts = () => {
    // All available products from all categories
    const allAvailableProducts = [
      // Hair Care products
      {
        id: "hc1",
        image: "/haircare3.jpg",
        name: "Professional Hair Shampoo",
        type: "Hair Care",
        price: 899,
        originalPrice: 1099,
      },
      {
        id: "hc2",
        image: "/haircare2.jpg",
        name: "Nourishing Hair Conditioner",
        type: "Hair Care",
        price: 799,
        originalPrice: 999,
      },
      {
        id: "hc3",
        image: "/haircare3.jpg",
        name: "Anti-Dandruff Treatment",
        type: "Hair Care",
        price: 699,
        originalPrice: 899,
      },
      {
        id: "hc4",
        image: "/haircare2.jpg",
        name: "Hair Growth Serum",
        type: "Hair Care",
        price: 1299,
        originalPrice: 1599,
      },
      // Soap & Deodorants products
      {
        id: "sd1",
        image: "/soap1.jpeg",
        name: "Natural Handmade Soap",
        type: "Soap & Deodorants",
        price: 299,
        originalPrice: 399,
      },
      {
        id: "sd2",
        image: "/soap2.jpg",
        name: "Antibacterial Body Wash",
        type: "Soap & Deodorants",
        price: 449,
        originalPrice: 599,
      },
      {
        id: "sd3",
        image: "/soap3.jpg",
        name: "Long-lasting Deodorant",
        type: "Soap & Deodorants",
        price: 199,
        originalPrice: 299,
      },
      {
        id: "sd4",
        image: "/soap1.jpeg",
        name: "Moisturizing Bath Soap",
        type: "Soap & Deodorants",
        price: 349,
        originalPrice: 449,
      },
      // Skin Care products
      {
        id: "sc1",
        image: "/skin1.jpg",
        name: "Hydrating Face Moisturizer",
        type: "Skin Care",
        price: 899,
        originalPrice: 1099,
      },
      {
        id: "sc2",
        image: "/skin2.jpg",
        name: "Vitamin C Brightening Serum",
        type: "Skin Care",
        price: 1299,
        originalPrice: 1599,
      },
      {
        id: "sc3",
        image: "/skin3.jpg",
        name: "Gentle Facial Cleanser",
        type: "Skin Care",
        price: 599,
        originalPrice: 799,
      },
      {
        id: "sc4",
        image: "/skin5.jpg",
        name: "Anti-Aging Night Cream",
        type: "Skin Care",
        price: 1499,
        originalPrice: 1899,
      },
      // Oral Care products
      {
        id: "oc1",
        image: "/tooth1.jpg",
        name: "Whitening Toothpaste",
        type: "Oral Care",
        price: 199,
        originalPrice: 299,
      },
      {
        id: "oc2",
        image: "/tooth2.jpg",
        name: "Electric Toothbrush",
        type: "Oral Care",
        price: 899,
        originalPrice: 1199,
      },
      {
        id: "oc3",
        image: "/tooth3.jpg",
        name: "Mouthwash Fresh Mint",
        type: "Oral Care",
        price: 299,
        originalPrice: 399,
      },
      {
        id: "oc4",
        image: "/tooth4.jpg",
        name: "Dental Floss Set",
        type: "Oral Care",
        price: 149,
        originalPrice: 249,
      },
    ];

    // If no specific category is selected (Products page), show all products in random order
    if (!selectedCategory || selectedCategory === "All Products" || selectedCategory === "Products") {
      // Create a shuffled copy of all products
      const shuffledProducts = [...allAvailableProducts].sort(() => Math.random() - 0.5);
      return products.map((product, index) => ({
        ...product,
        ...shuffledProducts[index % shuffledProducts.length],
      }));
    }

    // If a specific category is selected, filter products by that category
    const filteredProducts = allAvailableProducts.filter(product => product.type === selectedCategory);
    
    if (filteredProducts.length > 0) {
      return products.map((product, index) => ({
        ...product,
        ...filteredProducts[index % filteredProducts.length],
      }));
    }

    // For other categories, return original products
    return products;
  };

  const modifiedProducts = getModifiedProducts();

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold text-gray-800">
            Showing result for &quot;{selectedCategory || "All Products"}&quot;
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-1 relative">
            <span className="text-sm text-gray-600">Sort by :</span>
            <div
              className="relative flex items-center"
              style={{ marginRight: "12px" }}
            >
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-0 pr-6 py-0 text-sm bg-white appearance-none focus:outline-none font-semibold text-gray-800"
                style={{
                  border: "none",
                  boxShadow: "none",
                  outline: "none",
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  appearance: "none",
                  paddingLeft: "0rem",
                  paddingRight: "1.5rem", // increased for icon gap
                  height: "24px",
                  lineHeight: "24px",
                  minWidth: "80px",
                  cursor: "pointer",
                }}
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option} className="font-normal">
                    {option}
                  </option>
                ))}
              </select>
              <img
                src="/dropdownicon.svg"
                alt="dropdown"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
                style={{ minWidth: "12px", minHeight: "12px" }}
              />
            </div>
            <div
              className="h-5 border-l border-gray-200 ml-1"
              style={{ height: "20px" }}
            />
          </div>

          {/* Grid View Toggle */}
          <div className="flex items-center gap-3">
            {/* 8 green card, 6 gray card grid icon */}
            <button
              className="p-0 focus:outline-none"
              aria-label="Grid View"
              style={{
                width: 56,
                height: 24,
                display: "flex",
                alignItems: "center",
                background: "transparent",
              }}
            >
              <svg width="56" height="24" viewBox="0 0 56 24" fill="none">
                {/* 8 Green cards */}
                <g>
                  <rect
                    x="2"
                    y="2"
                    width="6"
                    height="6"
                    rx="1.5"
                    fill="#0B6612"
                  />
                  <rect
                    x="10"
                    y="2"
                    width="6"
                    height="6"
                    rx="1.5"
                    fill="#0B6612"
                  />
                  <rect
                    x="18"
                    y="2"
                    width="6"
                    height="6"
                    rx="1.5"
                    fill="#0B6612"
                  />
                  <rect
                    x="26"
                    y="2"
                    width="6"
                    height="6"
                    rx="1.5"
                    fill="#0B6612"
                  />
                  <rect
                    x="2"
                    y="10"
                    width="6"
                    height="6"
                    rx="1.5"
                    fill="#0B6612"
                  />
                  <rect
                    x="10"
                    y="10"
                    width="6"
                    height="6"
                    rx="1.5"
                    fill="#0B6612"
                  />
                  <rect
                    x="18"
                    y="10"
                    width="6"
                    height="6"
                    rx="1.5"
                    fill="#0B6612"
                  />
                  <rect
                    x="26"
                    y="10"
                    width="6"
                    height="6"
                    rx="1.5"
                    fill="#0B6612"
                  />
                </g>
                {/* 6 Gray cards */}
                <g>
                  <rect
                    x="36"
                    y="2"
                    width="6"
                    height="6"
                    rx="1.5"
                    fill="#BDBDBD"
                  />
                  <rect
                    x="44"
                    y="2"
                    width="6"
                    height="6"
                    rx="1.5"
                    fill="#BDBDBD"
                  />
                  <rect
                    x="52"
                    y="2"
                    width="6"
                    height="6"
                    rx="1.5"
                    fill="#BDBDBD"
                  />
                  <rect
                    x="36"
                    y="10"
                    width="6"
                    height="6"
                    rx="1.5"
                    fill="#BDBDBD"
                  />
                  <rect
                    x="44"
                    y="10"
                    width="6"
                    height="6"
                    rx="1.5"
                    fill="#BDBDBD"
                  />
                  <rect
                    x="52"
                    y="10"
                    width="6"
                    height="6"
                    rx="1.5"
                    fill="#BDBDBD"
                  />
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-4 gap-4">
        {modifiedProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg overflow-hidden">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="mt-8 w-full">
        <PromotionalBanner fullWidth={true} />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {modifiedProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg overflow-hidden">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="mt-8 w-full">
        <ProductShowcaseBanner fullWidth={true} />
      </div>

      <div className="mt-8 grid grid-cols-4 gap-4">
        {modifiedProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg overflow-hidden">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
