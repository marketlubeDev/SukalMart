

export default function FeaturedProductCard({ product }) {
  return (
    <div className="flex flex-row gap-4 md:gap-6 w-full md:w-1/2 bg-white rounded-lg py-2 md:p-6 md:pl-0 shadow-sm">
      {/* Product Image - Mobile: 35%, Desktop: 50% of card - Reduced height */}
      <div className="relative w-1/3 md:w-1/2 aspect-[4/3] md:aspect-square rounded overflow-hidden flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {/* Wishlist Button */}
        <button className="absolute top-2 md:top-3 left-2 md:left-3 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
          <img src="/like.svg" alt="Wishlist" className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </div>

      {/* Product Info - Mobile: 65%, Desktop: 50% of card */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex flex-col gap-2 md:gap-3">
          <h3
            className="text-[16px] md:text-[18px] font-semibold"
            style={{
              color: "#333333",
              fontFamily: "'Nunito Sans', sans-serif",
              letterSpacing: "-0.36px",
            }}
          >
            {product.name}
          </h3>
          <p
            className="text-[12px] md:text-[14px] font-normal"
            style={{
              color: "rgba(51,51,51,0.7)",
              fontFamily: "'Nunito Sans', sans-serif",
              letterSpacing: "-0.28px",
            }}
          >
            {product.category}
          </p>

          {/* Rating */}
          <div className="flex flex-row gap-1 md:gap-2 items-center">
            <div className="flex flex-row gap-0.5 md:gap-1 items-center">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={
                    i < Math.floor(product.rating)
                      ? "/filledstar.svg"
                      : "/star.svg"
                  }
                  alt="Star"
                  className="w-3 h-3 md:w-4 md:h-4"
                />
              ))}
            </div>
            <span
              className="text-[14px] md:text-[16px] font-medium"
              style={{
                color: "#333333",
                fontFamily: "'Nunito Sans', sans-serif",
                letterSpacing: "-0.32px",
              }}
            >
              {product.rating}
            </span>
          </div>

          {/* Description - Limited to 2 lines */}
          <p
            className="text-[14px] md:text-[16px] font-normal line-clamp-2"
            style={{
              color: "rgba(51,51,51,0.8)",
              fontFamily: "'Nunito Sans', sans-serif",
              letterSpacing: "-0.32px",
              lineHeight: "1.4",
            }}
          >
            {product.description}
          </p>
        </div>

        {/* Price and Button */}
        <div className="flex flex-col gap-3 md:gap-4">
          <div className="flex flex-row gap-2 md:gap-3 items-center">
            <span
              className="text-[18px] md:text-[20px] font-bold"
              style={{
                color: "#035F0F",
                fontFamily: "'Nunito Sans', sans-serif",
                letterSpacing: "-0.4px",
              }}
            >
              {product.price}
            </span>
            <span
              className="text-[14px] md:text-[16px] font-normal line-through"
              style={{
                color: "rgba(51,51,51,0.6)",
                fontFamily: "'Nunito Sans', sans-serif",
                letterSpacing: "-0.32px",
              }}
            >
              {product.originalPrice}
            </span>
          </div>
          <button
            className="bg-white text-[#035F0F] font-medium transition-colors self-start"
            style={{
              display: "flex",
              height: "40px",
              padding: "12px 24px",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              borderRadius: "4px",
              border: "1px solid #035F0F",
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
