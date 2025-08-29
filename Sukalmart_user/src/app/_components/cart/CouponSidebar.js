"use client";

import { useState, useEffect } from "react";
import Button from "../common/Button";

export default function CouponSidebar({ isOpen, onClose }) {
  const [selectedCoupon, setSelectedCoupon] = useState("SAVE100");
  const [couponCode, setCouponCode] = useState("");

  const coupons = [
    {
      id: "SAVE100",
      code: "SAVE100",
      description: "Flat ₹100 OFF on orders above ₹999",
      discount: 100
    },
    {
      id: "GET250",
      code: "GET250", 
      description: "₹250 OFF when you spend ₹2,499 or more",
      discount: 250
    },
    {
      id: "HEADPHONES20",
      code: "HEADPHONES20",
      description: "20% OFF on selected headphones",
      discount: 200
    },
    {
      id: "IEMEXTRA",
      code: "IEMEXTRA",
      description: "Extra ₹200 OFF on IEMs above ₹1,499",
      discount: 200
    },
    {
      id: "EARBUDLOVE",
      code: "EARBUDLOVE",
      description: "Flat ₹150 OFF on all true wireless earbuds",
      discount: 150
    },
    {
      id: "THANKYOU10",
      code: "THANKYOU10",
      description: "10% OFF as a thank you for returning customers",
      discount: 100
    }
  ];

  const subtotal = 3800;
  const selectedCouponData = coupons.find(coupon => coupon.id === selectedCoupon);
  const finalTotal = subtotal - (selectedCouponData ? selectedCouponData.discount : 0);

  // Handle body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-45' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full bg-gray-100 shadow-xl transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ 
          width: '550px',
          maxWidth: '100vw'
        }}
      >
        {/* Header - Fixed height */}
        <div 
          className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 bg-white flex-shrink-0"
          style={{
            backgroundColor: "white",
            height: "80px",
            minHeight: "80px",
            maxHeight: "80px",
            flexShrink: 0
          }}
        >
          <div className="flex items-center">
            <button 
              onClick={onClose}
              className="mr-3 p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2
              className="font-[600] text-lg sm:text-xl"
              style={{
                color: "#333333",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "normal",
                letterSpacing: "-0.44px",
              }}
            >
              Coupon & Offers
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col h-screen overflow-hidden" style={{ maxHeight: '100vh' }}>
          {/* Content Section - Flexible height to fit 100vh */}
          <div
            className="flex-1 overflow-y-auto"
            style={{ 
              paddingTop: "16px",
              paddingBottom: "16px",
              height: "calc(100vh - 80px - 80px)", // Header (80px) + Bottom (80px) = 160px
              maxHeight: "calc(100vh - 80px - 80px)"
            }}
          >
            {/* Main Content Wrapper */}
            <div className="bg-white">
              {/* Coupon Code Input */}
              <div className="mb-4 sm:mb-6 px-3 sm:px-4">
                <input
                  type="text"
                  placeholder="Enter your coupon code.."
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                />
              </div>

              {/* Available Offers */}
              <div>
                {coupons.map((coupon, idx) => (
                  <div 
                    key={coupon.id} 
                    className="py-3 sm:py-4 px-3 sm:px-4"
                    style={{
                      backgroundColor: selectedCoupon === coupon.id ? "#F7F3F4" : "transparent",
                      borderBottom: idx !== coupons.length - 1 ? "1px dashed rgba(229, 231, 235, 1)" : "none"
                    }}
                  >
                    <label className="flex items-start space-x-2 sm:space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="coupon"
                        value={coupon.id}
                        checked={selectedCoupon === coupon.id}
                        onChange={(e) => setSelectedCoupon(e.target.value)}
                        className="mt-1 w-4 h-4 border-transparent focus:outline-none"
                        style={{ 
                          accentColor: "var(--color-primary)"
                        }}
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-gray-900 text-sm sm:text-base">{coupon.code}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600">{coupon.description}</p>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Action Bar - Fixed height */}
          <div 
            className="border-t border-gray-200 bg-white p-3 sm:p-4 flex-shrink-0"
            style={{
              width: "100%",
              backgroundColor: "white",
              height: "80px",
              minHeight: "80px",
              maxHeight: "80px",
              flexShrink: 0
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-base sm:text-lg font-semibold text-gray-900">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm" style={{ color: "var(--color-primary)" }}>- ₹{selectedCouponData ? selectedCouponData.discount : 0}</span>
                </div>
              </div>
              <div className="ml-3 sm:ml-4">
                <Button
                  variant="primary"
                  size="large"
                  onClick={onClose}
                  className="text-white py-2 sm:py-3 px-8 sm:px-10 rounded-md font-medium transition-colors whitespace-nowrap text-sm sm:text-base cursor-pointer"
                  style={{ backgroundColor: "var(--color-primary)" }}
                  onMouseOver={(e) => (e.currentTarget.style.background = "#520A1E")}
                  onMouseOut={(e) => (e.currentTarget.style.background = "var(--color-primary)")}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}