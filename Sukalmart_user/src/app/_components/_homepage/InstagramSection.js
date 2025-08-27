"use client";
import Image from "next/image";
import { useState } from "react";

export default function InstagramSection() {
  const [playingVideo, setPlayingVideo] = useState(null);

  const handlePlayClick = (videoId) => {
    setPlayingVideo(videoId);
  };

  const handleVideoEnd = () => {
    setPlayingVideo(null);
  };

  const handleMouseEnter = (videoId) => {
    setPlayingVideo(videoId);
  };

  const handleMouseLeave = () => {
    setPlayingVideo(null);
  };
  return (
    <div
      className="flex flex-col items-center justify-center w-full px-0 py-6 md:py-8 lg:py-10 custom-padding"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "40px",
        alignSelf: "stretch",
        background: "rgba(241, 132, 8, 0.05)",
      }}
    >
      <h2
        className="text-[20px] sm:text-[24px] md:text-[26px] lg:text-[28px] font-bold leading-normal tracking-[-0.2px] sm:tracking-[-0.24px] md:tracking-[-0.26px] lg:tracking-[-0.28px]"
        style={{
          color: "#333333",
          textAlign: "center",

          fontStyle: "normal",
          textEdge: "cap",
          leadingTrim: "both",
        }}
      >
        Follow us on{" "}
        <span
          className="text-[20px] sm:text-[24px] md:text-[26px] lg:text-[28px] font-bold leading-normal tracking-[-0.2px] sm:tracking-[-0.24px] md:tracking-[-0.26px] lg:tracking-[-0.28px]"
          style={{
            color: "var(--color-primary)",

            fontStyle: "normal",
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

        /* Custom padding for bigTablets and desktop */
        @media only screen and (min-width: 992px) and (max-width: 1199.98px) {
          .custom-padding {
            padding-left: 48px !important;
            padding-right: 48px !important;
          }
        }
        @media only screen and (min-width: 1200px) {
          .custom-padding {
            // padding-left: 200px !important;
            // padding-right: 200px !important;
          }
        }
      `}</style>
      <div className="relative overflow-hidden container mx-auto px-10">
        <div className="flex flex-row gap-3 sm:gap-4 auto-scroll container mx-auto">
          {/* Thumbnail 1 */}
          <div
            className="relative flex-shrink-0 rounded-lg overflow-hidden w-[180px] h-[320px] sm:w-[200px] sm:h-[360px] md:w-[220px] md:h-[400px] lg:w-[253px] lg:h-[450px] cursor-pointer"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              aspectRatio: "122/217",
            }}
            onMouseEnter={() => handleMouseEnter('video1')}
            onMouseLeave={handleMouseLeave}
          >
            {playingVideo === 'video1' ? (
              <video
                src="/video1.mp4"
                className="w-full h-full object-cover"
                autoPlay
                muted
                onEnded={handleVideoEnd}
                loop
              />
            ) : (
              <>
                <Image
                  src="/thumbnail1.jpg"
                  alt="Instagram Video 1"
                  fill
                  sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, (max-width: 1024px) 220px, 253px"
                  className="object-cover"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handlePlayClick('video1')}
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-800 ml-0.5 sm:ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Thumbnail 2 */}
          <div
            className="relative flex-shrink-0 rounded-lg overflow-hidden w-[180px] h-[320px] sm:w-[200px] sm:h-[360px] md:w-[220px] md:h-[400px] lg:w-[253px] lg:h-[450px] cursor-pointer"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              aspectRatio: "122/217",
            }}
            onMouseEnter={() => handleMouseEnter('video2')}
            onMouseLeave={handleMouseLeave}
          >
            {playingVideo === 'video2' ? (
              <video
                src="/video1.mp4"
                className="w-full h-full object-cover"
                autoPlay
                muted
                onEnded={handleVideoEnd}
                loop
              />
            ) : (
              <>
                <Image
                  src="/thumbnail2.jpg"
                  alt="Instagram Video 2"
                  fill
                  sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, (max-width: 1024px) 220px, 253px"
                  className="object-cover"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handlePlayClick('video2')}
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-800 ml-0.5 sm:ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Thumbnail 3 */}
          <div
            className="relative flex-shrink-0 rounded-lg overflow-hidden w-[180px] h-[320px] sm:w-[200px] sm:h-[360px] md:w-[220px] md:h-[400px] lg:w-[253px] lg:h-[450px] cursor-pointer"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              aspectRatio: "122/217",
            }}
            onMouseEnter={() => handleMouseEnter('video3')}
            onMouseLeave={handleMouseLeave}
          >
            {playingVideo === 'video3' ? (
              <video
                src="/video1.mp4"
                className="w-full h-full object-cover"
                autoPlay
                muted
                onEnded={handleVideoEnd}
                loop
              />
            ) : (
              <>
                <Image
                  src="/thumbnail3.jpg"
                  alt="Instagram Video 3"
                  fill
                  sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, (max-width: 1024px) 220px, 253px"
                  className="object-cover"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handlePlayClick('video3')}
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-800 ml-0.5 sm:ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Thumbnail 4 */}
          <div
            className="relative flex-shrink-0 rounded-lg overflow-hidden w-[180px] h-[320px] sm:w-[200px] sm:h-[360px] md:w-[220px] md:h-[400px] lg:w-[253px] lg:h-[450px] cursor-pointer"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              aspectRatio: "122/217",
            }}
            onMouseEnter={() => handleMouseEnter('video4')}
            onMouseLeave={handleMouseLeave}
          >
            {playingVideo === 'video4' ? (
              <video
                src="/video1.mp4"
                className="w-full h-full object-cover"
                autoPlay
                muted
                onEnded={handleVideoEnd}
                loop
              />
            ) : (
              <>
                <Image
                  src="/thumbnail4.jpg"
                  alt="Instagram Video 4"
                  fill
                  sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, (max-width: 1024px) 220px, 253px"
                  className="object-cover"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handlePlayClick('video4')}
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-800 ml-0.5 sm:ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Thumbnail 5 */}
          <div
            className="relative flex-shrink-0 rounded-lg overflow-hidden w-[180px] h-[320px] sm:w-[200px] sm:h-[360px] md:w-[220px] md:h-[400px] lg:w-[253px] lg:h-[450px] cursor-pointer"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              aspectRatio: "122/217",
            }}
            onMouseEnter={() => handleMouseEnter('video5')}
            onMouseLeave={handleMouseLeave}
          >
            {playingVideo === 'video5' ? (
              <video
                src="/video1.mp4"
                className="w-full h-full object-cover"
                autoPlay
                muted
                onEnded={handleVideoEnd}
                loop
              />
            ) : (
              <>
                <Image
                  src="/thumbnail1.jpg"
                  alt="Instagram Video 5"
                  fill
                  sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, (max-width: 1024px) 220px, 253px"
                  className="object-cover"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handlePlayClick('video5')}
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-800 ml-0.5 sm:ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Thumbnail 6 */}
          <div
            className="relative flex-shrink-0 rounded-lg overflow-hidden w-[180px] h-[320px] sm:w-[200px] sm:h-[360px] md:w-[220px] md:h-[400px] lg:w-[253px] lg:h-[450px] cursor-pointer"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              aspectRatio: "122/217",
            }}
            onMouseEnter={() => handleMouseEnter('video6')}
            onMouseLeave={handleMouseLeave}
          >
            {playingVideo === 'video6' ? (
              <video
                src="/video1.mp4"
                className="w-full h-full object-cover"
                autoPlay
                muted
                onEnded={handleVideoEnd}
                loop
              />
            ) : (
              <>
                <Image
                  src="/thumbnail2.jpg"
                  alt="Instagram Video 6"
                  fill
                  sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, (max-width: 1024px) 220px, 253px"
                  className="object-cover"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handlePlayClick('video6')}
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-800 ml-0.5 sm:ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Duplicate thumbnails for seamless infinite scroll */}
          {/* Thumbnail 1 (Duplicate) */}
          <div
            className="relative flex-shrink-0 rounded-lg overflow-hidden w-[180px] h-[320px] sm:w-[200px] sm:h-[360px] md:w-[220px] md:h-[400px] lg:w-[253px] lg:h-[450px]"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              aspectRatio: "122/217",
            }}
          >
            <Image
              src="/thumbnail1.jpg"
              alt="Instagram Video 1"
              fill
              sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, (max-width: 1024px) 220px, 253px"
              className="object-cover"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-800 ml-0.5 sm:ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Thumbnail 2 (Duplicate) */}
          <div
            className="relative flex-shrink-0 rounded-lg overflow-hidden w-[180px] h-[320px] sm:w-[200px] sm:h-[360px] md:w-[220px] md:h-[400px] lg:w-[253px] lg:h-[450px]"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              aspectRatio: "122/217",
            }}
          >
            <Image
              src="/thumbnail2.jpg"
              alt="Instagram Video 2"
              fill
              sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, (max-width: 1024px) 220px, 253px"
              className="object-cover"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-800 ml-0.5 sm:ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Thumbnail 3 (Duplicate) */}
          <div
            className="relative flex-shrink-0 rounded-lg overflow-hidden w-[180px] h-[320px] sm:w-[200px] sm:h-[360px] md:w-[220px] md:h-[400px] lg:w-[253px] lg:h-[450px]"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              aspectRatio: "122/217",
            }}
          >
            <Image
              src="/thumbnail3.jpg"
              alt="Instagram Video 3"
              fill
              sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, (max-width: 1024px) 220px, 253px"
              className="object-cover"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-800 ml-0.5 sm:ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Thumbnail 4 (Duplicate) */}
          <div
            className="relative flex-shrink-0 rounded-lg overflow-hidden w-[180px] h-[320px] sm:w-[200px] sm:h-[360px] md:w-[220px] md:h-[400px] lg:w-[253px] lg:h-[450px]"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              aspectRatio: "122/217",
            }}
          >
            <Image
              src="/thumbnail4.jpg"
              alt="Instagram Video 4"
              fill
              sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, (max-width: 1024px) 220px, 253px"
              className="object-cover"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-800 ml-0.5 sm:ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Thumbnail 5 (Duplicate) */}
          <div
            className="relative flex-shrink-0 rounded-lg overflow-hidden w-[180px] h-[320px] sm:w-[200px] sm:h-[360px] md:w-[220px] md:h-[400px] lg:w-[253px] lg:h-[450px]"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              aspectRatio: "122/217",
            }}
          >
            <Image
              src="/thumbnail1.jpg"
              alt="Instagram Video 5"
              fill
              sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, (max-width: 1024px) 220px, 253px"
              className="object-cover"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-800 ml-0.5 sm:ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Thumbnail 6 (Duplicate) */}
          <div
            className="relative flex-shrink-0 rounded-lg overflow-hidden w-[180px] h-[320px] sm:w-[200px] sm:h-[360px] md:w-[220px] md:h-[400px] lg:w-[253px] lg:h-[450px]"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              aspectRatio: "122/217",
            }}
          >
            <Image
              src="/thumbnail2.jpg"
              alt="Instagram Video 6"
              fill
              sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, (max-width: 1024px) 220px, 253px"
              className="object-cover"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-800 ml-0.5 sm:ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
