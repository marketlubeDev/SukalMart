export default function CrystalClearBanner() {
  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-[200px] py-6 md:py-8 lg:py-10">
      <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full overflow-hidden rounded-lg">
        {/* Background with crystal image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/crystal.jpg')",
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="ml-4 sm:ml-6 lg:ml-10 max-w-[400px] sm:max-w-[500px] lg:max-w-[600px]">
            <div className="mb-6 lg:mb-8">
              <h2
                className="mb-4 sm:mb-5 lg:mb-6"
                style={{
                  color: "#FFF",
                  textAlign: "left",
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: "32px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "135%", // 43.2px
                  letterSpacing: "-0.64px",
                }}
              >
                Crystal Clear Audio, Now at 15% OFF!
              </h2>
              <p
                style={{
                  color: "#FFF",
                  textAlign: "left",
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "135%", // 24.3px
                  letterSpacing: "-0.36px",
                }}
                className="mb-6 sm:mb-8"
              >
                Crisp sound. Comfortable fit. Limited time offer
              </p>
            </div>

            <button
              className="bg-transparent text-white font-medium px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-4 rounded-[4px] text-base sm:text-lg hover:bg-gray-700 transition-colors duration-200"
              style={{ border: "1px solid #FFF" }}
            >
              Shop now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 