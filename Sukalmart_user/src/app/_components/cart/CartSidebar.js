"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import Button from "../common/Button";

// Dynamically import CouponSidebar to reduce initial bundle size
const CouponSidebar = dynamic(() => import("./CouponSidebar"), {
  loading: () => <div>Loading...</div>,
  ssr: false
});

export default function CartSidebar({ isOpen, onClose }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState("550px");
  const [quantities, setQuantities] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(true);
  const [showCouponSidebar, setShowCouponSidebar] = useState(false);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Cart operations with error handling and performance optimization
  const loadCart = useCallback(() => {
    if (!mounted || typeof window === "undefined") return;
    
    try {
      const raw = localStorage.getItem('cartItems');
      const parsed = raw ? JSON.parse(raw) : [];
      const validatedItems = Array.isArray(parsed) ? parsed : [];
      
      setCartItems(validatedItems);
      
      const initialQuantities = {};
      validatedItems.forEach((item) => {
        initialQuantities[item.id] = Math.max(Number(item.quantity) || 1, 1);
      });
      setQuantities(initialQuantities);
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
      setCartItems([]);
      setQuantities({});
    }
  }, [mounted]);

  const persistCart = useCallback((items) => {
    if (!mounted || typeof window === "undefined") return;
    
    try {
      localStorage.setItem('cartItems', JSON.stringify(items));
      // Dispatch custom event for cart updates
      window.dispatchEvent(new CustomEvent('cart-updated', { detail: items }));
    } catch (error) {
      console.error('Failed to persist cart to localStorage:', error);
    }
  }, [mounted]);

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (!mounted || typeof document === "undefined") return;
    
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => {
        document.body.style.overflow = "unset";
      }, 300);
      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, mounted]);

  // Responsive drawer width
  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;
    
    const updateWidth = () => {
      setDrawerWidth(window.innerWidth < 768 ? "100%" : "550px");
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [mounted]);

  // Load cart when opened and listen for external updates
  useEffect(() => {
    if (isOpen && mounted) {
      loadCart();
    }
  }, [isOpen, mounted, loadCart]);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;
    
    const handleCartUpdate = () => loadCart();
    window.addEventListener('cart-updated', handleCartUpdate);
    
    return () => window.removeEventListener('cart-updated', handleCartUpdate);
  }, [mounted, loadCart]);

  // Optimized quantity update
  const updateQuantity = useCallback((itemId, newQuantity) => {
    if (!mounted || newQuantity < 1) return;
    
    setQuantities(prev => ({
      ...prev,
      [itemId]: newQuantity,
    }));
    
    setCartItems(prev => {
      const updated = prev.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      persistCart(updated);
      return updated;
    });
  }, [mounted, persistCart]);

  // Optimized item removal
  const removeItem = useCallback((itemId) => {
    setCartItems(prev => {
      const filtered = prev.filter(item => item.id !== itemId);
      persistCart(filtered);
      return filtered;
    });
    
    setQuantities(prev => {
      const { [itemId]: _, ...rest } = prev;
      return rest;
    });
  }, [persistCart]);

  // Navigation handlers
  const handleProceedToCheckout = useCallback(() => {
    onClose();
    router.push('/checkout');
  }, [onClose, router]);

  const handleShopNow = useCallback(() => {
    onClose();
    router.push('/products');
  }, [onClose, router]);

  // Memoized calculations
  const calculations = useMemo(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + (item.price || 0) * (quantities[item.id] || item.quantity || 1),
      0
    );
    const deliveryCost = 400;
    const discount = 400;
    const couponDiscount = 199;
    const total = subtotal + deliveryCost;
    const finalTotal = total - discount - couponDiscount;
    
    return {
      subtotal,
      total,
      discount,
      couponDiscount,
      finalTotal,
      itemCount: cartItems.length
    };
  }, [cartItems, quantities]);

  // Don't render anything during SSR
  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-transparent"
          onClick={onClose}
          style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.25), rgba(0,0,0,0.15), rgba(0,0,0,0.08), rgba(0,0,0,0))' }}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full bg-gray-100 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          width: drawerWidth,
          maxWidth: '100vw',
          height: '100vh',
          maxHeight: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Header - Fixed */}
        <header 
          className="flex items-center justify-between p-4 border-b border-gray-200 bg-white"
          style={{
            height: "80px",
            minHeight: "80px",
            maxHeight: "80px",
            flexShrink: 0
          }}
        >
          <div className="flex items-center">
            <button
              onClick={onClose}
              className="mr-3 p-1 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-label="Close cart"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
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
              className="font-semibold"
              style={{
                color: "#333333",
                fontSize: "22px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "normal",
                letterSpacing: "-0.44px",
              }}
            >
              Your cart
            </h2>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-col h-screen overflow-hidden" style={{ maxHeight: '100vh' }}>
          {/* Scrollable Content */}
          <div
            className="flex-1 overflow-y-auto overflow-x-hidden"
            style={{ 
              paddingTop: "16px",
              paddingBottom: "16px",
              height: "calc(100vh - 160px)",
              maxHeight: "calc(100vh - 160px)",
            }}
          >
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
                {calculations.itemCount} products
              </span>
            </div>

            {/* Cart Items Container */}
            <div className="w-full bg-white">
              {calculations.itemCount === 0 ? (
                // Empty Cart State
                <div
                  className="flex flex-col items-center justify-center py-12 px-4"
                  style={{ minHeight: "200px", textAlign: "center" }}
                >
                  <div
                    className="mb-4 flex items-center justify-center rounded-full bg-gray-100"
                    style={{ width: "80px", height: "80px" }}
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
                      aria-hidden="true"
                    >
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                  </div>
                  
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
                  
                  <button
                    onClick={handleShopNow}
                    className="transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
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
                      cursor: "pointer",
                    }}
                  >
                    Shop Now
                  </button>
                </div>
              ) : (
                // Cart Items List
                cartItems.map((item, idx) => (
                  <article
                    key={`cart-item-${item.id}`}
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
                      className="absolute top-3 right-3 p-1 hover:bg-gray-200 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
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
                      className="bg-white rounded-lg flex items-center justify-center flex-shrink-0 relative"
                      style={{
                        width: "64px",
                        height: "64px",
                        aspectRatio: "1/1",
                        marginRight: "16px",
                      }}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="object-contain"
                        sizes="64px"
                        priority={idx < 3}
                        onError={(e) => {
                          e.target.src = '/placeholder-product.png';
                        }}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0 w-full">
                      <h4
                        className="text-base font-semibold mb-1 line-clamp-1"
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
                        className="mb-1 text-sm text-gray-600"
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
                          <span className="text-xs text-gray-600">Qty:</span>
                          <div
                            className="flex items-center"
                            style={{
                              display: "flex",
                              height: "32px",
                              padding: "0 3px",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "6px",
                              borderRadius: "4px",
                              border: "1px solid rgba(109, 13, 38, 0.40)",
                              background: "rgba(109, 13, 38, 0.06)",
                              minWidth: "72px",
                              maxWidth: "80px",
                            }}
                          >
                            <button
                              onClick={() =>
                                updateQuantity(item.id, (quantities[item.id] || item.quantity || 1) - 1)
                              }
                              disabled={(quantities[item.id] || item.quantity || 1) <= 1}
                              className="flex items-center justify-center transition-colors hover:bg-red-100 focus:outline-none focus:ring-1 focus:ring-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
                              style={{
                                width: "28px",
                                height: "28px",
                                background: "transparent",
                                border: "none",
                                color: "var(--color-primary)",
                                fontSize: "18px",
                                fontWeight: "bold",
                                cursor: "pointer",
                                borderRadius: "3px",
                                lineHeight: 1,
                              }}
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            
                            <span
                              className="text-center select-none"
                              style={{
                                padding: "0 2px",
                                fontSize: "15px",
                                fontWeight: 600,
                                color: "var(--color-primary)",
                                minWidth: "20px",
                                textAlign: "center",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "100%",
                              }}
                              aria-label={`Quantity: ${quantities[item.id] || item.quantity || 1}`}
                            >
                              {String(quantities[item.id] || item.quantity || 1).padStart(2, "0")}
                            </span>
                            
                            <button
                              onClick={() =>
                                updateQuantity(item.id, (quantities[item.id] || item.quantity || 1) + 1)
                              }
                              className="flex items-center justify-center transition-colors hover:bg-red-100 focus:outline-none focus:ring-1 focus:ring-red-300"
                              style={{
                                width: "28px",
                                height: "28px",
                                background: "transparent",
                                border: "none",
                                color: "var(--color-primary)",
                                fontSize: "18px",
                                fontWeight: "bold",
                                cursor: "pointer",
                                borderRadius: "3px",
                                lineHeight: 1,
                              }}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Price Section */}
                        <div className="flex items-center space-x-2 ml-4">
                          <span
                            style={{
                              color: "var(--color-primary)",
                              fontSize: "16px",
                              fontStyle: "normal",
                              fontWeight: 600,
                              lineHeight: "100%",
                              letterSpacing: "-0.32px",
                            }}
                          >
                            ₹{(item.price || 0).toLocaleString('en-IN')}
                          </span>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className="text-xs text-gray-400 line-through">
                              ₹{item.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>

            {/* Coupon Section */}
            {calculations.itemCount > 0 && (
              <section className="mt-6 bg-gray-100">
                <h3
                  className="mb-3 px-4"
                  style={{
                    color: "#333333",
                    fontSize: "20px",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "normal",
                    letterSpacing: "-0.4px",
                  }}
                >
                  Coupon
                </h3>
                <button
                  onClick={() => setShowCouponSidebar(true)}
                  className="flex items-center justify-between p-3 bg-white border border-gray-200 px-4 w-full transition-colors hover:bg-gray-50 focus:outline-none"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white">
                      <Image
                        src="/coupon.svg"
                        alt="Coupon"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                        aria-hidden="true"
                      />
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
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </section>
            )}

            {/* Order Summary */}
            {calculations.itemCount > 0 && (
              <section className="mt-6">
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
                  <button
                    onClick={() => setOrderSummaryOpen(prev => !prev)}
                    className="p-1 hover:bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
                    aria-label={
                      orderSummaryOpen
                        ? "Collapse order summary"
                        : "Expand order summary"
                    }
                    aria-expanded={orderSummaryOpen}
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
                      }}
                      aria-hidden="true"
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
                        ₹{calculations.subtotal.toLocaleString('en-IN')}
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
                        padding: "16px 0",
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
                          ₹{calculations.total.toLocaleString('en-IN')}
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
                          -₹{calculations.discount.toLocaleString('en-IN')}
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
                          -₹{calculations.couponDiscount.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            )}
          </div>

          {/* Bottom Action Bar - Fixed */}
          {calculations.itemCount > 0 && (
            <footer
              className="border-t border-gray-200 p-3 bg-white flex-shrink-0"
              style={{
                width: "100%",
                height: "80px",
                minHeight: "80px",
                maxHeight: "80px",
              }}
            >
              <div className="flex items-center justify-between h-full">
                <div>
                  <div
                    className="text-lg sm:text-xl font-bold"
                    style={{
                      color: "#333333",
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "normal",
                      letterSpacing: "-0.4px",
                    }}
                  >
                    ₹{calculations.finalTotal.toLocaleString('en-IN')}
                  </div>
                  <button
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors underline focus:outline-none focus:ring-2 focus:ring-gray-300"
                    style={{
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                      letterSpacing: "-0.28px",
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                    }}
                  >
                    View Details
                  </button>
                </div>
                
                <Button
                  variant="primary"
                  size="large"
                  onClick={handleProceedToCheckout}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded"
                  style={{
                    display: "flex",
                    width: "200px",
                    padding: "12px 16px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    flexShrink: 0,
                    borderRadius: "4px",
                    background: "var(--color-primary)",
                    color: "#fff",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "normal",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Proceed to checkout
                </Button>
              </div>
            </footer>
          )}
        </main>
      </div>

      {/* Coupon Sidebar */}
      <CouponSidebar
        isOpen={showCouponSidebar}
        onClose={() => setShowCouponSidebar(false)}
      />
    </>
  );
}