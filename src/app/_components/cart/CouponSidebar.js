"use client";

import { useState } from "react";

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
      
      {/* Coupon Sidebar */}
      <div className={`fixed top-0 right-0 h-screen w-full sm:w-[450px] md:w-[500px] lg:w-[550px] bg-white shadow-2xl z-50 transform transition-all duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 bg-white flex-shrink-0">
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
        <div className="flex flex-col h-full bg-[#F5F5F5] flex-1">
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto py-3 sm:py-4 px-3 sm:px-4">
            {/* Main Content Wrapper */}
            <div className="bg-white p-3 sm:p-4">
              {/* Coupon Code Input */}
              <div className="mb-4 sm:mb-6">
                <input
                  type="text"
                  placeholder="Enter your coupon code.."
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                />
              </div>

              {/* Available Offers */}
              <div className="space-y-3 sm:space-y-4">
                {/* <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Offers</h3> */}
                
                {coupons.map((coupon) => (
                  <div key={coupon.id} className="border-b border-gray-200 pb-3 sm:pb-4">
                    <label className="flex items-start space-x-2 sm:space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="coupon"
                        value={coupon.id}
                        checked={selectedCoupon === coupon.id}
                        onChange={(e) => setSelectedCoupon(e.target.value)}
                        className="mt-1 w-4 h-4 border-transparent focus:outline-none"
                        style={{ 
                          accentColor: "#035F0F"
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

          {/* Bottom Action Bar */}
          <div className="border-t border-gray-200 bg-white p-3 sm:p-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-base sm:text-lg font-semibold text-gray-900">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm" style={{ color: "#035F0F" }}>- ₹{selectedCouponData ? selectedCouponData.discount : 0}</span>
                </div>
              </div>
              <div className="ml-3 sm:ml-4">
                <button
                  onClick={onClose}
                  className="text-white py-2 sm:py-3 px-8 sm:px-10 rounded-md font-medium transition-colors whitespace-nowrap text-sm sm:text-base cursor-pointer"
                  style={{ backgroundColor: "#035F0F" }}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 