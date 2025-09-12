"use client";

import { useState } from "react";
import { Drawer } from "antd";
import Button from "@/app/_components/common/Button";
import { useLanguage } from "../context/LanguageContext";
import { t } from "../../../lib/translations";

export default function CouponSidebar({ isOpen, onClose }) {
  const { language } = useLanguage();
  const [selectedCoupon, setSelectedCoupon] = useState("SAVE100");
  const [couponCode, setCouponCode] = useState("");

  const coupons = [
    {
      id: "SAVE100",
      code: "SAVE100",
      description: "Flat AED 100 OFF on orders above AED 999",
      discount: 100
    },
    {
      id: "GET250",
      code: "GET250", 
      description: "AED 250 OFF when you spend AED 2,499 or more",
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
      description: "Extra AED 200 OFF on IEMs above AED 1,499",
      discount: 200
    },
    {
      id: "EARBUDLOVE",
      code: "EARBUDLOVE",
      description: "Flat AED 150 OFF on all true wireless earbuds",
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

  return (
          <Drawer
        title={null}
        placement="right"
        onClose={onClose}
        open={isOpen}
        width={550}
        className="coupon-drawer-custom"
        styles={{
          body: {
            padding: 0,
            backgroundColor: '#F5F5F5',
            height: '100vh',
            maxHeight: '100vh',
            overflow: 'hidden',
          },
          header: {
            display: 'none',
          },
          mask: {
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
          },
          wrapper: {
            height: '100vh',
            maxHeight: '100vh',
            overflow: 'hidden',
          },
          content: {
            height: '100vh',
            maxHeight: '100vh',
            overflow: 'hidden',
          },
        }}
        closeIcon={null}
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
            className="mr-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
            style={{ cursor: "pointer" }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2
            className="font-[600] text-xs sm:text-sm md:text-lg lg:text-xl"
            style={{
              color: "#333333",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
              letterSpacing: "-0.44px",
            }}
          >
            {t("cart.applyCouponAndOffers", language)}
          </h2>
        </div>
      </div>

              {/* Content */}
        <div className="flex flex-col h-screen overflow-hidden" style={{ maxHeight: '100vh' }}>
          {/* Content Section - Flexible height to fit 100vh */}
          <div
            className="flex-1 overflow-hidden"
            style={{ 
              paddingTop: "16px",
              paddingBottom: "16px",
              height: "calc(100vh - 80px - 60px)", // Header (80px) + Bottom (60px on mobile, 80px on desktop)
              maxHeight: "calc(100vh - 80px - 60px)",
              overflow: "hidden"
            }}
          >
                      {/* Main Content Wrapper */}
            <div className="bg-white">
                          {/* Coupon Code Input */}
              <div className="mb-4 sm:mb-6 px-3 sm:px-4">
                <input
                  type="text"
                  placeholder={t("cart.enterCouponPlaceholder", language)}
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
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
                        <span className="font-semibold text-gray-900 text-[10px] sm:text-xs md:text-sm lg:text-base">{coupon.code}</span>
                      </div>
                      <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">{coupon.description}</p>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

                  {/* Bottom Action Bar - Fixed height */}
          <div 
            className="border-t border-gray-200 bg-white p-2 sm:p-3 md:p-4 flex-shrink-0"
            style={{
              width: "100%",
              backgroundColor: "white",
              height: "60px",
              minHeight: "60px",
              maxHeight: "60px",
              flexShrink: 0,
              '@media (min-width: 640px)': {
                height: "70px",
                minHeight: "70px", 
                maxHeight: "70px"
              },
              '@media (min-width: 768px)': {
                height: "80px",
                minHeight: "80px",
                maxHeight: "80px"
              }
            }}
          >
          <div className="flex items-center justify-between h-full">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-900">AED {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs md:text-sm" style={{ color: "var(--color-primary)" }}>- AED {selectedCouponData ? selectedCouponData.discount : 0}</span>
              </div>
            </div>
            <div className="ml-2 sm:ml-3 md:ml-4">
              <Button
                variant="primary"
                size="small"
                onClick={onClose}
                className="whitespace-nowrap text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-6 py-1 sm:py-2 md:py-3 h-7 sm:h-9 md:h-11 min-w-[60px] sm:min-w-[80px] md:min-w-[100px]"
                style={{ borderRadius: "4px" }}
              >
                {t("cart.apply", language)}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
}