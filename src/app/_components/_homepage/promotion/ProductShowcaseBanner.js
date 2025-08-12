export default function ProductShowcaseBanner({ fullWidth = false }) {
  const showcaseItems = [
    {
      image: "/banner/haircarebanner1.jpg",
    },
    {
      image: "/banner/haircarebanner2.jpg",
    },
    {
      image: "/banner/haircarebanner3.jpg",
    },
  ];

  return (
    <div
      className={`py-6 md:py-8 lg:py-10 ${
        fullWidth ? "px-0" : "px-4 sm:px-6 md:px-12 lg:px-8 xl:px-[200px]"
      }`}
    >
      {/* Mobile: Carousel with one item at a time */}
      <div className="lg:hidden">
        <div className="flex flex-row gap-0 w-full overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          {showcaseItems.map((item, index) => (
            <div key={index} className="flex-shrink-0 w-full snap-start">
              <div
                className="relative overflow-hidden rounded-lg"
                style={{
                  height: "300px",
                  background: item.background,
                }}
              >
                {/* Product Image - Center */}
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <img
                    src={item.image}
                    alt={`Haircare Banner ${index + 1}`}
                    className="w-40 h-40 sm:w-48 sm:h-48 object-contain"
                  />
                </div>

                {/* Content - Left Side */}
                <div className="absolute left-6 top-1/2 transform -translate-y-1/2 max-w-xs">
                  <h3
                    className="text-xl sm:text-2xl font-bold mb-2"
                    style={{ color: item.textColor }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm sm:text-base text-gray-600"
                    style={{ color: item.textColor }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile scroll indicator */}
        <div className="w-full mt-4">
          <div className="flex justify-center">
            <div className="w-20 h-1 bg-gray-200 rounded-full">
              <div className="w-7 h-1 bg-[#035F0F] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: Custom layout - Left card full height, right cards stacked */}
      <div className="hidden lg:flex lg:gap-4 lg:h-[426px]">
        {/* First Card - Full Image */}
        <div
          className="relative overflow-hidden flex-1"
          style={{
            height: "100%",
            borderRadius: "3.324px",
          }}
        >
          <img
            src="/banner/haircarebanner1.jpg"
            alt="Haircare Banner 1"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Column - Stacked cards with gap */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Second Card - Full Image */}
          <div
            className="relative overflow-hidden"
            style={{
              height: "calc(50% - 8px)", // Half height minus gap
              borderRadius: "3.324px",
            }}
          >
            <img
              src="/banner/haircarebanner2.jpg"
              alt="Haircare Banner 2"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Third Card - Full Image */}
          <div
            className="relative overflow-hidden"
            style={{
              height: "calc(50% - 8px)", // Half height minus gap
              borderRadius: "3.324px",
            }}
          >
            <img
              src="/banner/haircarebanner3.jpg"
              alt="Haircare Banner 3"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
