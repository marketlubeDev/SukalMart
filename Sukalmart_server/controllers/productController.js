const { groupProductsByLabel } = require("../helpers/aggregation/aggregations");
const {
  updateOne,
  deleteOne,
} = require("../helpers/handlerFactory/handlerFactory");
const Product = require("../model/productModel");
const productModel = require("../model/productModel");
const Variant = require("../model/variantsModel");
const { uploadMultipleToS3 } = require("../utilities/cloudinaryUpload");
const AppError = require("../utilities/errorHandlings/appError");
const catchAsync = require("../utilities/errorHandlings/catchAsync");
const mongoose = require("mongoose");
const formatProductResponse = require("../helpers/product/formatProducts");
const RatingModal = require("../model/ratingModel");

const addProduct = catchAsync(async (req, res, next) => {
  const {
    name,
    category,
    subcategory,
    variants: variantsArray,
    label,
    priority,
    activeStatus,
    about,
    specifications,
    featureImages,
    // featuresSection fields (may arrive as strings in multipart)
    featuresSection,
    "featuresSection.layout": fsLayout,
    "featuresSection.imagePosition": fsImagePosition,
    "featuresSection.mediaType": fsMediaType,
    "featuresSection.title": fsTitle,
    "featuresSection.description": fsDescription,
    "featuresSection.mediaUrl": fsMediaUrl,
    // Multiple sections flat inputs may arrive as featuresSections[0].field
  } = req.body;

  if (variantsArray && variantsArray.length > 0) {
    const allSkus = variantsArray.map((v) => v.sku);
    const existingVariants = await Variant.find({
      sku: { $in: allSkus },
      isDeleted: { $ne: true },
    });

    if (existingVariants.length > 0) {
      const duplicateSkus = existingVariants.map((v) => v.sku).join(", ");
      return next(
        new AppError(`Duplicate SKU(s) found: ${duplicateSkus}`, 400)
      );
    }
  }

  const createdBy = req.user;
  const variantImagesMap = {};

  // Group files by variant
  const variantFiles = {};
  for (const file of req.files) {
    const { fieldname } = file;
    if (fieldname.startsWith("variants")) {
      const match = fieldname.match(/variants\[(\d+)\]\[images\]\[(\d+)\]/);
      if (match) {
        const variantIndex = match[1];
        const imageIndex = parseInt(match[2]);

        if (!variantFiles[variantIndex]) {
          variantFiles[variantIndex] = [];
        }
        variantFiles[variantIndex][imageIndex] = file;
      }
    }
  }

  // Upload images for each variant
  for (const [variantIndex, files] of Object.entries(variantFiles)) {
    const filteredFiles = files.filter((file) => file);
    if (filteredFiles.length > 0) {
      try {
        const productSlug = name.toLowerCase().replace(/[^a-z0-9]/g, "-");
        const imageUrls = await uploadMultipleToS3(filteredFiles, {
          folder: "products",
          filename: `${productSlug}/variant-${variantIndex}/image`,
        });
        variantImagesMap[variantIndex] = imageUrls;
      } catch (error) {
        console.error(
          `Error uploading images for variant ${variantIndex}:`,
          error
        );
        return next(
          new AppError(
            `Failed to upload images for variant ${parseInt(variantIndex) + 1}`,
            500
          )
        );
      }
    }
  }

  // Clean up variant images
  Object.keys(variantImagesMap).forEach((variantIndex) => {
    variantImagesMap[variantIndex] = variantImagesMap[variantIndex].filter(
      (img) => img
    );
  });

  // Handle feature images upload
  let uploadedFeatureImages = [];
  const featureImageFiles = req.files.filter((file) =>
    file.fieldname.startsWith("featureImages")
  );
  if (featureImageFiles.length > 0) {
    try {
      const productSlug = name.toLowerCase().replace(/[^a-z0-9]/g, "-");
      const featureImageUrls = await uploadMultipleToS3(featureImageFiles, {
        folder: "products",
        filename: `${productSlug}/features/feature`,
      });
      uploadedFeatureImages = featureImageUrls;
    } catch (error) {
      console.error("Error uploading feature images:", error);
      return next(new AppError("Failed to upload feature images", 500));
    }
  }

  // Handle featuresSection media upload (single media file)
  let featuresSectionMediaUrl = undefined;
  const featureSectionMediaFile = req.files.find(
    (file) => file.fieldname === "featuresSection.media"
  );
  if (featureSectionMediaFile) {
    try {
      const productSlug = name.toLowerCase().replace(/[^a-z0-9]/g, "-");
      const mediaUrls = await uploadMultipleToS3([featureSectionMediaFile], {
        folder: "products",
        filename: `${productSlug}/features/media`,
      });
      featuresSectionMediaUrl = mediaUrls?.[0] || undefined;
    } catch (error) {
      console.error("Error uploading featuresSection media:", error);
      return next(new AppError("Failed to upload features media", 500));
    }
  }

  // Handle multiple featuresSections media files: featuresSections[${i}].media
  const featuresSectionsMediaMap = {};
  for (const file of req.files) {
    const match = file.fieldname.match(/^featuresSections\[(\d+)\]\.media$/);
    if (match) {
      const idx = parseInt(match[1]);
      try {
        const productSlug = name.toLowerCase().replace(/[^a-z0-9]/g, "-");
        const mediaUrls = await uploadMultipleToS3([file], {
          folder: "products",
          filename: `${productSlug}/features/section-${idx}`,
        });
        featuresSectionsMediaMap[idx] = mediaUrls?.[0];
      } catch (error) {
        console.error(`Error uploading featuresSections[${idx}] media:`, error);
        return next(new AppError("Failed to upload features media", 500));
      }
    }
  }

  // Build single-section object (legacy input) to map into featuresSections[0]
  const legacySingleSection = (() => {
    let section = undefined;
    if (featuresSection && typeof featuresSection === "string") {
      try {
        section = JSON.parse(featuresSection);
      } catch (_) {}
    } else if (featuresSection && typeof featuresSection === "object") {
      section = featuresSection;
    }
    section = section || {};
    const layout = fsLayout || section.layout;
    const imagePosition = fsImagePosition || section.imagePosition;
    const mediaType = fsMediaType || section.mediaType;
    const title = fsTitle || section.title;
    const description = fsDescription || section.description;
    const mediaUrl = featuresSectionMediaUrl || fsMediaUrl || section.mediaUrl;
    if (
      layout ||
      imagePosition ||
      mediaType ||
      title ||
      description ||
      mediaUrl
    ) {
      return {
        layout: layout || "banner",
        imagePosition: imagePosition || "right",
        mediaType: mediaType || "image",
        title: title || undefined,
        description: description || undefined,
        mediaUrl: mediaUrl || undefined,
      };
    }
    return undefined;
  })();

  // Build featuresSections from array-like inputs
  const builtFeaturesSections = (() => {
    let sections = [];
    if (
      req.body.featuresSections &&
      typeof req.body.featuresSections === "string"
    ) {
      try {
        const parsed = JSON.parse(req.body.featuresSections);
        if (Array.isArray(parsed)) sections = parsed;
      } catch (_) {}
    }
    const indexes = new Set();
    Object.keys(req.body || {}).forEach((k) => {
      const m = k.match(/^featuresSections\[(\d+)\]\.([a-zA-Z]+)$/);
      if (m) indexes.add(parseInt(m[1]));
    });
    const arr = [...indexes]
      .sort((a, b) => a - b)
      .map((i) => {
        const layout = req.body[`featuresSections[${i}].layout`];
        const imagePosition = req.body[`featuresSections[${i}].imagePosition`];
        const mediaType = req.body[`featuresSections[${i}].mediaType`];
        const title = req.body[`featuresSections[${i}].title`];
        const description = req.body[`featuresSections[${i}].description`];
        const mediaUrl =
          featuresSectionsMediaMap[i] ||
          req.body[`featuresSections[${i}].mediaUrl`];
        if (
          layout ||
          imagePosition ||
          mediaType ||
          title ||
          description ||
          mediaUrl
        ) {
          return {
            layout: layout || "banner",
            imagePosition: imagePosition || "right",
            mediaType: mediaType || "image",
            title: title || undefined,
            description: description || undefined,
            mediaUrl: mediaUrl || undefined,
          };
        }
        return null;
      })
      .filter(Boolean);
    if (sections.length > 0) return sections;
    if (arr.length > 0) return arr;
    return [];
  })();

  const productData = {
    name,
    category,
    subcategory,
    createdBy,
    label,
    priority,
    activeStatus,
    about,
    specifications: Array.isArray(specifications)
      ? specifications.filter((s) => s && String(s).trim().length > 0)
      : specifications
      ? [specifications]
      : [],
    featureImages: uploadedFeatureImages,
    featuresSections:
      builtFeaturesSections.length > 0
        ? builtFeaturesSections
        : legacySingleSection
        ? [legacySingleSection]
        : [],
  };

  if (variantsArray && variantsArray.length > 0) {
    const parsedVariants = variantsArray;

    // Create variants with proper data structure
    const variantIds = await Promise.all(
      parsedVariants.map(async (variant, index) => {
        const variantData = {
          sku: variant.sku,
          price: variant.price,
          offerPrice: variant.offerPrice,
          stock: variant.stock,
          stockStatus: variant.stockStatus,
          attributes: variant.attributes,
          product: null, // Will be updated after product creation
          images: variantImagesMap[index] || [],
          grossPrice: variant.grossPrice,
        };

        const newVariant = new Variant(variantData);
        await newVariant.save();
        return newVariant._id;
      })
    );
    productData.variants = variantIds;
  }

  const newProduct = new Product(productData);
  await newProduct.save();

  // Update variants with the product reference
  if (newProduct.variants && newProduct.variants.length > 0) {
    await Variant.updateMany(
      { _id: { $in: newProduct.variants } },
      { $set: { product: newProduct._id } }
    );
  }

  res.status(201).json({
    message: "Product added successfully",
    product: newProduct,
  });
});

