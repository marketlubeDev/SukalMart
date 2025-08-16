"use client";
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
        fullWidth ? "px-4 sm:px-10 md:px-4 lg:px-4" : "px-4 sm:px-6 md:px-12 lg:px-8 xl:px-[200px]"
      }`}
    >
      {/* Mobile: one item at a time with horizontal scroll */}
      <div className="lg:hidden">
        <div className="flex flex-row gap-0 w-full overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          {showcaseItems.map((item, index) => (
            <div key={index} className="flex-shrink-0 w-full snap-start">
              <div
                className="relative overflow-hidden rounded-lg showcase-banner-item"
                style={{
                  height: "180px sm:h-[220px] md:h-[240px]",
                  background: item.background,
                }}
              >
                {/* Full-width image */}
                <img
                  src={item.image}
                  alt={`Haircare Banner ${index + 1}`}
                  className="w-full h-full object-cover"
                />
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

      <style jsx>{`
        @media (min-width: 640px) and (max-width: 819px) {
          .showcase-banner-item {
            height: 320px !important;
          }
        }
        @media (min-width: 820px) and (max-width: 1023px) {
          .showcase-banner-item {
            height: 350px !important;
          }
        }
      `}</style>
    </div>
  );
}
