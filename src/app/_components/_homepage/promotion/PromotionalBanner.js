export default function PromotionalBanner({ fullWidth = false }) {
  const banners = [
    {
      id: 1,
      title: "Crystal Clear Audio, Now at 15% OFF!",
      description: "Crisp sound. Comfortable fit. Limited time offer",
      image: "/left.png",
      alt: "SOUNDPEATS Headphones",
      background: "linear-gradient(90deg, #E3EBFF, #ECF1FF)",
      buttonText: "Shop now"
    },
    {
      id: 2,
      title: "Pro Sound, Pro Price",
      description: "Get pro-quality IEMs at unbeatable prices. Limited time only",
      image: "/right.png",
      alt: "Professional IEMs",
      background: "#F4FFAA",
      buttonText: "Shop now"
    }
  ];

  return (
    <div className={`py-6 md:py-8 lg:py-10 ${fullWidth ? 'px-0' : 'px-4 sm:px-6 md:px-12 lg:px-8 xl:px-[200px]'}`}>
      {/* Mobile: Carousel with one banner at a time */}
      <div className="lg:hidden">
        <div className="flex flex-row gap-0 w-full overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          {banners.map((banner) => (
            <div key={banner.id} className="flex-shrink-0 w-full snap-start">
              <div 
                className="relative overflow-hidden rounded-lg"
                style={{
                  height: "300px",
                  background: banner.background
                }}
              >
                {/* Product Image - Right Side */}
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <img
                    src={banner.image}
                    alt={banner.alt}
                    className="w-32 h-32 sm:w-40 sm:h-40 object-contain"
                  />
                </div>

                {/* Content - Left Side */}
                <div className="absolute left-6 top-1/2 transform -translate-y-1/2 max-w-xs">
                  <h3 
                    className="text-xl sm:text-2xl font-bold mb-3"
                    style={{ color: "#333333" }}
                  >
                    {banner.title}
                  </h3>
                  <p 
                    className="text-sm sm:text-base mb-4 text-gray-600"
                    style={{ color: "#333333" }}
                  >
                    {banner.description}
                  </p>
                  <button 
                    className="text-gray-800 font-medium px-4 py-2 sm:px-6 sm:py-3 rounded text-sm sm:text-base hover:bg-gray-50 transition-colors duration-200"
                    style={{ 
                      color: "#333333",
                      border: "1px solid #333"
                    }}
                  >
                    {banner.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile scroll indicator */}
        <div className="w-full mt-4">
          <div className="flex justify-center">
            <div className="w-20 h-1 bg-gray-200 rounded-full">
              <div className="w-10 h-1 bg-[#035F0F] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: Side by side layout */}
      <div className="hidden lg:flex flex-row gap-0">
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
              className="w-48 h-48 xl:w-48 xl:h-48 object-contain"
            />
          </div>

          {/* Content - Left Side */}
          <div className="absolute left-6 top-1/2 transform -translate-y-1/2 max-w-xs">
            <h3 
              className="text-2xl xl:text-2xl font-bold mb-3"
              style={{ color: "#333333" }}
            >
              Crystal Clear Audio, Now at 15% OFF!
            </h3>
            <p 
              className="text-base xl:text-base mb-4 text-gray-600"
              style={{ color: "#333333" }}
            >
              Crisp sound. Comfortable fit. Limited time offer
            </p>
            <button 
              className="text-gray-800 font-medium px-6 py-3 xl:px-6 xl:py-3 rounded text-base xl:text-base hover:bg-gray-50 transition-colors duration-200"
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
              className="w-48 h-48 xl:w-48 xl:h-48 object-contain"
            />
          </div>

          {/* Content - Left Side */}
          <div className="absolute left-6 top-1/2 transform -translate-y-1/2 max-w-xs">
            <h3 
              className="text-2xl xl:text-2xl font-bold mb-3"
              style={{ color: "#333333" }}
            >
              Pro Sound, Pro Price
            </h3>
            <p 
              className="text-base xl:text-base mb-4 text-gray-600"
              style={{ color: "#333333" }}
            >
              Get pro-quality IEMs at unbeatable prices. Limited time only
            </p>
            <button 
              className="text-gray-800 font-medium px-6 py-3 xl:px-6 xl:py-3 rounded text-base xl:text-base hover:bg-gray-50 transition-colors duration-200"
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