const listProducts = catchAsync(async (req, res, next) => {
  let {
    page,
    limit,
    categoryId,
    subcategoryId,
    minPrice,
    maxPrice,
    sort,
    search,
    labelId,
    offerId,
    activeStatus,
  } = req.query;

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  const skip = (page - 1) * limit;

  const Role = req.role;

  // Build base filter object
  const filter = {
    isDeleted: { $ne: true },
  };

  if (!Role) {
    filter.activeStatus = true;
  }

  if (offerId) {
    filter.offer = new mongoose.Types.ObjectId(offerId);
  }

  if (categoryId && categoryId !== "All Categories") {
    filter.category = new mongoose.Types.ObjectId(categoryId);
  }

  if (subcategoryId && subcategoryId !== "All Subcategories") {
    filter.subcategory = new mongoose.Types.ObjectId(subcategoryId);
  }

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { sku: { $regex: search, $options: "i" } },
    ];
  }

  if (labelId) {
    filter.label = {
      $in: labelId.split(",").map((id) => new mongoose.Types.ObjectId(id)),
    };
  }
  if (activeStatus && activeStatus !== "all") {
    filter.activeStatus = activeStatus === "active" ? true : false;
  }

  // Use aggregation pipeline for proper price handling
  const aggregationPipeline = [
    {
      $lookup: {
        from: "variants",
        localField: "variants",
        foreignField: "_id",
        as: "variantsData",
      },
    },
    {
      $addFields: {
        // Filter out out-of-stock variants first
        availableVariants: {
          $filter: {
            input: "$variantsData",
            as: "variant",
            cond: {
              $and: [
                { $ne: ["$$variant.stockStatus", "outofstock"] },
                { $gt: ["$$variant.stock", 0] },
              ],
            },
          },
        },
      },
    },
    {
      $addFields: {
        // If no available variants, use the first variant regardless of stock status
        finalVariants: {
          $cond: {
            if: { $gt: [{ $size: "$availableVariants" }, 0] },
            then: "$availableVariants",
            else: {
              $cond: {
                if: { $gt: [{ $size: "$variantsData" }, 0] },
                then: [{ $first: "$variantsData" }],
                else: [],
              },
            },
          },
        },
      },
    },
    {
      $addFields: {
        effectivePrice: {
          $cond: {
            if: { $eq: [sort, "price-high"] },
            then: {
              $cond: {
                if: { $gt: [{ $size: "$finalVariants" }, 0] },
                then: { $max: "$finalVariants.offerPrice" },
                else: "$offerPrice",
              },
            },
            else: {
              $cond: {
                if: { $gt: [{ $size: "$finalVariants" }, 0] },
                then: { $min: "$finalVariants.offerPrice" },
                else: "$offerPrice",
              },
            },
          },
        },
        sortedVariants: {
          $cond: {
            if: { $gt: [{ $size: "$finalVariants" }, 0] },
            then: {
              $cond: {
                if: { $eq: [sort, "price-high"] },
                then: {
                  $sortArray: {
                    input: "$finalVariants",
                    sortBy: { offerPrice: -1 },
                  },
                },
                else: {
                  $sortArray: {
                    input: "$finalVariants",
                    sortBy: { offerPrice: 1 },
                  },
                },
              },
            },
            else: [],
          },
        },
      },
    },
    {
      $addFields: {
        // Select the first available variant after sorting
        selectedVariant: {
          $cond: {
            if: { $gt: [{ $size: "$sortedVariants" }, 0] },
            then: { $first: "$sortedVariants" },
            else: null,
          },
        },
      },
    },
    {
      $match: {
        ...filter,
        ...(minPrice || maxPrice
          ? {
              effectivePrice: {
                ...(minPrice && { $gte: parseInt(minPrice) }),
                ...(maxPrice && { $lte: parseInt(maxPrice) }),
              },
            }
          : {}),
      },
    },
    {
      $lookup: {
        from: "labels",
        localField: "label",
        foreignField: "_id",
        as: "label",
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "createdBy",
      },
    },
    { $unwind: { path: "$label", preserveNullAndEmptyArrays: true } },
    { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
    { $unwind: { path: "$createdBy", preserveNullAndEmptyArrays: true } },
    {
      $sort:
        sort == "price-low"
          ? { effectivePrice: 1 }
          : sort == "price-high"
          ? { effectivePrice: -1 }
          : { priority: -1, updatedAt: -1 },
    },
    { $skip: skip },
    { $limit: limit },
    {
      $project: {
        _id: 1,
        name: 1,
        category: 1,
        description: 1,
        sku: 1,
        price: 1,
        offerPrice: 1,
        stock: 1,
        size: 1,
        images: 1,
        createdBy: 1,
        label: 1,
        averageRating: 1,
        totalRatings: 1,
        isDeleted: 1,
        stockStatus: 1,
        grossPrice: 1,
        offer: 1,
        priority: 1,
        createdAt: 1,
        updatedAt: 1,
        effectivePrice: 1,
        activeStatus: 1,
        // Include only the selected variant instead of all variants
        variantsData: {
          $cond: {
            if: { $gt: [{ $size: "$sortedVariants" }, 0] },
            then: ["$selectedVariant"],
            else: [],
          },
        },
      },
    },
  ];

  const countPipeline = [
    {
      $lookup: {
        from: "variants",
        localField: "variants",
        foreignField: "_id",
        as: "variantsData",
      },
    },
    {
      $addFields: {
        // Filter out out-of-stock variants first
        availableVariants: {
          $filter: {
            input: "$variantsData",
            as: "variant",
            cond: {
              $and: [
                { $ne: ["$$variant.stockStatus", "outofstock"] },
                { $gt: ["$$variant.stock", 0] },
              ],
            },
          },
        },
      },
    },
    {
      $addFields: {
        effectivePrice: {
          $cond: {
            if: { $gt: [{ $size: "$availableVariants" }, 0] },
            then: { $min: "$availableVariants.price" },
            else: "$price",
          },
        },
      },
    },
    {
      $match: {
        ...filter,
        ...(minPrice || maxPrice
          ? {
              effectivePrice: {
                ...(minPrice && { $gte: parseInt(minPrice) }),
                ...(maxPrice && { $lte: parseInt(maxPrice) }),
              },
            }
          : {}),
      },
    },
    { $count: "total" },
  ];

  const [products, countResult] = await Promise.all([
    Product.aggregate(aggregationPipeline),
    Product.aggregate(countPipeline),
  ]);

  // Use the count from countResult instead of products.length
  const totalProducts = countResult[0]?.total || 0;
  const formattedProducts = products.map((product) => {
    const formatted = formatProductResponse(product);
    // Add variants data separately
    formatted.variants = product.variantsData || [];
    return formatted;
  });

  res.status(200).json({
    success: true,
    data: {
      products: formattedProducts,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
      filters: {
        categoryId,
        subcategoryId,
        minPrice,
        maxPrice,
        sort,
      },
    },
  });
});

