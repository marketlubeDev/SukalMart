"use client";
import { useRouter } from "next/navigation";

export default function CrystalClearBanner() {
  const router = useRouter();

  const handleShopNowClick = () => {
    router.push('/category/skin-care');
  };
  return (
    <>
      <div className="container mx-auto px-4 sm:px-0 md:px-8 lg:px-10 xl:px-8">
        
        <div className="relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] w-full overflow-hidden rounded-none sm:rounded-lg">
          {/* Background with crystal image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/banner/banner2.jpg')",
            }}
          >
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="ml-3 sm:ml-4 md:ml-6 lg:ml-8 xl:ml-10 max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[600px]">
              <div className="mb-4 sm:mb-6 md:mb-6 lg:mb-8">
                <h2
                  className="mb-3 sm:mb-4 md:mb-5 lg:mb-6 text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[32px] font-bold leading-[135%] tracking-[-0.4px] sm:tracking-[-0.48px] md:tracking-[-0.56px] lg:tracking-[-0.64px] xl:tracking-[-0.64px]"
                  style={{
                    color: "#FFF",
                    textAlign: "left",

                    fontStyle: "normal",
                  }}
                >
                  Glow Up Your Skin, 20% OFF!
                </h2>
                <p
                  className="mb-4 sm:mb-6 md:mb-6 lg:mb-8 text-[14px] sm:text-[16px] md:text-[17px] lg:text-[18px] xl:text-[18px] font-normal leading-[135%] tracking-[-0.28px] sm:tracking-[-0.32px] md:tracking-[-0.34px] lg:tracking-[-0.36px] xl:tracking-[-0.36px]"
                  style={{
                    color: "#FFF",
                    textAlign: "left",

                    fontStyle: "normal",
                  }}
                >
                  Premium skincare essentials for radiant, healthy skin. Limited
                  time offer
                </p>   
              </div>

              <button
                onClick={handleShopNowClick}
                className="bg-transparent text-white font-medium px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-4 lg:py-2 xl:px-4 xl:py-2 rounded-[4px] text-xs sm:text-sm md:text-base lg:text-base xl:text-base transition-colors duration-200 cursor-pointer"
                style={{ border: "1px solid #FFF", cursor: 'pointer' }}
              >
                Shop now
              </button>
            </div>
          </div>
        </div>
        <div className="border-b border-black/10 w-full mt-6"></div>
      </div>
    </>
  );
}
