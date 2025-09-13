"use client";

export default function ProductVideoSection({ product }) {
  console.log(product?.featuresSections, "4yyyyyytyweryry");

  // Early return if product is not loaded
  if (!product) return null;

  // Filter video sections
  const videoSections =
    product.featuresSections?.filter(
      (section) => section.mediaType === "video"
    ) || [];

  // If no video sections found, return null (don't render anything)
  if (videoSections.length === 0) {
    return null;
  }

  console.log(videoSections, "videoSections");

  return (
    <div className="my-8">
      <div className="w-full rounded-lg overflow-hidden border border-gray-200 bg-white relative">
        <video
          src={videoSections[0].mediaUrl}
          className="w-full object-cover object-center h-48 sm:h-64 md:h-80 lg:h-[600px]"
          controls
          // poster={videoSections[0].mediaUrl}
        >
          Your browser does not support the video tag.
        </video>
        {/* Optionally, you can add a custom play button overlay if you want to control playback via JS */}
      </div>
    </div>
  );
}