const getProductDetails = catchAsync(async (req, res, next) => {
  const { productId } = req.params;

  // Get product details with populated fields
  const productDetails = await Product.findById(productId)
    .populate("category")
    .populate("createdBy", "username email role")
    .populate("variants")
    .populate("label");

  if (!productDetails) {
    return next(new AppError("Product not found", 404));
  }

  // Get rating distribution
  const ratingDistribution = await RatingModal.aggregate([
    { $match: { productId: new mongoose.Types.ObjectId(productDetails._id) } },
    {
      $group: {
        _id: "$rating",
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: -1 } },
  ]);

  // Get all ratings with user details
  const ratings = await RatingModal.find({ productId: productDetails._id })
    .populate("userId", "username email profileImage") // Add the fields you want from the user
    .sort({ createdAt: -1 }); // Sort by newest first

  // Convert rating distribution to an object with all ratings (1-5)
  const ratingCounts = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  ratingDistribution.forEach((rating) => {
    ratingCounts[rating._id] = rating.count;
  });

  // Calculate rating statistics
  const totalRatings = ratings.length;
  const averageRating =
    totalRatings > 0
      ? ratings.reduce((sum, rating) => sum + rating.rating, 0) / totalRatings
      : 0;

  const updated = productDetails.toObject();
  updated.ratingDistribution = ratingCounts;
  updated.ratings = ratings;
  updated.ratingStats = {
    totalRatings,
    averageRating: Number(averageRating.toFixed(1)),
    ratingCounts,
  };

  res.status(200).json(updated);
});

