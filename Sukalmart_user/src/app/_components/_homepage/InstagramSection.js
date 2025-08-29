"use client";
import Image from "next/image";
import { useState } from "react";
import Head from "next/head";

export default function InstagramPage() {
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

  // Define video data for easier management
  const videoData = [
    { id: 'video1', thumbnail: '/thumbnail1.jpg', video: '/video1.mp4', alt: 'Instagram Video 1' },
    { id: 'video2', thumbnail: '/thumbnail2.jpg', video: '/video1.mp4', alt: 'Instagram Video 2' },
    { id: 'video3', thumbnail: '/thumbnail3.jpg', video: '/video1.mp4', alt: 'Instagram Video 3' },
    { id: 'video4', thumbnail: '/thumbnail4.jpg', video: '/video1.mp4', alt: 'Instagram Video 4' },
    { id: 'video5', thumbnail: '/thumbnail1.jpg', video: '/video1.mp4', alt: 'Instagram Video 5' },
    { id: 'video6', thumbnail: '/thumbnail2.jpg', video: '/video1.mp4', alt: 'Instagram Video 6' }
  ];

  const VideoThumbnail = ({ data, isInteractive = true }) => (
    <div
      className="relative flex-shrink-0 rounded-lg overflow-hidden w-[180px] h-[320px] sm:w-[200px] sm:h-[360px] md:w-[220px] md:h-[400px] lg:w-[253px] lg:h-[450px] cursor-pointer transition-transform duration-300 hover:scale-105"
      style={{
        aspectRatio: "122/217",
      }}
      onMouseEnter={isInteractive ? () => handleMouseEnter(data.id) : undefined}
      onMouseLeave={isInteractive ? handleMouseLeave : undefined}
    >
      {isInteractive && playingVideo === data.id ? (
        <video
          src={data.video}
          className="w-full h-full object-cover"
          autoPlay
          muted
          onEnded={handleVideoEnd}
          loop
        />
      ) : (
        <>
          <Image
            src={data.thumbnail}
            alt={data.alt}
            fill
            sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, (max-width: 1024px) 220px, 253px"
            className="object-cover"
            priority={data.id === 'video1' || data.id === 'video2'}
          />
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-white transition-all duration-200 hover:scale-110"
              onClick={isInteractive ? () => handlePlayClick(data.id) : undefined}
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
  );

  return (
    <>
      <Head>
        <title>Follow us on Instagram</title>
        <meta name="description" content="Check out our latest Instagram videos and follow us for more content" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div>
        <div
          className="flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 overflow-hidden"
          style={{
            background: "rgba(241, 132, 8, 0.05)",
          }}
        >
          <h1
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight mb-8 md:mb-12"
            style={{
              color: "#333333",
              textAlign: "center",
            }}
          >
            Follow us on{" "}
            <span
              className="text-[var(--color-primary)]"
            >
              Instagram
            </span>
          </h1>

          {/* Auto Scrolling Instagram Thumbnails */}
          <div className="relative overflow-hidden w-full max-w-7xl mx-auto">
            <style jsx global>{`
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
                width: calc(200% + 24px);
              }

              .auto-scroll:hover {
                animation-play-state: paused;
              }

              @media (prefers-reduced-motion: reduce) {
                .auto-scroll {
                  animation: none;
                }
              }

              /* Responsive improvements */
              @media (max-width: 640px) {
                .auto-scroll {
                  animation-duration: 25s;
                }
              }

              @media (min-width: 1024px) {
                .auto-scroll {
                  animation-duration: 35s;
                }
              }
            `}</style>
            
            <div className="flex gap-3 sm:gap-4 md:gap-5 auto-scroll">
              {/* Original thumbnails */}
              {videoData.map((data) => (
                <VideoThumbnail key={data.id} data={data} isInteractive={true} />
              ))}
              
              {/* Duplicate thumbnails for seamless infinite scroll */}
              {videoData.map((data) => (
                <VideoThumbnail key={`${data.id}-duplicate`} data={data} isInteractive={false} />
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8 md:mt-12 text-center">
            {/* <a
              href="https://instagram.com/your-handle"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Follow @your-handle
            </a> */}
          </div>
        </div>
      </div>
    </>
  );
}