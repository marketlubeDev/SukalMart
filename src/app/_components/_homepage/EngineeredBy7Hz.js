export default function EngineeredBy7Hz() {
  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-[200px] py-6 md:py-8 lg:py-10 overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        {/* Left Section - Text Content */}
        <div className="flex-1 lg:max-w-[400px]">
          <h2
            className="mb-6"
            style={{
              color: "#333",
              fontFamily: '"Nunito Sans"',
              fontSize: "40px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
              letterSpacing: "-0.8px",
            }}
          >
            Engineered by 7Hz
          </h2>
          <p
            className="mb-8"
            style={{
              color: "#333333",
              fontFamily: '"Nunito Sans"',
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "normal",
              letterSpacing: "-0.18px",
            }}
          >
            Precision-crafted IEMs delivering cutting-edge sound, innovative design, and audiophile-grade performance. Experience the difference.
          </p>
          <button
            className="flex justify-center items-center gap-2"
            style={{
              padding: "16px 24px",
              borderRadius: "4px",
              background: "#035F0F",
              color: "#fff",
              fontWeight: 500,
              fontSize: "18px",
              transition: "background 0.2s",
            }}
            onMouseOver={e => e.currentTarget.style.background = "#035F0FE6"}
            onMouseOut={e => e.currentTarget.style.background = "#035F0F"}
          >
            Shop all
          </button>
        </div>

        {/* Right Section - Product Cards */}
        <div className="flex-1 flex flex-row gap-4 lg:gap-6">
          {/* Product Card 1 */}
          <div className="flex-1 bg-white rounded-lg p-4">
            <div className="aspect-square bg-gray-50 flex items-center justify-center p-4 mb-4">
              <img
                src="/best1.png"
                alt="7hz Salnotes Zero 2 Wired IEM"
                className="w-full h-full object-contain"
              />
            </div>
            <h3
              className="text-base font-semibold text-gray-900 mb-2"
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                letterSpacing: "-0.32px",
              }}
            >
              7hz Salnotes Zero 2 Wired IEM(type c)
            </h3>
            <p
              className="text-sm text-gray-600 mb-3"
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                letterSpacing: "-0.28px",
              }}
            >
              In-ear monitors
            </p>
            <div className="flex items-center gap-2">
              <span
                className="text-lg font-bold"
                style={{ color: "#035F0F" }}
              >
                ₹1,899
              </span>
              <span className="text-sm text-gray-500 line-through">
                ₹2,099
              </span>
            </div>
          </div>

          {/* Product Card 2 */}
          <div className="flex-1 bg-white rounded-lg p-4">
            <div className="aspect-square bg-gray-50 flex items-center justify-center p-4 mb-4">
              <img
                src="/best2.png"
                alt="7hz Salnotes Zero 2 Wired IEM"
                className="w-full h-full object-contain"
              />
            </div>
            <h3
              className="text-base font-semibold text-gray-900 mb-2"
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                letterSpacing: "-0.32px",
              }}
            >
              7hz Salnotes Zero 2 Wired IEM(type c)
            </h3>
            <p
              className="text-sm text-gray-600 mb-3"
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                letterSpacing: "-0.28px",
              }}
            >
              In-ear monitors
            </p>
            <div className="flex items-center gap-2">
              <span
                className="text-lg font-bold"
                style={{ color: "#035F0F" }}
              >
                ₹1,899
              </span>
              <span className="text-sm text-gray-500 line-through">
                ₹2,099
              </span>
            </div>
          </div>

          {/* Product Card 3 */}
          <div className="flex-1 bg-white rounded-lg p-4">
            <div className="aspect-square bg-gray-50 flex items-center justify-center p-4 mb-4">
              <img
                src="/best3.png"
                alt="7hz Salnotes Zero 2 Wired IEM"
                className="w-full h-full object-contain"
              />
            </div>
            <h3
              className="text-base font-semibold text-gray-900 mb-2"
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                letterSpacing: "-0.32px",
              }}
            >
              7hz Salnotes Zero 2 Wired IEM(type c)
            </h3>
            <p
              className="text-sm text-gray-600 mb-3"
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                letterSpacing: "-0.28px",
              }}
            >
              In-ear monitors
            </p>
            <div className="flex items-center gap-2">
              <span
                className="text-lg font-bold"
                style={{ color: "#035F0F" }}
              >
                ₹1,899
              </span>
              <span className="text-sm text-gray-500 line-through">
                ₹2,099
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 