const updateProduct = catchAsync(async (req, res, next) => {
  const { productId } = req.query;
  const updateData = req.body;

  // Normalize complex fields coming via multipart
  if (updateData.specifications) {
    updateData.specifications = Array.isArray(updateData.specifications)
      ? updateData.specifications.filter(
          (s) => s && String(s).trim().length > 0
        )
      : [updateData.specifications];
  }

  if (updateData.variants) {
    try {
      await Promise.all(
        updateData.variants.map(async (variant) => {
          const queryConditions = [{ sku: variant.sku }];

          // Exclude the current variant from the check
          const skuExists = await Variant.findOne({
            $or: queryConditions,
            _id: { $ne: variant._id },
            isDeleted: { $ne: true },
          });

          if (skuExists) {
            return Promise.reject(
              `${variant?.attributes?.title}'s SKU ${variant.sku} already exists`
            );
          }
        })
      );
    } catch (err) {
      return next(new AppError(err, 400));
    }
  }

  const product = await Product.findById(productId).populate("variants");

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  const variantImagesMap = {};
  const variantFiles = {};

  // First, group files by variant
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const { fieldname } = file;
      if (fieldname.startsWith("variants")) {
        const match = fieldname.match(/variants\[(\d+)\]\[images\]\[(\d+)\]/);
        if (match) {
          const variantIndex = match[1];
          const imageIndex = parseInt(match[2]);

          if (!variantFiles[variantIndex]) {
            // Initialize with empty array for files
            variantFiles[variantIndex] = [];
            // Initialize with existing images if it's an existing variant
            const existingVariant = product.variants[variantIndex];
            variantImagesMap[variantIndex] = existingVariant
              ? [...existingVariant.images]
              : [];
          }
          variantFiles[variantIndex][imageIndex] = file;
        }
      }
    }

    // Upload images for each variant
    for (const [variantIndex, files] of Object.entries(variantFiles)) {
      const filteredFiles = files.filter((file) => file); // Remove any undefined entries
      if (filteredFiles.length > 0) {
        try {
          const productSlug = product.name
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "-");
          const imageUrls = await uploadMultipleToS3(filteredFiles, {
            folder: "products",
            filename: `${productSlug}/variant-${variantIndex}/image`,
          });

          // Merge new URLs with existing ones at the correct positions
          files.forEach((file, i) => {
            if (file) {
              variantImagesMap[variantIndex][i] =
                imageUrls[filteredFiles.indexOf(file)];
            }
          });
        } catch (error) {
          console.error(
            `Error uploading images for variant ${variantIndex}:`,
            error
          );
          return next(
            new AppError(
              `Failed to upload images for variant ${
                parseInt(variantIndex) + 1
              }`,
              500
            )
          );
        }
      }
    }
  }

  // Handle feature images upload for updates
  let uploadedFeatureImages = [];
  const featureImageFiles =
    req.files?.filter((file) => file.fieldname.startsWith("featureImages")) ||
    [];
  if (featureImageFiles.length > 0) {
    try {
      const productSlug = product.name.toLowerCase().replace(/[^a-z0-9]/g, "-");
      const featureImageUrls = await uploadMultipleToS3(featureImageFiles, {
        folder: "products",
        filename: `${productSlug}/features/feature`,
      });
      uploadedFeatureImages = featureImageUrls;
    } catch (error) {
      console.error("Error uploading feature images:", error);
      return next(new AppError("Failed to upload feature images", 500));
    }
  }

  // Handle featuresSection media upload on update
  let uploadedFeatureSectionMediaUrl;
  const featureSectionMediaFile = req.files?.find(
    (file) => file.fieldname === "featuresSection.media"
  );
  if (featureSectionMediaFile) {
    try {
      const productSlug = product.name.toLowerCase().replace(/[^a-z0-9]/g, "-");
      const mediaUrls = await uploadMultipleToS3([featureSectionMediaFile], {
        folder: "products",
        filename: `${productSlug}/features/media`,
      });
      uploadedFeatureSectionMediaUrl = mediaUrls?.[0];
    } catch (error) {
      console.error("Error uploading featuresSection media:", error);
      return next(new AppError("Failed to upload features media", 500));
    }
  }

  // Handle multiple featuresSections media on update
  const updatedSectionsMediaMap = {};
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const match = file.fieldname.match(/^featuresSections\[(\d+)\]\.media$/);
      if (match) {
        const idx = parseInt(match[1]);
        try {
          const productSlug = product.name
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "-");
          const mediaUrls = await uploadMultipleToS3([file], {
            folder: "products",
            filename: `${productSlug}/features/section-${idx}`,
          });
          updatedSectionsMediaMap[idx] = mediaUrls?.[0];
        } catch (error) {
          console.error(
            `Error uploading featuresSections[${idx}] media:`,
            error
          );
          return next(new AppError("Failed to upload features media", 500));
        }
      }
    }
  }

  // Update feature data if new images were uploaded
  if (uploadedFeatureImages.length > 0) {
    updateData.featureImages = uploadedFeatureImages;
  }

  // Extract possible single-section updates (legacy) to map into featuresSections[0]
  let legacyUpdateObj;
  if (
    updateData.featuresSection &&
    typeof updateData.featuresSection === "string"
  ) {
    try {
      legacyUpdateObj = JSON.parse(updateData.featuresSection);
    } catch (_) {}
  } else if (
    updateData.featuresSection &&
    typeof updateData.featuresSection === "object"
  ) {
    legacyUpdateObj = updateData.featuresSection;
  }
  const legacyLayout =
    updateData["featuresSection.layout"] || legacyUpdateObj?.layout;
  const legacyImagePosition =
    updateData["featuresSection.imagePosition"] ||
    legacyUpdateObj?.imagePosition;
  const legacyMediaType =
    updateData["featuresSection.mediaType"] || legacyUpdateObj?.mediaType;
  const legacyTitle =
    updateData["featuresSection.title"] || legacyUpdateObj?.title;
  const legacyDescription =
    updateData["featuresSection.description"] || legacyUpdateObj?.description;
  const legacyMediaUrl =
    uploadedFeatureSectionMediaUrl ||
    updateData["featuresSection.mediaUrl"] ||
    legacyUpdateObj?.mediaUrl;
  // Remove legacy fields from updateData to avoid writing to featuresSection
  delete updateData.featuresSection;
  delete updateData["featuresSection.layout"];
  delete updateData["featuresSection.imagePosition"];
  delete updateData["featuresSection.mediaType"];
  delete updateData["featuresSection.title"];
  delete updateData["featuresSection.description"];
  delete updateData["featuresSection.mediaUrl"];

  // Build updates for featuresSections array
  // Find indexes in body for featuresSections
  const sectionIndexes = new Set();
  Object.keys(updateData || {}).forEach((k) => {
    const m = k.match(/^featuresSections\[(\d+)\]\.([a-zA-Z]+)$/);
    if (m) sectionIndexes.add(parseInt(m[1]));
  });
  // Ensure index 0 is included if legacy single-section updates are present
  if (
    legacyLayout !== undefined ||
    legacyImagePosition !== undefined ||
    legacyMediaType !== undefined ||
    legacyTitle !== undefined ||
    legacyDescription !== undefined ||
    legacyMediaUrl
  ) {
    sectionIndexes.add(0);
  }
  if (
    sectionIndexes.size > 0 ||
    Object.keys(updatedSectionsMediaMap).length > 0
  ) {
    // Initialize array from existing product
    const base = Array.isArray(product.featuresSections)
      ? [...product.featuresSections]
      : [];
    const allIdx = new Set([
      ...sectionIndexes,
      ...Object.keys(updatedSectionsMediaMap).map((n) => parseInt(n)),
    ]);
    for (const i of allIdx) {
      const curr = base[i] || {};
      const layout = updateData[`featuresSections[${i}].layout`];
      const imagePosition = updateData[`featuresSections[${i}].imagePosition`];
      const mediaType = updateData[`featuresSections[${i}].mediaType`];
      const title = updateData[`featuresSections[${i}].title`];
      const description = updateData[`featuresSections[${i}].description`];
      const mediaUrl =
        updatedSectionsMediaMap[i] ||
        (i === 0
          ? legacyMediaUrl || updateData[`featuresSections[${i}].mediaUrl`]
          : updateData[`featuresSections[${i}].mediaUrl`]);
      base[i] = {
        ...curr,
        ...(layout !== undefined
          ? { layout }
          : i === 0 && legacyLayout !== undefined
          ? { layout: legacyLayout }
          : {}),
        ...(imagePosition !== undefined
          ? { imagePosition }
          : i === 0 && legacyImagePosition !== undefined
          ? { imagePosition: legacyImagePosition }
          : {}),
        ...(mediaType !== undefined
          ? { mediaType }
          : i === 0 && legacyMediaType !== undefined
          ? { mediaType: legacyMediaType }
          : {}),
        ...(title !== undefined
          ? { title }
          : i === 0 && legacyTitle !== undefined
          ? { title: legacyTitle }
          : {}),
        ...(description !== undefined
          ? { description }
          : i === 0 && legacyDescription !== undefined
          ? { description: legacyDescription }
          : {}),
        ...(mediaUrl ? { mediaUrl } : {}),
      };
    }
    updateData.featuresSections = base;
  }

  let variantIds = [];
  let newVariants = [];
  if (updateData.variants) {
    await Promise.all(
      updateData.variants.map(async (variant, index) => {
        if (variant._id) {
          variantIds.push(variant._id);
          const variantId = variant._id;
          delete variant._id;

          // Update existing variant with new images if any
          if (variantImagesMap[index]) {
            variant.images = variantImagesMap[index].filter((img) => img);
          }

          await Variant.findByIdAndUpdate(variantId, variant, {
            new: true,
            runValidators: true,
          });
        } else {
          variant.product = productId;

          if (variantImagesMap[index]) {
            variant.images = variantImagesMap[index].filter((img) => img);
          }

          const newVariant = new Variant(variant);
          await newVariant.save();
          variantIds.push(newVariant._id);
          newVariants.push(newVariant);
        }
      })
    );
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    {
      ...updateData,
      variants: variantIds,
      // Ensure legacy field is removed from existing documents
      $unset: { featuresSection: "" },
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    message: "Product updated successfully",
    product: updatedProduct,
  });
});

