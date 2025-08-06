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
      <div className={`fixed top-0 right-0 h-screen w-full sm:w-[450px] md:w-[500px] lg:w-[550px] bg-white shadow-2xl z-50 transform transition-all duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
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
        <div className="flex flex-col h-full bg-[#F5F5F5]">
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Coupon Code Input Wrapper with white background */}
            <div className="mb-6 bg-white rounded-lg">
              <div className="p-4">
                <input
                  type="text"
                  placeholder="Enter your coupon code.."
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                />
              </div>
            </div>

            {/* Available Offers */}
            <div className="space-y-4">
              {/* <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Offers</h3> */}
              
              {coupons.map((coupon) => (
                <div key={coupon.id} className="border-b border-gray-200 pb-4">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="coupon"
                      value={coupon.id}
                      checked={selectedCoupon === coupon.id}
                      onChange={(e) => setSelectedCoupon(e.target.value)}
                      className="mt-1 w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-gray-900">{coupon.code}</span>
                      </div>
                      <p className="text-sm text-gray-600">{coupon.description}</p>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="border-t border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-semibold text-gray-900">₹{subtotal.toLocaleString()}</span>
              <span className="text-sm text-gray-600">Total</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-green-600">- ₹{selectedCouponData ? selectedCouponData.discount : 0}</span>
              <span className="text-sm text-gray-600">Discount</span>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 