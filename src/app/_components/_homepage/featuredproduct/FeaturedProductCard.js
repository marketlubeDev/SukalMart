

export default function FeaturedProductCard({ product }) {
  return (
    <div className="flex flex-row gap-6 w-1/2 bg-white rounded-lg p-6 pl-0">
      {/* Product Image - 50% of card */}
      <div className="relative w-1/2 aspect-square rounded overflow-hidden flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {/* Wishlist Button */}
        <button className="absolute top-3 left-3 w-8 h-8 flex items-center justify-center">
          <img src="/like.svg" alt="Wishlist" className="w-5 h-5" />
        </button>
      </div>

      {/* Product Info - 50% of card */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          <h3
            className="text-[18px] font-semibold"
            style={{
              color: "#333333",
              fontFamily: "'Nunito Sans', sans-serif",
              letterSpacing: "-0.36px",
            }}
          >
            {product.name}
          </h3>
          <p
            className="text-[14px] font-normal"
            style={{
              color: "rgba(51,51,51,0.7)",
              fontFamily: "'Nunito Sans', sans-serif",
              letterSpacing: "-0.28px",
            }}
          >
            {product.category}
          </p>

          {/* Rating */}
          <div className="flex flex-row gap-2 items-center">
            <div className="flex flex-row gap-1 items-center">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={
                    i < Math.floor(product.rating)
                      ? "/filledstar.svg"
                      : "/star.svg"
                  }
                  alt="Star"
                  className="w-4 h-4"
                />
              ))}
            </div>
            <span
              className="text-[16px] font-medium"
              style={{
                color: "#333333",
                fontFamily: "'Nunito Sans', sans-serif",
                letterSpacing: "-0.32px",
              }}
            >
              {product.rating}
            </span>
          </div>

          {/* Description */}
          <p
            className="text-[16px] font-normal"
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
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-3 items-center">
            <span
              className="text-[20px] font-bold"
              style={{
                color: "#035F0F",
                fontFamily: "'Nunito Sans', sans-serif",
                letterSpacing: "-0.4px",
              }}
            >
              {product.price}
            </span>
            <span
              className="text-[16px] font-normal line-through"
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
              height: "48px",
              padding: "16px 32px",
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
