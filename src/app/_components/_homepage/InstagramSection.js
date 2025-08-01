export default function InstagramSection() {
  return (
    <div 
      className="flex flex-col items-center justify-center w-full px-4 sm:px-6 md:px-12 lg:px-[200px] py-6 md:py-8 lg:py-10"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "40px",
        alignSelf: "stretch",
        background: "rgba(241, 132, 8, 0.05)"
      }}
    >
      <h2
        style={{
          color: "#333333",
          textAlign: "center",
          fontFamily: "'Nunito Sans', sans-serif",
          fontSize: "28px",
          fontStyle: "normal",
          fontWeight: 700,
          lineHeight: "normal",
          letterSpacing: "-0.28px",
          textEdge: "cap",
          leadingTrim: "both",
        }}
      >
        Follow us on{" "}
        <span
          style={{
            color: "#035F0F",
            fontFamily: "'Nunito Sans', sans-serif",
            fontSize: "28px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "normal",
            letterSpacing: "-0.28px",
            textEdge: "cap",
            leadingTrim: "both",
          }}
        >
          Instagram
        </span>
      </h2>

      {/* Instagram Thumbnails - Auto Scrolling Animation */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .auto-scroll {
          animation: scroll-left 30s linear infinite;
        }
        
        .auto-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="relative w-full overflow-hidden">
        <div className="flex flex-row gap-4 auto-scroll" style={{ padding: '0 48px', width: 'max-content' }}>
          {/* Thumbnail 1 */}
          <div
            className="relative flex-shrink-0 rounded-lg overflow-hidden"
            style={{
              display: "flex",
              width: "253px",
              height: "450px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              aspectRatio: "122/217",
            }}
          >
            <img
              src="/thumbnail1.jpg"
              alt="Instagram Video 1"
              className="w-full h-full object-cover"
              style={{ aspectRatio: "122/217" }}
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Thumbnail 2 */}
          <div
            className="relative flex-shrink-0 rounded-lg overflow-hidden"
            style={{
              display: "flex",
              width: "253px",
              height: "450px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              aspectRatio: "122/217",
            }}
          >
            <img
              src="/thumbnail2.jpg"
              alt="Instagram Video 2"
              className="w-full h-full object-cover"
              style={{ aspectRatio: "122/217" }}
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Thumbnail 3 */}
          <div
            className="relative flex-shrink-0 rounded-lg overflow-hidden"
            style={{
              display: "flex",
              width: "253px",
              height: "450px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              aspectRatio: "122/217",
            }}
          >
            <img
              src="/thumbnail3.jpg"
              alt="Instagram Video 3"
              className="w-full h-full object-cover"
              style={{ aspectRatio: "122/217" }}
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Thumbnail 4 */}
          <div
            className="relative flex-shrink-0 rounded-lg overflow-hidden"
            style={{
              display: "flex",
              width: "253px",
              height: "450px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              aspectRatio: "122/217",
            }}
          >
            <img
              src="/thumbnail4.jpg"
              alt="Instagram Video 4"
              className="w-full h-full object-cover"
              style={{ aspectRatio: "122/217" }}
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Thumbnail 5 */}
          <div
            className="relative flex-shrink-0 rounded-lg overflow-hidden"
            style={{
              display: "flex",
              width: "253px",
              height: "450px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              aspectRatio: "122/217",
            }}
          >
            <img
              src="/thumbnail1.jpg"
              alt="Instagram Video 5"
              className="w-full h-full object-cover"
              style={{ aspectRatio: "122/217" }}
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Thumbnail 6 */}
          <div
            className="relative flex-shrink-0 rounded-lg overflow-hidden"
            style={{
              display: "flex",
              width: "253px",
              height: "450px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              aspectRatio: "122/217",
            }}
          >
            <img
              src="/thumbnail2.jpg"
              alt="Instagram Video 6"
              className="w-full h-full object-cover"
              style={{ aspectRatio: "122/217" }}
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Duplicate thumbnails for seamless infinite scroll */}
          {/* Thumbnail 1 (Duplicate) */}
          <div
            className="relative flex-shrink-0 rounded-lg overflow-hidden"
            style={{
              display: "flex",
              width: "253px",
              height: "450px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              aspectRatio: "122/217",
            }}
          >
            <img
              src="/thumbnail1.jpg"
              alt="Instagram Video 1"
              className="w-full h-full object-cover"
              style={{ aspectRatio: "122/217" }}
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Thumbnail 2 (Duplicate) */}
          <div
            className="relative flex-shrink-0 rounded-lg overflow-hidden"
            style={{
              display: "flex",
              width: "253px",
              height: "450px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              aspectRatio: "122/217",
            }}
          >
            <img
              src="/thumbnail2.jpg"
              alt="Instagram Video 2"
              className="w-full h-full object-cover"
              style={{ aspectRatio: "122/217" }}
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Thumbnail 3 (Duplicate) */}
          <div
            className="relative flex-shrink-0 rounded-lg overflow-hidden"
            style={{
              display: "flex",
              width: "253px",
              height: "450px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              aspectRatio: "122/217",
            }}
          >
            <img
              src="/thumbnail3.jpg"
              alt="Instagram Video 3"
              className="w-full h-full object-cover"
              style={{ aspectRatio: "122/217" }}
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Thumbnail 4 (Duplicate) */}
          <div
            className="relative flex-shrink-0 rounded-lg overflow-hidden"
            style={{
              display: "flex",
              width: "253px",
              height: "450px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              aspectRatio: "122/217",
            }}
          >
            <img
              src="/thumbnail4.jpg"
              alt="Instagram Video 4"
              className="w-full h-full object-cover"
              style={{ aspectRatio: "122/217" }}
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Thumbnail 5 (Duplicate) */}
          <div
            className="relative flex-shrink-0 rounded-lg overflow-hidden"
            style={{
              display: "flex",
              width: "253px",
              height: "450px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              aspectRatio: "122/217",
            }}
          >
            <img
              src="/thumbnail1.jpg"
              alt="Instagram Video 5"
              className="w-full h-full object-cover"
              style={{ aspectRatio: "122/217" }}
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Thumbnail 6 (Duplicate) */}
          <div
            className="relative flex-shrink-0 rounded-lg overflow-hidden"
            style={{
              display: "flex",
              width: "253px",
              height: "450px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              aspectRatio: "122/217",
            }}
          >
            <img
              src="/thumbnail2.jpg"
              alt="Instagram Video 6"
              className="w-full h-full object-cover"
              style={{ aspectRatio: "122/217" }}
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 