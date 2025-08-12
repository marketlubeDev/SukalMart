export default function HaircareBanner({ selectedCategory }) {
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
    <div className="py-8 container mx-auto">
      <div className="max-w-6xl mx-auto">
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
              <button className="inline-flex items-center px-6 py-3 bg-transparent text-gray-800 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200 border-2 border-gray-800">
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
  );
} 