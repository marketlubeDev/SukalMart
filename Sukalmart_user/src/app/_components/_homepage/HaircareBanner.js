"use client";
import { useRouter } from 'next/navigation';

export default function HaircareBanner({ selectedCategory }) {
  const router = useRouter();

  // Function to handle shop now button click
  const handleShopNow = () => {
    // Set the selected category in localStorage
    localStorage.setItem('selectedCategory', selectedCategory || 'Hair Care');
    // Navigate to products page
    router.push('/products');
  };

  // Function to get banner content based on category
  const getBannerContent = (category) => {
    if (category === "Body & Shower") {
      return {
        title: "Body Care That Radiates Confidence",
        description: "Premium body care products deliver transformative results, rich nourishment and immersive care - engineered for true beauty enthusiasts.",
        mainImage: "/bodywah.jpg",
        secondaryImage: "/bodywah.jpg",
        accentImage: "/bodywah.jpg",
        mainAlt: "Premium Body Care Product",
        secondaryAlt: "Body Care Product",
        accentAlt: "Body Care Product"
      };
    }

    if (category === "Soap & Deodorants") {
      return {
        title: "Premium Beauty Collection",
        description: "Expertly formulated beauty products delivering radiant results, innovative ingredients, and dermatologist-approved performance.",
        mainImage: "/soap1.jpeg",
        secondaryImage: "/soap1.jpeg",
        accentImage: "/soap1.jpeg",
        mainAlt: "Soap & Deodorants Product",
        secondaryAlt: "Soap & Deodorants Product",
        accentAlt: "Soap & Deodorants Product"
      };
    }

    // Inserted: Skin Care banner uses /skin1.jpg
    if (category === "Skin Care") {
      return {
        title: "Premium Beauty Collection",
        description: "Expertly formulated beauty products delivering radiant results, innovative ingredients, and dermatologist-approved performance.",
        mainImage: "/skin1.jpg",
        secondaryImage: "/skin1.jpg",
        accentImage: "/skin1.jpg",
        mainAlt: "Skin Care Product",
        secondaryAlt: "Skin Care Product",
        accentAlt: "Skin Care Product"
      };
    }

    // Inserted: Oral & Misc banner uses /tooth1.jpg
    if (category === "Oral & Misc") {
      return {
        title: "Premium Beauty Collection",
        description: "Expertly formulated beauty products delivering radiant results, innovative ingredients, and dermatologist-approved performance.",
        mainImage: "/tooth1.jpg",
        secondaryImage: "/tooth1.jpg",
        accentImage: "/tooth1.jpg",
        mainAlt: "Oral & Misc Product",
        secondaryAlt: "Oral & Misc Product",
        accentAlt: "Oral & Misc Product"
      };
    }

    if (category === "Hair Care") {
      return {
        title: "Hair That Speaks With Confidence",
        description: "Precision-crafted haircare products deliver transformative results, rich nourishment and immersive care - engineered for true beauty enthusiasts.",
        mainImage: "/haircare1.jpg",
        secondaryImage: "/haircare2.jpg",
        accentImage: "/haircare3.jpg",
        mainAlt: "Premium Haircare Product",
        secondaryAlt: "Haircare Product",
        accentAlt: "Haircare Product"
      };
    }

    // Default content for other categories
    return {
      title: "Premium Beauty Collection",
      description: "Expertly formulated beauty products delivering radiant results, innovative ingredients, and dermatologist-approved performance.",
      mainImage: "/haircare1.jpg",
      secondaryImage: "/haircare2.jpg",
      accentImage: "/haircare3.jpg",
      mainAlt: "Premium Beauty Product",
      secondaryAlt: "Beauty Product",
      accentAlt: "Beauty Product"
    };
  };

  const content = getBannerContent(selectedCategory);

  return (
    <div className="py-8 container mx-auto px-4 md:px-8 xl:px-10 2xl:px-10">
      {/* Mobile: full-width background banner with overlay and text */}
      <div className="lg:hidden">
        <div className="relative w-full h-[260px] md:h-[350px] overflow-hidden rounded-lg">
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: `url('${content.mainImage}')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="px-4">
              <h2 className="text-white text-xl font-semibold mb-2 leading-snug">
                {content.title}
              </h2>
              <p className="text-white/90 text-sm mb-3 leading-relaxed line-clamp-3">
                {content.description}
              </p>
              <button 
                onClick={handleShopNow}
                className="bg-[#035F0F] text-white px-3 py-1.5 rounded text-sm font-medium cursor-pointer hover:bg-[#035F0F]/90 transition-colors"
              >
                Shop now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop/Tablet: existing rich layout */}
      <div className="hidden lg:block">
        <div className="mx-auto">
          <div className="relative overflow-hidden bg-gradient-to-br from-amber-100 to-amber-200 p-8 md:p-12">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
            </div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between">
              {/* Left Section - Text Content */}
              <div className="flex-1 text-gray-800 mb-8 lg:mb-0 lg:mr-8">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 leading-tight">
                  {content.title}
                </h2>
                <p className="text-lg md:text-xl mb-6 opacity-90 leading-relaxed">
                  {content.description}
                </p>
                <button 
                  onClick={handleShopNow}
                  className="inline-flex items-center px-4 py-2 bg-transparent text-gray-800 font-semibold rounded-lg hover:text-gray-600 transition-colors duration-200 border-2 border-gray-800 cursor-pointer"
                >
                  Shop now
                </button>
              </div>
              
              {/* Right Section - Product Images */}
              <div className="flex-1 flex justify-center lg:justify-end">
                <div className="relative">
                  {/* Main Product Image */}
                  <div className="relative z-20">
                    <img
                      src={content.mainImage}
                      alt={content.mainAlt}
                      className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  
                  {/* Secondary Product Image */}
                  <div className="absolute -top-4 -right-4 z-10">
                    <img
                      src={content.secondaryImage}
                      alt={content.secondaryAlt}
                      className="w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  
                  {/* Accent Product Image */}
                  <div className="absolute -bottom-4 -left-4 z-10">
                    <img
                      src={content.accentImage}
                      alt={content.accentAlt}
                      className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 