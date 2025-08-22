"use client";

export default function ProductVideoSection() {
  return (
    <div className="my-8">
      <div className="w-full rounded-lg overflow-hidden border border-gray-200 bg-white relative">
        <video
          src="/video2.mp4"
          className="w-full h-[600px] object-cover"
          style={{ objectPosition: "center" }}
          controls
          poster="/soapbanner3.png"
        >
          Your browser does not support the video tag.
        </video>
        {/* Optionally, you can add a custom play button overlay if you want to control playback via JS */}
      </div>
    </div>
  );
} 