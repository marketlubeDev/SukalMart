"use client";

import { useState, useEffect } from "react";
import CouponSidebar from "./CouponSidebar";

export default function CartSidebar({ isOpen, onClose }) {
  const [quantities, setQuantities] = useState({
    1: 1,
    2: 1
  });
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(true);
  const [showCouponSidebar, setShowCouponSidebar] = useState(false);

  const cartItems = [
    {
      id: 1,
      name: "7hz Salnotes Zero 2 Wired IEM(type c)",
      color: "Blue",
      plug: "3.5mm with mic",
      price: 1899,
      originalPrice: 2099,
      image: "/best1.png"
    },
    {
      id: 2,
      name: "7hz Salnotes Zero 2 Wired IEM(type c)",
      color: "Blue",
      plug: "3.5mm with mic",
      price: 1899,
      originalPrice: 2099,
      image: "/best2.png"
    }
  ];

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      // Add a small delay to prevent jarring transition
      const timer = setTimeout(() => {
        document.body.style.overflow = 'unset';
      }, 300); // Match the animation duration
      
      return () => clearTimeout(timer);
    }

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity >= 1) {
      setQuantities(prev => ({
        ...prev,
        [itemId]: newQuantity
      }));
    }
  };

  const removeItem = (itemId) => {
    // Handle item removal logic here
    console.log(`Remove item ${itemId}`);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * quantities[item.id]), 0);
  const total = subtotal + 400; // Adding delivery cost
  const discount = 400;
  const couponDiscount = 199;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 transition-opacity duration-300 ease-in-out z-40 ${isOpen ? 'bg-opacity-70' : 'bg-opacity-0 pointer-events-none'}`}
        onClick={onClose}
        style={{
          background: "linear-gradient(120deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 100%)"
        }}
      />
      
      {/* Cart Sidebar */}
      <div className={`fixed top-0 right-0 h-screen w-full sm:w-[450px] md:w-[500px] lg:w-[550px] bg-[#F5F5F5] shadow-2xl z-50 transform transition-all duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center">
            <button 
              onClick={onClose}
              className="mr-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2
              className="font-[600]"
              style={{
                color: "#333333",
            
                fontSize: "22px",
                fontStyle: "normal",
                lineHeight: "normal",
                letterSpacing: "-0.44px",
              }}
            >
              Your cart
            </h2>
          </div>
        </div>

        {/* Cart Content */}
        <div className="flex flex-col h-full">
          {/* Items Section */}
          <div className="flex-1 overflow-y-auto py-4" style={{ maxHeight: "calc(100vh - 200px)" }}>
            {/* Items Header */}
            <div className="flex justify-between items-center mb-4 px-4">
              <h3
                style={{
                  color: "#333333",
                 
                  fontSize: "20px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "normal",
                  letterSpacing: "-0.4px",
                }}
              >
                Items
              </h3>
              <span
                style={{
                  color: "rgba(51, 51, 51, 0.60)",
                 
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "normal",
                  letterSpacing: "-0.28px",
                }}
              >
                {cartItems.length} products
              </span>
            </div>

            {/* Cart Items - Arranged in a single white card, separated by dotted borders, full width */}
            <div
              className="w-full bg-white"
              style={{
                borderRadius: "0px",
                boxShadow: "none",
                padding: 0,
                margin: 0,
              }}
            >
              {cartItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="relative flex w-full"
                  style={{
                    display: "flex",
                    paddingBottom: "16px",
                    alignItems: "center",
                    gap: "12px",
                    alignSelf: "stretch",
                    paddingTop: "18px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    borderBottom:
                      idx !== cartItems.length - 1
                        ? "1px dashed rgba(209, 213, 219, 1)"
                        : "none",
                  }}
                >
                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-3 right-3 p-1 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Product Image */}
                  <div
                    className="bg-white rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      width: "64px",
                      height: "64px",
                      aspectRatio: "1/1",
                      marginRight: "16px",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0 w-full">
                    <h4
                      className="text-[16px] font-semibold mb-1"
                      style={{
                        overflow: "hidden",
                        color: "#333",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 1,
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "140%",
                        letterSpacing: "-0.32px",
                        alignSelf: "stretch",
                        marginBottom: "2px",
                      }}
                      title={item.name}
                    >
                      {item.name}
                    </h4>
                    <div
                      className="mb-1"
                      style={{
                        display: "block",
                        overflow: "hidden",
                        fontSize: "14px",
                        color: "rgba(51, 51, 51, 0.70)",
                        fontWeight: 500,
                        lineHeight: "140%",
                        letterSpacing: "-0.28px",
                        marginBottom: "6px",
                      }}
                    >
                      <span style={{ marginRight: "16px" }}>
                        Color: <span style={{ color: "#222", fontWeight: 500 }}>{item.color}</span>
                      </span>
                      <span>
                        Plug: <span style={{ color: "#222", fontWeight: 500 }}>{item.plug}</span>
                      </span>
                    </div>

                    {/* Quantity and Price Row */}
                    <div className="flex items-center justify-between w-full">
                      {/* Quantity Selector */}
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-600">Qty :</span>
                        <div
                          style={{
                            display: "flex",
                            height: "32px",
                            padding: "0 3px",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "6px",
                            borderRadius: "4px",
                            border: "1px solid rgba(3, 95, 15, 0.40)",
                            background: "rgba(3, 95, 15, 0.06)",
                            minWidth: "72px",
                            maxWidth: "80px",
                            position: "relative",
                          }}
                        >
                          <button
                            onClick={() => updateQuantity(item.id, quantities[item.id] - 1)}
                            style={{
                              width: "28px",
                              height: "28px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: "transparent",
                              border: "none",
                              color: "#035F0F",
                              fontSize: "18px",
                              fontWeight: "bold",
                              cursor: "pointer",
                              transition: "background 0.2s",
                              borderRadius: "3px",
                              lineHeight: 1,
                            }}
                            onMouseOver={e => e.currentTarget.style.background = "#E6F9ED"}
                            onMouseOut={e => e.currentTarget.style.background = "transparent"}
                          >
                            -
                          </button>
                          <span
                            style={{
                              padding: "0 2px",
                              fontSize: "15px",
                              fontWeight: 600,
                              color: "#035F0F",
                              minWidth: "20px",
                              textAlign: "center",
                              userSelect: "none",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              height: "100%",
                            }}
                          >
                            {String(quantities[item.id]).padStart(2, '0')}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, quantities[item.id] + 1)}
                            style={{
                              width: "28px",
                              height: "28px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: "transparent",
                              border: "none",
                              color: "#035F0F",
                              fontSize: "18px",
                              fontWeight: "bold",
                              cursor: "pointer",
                              transition: "background 0.2s",
                              borderRadius: "3px",
                              lineHeight: 1,
                            }}
                            onMouseOver={e => e.currentTarget.style.background = "#E6F9ED"}
                            onMouseOut={e => e.currentTarget.style.background = "transparent"}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      {/* Price Section */}
                      <div className="flex items-center space-x-2 ml-4">
                        <span
                          style={{
                            overflow: "hidden",
                            color: "#035F0F",
                            textOverflow: "ellipsis",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 600,
                            lineHeight: "100%",
                            letterSpacing: "-0.32px",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            background: "white",
                            padding: "0 2px",
                          }}
                        >
                          ₹{item.price.toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-400 line-through">₹{item.originalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Section */}
            <div className="mt-6 bg-[#F5F5F5] ">
              <h3
                style={{
                  color: "#333333",
                  fontSize: "20px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "normal",
                  letterSpacing: "-0.4px",
                }}
                className="mb-3 px-4"
              >
                Coupon
              </h3>
              <button 
                onClick={() => setShowCouponSidebar(true)}
                className="flex items-center justify-between p-3 bg-white border border-gray-200 px-4 w-full hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white">
                    <img src="/coupon.svg" alt="Coupon" className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-800">Apply Coupon & Offers</p>
                    <p className="text-xs text-gray-600">Use a valid coupon code and get an instant discount.</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* 
              To make this work, you must:
              1. Import useState from React at the top of your file:
                 import React, { useState } from "react";
              2. Add this line at the top of your component (before return):
                 const [orderSummaryOpen, setOrderSummaryOpen] = useState(true);
            */}
            {/* Order Summary */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3 px-4">
                <h3
                  style={{
                    color: "#333333",
                    fontSize: "20px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "normal",
                    letterSpacing: "-0.4px",
                  }}
                >
                  Order Summary
                </h3>
                <div className="flex flex-col items-center ml-2">
                  <button
                    type="button"
                    aria-label={orderSummaryOpen ? "Collapse order summary" : "Expand order summary"}
                    onClick={() => setOrderSummaryOpen((open) => !open)}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "none",
                    }}
                    tabIndex={0}
                  >
                    <svg
                      className="w-5 h-5 text-gray-400 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{
                        transform: orderSummaryOpen ? "rotate(0deg)" : "rotate(-90deg)",
                        transition: "transform 0.2s",
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {orderSummaryOpen && (
                <div className="space-y-2 text-sm bg-white px-6 py-4">
                  <div className="flex justify-between">
                    <span
                      style={{
                        color: "#333",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "normal",
                        letterSpacing: "-0.32px",
                      }}
                    >
                      Subtotal
                    </span>
                    <span
                      style={{
                        color: "#333",
                        fontSize: "18px",
                        fontStyle: "normal",
                        fontWeight: 700,
                        lineHeight: "normal",
                        letterSpacing: "-0.36px",
                      }}
                    >
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div
                    className="flex flex-col border-t border-dashed border-gray-200"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "12px",
                      alignSelf: "stretch",
                      padding: "16px 0 16px",
                      borderTop: "1px dashed rgba(51, 51, 51, 0.10)",
                    }}
                  >
                    <div className="flex justify-between w-full">
                      <span
                        style={{
                          color: "rgba(51, 51, 51, 0.70)",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "normal",
                          letterSpacing: "-0.32px",
                        }}
                      >
                        Total
                      </span>
                      <span
                        style={{
                          color: "#333",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "normal",
                          letterSpacing: "-0.32px",
                        }}
                      >
                        ₹{total.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between w-full">
                      <span
                        style={{
                          color: "rgba(51, 51, 51, 0.70)",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "normal",
                          letterSpacing: "-0.32px",
                        }}
                      >
                        Discount
                      </span>
                      <span
                        style={{
                          color: "#035F0F",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "normal",
                          letterSpacing: "-0.32px",
                        }}
                      >
                        -₹{discount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between w-full">
                      <span
                        style={{
                          color: "rgba(51, 51, 51, 0.70)",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "normal",
                          letterSpacing: "-0.32px",
                        }}
                      >
                        Delivery
                      </span>
                      <span
                        style={{
                          color: "#035F0F",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "normal",
                          letterSpacing: "-0.32px",
                        }}
                      >
                        Free
                      </span>
                    </div>
                    <div className="flex justify-between w-full">
                      <span
                        style={{
                          color: "rgba(51, 51, 51, 0.70)",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "normal",
                          letterSpacing: "-0.32px",
                        }}
                      >
                        Coupon discount
                      </span>
                      <span
                        style={{
                          color: "#035F0F",
                          fontSize: "16px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "normal",
                          letterSpacing: "-0.32px",
                        }}
                      >
                        -₹{couponDiscount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="border-t border-gray-200 p-4 bg-white" style={{ position: "fixed", bottom: 0, right: 0, left: 0, zIndex: 20, boxShadow: "0 -2px 8px rgba(0,0,0,0.03)", width: "100%", maxWidth: "100vw" }}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <div
                  className="text-[18px] sm:text-[20px]"
                  style={{
                    color: "#333333",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "normal",
                    letterSpacing: "-0.4px",
                  }}
                >
                  ₹{(total - discount - couponDiscount).toLocaleString()}
                </div>
                <button
                  style={{
                    color:"rgba(51, 51, 51, 0.70)",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                    letterSpacing: "-0.28px",
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onMouseOver={e => e.currentTarget.style.color = "#333"}
                  onMouseOut={e => e.currentTarget.style.color = "rgba(51, 51, 51, 0.7)"}
                >
                  View Details
                </button>
              </div>
              <button
                style={{
                  display: "flex",
                  width: "200px",
                  padding: "12px 16px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  flexShrink: 0,
                  borderRadius: "4px",
                  background: "#035F0F",
                  color: "#fff",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "normal",
                  border: "none",
                  transition: "background 0.2s",
                  cursor: "pointer",
                }}
                className="font-medium sm:w-[260px] sm:px-6 sm:py-4 sm:text-base"
                onMouseOver={e => e.currentTarget.style.background = "#024a0c"}
                onMouseOut={e => e.currentTarget.style.background = "#035F0F"}
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Coupon Sidebar */}
      <CouponSidebar 
        isOpen={showCouponSidebar} 
        onClose={() => setShowCouponSidebar(false)} 
      />
    </>
  );
} 