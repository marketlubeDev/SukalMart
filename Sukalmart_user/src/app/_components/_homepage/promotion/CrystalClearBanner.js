'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/app/_components/common/Button';

export default function CrystalClearBanner() {
  const router = useRouter();

  const handleShopNowClick = () => {
    router.push('/category/skin-care');
  };

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-10 overflow-hidden">
      <div className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] w-full overflow-hidden rounded-lg">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/banner/banner2.jpg"
            alt="Crystal Clear Skincare Banner"
            className="object-cover absolute inset-0 w-full h-full"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/1200x400?text=Banner+Image";
            }}
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              <div>
                <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight mb-3 sm:mb-4">
                  Glow Up Your Skin, 20% OFF!
                </h1>
                <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed tracking-wide">
                  Premium skincare essentials for radiant, healthy skin. Limited time offer
                </p>
              </div>

              <Button
                variant="secondary"
                size="large"
                onClick={handleShopNowClick}
                className="bg-transparent hover:bg-white/10 text-white border-white hover:scale-105 focus:ring-white/50 focus:ring-offset-transparent text-sm sm:text-base"
              >
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-b border-gray-200 w-full mt-6" />
    </div>
  );
}