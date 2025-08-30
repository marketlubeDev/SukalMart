"use client";

import { useState, useEffect } from "react";
import { Drawer } from "antd";
import CouponSidebar from "./CouponSidebar";
import Button from "@/app/_components/common/Button";

export default function CartSidebar({ isOpen, onClose }) {
  const [quantities, setQuantities] = useState({
    1: 1,
    2: 1,
  });
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(true);
  const [showCouponSidebar, setShowCouponSidebar] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(550);
  const [cartItems, setCartItems] = useState([]);

  const loadCart = () => {
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem('cartItems') : null;
      const parsed = raw ? JSON.parse(raw) : [];
      setCartItems(Array.isArray(parsed) ? parsed : []);
      const initialQuantities = {};
      (Array.isArray(parsed) ? parsed : []).forEach((item) => {
        initialQuantities[item.id] = Number(item.quantity) > 0 ? Number(item.quantity) : 1;
      });
      setQuantities((prev) => ({ ...prev, ...initialQuantities }));
    } catch (err) {
      console.error('Failed to load cart from localStorage', err);
      setCartItems([]);
    }
  };

  const persistCart = (items) => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('cartItems', JSON.stringify(items));
        // Notify listeners
        window.dispatchEvent(new Event('cart-updated'));
      }
    } catch (err) {
      console.error('Failed to persist cart to localStorage', err);
    }
  };

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      // Add a small delay to prevent jarring transition
      const timer = setTimeout(() => {
        document.body.style.overflow = "unset";
      }, 300); // Match the animation duration

      return () => clearTimeout(timer);
    }

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Update drawer width responsively on client only
  useEffect(() => {
    const updateWidth = () => {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      setDrawerWidth(isMobile ? '100%' : 550);
    };

    updateWidth();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateWidth);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', updateWidth);
      }
    };
  }, []);

  // Load cart when opened and when external updates happen
  useEffect(() => {
    if (isOpen) loadCart();
  }, [isOpen]);

  useEffect(() => {
    const onCartUpdated = () => loadCart();
    if (typeof window !== 'undefined') {
      window.addEventListener('cart-updated', onCartUpdated);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('cart-updated', onCartUpdated);
      }
    };
  }, []);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity >= 1) {
      setQuantities((prev) => ({
        ...prev,
        [itemId]: newQuantity,
      }));
      // Also persist to localStorage
      setCartItems((prev) => {
        const next = prev.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
        persistCart(next);
        return next;
      });
    }
  };

  const removeItem = (itemId) => {
    const next = cartItems.filter((item) => item.id !== itemId);
    setCartItems(next);
    const { [itemId]: _, ...rest } = quantities;
    setQuantities(rest);
    persistCart(next);
  };

  const handleProceedToCheckout = () => {
    onClose();
    window.location.href = '/checkout';
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (quantities[item.id] || item.quantity || 1),
    0
  );
  const total = subtotal + 400; // Adding delivery cost
  const discount = 400;
  const couponDiscount = 199;

  return (
    <>
      <Drawer
        title={null}
        placement="right"
        onClose={onClose}
        open={isOpen}
        width={drawerWidth}
        className="cart-drawer-custom"
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
          className="flex items-center justify-between p-4 border-b border-gray-200 bg-white"
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
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
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
        <div className="flex flex-col h-screen overflow-hidden" style={{ maxHeight: '100vh' }}>
          {/* Items Section - Flexible height to fit 100vh */}
          <div
            className="flex-1 overflow-hidden"
            style={{ 
              paddingTop: "16px",
              paddingBottom: "16px",
              height: "calc(100vh - 80px - 80px)", // Header (80px) + Bottom (80px) = 160px
              maxHeight: "calc(100vh - 80px - 80px)",
              overflow: "hidden"
            }}
          >
            {/* Items Header */}
            <div className="flex justify-between items-center mb-4 px-4" style={{ overflow: "hidden" }}>
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
                overflow: "hidden"
              }}
            >
              {cartItems.length === 0 ? (
                // Empty Cart Message
                <div
                  className="flex flex-col items-center justify-center py-12 px-4"
                  style={{
                    minHeight: "200px",
                    textAlign: "center"
                  }}
                >
                  {/* Empty Cart Icon */}
                  <div
                    className="mb-4"
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      backgroundColor: "#F5F5F5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "16px"
                    }}
                  >
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: "#999" }}
                    >
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                  </div>
                  
                  {/* Empty Cart Text */}
                  <h3
                    style={{
                      color: "#333333",
                      fontSize: "20px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "normal",
                      letterSpacing: "-0.4px",
                      marginBottom: "8px"
                    }}
                  >
                    Your cart is empty
                  </h3>
                  
                  <p
                    style={{
                      color: "rgba(51, 51, 51, 0.70)",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                      letterSpacing: "-0.32px",
                      marginBottom: "24px"
                    }}
                  >
                    Looks like you haven't added any items to your cart yet
                  </p>
                  
                  {/* Shop Now Button */}
                  <button
                    onClick={() => {
                      onClose();
                      window.location.href = '/products';
                    }}
                    style={{
                      display: "flex",
                      padding: "12px 24px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "8px",
                      borderRadius: "4px",
                      background: "var(--color-primary)",
                      color: "#fff",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "normal",
                      border: "none",
                      transition: "background 0.2s",
                      cursor: "pointer",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.background = "var(--color-primary)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.background = "var(--color-primary)")
                    }
                  >
                    Shop Now
                  </button>
                </div>
              ) : (
                // Cart Items List
                cartItems.map((item, idx) => (
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
                    style={{ cursor: "pointer" }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
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
                        Type:{" "}
                        <span style={{ color: "#222", fontWeight: 500 }}>
                          {item.color || 'Standard'}
                        </span>
                      </span>
                      <span>
                        Size:{" "}
                        <span style={{ color: "#222", fontWeight: 500 }}>
                          {item.plug || 'Default'}
                        </span>
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
                            border: "1px solid var(--color-primary)",
                            background: "#F7F3F4",
                            minWidth: "72px",
                            maxWidth: "80px",
                            position: "relative",
                          }}
                        >
                          <button
                            onClick={() =>
                              updateQuantity(item.id, (quantities[item.id] || item.quantity || 1) - 1)
                            }
                            style={{
                              width: "28px",
                              height: "28px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: "transparent",
                              border: "none",
                              color: "var(--color-primary)",
                              fontSize: "18px",
                              fontWeight: "bold",
                              cursor: "pointer",
                              transition: "background 0.2s",
                              borderRadius: "3px",
                              lineHeight: 1,
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.background = "#E6F9ED")
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.background = "transparent")
                            }
                          >
                            -
                          </button>
                          <span
                            style={{
                              padding: "0 2px",
                              fontSize: "15px",
                              fontWeight: 600,
                              color: "var(--color-primary)",
                              minWidth: "20px",
                              textAlign: "center",
                              userSelect: "none",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              height: "100%",
                            }}
                          >
                            {String(quantities[item.id] || item.quantity || 1).padStart(2, "0")}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, (quantities[item.id] || item.quantity || 1) + 1)
                            }
                            style={{
                              width: "28px",
                              height: "28px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: "transparent",
                              border: "none",
                              color: "var(--color-primary)",
                              fontSize: "18px",
                              fontWeight: "bold",
                              cursor: "pointer",
                              transition: "background 0.2s",
                              borderRadius: "3px",
                              lineHeight: 1,
                            }}
                            onMouseOver={(e) =>
                              (e.currentTarget.style.background = "#E6F9ED")
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.style.background = "transparent")
                            }
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
                            color: "var(--color-primary)",
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
                          ₹{(item.price || 0).toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-400 line-through">
                          ₹{(item.originalPrice || 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                ))
              )}
            </div>

            {/* Coupon Section - Only show when cart has items */}
            {cartItems.length > 0 && (
            <div className="mt-6 bg-[#F5F5F5]" style={{ overflow: "hidden" }}>
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
                className="flex items-center justify-between p-3 bg-white border border-gray-200 px-4 w-full hover:bg-gray-50 transition-colors cursor-pointer"
                style={{ cursor: "pointer" }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white">
                    <img src="/coupon.svg" alt="Coupon" className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-800">
                      Apply Coupon & Offers
                    </p>
                    <p className="text-xs text-gray-600">
                      Use a valid coupon code and get an instant discount.
                    </p>
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
            )}

            {/* Order Summary - Only show when cart has items */}
            {cartItems.length > 0 && (
            <div className="mt-6" style={{ overflow: "hidden" }}>
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
                    aria-label={
                      orderSummaryOpen
                        ? "Collapse order summary"
                        : "Expand order summary"
                    }
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
                      cursor: "pointer",
                    }}
                    tabIndex={0}
                  >
                    <svg
                      className="w-5 h-5 text-gray-400 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{
                        transform: orderSummaryOpen
                          ? "rotate(0deg)"
                          : "rotate(-90deg)",
                        transition: "transform 0.2s",
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
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
                          color: "var(--color-primary)",
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
                          color: "var(--color-primary)",
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
                          color: "var(--color-primary)",
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
            )}
          </div>

          {/* Bottom Action Bar - Fixed height */}
          <div
            className="border-t border-gray-200 p-3 bg-white"
            style={{
              width: "100%",
              backgroundColor: "white",
              height: "80px",
              minHeight: "80px",
              maxHeight: "80px",
              flexShrink: 0
            }}
          >
            {cartItems.length === 0 ? (
              // Empty cart bottom bar - hidden when cart is empty
              <div style={{ display: "none" }}></div>
            ) : (
              // Cart with items bottom bar
            <div className="flex items-center justify-between">
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
                    color: "rgba(51, 51, 51, 0.70)",
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
                  onMouseOver={(e) => (e.currentTarget.style.color = "#333")}
                  onMouseOut={(e) =>
                    (e.currentTarget.style.color = "rgba(51, 51, 51, 0.7)")
                  }
                >
                  View Details
                </button>
              </div>
              <Button
                variant="primary"
                size="large"
                onClick={handleProceedToCheckout}
                className="font-medium sm:w-[260px]"
                style={{ borderRadius: "4px" }}
              >
                Proceed to checkout
              </Button>
            </div>
            )}
          </div>
        </div>
      </Drawer>

      {/* Coupon Sidebar */}
      <CouponSidebar
        isOpen={showCouponSidebar}
        onClose={() => setShowCouponSidebar(false)}
      />
    </>
  );
}