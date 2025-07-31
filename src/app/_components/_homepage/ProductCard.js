

export default function ProductCard({
  product,
  showBadge = false,
  badgeText = "",
}) {
  return (
    <div className="bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative">
        <div className="aspect-square bg-gray-50 flex items-center justify-center p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>
        {/* Badge */}
        {showBadge && (
          <div className="absolute top-2 left-0 flex items-center shadow-lg">
            <div
              className="text-white px-2 text-xs font-bold flex items-center"
              style={{ backgroundColor: "#035F0F", height: "23px" }}
            >
              {badgeText}
            </div>
            <svg
              width="17"
              height="23"
              viewBox="0 0 17 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0.593506H14.7537C16.4453 0.593506 17.373 2.56306 16.2956 3.86727L0.708384 22.736C0.46957 23.0251 0 22.8562 0 22.4812V0.593506Z"
                fill="#035F0F"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">
          {product.name}
        </h3>
        <p className="text-xs text-gray-600 mb-3">{product.category}</p>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold" style={{ color: "#035F0F" }}>
            {product.price}
          </span>
          <span className="text-sm text-gray-500 line-through">
            {product.originalPrice}
          </span>
        </div>
        <div className="flex justify-start">
          <button
            className="bg-white text-black font-medium transition-colors"
            style={{
              display: "flex",
              height: "40px",
              padding: "14px 24px",
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
