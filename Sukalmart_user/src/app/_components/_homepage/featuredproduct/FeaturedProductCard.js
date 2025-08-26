"use client";

import { useRouter } from "next/navigation";

export default function FeaturedProductCard({ product }) {
  const router = useRouter();

  const addToCart = () => {
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem('cartItems') : null;
      const items = raw ? JSON.parse(raw) : [];
      const idx = items.findIndex((it) => String(it.id) === String(product.id));

      // Convert price strings to numbers (remove ₹ symbol and commas)
      const priceNumber = parseInt(product.price.replace(/[₹,]/g, ''));
      const originalPriceNumber = parseInt(product.originalPrice.replace(/[₹,]/g, ''));

      if (idx >= 0) {
        const existing = items[idx];
        items[idx] = { ...existing, quantity: (existing.quantity || 1) + 1 };
      } else {
        items.push({
          id: product.id,
          name: product.name,
          price: priceNumber,
          originalPrice: originalPriceNumber,
          image: product.image,
          color: product.category,
          plug: 'Default',
          quantity: 1,
        });
      }

      if (typeof window !== 'undefined') {
        window.localStorage.setItem('cartItems', JSON.stringify(items));
        window.dispatchEvent(new Event('cart-updated'));

        // Open the cart
        if (window.__openCart) {
          window.__openCart();
        } else {
          window.dispatchEvent(new Event('open-cart'));
        }
      }
    } catch (err) {
      console.error('Failed to add to cart', err);
    }
  };
  return (
    <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-6 w-full md:w-full lg:w-1/2 bg-white rounded-lg py-2 sm:py-3 md:py-4 lg:p-6 lg:pl-0 md:h-full">
      {/* Product Image - Mobile: 35%, Tablet: 40%, Desktop: 50% of card */}
      <div className="relative w-1/3 md:w-2/5 lg:w-1/2 aspect-[4/3] md:aspect-[3/2] lg:aspect-square rounded overflow-hidden flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {/* Wishlist Button */}
        <button className="absolute top-2 md:top-2 lg:top-3 left-2 md:left-2 lg:left-3 w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 flex items-center justify-center">
          <img src="/like.svg" alt="Wishlist" className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
        </button>
      </div>

      {/* Product Info - Mobile: 65%, Tablet: 60%, Desktop: 50% of card */}
      <div className="flex-1 flex flex-col justify-between md:h-full min-w-0">
        <div className="flex flex-col gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 md:flex-1">
          <h3
            className="text-[13px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-semibold"
            style={{
              color: "#333333",
              // fontFamily: "'Nunito Sans', sans-serif",
              letterSpacing: "-0.36px",
            }}
          >
            {product.name}
          </h3>
          <p
            className="text-[10px] sm:text-[11px] md:text-[12px] lg:text-[14px] font-normal"
            style={{
              color: "rgba(51,51,51,0.7)",
              // fontFamily: "'Nunito Sans', sans-serif",
              letterSpacing: "-0.28px",
            }}
          >
            {product.category}
          </p>

          {/* Rating */}
          <div className="flex flex-row gap-1 md:gap-1.5 lg:gap-2 items-center">
            <div className="flex flex-row gap-0.5 md:gap-0.5 lg:gap-1 items-center">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={
                    i < Math.floor(product.rating)
                      ? "/filledstar.svg"
                      : "/star.svg"
                  }
                  alt="Star"
                  className="w-2.5 h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4"
                />
              ))}
            </div>
            <span
              className="text-[11px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-medium"
              style={{
                color: "#333333",
                // fontFamily: "'Nunito Sans', sans-serif",
                letterSpacing: "-0.32px",
              }}
            >
              {product.rating}
            </span>
          </div>

          {/* Description - Limited to 2 lines */}
          <p
            className="text-[11px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-normal line-clamp-2 md:flex-1"
            style={{
              color: "rgba(51,51,51,0.8)",
              // fontFamily: "'Nunito Sans', sans-serif",
              letterSpacing: "-0.32px",
              lineHeight: "1.4",
            }}
          >
            {product.description}
          </p>
        </div>

        {/* Price and Button */}
        <div className="flex flex-col gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 md:mt-auto">
          <div className="flex flex-row gap-1.5 md:gap-2 lg:gap-3 items-center">
            <span
              className="text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-bold"
              style={{
                color: "var(--color-primary)",
                // fontFamily: "'Nunito Sans', sans-serif",
                letterSpacing: "-0.4px",
              }}
            >
              {product.price}
            </span>
            <span
              className="text-[11px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-normal line-through"
              style={{
                color: "rgba(51,51,51,0.6)",
                // fontFamily: "'Nunito Sans', sans-serif",
                letterSpacing: "-0.32px",
              }}
            >
              {product.originalPrice}
            </span>
          </div>
          <button
            onClick={addToCart}
            className="bg-white text-[var(--color-primary)] font-medium transition-colors self-start md:h-8 md:px-4 md:py-2 lg:h-10 lg:px-6 lg:py-3 cursor-pointer"
            style={{
              display: "flex",
              height: "32px",
              padding: "8px 16px",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              borderRadius: "4px",
              border: "1px solid var(--color-primary)",
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
