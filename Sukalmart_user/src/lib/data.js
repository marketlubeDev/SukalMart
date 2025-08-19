// Product and category data for SukalMart

export const categories = [
  {
    name: "Hair Care",
    image:
      "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/category/A_collection_of_hair_care_products_displayed_in_a_sleek_salon-inspired_setting_15-02-2025_at_23-21-09.webp",
  },
  {
    name: "Body & Shower",
    image:
      "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/category/https___hypebeast.com_wp-content_blogs.dir_6_files_2019_10_luxury-bath-shower-products-soap-body-scrub-shampoo-aesop-glossier-chanel-00.avif",
  },
  {
    name: "Soap & Deodorants",
    image:
      "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/category/JBX_Soap_Deo_Mix_Pack.webp",
  },
  {
    name: "Skin Care",
    image:
      "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/category/168838_00_2x.webp",
  },
  {
    name: "Oral & Misc",
    image:
      "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/category/mouthwash-other-oral-hygiene-products-colored-table-top-view-with-copy-space-flat-lay-dental-hygiene-oral-care-products-space-text-light-background-concept_79075-26657.avif",
  },
  // {
  //   name: "Accessories",
  //   image: "/shop6.png",
  // },
];

export const bestSellers = [
  {
    id: 101,
    name: "Hydrating Face Wash",
    category: "Skin Care",
    price: "₹599",
    originalPrice: "₹799",
    image: "/skin1.jpg",
    badge: "#1",
  },
  {
    id: 102,
    name: "Nourishing Body Lotion",
    category: "Body & Shower",
    price: "₹349",
    originalPrice: "₹499",
    image: "/bodywah.jpg",
    badge: "#2",
  },
  {
    id: 103,
    name: "Herbal Anti-Dandruff Shampoo",
    category: "Hair Care",
    price: "₹299",
    originalPrice: "₹399",
    image: "/haircare1.jpg",
    badge: "#3",
  },
  {
    id: 104,
    name: "Long-Lasting Deodorant Roll-On",
    category: "Soap & Deodorants",
    price: "₹199",
    originalPrice: "₹249",
    image: "/soap.png",
  },
];

export const featuredProducts = [
  {
    id: 1,
    name: "Glow & Hydrate Face Serum",
    category: "Skincare",
    rating: 4.5,
    description:
      "Advanced hydrating serum with hyaluronic acid and vitamin C for radiant, glowing skin. Suitable for all skin types.",
    price: "₹899",
    originalPrice: "₹1,099",
    image:
      "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
  },
  {
    id: 2,
    name: "Luxury Beauty Collection Set",
    category: "Beauty Essentials",
    rating: 4.5,
    description:
      "Complete beauty routine set including cleanser, toner, moisturizer, and makeup essentials for flawless skin.",
    price: "₹2,499",
    originalPrice: "₹3,199",
    image:
      "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
  },
];

// Full catalog used on /products page (exported for search suggestions)
export const catalogProducts = [
  {
    id: "1",
    name: "Glow & Hydrate Face Serum",
    type: "Skincare",
    price: 899,
    originalPrice: 1099,
    image:
      "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
    category: "Skincare",
    discount: 18,
  },
  {
    id: "2",
    name: "Luxury Beauty Collection Set",
    type: "Beauty Essentials",
    price: 2499,
    originalPrice: 3199,
    image:
      "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
    category: "Beauty Essentials",
    discount: 22,
  },
  {
    id: "3",
    name: "Anti-Aging Night Cream",
    type: "Anti-Aging",
    price: 1299,
    originalPrice: 1599,
    image:
      "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
    category: "Anti-Aging",
    discount: 19,
  },
  {
    id: "4",
    name: "Vitamin C Brightening Serum",
    type: "Skincare",
    price: 799,
    originalPrice: 999,
    image:
      "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
    category: "Skincare",
    discount: 20,
  },
  {
    id: "5",
    name: "Hyaluronic Acid Moisturizer",
    type: "Skincare",
    price: 699,
    originalPrice: 899,
    image:
      "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
    category: "Skincare",
    discount: 22,
  },
  {
    id: "6",
    name: "Retinol Eye Cream",
    type: "Anti-Aging",
    price: 999,
    originalPrice: 1299,
    image:
      "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
    category: "Anti-Aging",
    discount: 23,
  },
  {
    id: "7",
    name: "Gentle Facial Cleanser",
    type: "Skincare",
    price: 599,
    originalPrice: 799,
    image:
      "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/JcZhBwKYsh.webp",
    category: "Skincare",
    discount: 25,
  },
  {
    id: "8",
    name: "SPF 50 Sunscreen",
    type: "Skincare",
    price: 899,
    originalPrice: 1199,
    image:
      "https://marketlube-website-assets.s3.ap-south-1.amazonaws.com/Souqalmart/bestseller/8613516cf28a3fde364291c8bf09a4eb.jpg",
    category: "Skincare",
    discount: 25,
  },
];

export const serviceBenefits = [
  {
    icon: "/cash1.svg",
    title: "Secured payment",
    alt: "Secured Payment",
  },
  {
    icon: "/cash2.svg",
    title: "Delivery in 3-4 working days",
    alt: "Delivery",
  },
  {
    icon: "/cash3.svg",
    title: "24x7 support",
    alt: "24x7 Support",
  },
  {
    icon: "/cash4.svg",
    title: "Pay on delivery",
    alt: "Pay on Delivery",
  },
];

export const navigationLinks = [
  "Hair Care",
  "Body & Shower",
  "Soap & Deodorants",
  "Skin Care",
  "Oral & Misc",
];
