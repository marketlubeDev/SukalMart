"use client";

import { useState } from "react";
import CheckoutLeft from "./_components/CheckoutLeft";
import CheckoutRight from "./_components/CheckoutRight";

export default function CheckoutPage() {
  const [quantities, setQuantities] = useState({
    1: 1,
    2: 1,
  });

  const cartItems = [
    {
      id: 1,
      name: "Glow & Hydrate Face Serum",
      color: "Clear",
      plug: "30ml bottle",
      price: 899,
      originalPrice: 1099,
      image:
        "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
    },
    {
      id: 2,
      name: "Luxury Beauty Collection Set",
      color: "Multi",
      plug: "Complete set",
      price: 2499,
      originalPrice: 3199,
      image:
        "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
    },
  ];

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity >= 1) {
      setQuantities((prev) => ({
        ...prev,
        [itemId]: newQuantity,
      }));
    }
  };

  const removeItem = (itemId) => {
    // Handle item removal logic here
    console.log(`Remove item ${itemId}`);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * quantities[item.id],
    0
  );
  const total = subtotal + 400; // Adding delivery cost
  const discount = 400;
  const couponDiscount = 199;

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row ">
        {/* Left Column - Gray Background */}
        		<div className="w-full lg:w-1/2 bg-[#F5F5F5] px-4 py-6 lg:pl-25 lg:pr-8 lg:py-8">
          <CheckoutLeft 
            cartItems={cartItems}
            quantities={quantities}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
            subtotal={subtotal}
            total={total}
            discount={discount}
            couponDiscount={couponDiscount}
          />
        </div>

        {/* Right Column - White Background */}
        		<div className="w-full lg:w-1/2 bg-white px-4 py-6 lg:pr-25 lg:pl-8 lg:py-8">
          <CheckoutRight />
        </div>
      </div>
    </div>
  );
} 