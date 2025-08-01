export default function PromotionalBanner() {
  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-[200px] py-6 md:py-8 lg:py-10">
      <div className="flex flex-col lg:flex-row gap-0">
        {/* Left Section - Crystal Clear Audio */}
        <div 
          className="flex-1 relative overflow-hidden rounded-l-lg"
          style={{
            height: "240px",
            flex: "1 0 0",
            borderRadius: "4px 0 0 4px",
            background: "linear-gradient(90deg, #E3EBFF, #ECF1FF)"
          }}
        >
          {/* Product Image - Right Side */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <img
              src="/left.png"
              alt="SOUNDPEATS Headphones"
              className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-contain"
            />
          </div>

          {/* Content - Left Side */}
          <div className="absolute left-6 top-1/2 transform -translate-y-1/2 max-w-xs">
            <h3 
              className="text-xl sm:text-2xl font-bold mb-3"
              style={{ color: "#333333" }}
            >
              Crystal Clear Audio, Now at 15% OFF!
            </h3>
            <p 
              className="text-sm sm:text-base mb-4 text-gray-600"
              style={{ color: "#333333" }}
            >
              Crisp sound. Comfortable fit. Limited time offer
            </p>
            <button 
              className="text-gray-800 font-medium px-4 py-2 sm:px-6 sm:py-3 rounded text-sm sm:text-base hover:bg-gray-50 transition-colors duration-200"
              style={{ 
                color: "#333333",
                border: "1px solid #333"
              }}
            >
              Shop now
            </button>
          </div>
        </div>

        {/* Right Section - Pro Sound, Pro Price */}
        <div 
          className="flex-1 relative overflow-hidden rounded-r-lg"
          style={{
            height: "240px",
            flex: "1 0 0",
            borderRadius: "0 4px 4px 0",
            background: "#F4FFAA"
          }}
        >
          {/* Product Image - Right Side */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <img
              src="/right.png"
              alt="Professional IEMs"
              className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-contain"
            />
          </div>

          {/* Content - Left Side */}
          <div className="absolute left-6 top-1/2 transform -translate-y-1/2 max-w-xs">
            <h3 
              className="text-xl sm:text-2xl font-bold mb-3"
              style={{ color: "#333333" }}
            >
              Pro Sound, Pro Price
            </h3>
            <p 
              className="text-sm sm:text-base mb-4 text-gray-600"
              style={{ color: "#333333" }}
            >
              Get pro-quality IEMs at unbeatable prices. Limited time only
            </p>
            <button 
              className="text-gray-800 font-medium px-4 py-2 sm:px-6 sm:py-3 rounded text-sm sm:text-base hover:bg-gray-50 transition-colors duration-200"
              style={{
                color: "#333333",
                border: "1px solid #333"
              }}
            >
              Shop now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 