const deleteProduct = catchAsync(async (req, res, next) => {
  const { productId, variantId } = req.query;

  if (variantId) {
    const variant = await Variant.findOneAndDelete({
      _id: variantId,
      product: productId,
    });

    if (!variant) {
      return next(
        new AppError(
          "Variant not found or does not belong to the specified product",
          404
        )
      );
    }
    await productModel.findByIdAndUpdate(productId, {
      $pull: { variants: variantId },
    });
    res.status(200).json({
      message: "Variant deleted successfully",
    });
  } else {
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    await Variant.deleteMany({ product: productId });

    res.status(200).json({
      message: "Product and its variants deleted successfully",
    });
  }
});

const getProductsByLabel = catchAsync(async (req, res, next) => {
  const { labelId } = req.params;
  const products = await productModel
    .find({ label: labelId })
    .populate("label");

  res.status(200).json(products);
});

const getGroupedProductsByLabel = catchAsync(async (req, res, next) => {
  const result = await groupProductsByLabel();
  res.status(200).json(result);
});

const searchProducts = catchAsync(async (req, res, next) => {
  let { keyword, page, limit } = req.query;

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 100;
  const skip = (page - 1) * limit;

  const Role = req.role;

  const filter = {
    isDeleted: { $ne: true },
  };

  if (!Role) {
    filter.activeStatus = true;
  }

  if (Role === "store") {
    filter.store = new mongoose.Types.ObjectId(req.user);
  }

  // Create aggregation pipeline for better search
  const aggregationPipeline = [
    {
      $lookup: {
        from: "variants",
        localField: "variants",
        foreignField: "_id",
        as: "variantsData",
      },
    },
    {
      $match: {
        ...filter,
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          // { description: { $regex: keyword, $options: "i" } },
          { "variantsData.sku": { $regex: keyword, $options: "i" } },
        ],
      },
    },
    {
      $lookup: {
        from: "brands",
        localField: "brand",
        foreignField: "_id",
        as: "brand",
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "createdBy",
      },
    },
    { $unwind: { path: "$brand", preserveNullAndEmptyArrays: true } },
    { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
    { $unwind: { path: "$createdBy", preserveNullAndEmptyArrays: true } },
    { $skip: skip },
    { $limit: limit },
  ];

  const countPipeline = [
    {
      $lookup: {
        from: "variants",
        localField: "variants",
        foreignField: "_id",
        as: "variantsData",
      },
    },
    {
      $match: keyword
        ? {
            $or: [
              { name: { $regex: keyword, $options: "i" } },
              // { description: { $regex: keyword, $options: "i" } },
              { "variantsData.sku": { $regex: keyword, $options: "i" } },
            ],
          }
        : {},
    },
    { $count: "total" },
  ];

  const [products, countResult] = await Promise.all([
    Product.aggregate(aggregationPipeline),
    Product.aggregate(countPipeline),
  ]);

  const totalProducts = countResult[0]?.total || 0;
  const formattedProducts = products.map((product) => {
    const formatted = formatProductResponse(product);
    // Add variants data separately
    formatted.variants = product.variantsData || [];
    return formatted;
  });

  res.status(200).json({
    success: true,
    data: {
      products: formattedProducts,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
    },
  });
});

const softDeleteProduct = catchAsync(async (req, res, next) => {
  const { productId } = req.query;

  const product = await Product.findById(productId);

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  // Update the product status to indicate it's deleted
  await Product.findByIdAndUpdate(productId, {
    isDeleted: true,
    deletedAt: new Date(),
  });

  res.status(200).json({
    status: "success",
    message: "Product has been soft deleted",
  });
});

const updateVariant = catchAsync(async (req, res, next) => {
  const { variantId } = req.params;

  const product = await Product.findOne({
    variants: { $in: variantId },
  });

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  product.variants = product.variants.filter(
    (id) => id.toString() !== variantId
  );

  await product.save();

  const variant = await Variant.findByIdAndUpdate(variantId, {
    isDeleted: true,
  });

  res.status(200).json({
    message: "Variant deleted successfully",
  });
});

module.exports = {
  addProduct,
  listProducts,
  getProductDetails,
  updateProduct,
  deleteProduct,
  getProductsByLabel,
  getGroupedProductsByLabel,
  searchProducts,
  softDeleteProduct,
  updateVariant,
};
