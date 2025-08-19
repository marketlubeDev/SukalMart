import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { adminUtilities } from "../../sevices/adminApis";
import {
  getProductById,
  addProduct,
  updateProduct,
  deleteVariant,
} from "../../sevices/ProductApis";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/spinner/LoadingSpinner";
import { validateProduct } from "../../components/Admin/Product/components/Validations/ProductValidation";
import ConfirmationModal from "../../components/Admin/ConfirmationModal";
import { useSelector } from "react-redux";
function Addproduct() {
  const location = useLocation();
  const navigate = useNavigate();
  const productId = location.state?.productId;

  const { store } = useSelector((state) => state.store);
  // State for product and variants
  const [productData, setProductData] = useState({
    name: "",
    brand: "",
    category: "",
    subcategory: "",
    store: store?._id || "",
    label: "",
    activeStatus: true,
    priority: 0,
    about: "",
    specifications: [""],
    returnPolicyDays: 7,
    returnPolicyText: "",
    featureImages: [null, null, null],
    featureVideoUrl: "",
  });
  const [variants, setVariants] = useState([
    {
      name: "",
      sku: "",
      mrp: "",
      offerPrice: "",
      costPrice: "",
      description: "",
      images: [null, null, null, null],
      stockStatus: "",
      stockQuantity: "",
    },
  ]);
  const [activeVariant, setActiveVariant] = useState(0);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [labels, setLabels] = useState([]);
  const [showSubcategory, setShowSubcategory] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    product: {},
    variants: {},
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [variantToDelete, setVariantToDelete] = useState(null);
  const [isDeletingVariant, setIsDeletingVariant] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const [showBulkSpecAdd, setShowBulkSpecAdd] = useState(false);
  const [bulkSpecText, setBulkSpecText] = useState("");
  const SPEC_CHAR_LIMIT = 140;

  useEffect(() => {
    if (productData.category && categories.length > 0) {
      const selectedCategory = categories.find(
        (c) => c._id === productData.category
      );
      setShowSubcategory(selectedCategory?.subcategories || []);
    } else {
      setShowSubcategory([]);
    }
  }, [productData.category, categories]);

  useEffect(() => {
    const fetchUtilities = async () => {
      try {
        const response = await adminUtilities();
        setCategories(response?.data.categories);
        setSubcategories(response?.data.subcategories);
        setLabels(response?.data.labels);
      } catch (error) {
        console.log(error);
        toast.error(
          error?.response?.data?.message || "Error fetching utilities"
        );
      }
    };
    fetchUtilities();
  }, []);

  useEffect(() => {}, [showSubcategory]);

  useEffect(() => {
    if (productId) {
      setIsEditMode(true);
      setIsLoadingProduct(true);
      const fetchProduct = async () => {
        try {
          const res = await getProductById(productId);
          const prod = res.data;
          setProductData({
            name: prod.name || "",
            // brand: prod.brand?._id || "",
            category: prod.category?._id || "",
            subcategory: prod.subcategory || "",
            store: prod.store?._id || "",
            label: prod.label?._id || "",
            activeStatus: prod.activeStatus ?? true,
            priority: prod.priority ?? 0,
            about: prod.about || "",
            specifications:
              prod.specifications && prod.specifications.length > 0
                ? prod.specifications
                : [""],
            returnPolicyDays: prod.returnPolicyDays ?? 7,
            returnPolicyText: prod.returnPolicyText || "",
            featureImages: prod.featureImages || [null, null, null],
            featureVideoUrl: prod.featureVideoUrl || "",
          });
          setVariants(
            (prod.variants || []).map((v) => ({
              name: v.attributes?.title || "",
              sku: v.sku || "",
              mrp: v.price || "",
              offerPrice: v.offerPrice || "",
              costPrice: v.grossPrice || "",
              description: v.attributes?.description || "",
              images: v.images || [null, null, null, null],
              stockStatus: v.stockStatus || "",
              stockQuantity: v.stock === 0 ? "0" : v.stock || "",
              _id: v._id,
            }))
          );
        } catch (err) {
          toast.error("Failed to fetch product details");
        } finally {
          setIsLoadingProduct(false);
        }
      };
      fetchProduct();
    }
  }, [productId]);

  // Add new variant
  const handleAddVariant = () => {
    setVariants([
      ...variants,
      {
        name: "",
        sku: "",
        mrp: "",
        offerPrice: "",
        costPrice: "",
        description: "",
        images: [null, null, null, null],
        stockStatus: "",
        stockQuantity: "00",
      },
    ]);
    setActiveVariant(variants.length);
  };

  // Handle variant field change
  const handleVariantChange = (e) => {
    const { name, value } = e.target;

    // Prevent negative values for number fields
    if (["mrp", "offerPrice", "costPrice"].includes(name)) {
      const numValue = parseFloat(value);
      if (numValue < 0) return; // Don't update if negative
    }

    setVariants((prev) =>
      prev.map((v, i) => (i === activeVariant ? { ...v, [name]: value } : v))
    );
  };

  // Handle image upload (UI only)
  const handleImageChange = (idx, file) => {
    if (!file) return;

    // Check file size (1MB = 1 * 1024 * 1024 bytes)
    const maxSizeInBytes = 1 * 1024 * 1024; // 1MB
    if (file.size > maxSizeInBytes) {
      toast.error(
        `Image size should not exceed 1MB. Selected file is ${(
          file.size /
          (1024 * 1024)
        ).toFixed(2)}MB`
      );
      return;
    }

    // Check file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPEG, JPG, PNG, and WebP image formats are allowed");
      return;
    }

    setVariants((prev) =>
      prev.map((v, i) => {
        if (i !== activeVariant) return v;
        const newImages = [...v.images];
        newImages[idx] = file;
        return { ...v, images: newImages };
      })
    );
  };

  // Remove an already selected image from a specific slot in current variant
  const handleRemoveImage = (idx) => {
    setVariants((prev) =>
      prev.map((variant, i) => {
        if (i !== activeVariant) return variant;
        const nextImages = [...(variant.images || [])];
        nextImages[idx] = null;
        return { ...variant, images: nextImages };
      })
    );
  };

  // Handle stock status checkbox
  const handleStockStatus = (status) => {
    setVariants((prev) =>
      prev.map((v, i) =>
        i === activeVariant ? { ...v, stockStatus: status } : v
      )
    );
  };

  // Handle stock quantity
  const handleStockQuantity = (e) => {
    const value = e.target.value;

    // Prevent negative values for stock quantity
    const numValue = parseInt(value);
    if (numValue < 0) return; // Don't update if negative

    setVariants((prev) =>
      prev.map((v, i) =>
        i === activeVariant ? { ...v, stockQuantity: value } : v
      )
    );
  };

  // Handle tab click
  const handleTabClick = (idx) => {
    setActiveVariant(idx);
  };

  // Remove a variant
  const handleRemoveVariant = async (idx) => {
    if (variants.length === 1) return; // Don't allow removing last variant
    const variant = variants[idx];

    if (isEditMode && variant._id) {
      setIsDeletingVariant(true);
      try {
        await deleteVariant(variant._id);
        // Optionally show a toast here for success
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to delete variant"
        );
        setIsDeletingVariant(false);
        setShowDeleteModal(false);
        return;
      }
      setIsDeletingVariant(false);
    }

    // Remove from UI state
    const newVariants = variants.filter((_, i) => i !== idx);
    let newActive = activeVariant;
    if (idx === activeVariant) {
      newActive = 0;
    } else if (idx < activeVariant) {
      newActive = activeVariant - 1;
    }
    setVariants(newVariants);
    setActiveVariant(newActive);
    setShowDeleteModal(false);
  };

  const handleProductChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData((prev) => {
      const newData = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      // Clear subcategory when category changes
      if (name === "category") {
        newData.subcategory = "";
      }

      return newData;
    });
  };

  const handleFeatureImageChange = (idx, file) => {
    if (!file) return;
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPEG, JPG, PNG, and WebP image formats are allowed");
      return;
    }
    const maxSizeInBytes = 1 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      toast.error(`Image size should not exceed 1MB.`);
      return;
    }
    setProductData((prev) => {
      const next = { ...prev };
      const imgs = Array.isArray(next.featureImages)
        ? [...next.featureImages]
        : [];
      imgs[idx] = file;
      next.featureImages = imgs;
      return next;
    });
  };

  const addSpecification = () => {
    setProductData((prev) => ({
      ...prev,
      specifications: [...(prev.specifications || []), ""],
    }));
  };

  const removeSpecification = (idx) => {
    setProductData((prev) => ({
      ...prev,
      specifications: (prev.specifications || []).filter((_, i) => i !== idx),
    }));
  };

  const updateSpecification = (idx, value) => {
    setProductData((prev) => {
      const list = [...(prev.specifications || [])];
      list[idx] = value;
      return { ...prev, specifications: list };
    });
  };

  const moveSpecification = (fromIndex, toIndex) => {
    setProductData((prev) => {
      const list = [...(prev.specifications || [])];
      if (toIndex < 0 || toIndex >= list.length) return prev;
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      return { ...prev, specifications: list };
    });
  };

  const moveSpecificationUp = (idx) => moveSpecification(idx, idx - 1);
  const moveSpecificationDown = (idx) => moveSpecification(idx, idx + 1);

  const duplicateSpecification = (idx) => {
    setProductData((prev) => {
      const list = [...(prev.specifications || [])];
      list.splice(idx + 1, 0, list[idx] || "");
      return { ...prev, specifications: list };
    });
  };

  const clearSpecifications = () => {
    setProductData((prev) => ({ ...prev, specifications: [""] }));
  };

  const handleBulkAddSpecifications = () => {
    const lines = (bulkSpecText || "")
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => l.slice(0, SPEC_CHAR_LIMIT));
    if (lines.length === 0) return;
    setProductData((prev) => ({
      ...prev,
      specifications: [...(prev.specifications || []), ...lines],
    }));
    setBulkSpecText("");
    setShowBulkSpecAdd(false);
  };

  const handlePasteIntoSpecInput = (idx, e) => {
    const text = e.clipboardData?.getData("text") || "";
    if (/\r?\n/.test(text)) {
      e.preventDefault();
      const lines = text
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter(Boolean)
        .map((l) => l.slice(0, SPEC_CHAR_LIMIT));
      if (lines.length === 0) return;
      setProductData((prev) => {
        const list = [...(prev.specifications || [])];
        list[idx] = lines[0];
        if (lines.length > 1) {
          list.splice(idx + 1, 0, ...lines.slice(1));
        }
        return { ...prev, specifications: list };
      });
    }
  };

  const handlePublishProduct = async () => {
    setIsLoading(true);

    // Validate the product data
    const validationErrors = validateProduct(productData, variants, categories);

    if (Object.keys(validationErrors).length > 0) {
      // Separate product and variant errors
      const productErrors = {};
      const variantErrors = {};

      Object.entries(validationErrors).forEach(([key, value]) => {
        if (key.startsWith("variant")) {
          const variantIndex = parseInt(key.replace("variant", ""));
          variantErrors[variantIndex] = value;
        } else {
          productErrors[key] = value;
        }
      });

      setErrors({
        product: productErrors,
        variants: variantErrors,
      });
      setIsLoading(false);
      return;
    }

    // Clear errors if validation passes
    setErrors({ product: {}, variants: {} });

    const formData = new FormData();
    Object.entries(productData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === "specifications" && Array.isArray(value)) {
          value.forEach((v) => formData.append("specifications", v));
        } else if (key === "featureImages" && Array.isArray(value)) {
          value.forEach((img, idx) => {
            if (img && typeof img !== "string") {
              formData.append(`featureImages[${idx}]`, img);
            }
          });
        } else {
          formData.append(key, value);
        }
      }
    });
    formData.append("isDeleted", false);

    variants.forEach((v, variantIndex) => {
      if (v._id) formData.append(`variants[${variantIndex}][_id]`, v._id);
      formData.append(`variants[${variantIndex}][sku]`, v.sku);
      formData.append(`variants[${variantIndex}][price]`, v.mrp);
      formData.append(`variants[${variantIndex}][offerPrice]`, v.offerPrice);
      formData.append(`variants[${variantIndex}][stock]`, v.stockQuantity);
      formData.append(`variants[${variantIndex}][stockStatus]`, v.stockStatus);
      formData.append(`variants[${variantIndex}][grossPrice]`, v.costPrice);
      formData.append(`variants[${variantIndex}][attributes][title]`, v.name);
      formData.append(
        `variants[${variantIndex}][attributes][description]`,
        v.description
      );
      v.images.forEach((img, imgIdx) => {
        if (img) {
          formData.append(`variants[${variantIndex}][images][${imgIdx}]`, img);
        }
      });
    });

    try {
      let response;
      if (isEditMode) {
        response = await updateProduct(productId, formData);
        toast.success("Product updated successfully");
      } else {
        response = await addProduct(formData);
        toast.success("Product added successfully");
      }

      if (store && Object.keys(store).length > 0) {
        navigate("/store/product");
      } else {
        navigate("/admin/product");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error saving product");
    } finally {
      setIsLoading(false);
    }
  };

  // Add error display helper
  const getError = (field, isVariant = false, variantIndex = null) => {
    if (isVariant && variantIndex !== null) {
      return errors.variants[variantIndex]?.[field];
    }
    return errors.product[field];
  };

  return (
    <div className="space-y-2 w-full bg-white p-4 flex flex-col min-h-full relative">
      {isLoadingProduct && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">
              Loading product details...
            </p>
          </div>
        </div>
      )}
      <div className="shadow p-3 rounded-lg border">
        <div className="-mx-4 -mt-4 mb-4 p-3 rounded-t-lg border-b bg-gradient-to-r from-teal-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-teal-600 text-white grid place-items-center">
                <span>🛍️</span>
              </div>
              <div>
                <h2 className="font-bold text-xl text-gray-900">Products</h2>
                <div className="mt-0.5 flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    {isEditMode ? "Edit Product" : "Add Product"}
                  </span>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 text-xs rounded-full ${
                      isEditMode
                        ? "bg-amber-100 text-amber-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {isEditMode ? "Edit mode" : "Create mode"}
                  </span>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-3 py-1.5 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() =>
                  window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: "smooth",
                  })
                }
                className="px-3 py-1.5 rounded-md border border-teal-400 text-teal-600 bg-white hover:bg-teal-50"
              >
                Go to Actions
              </button>
            </div>
          </div>
        </div>

        {/* Product Name, Active Status */}
        <div className="mb-3 border rounded-lg p-3 bg-gray-50">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <label className="font-medium">
                Product Name <span className="text-red-500">*</span>
              </label>
              <span className="text-xs text-gray-500">
                {(productData.name || "").length}/120
              </span>
            </div>

            <label className="flex items-center gap-3 cursor-pointer select-none">
              <span className="text-sm text-gray-700">Active</span>
              <span className="relative inline-flex items-center">
                <input
                  type="checkbox"
                  name="activeStatus"
                  checked={!!productData.activeStatus}
                  onChange={handleProductChange}
                  disabled={isLoadingProduct}
                  className="sr-only peer"
                />
                <span className="w-11 h-6 rounded-full bg-gray-300 peer-checked:bg-teal-600 transition-colors"></span>
                <span className="absolute left-0.5 top-0.5 h-5 w-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5"></span>
              </span>
            </label>
          </div>
          <input
            type="text"
            name="name"
            maxLength={120}
            className={`mt-2 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
              getError("name") ? "border-red-500" : ""
            } ${isLoadingProduct ? "bg-gray-100 cursor-not-allowed" : ""}`}
            value={productData.name}
            onChange={handleProductChange}
            placeholder={
              isLoadingProduct ? "Loading..." : "Enter product title"
            }
            disabled={isLoadingProduct}
          />
          {getError("name") && (
            <p className="text-red-500 text-sm mt-1">{getError("name")}</p>
          )}
        </div>

        {/* About product */}
        <div className="mb-3">
          <div>
            <label className="block mb-1 font-medium">About product</label>
            <textarea
              name="about"
              value={productData.about}
              onChange={handleProductChange}
              className={`w-full border rounded-lg px-3 py-2 ${
                isLoadingProduct ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              rows={4}
              placeholder={
                isLoadingProduct ? "Loading..." : "Describe the product..."
              }
              disabled={isLoadingProduct}
            />
          </div>
        </div>

        {/* Brand, Category, Subcategory */}
        <div className="flex gap-3 mb-3">
          <div className="flex-1">
            <label className="block mb-1 font-medium">Category</label>
            <select
              className={`w-full border rounded-lg px-3 py-2 ${
                getError("category") ? "border-red-500" : ""
              } ${isLoadingProduct ? "bg-gray-100 cursor-not-allowed" : ""}`}
              name="category"
              value={productData.category}
              onChange={handleProductChange}
              disabled={isLoadingProduct}
            >
              <option value="" disabled>
                {isLoadingProduct ? "Loading categories..." : "Select Category"}
              </option>
              {categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            {getError("category") && (
              <p className="text-red-500 text-sm mt-1">
                {getError("category")}
              </p>
            )}
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium">Subcategory</label>
            <select
              className={`w-full border rounded-lg px-3 py-2 ${
                getError("subcategory") ? "border-red-500" : ""
              } ${isLoadingProduct ? "bg-gray-100 cursor-not-allowed" : ""}`}
              name="subcategory"
              value={productData?.subcategory || ""}
              onChange={handleProductChange}
              disabled={isLoadingProduct}
            >
              <option value="" disabled>
                {isLoadingProduct
                  ? "Loading subcategories..."
                  : "Select Subcategory"}
              </option>
              {showSubcategory?.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
            {getError("subcategory") && (
              <p className="text-red-500 text-sm mt-1">
                {getError("subcategory")}
              </p>
            )}
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium">Label</label>
            <select
              className={`w-full border rounded-lg px-3 py-2 ${
                getError("label") ? "border-red-500" : ""
              } ${isLoadingProduct ? "bg-gray-100 cursor-not-allowed" : ""}`}
              name="label"
              value={productData.label}
              onChange={handleProductChange}
              disabled={isLoadingProduct}
            >
              <option value="" disabled>
                {isLoadingProduct ? "Loading labels..." : "Select Label"}
              </option>
              {labels.map((label) => (
                <option key={label._id} value={label._id}>
                  {label.name}
                </option>
              ))}
            </select>
            {getError("label") && (
              <p className="text-red-500 text-sm mt-1">{getError("label")}</p>
            )}
          </div>
        </div>
        {/* Specifications */}
        <div className="mb-3">
          <div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <label className="block mb-1 font-medium">
                  Specifications (bullets)
                </label>
                <span className="text-xs text-gray-500">
                  {(productData.specifications || []).length} items
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                  onClick={() => setShowBulkSpecAdd((s) => !s)}
                  disabled={isLoadingProduct}
                >
                  {showBulkSpecAdd ? "Close bulk add" : "Bulk add"}
                </button>
                <button
                  type="button"
                  className="px-3 py-1 rounded-md border border-red-400 text-red-500 bg-white hover:bg-red-50"
                  onClick={clearSpecifications}
                  disabled={isLoadingProduct}
                >
                  Clear all
                </button>
                <button
                  type="button"
                  className="px-3 py-1 rounded-md border border-teal-400 text-teal-500 bg-white hover:bg-teal-50"
                  onClick={addSpecification}
                  disabled={isLoadingProduct}
                >
                  + Add
                </button>
              </div>
            </div>

            {showBulkSpecAdd && (
              <div className="mt-2 border rounded-lg p-2 bg-gray-50">
                <label className="block mb-1 text-sm text-gray-600">
                  Paste multiple specifications (one per line)
                </label>
                <textarea
                  value={bulkSpecText}
                  onChange={(e) => setBulkSpecText(e.target.value)}
                  rows={3}
                  className={`w-full border rounded-lg px-3 py-2 ${
                    isLoadingProduct ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                  placeholder="e.g. Durable build\nFast charging\n2-year warranty"
                  disabled={isLoadingProduct}
                />
                <div className="flex justify-end gap-2 mt-1">
                  <button
                    type="button"
                    className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                    onClick={() => setBulkSpecText("")}
                    disabled={isLoadingProduct}
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1 rounded-md border border-teal-400 text-teal-600 bg-white hover:bg-teal-50"
                    onClick={handleBulkAddSpecifications}
                    disabled={isLoadingProduct}
                  >
                    Add lines
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-1 mt-1">
              {(productData.specifications || []).map((spec, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full border border-teal-300 text-teal-600 text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={spec || ""}
                    maxLength={SPEC_CHAR_LIMIT}
                    onPaste={(e) => handlePasteIntoSpecInput(idx, e)}
                    onChange={(e) => updateSpecification(idx, e.target.value)}
                    className={`flex-1 border rounded-lg px-3 py-1.5 ${
                      isLoadingProduct ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                    placeholder={`Bullet ${idx + 1}`}
                    disabled={isLoadingProduct}
                  />
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {(spec || "").length}/{SPEC_CHAR_LIMIT}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      title="Move up"
                      className="px-2 py-1 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      onClick={() => moveSpecificationUp(idx)}
                      disabled={idx === 0 || isLoadingProduct}
                    >
                      ▲
                    </button>
                    <button
                      type="button"
                      title="Move down"
                      className="px-2 py-1 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      onClick={() => moveSpecificationDown(idx)}
                      disabled={
                        idx === (productData.specifications || []).length - 1 ||
                        isLoadingProduct
                      }
                    >
                      ▼
                    </button>
                    <button
                      type="button"
                      title="Duplicate"
                      className="px-2 py-1 rounded-md border border-teal-300 text-teal-600 bg-white hover:bg-teal-50"
                      onClick={() => duplicateSpecification(idx)}
                      disabled={isLoadingProduct}
                    >
                      ⧉
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-md border border-red-400 text-red-500 bg-white hover:bg-red-50"
                      onClick={() => removeSpecification(idx)}
                      disabled={isLoadingProduct}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Variant Tabs */}
        <div className="mb-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center flex-wrap gap-2 bg-gray-50 border rounded-lg p-2">
              {variants.map((v, idx) => (
                <button
                  key={idx}
                  className={`group flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium transition-all ${
                    activeVariant === idx
                      ? "bg-teal-600 text-white border-teal-600 shadow"
                      : "bg-white text-gray-700 border-teal-300 hover:bg-teal-50"
                  }`}
                  onClick={() => handleTabClick(idx)}
                  type="button"
                >
                  <span>Variant {idx + 1}</span>
                  {variants.length > 1 && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        setVariantToDelete(
                          isEditMode ? variants[idx]._id : idx
                        );
                        setShowDeleteModal(true);
                      }}
                      className="ml-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-black/10 text-white/90 group-[.bg-teal-600]:bg-white/20 hover:opacity-90"
                      title="Remove Variant"
                    >
                      ×
                    </span>
                  )}
                </button>
              ))}
            </div>
            <button
              className="px-3 py-1.5 rounded-md border-2 border-dashed border-teal-400 text-teal-600 bg-white hover:bg-teal-50 font-semibold"
              onClick={handleAddVariant}
              type="button"
            >
              + Add Variant
            </button>
          </div>
        </div>
        {/* Variant Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left: Variant fields */}
          <div className="flex-1 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex-1">
                <label className="block mb-1 font-medium">Variant name</label>
                <input
                  type="text"
                  name="name"
                  value={variants[activeVariant].name}
                  onChange={handleVariantChange}
                  className={`w-full border rounded-lg px-3 py-1.5 ${
                    getError("name", true, activeVariant)
                      ? "border-red-500"
                      : ""
                  } ${
                    isLoadingProduct ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                  placeholder={
                    isLoadingProduct ? "Loading..." : "e.g., 4k resolution"
                  }
                  disabled={isLoadingProduct}
                />
                {getError("name", true, activeVariant) && (
                  <p className="text-red-500 text-sm mt-1">
                    {getError("name", true, activeVariant)}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <label className="block mb-1 font-medium">SKU</label>
                <input
                  type="text"
                  name="sku"
                  value={variants[activeVariant].sku}
                  onChange={handleVariantChange}
                  className={`w-full border rounded-lg px-3 py-1.5 ${
                    getError("sku", true, activeVariant) ? "border-red-500" : ""
                  } ${
                    isLoadingProduct ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                  placeholder={
                    isLoadingProduct ? "Loading..." : "e.g., #2586312f9"
                  }
                  disabled={isLoadingProduct}
                />
                {getError("sku", true, activeVariant) && (
                  <p className="text-red-500 text-sm mt-1">
                    {getError("sku", true, activeVariant)}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex-1">
                <label className="block mb-1 font-medium">MRP</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    ₹
                  </span>
                  <input
                    type="number"
                    name="mrp"
                    value={variants[activeVariant].mrp}
                    onChange={handleVariantChange}
                    onWheel={(e) => e.target.blur()}
                    min="0"
                    className={`w-full border rounded-lg px-8 py-1.5 ${
                      getError("mrp", true, activeVariant)
                        ? "border-red-500"
                        : ""
                    } ${
                      isLoadingProduct ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                    placeholder={isLoadingProduct ? "Loading..." : "0.00"}
                    disabled={isLoadingProduct}
                  />
                </div>
                {getError("mrp", true, activeVariant) && (
                  <p className="text-red-500 text-sm mt-1">
                    {getError("mrp", true, activeVariant)}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <label className="block mb-1 font-medium">Offer price</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    ₹
                  </span>
                  <input
                    type="number"
                    name="offerPrice"
                    value={variants[activeVariant].offerPrice}
                    onChange={handleVariantChange}
                    onWheel={(e) => e.target.blur()}
                    min="0"
                    className={`w-full border rounded-lg px-8 py-1.5 ${
                      getError("offerPrice", true, activeVariant)
                        ? "border-red-500"
                        : ""
                    } ${
                      isLoadingProduct ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                    placeholder={isLoadingProduct ? "Loading..." : "0.00"}
                    disabled={isLoadingProduct}
                  />
                </div>
                {getError("offerPrice", true, activeVariant) && (
                  <p className="text-red-500 text-sm mt-1">
                    {getError("offerPrice", true, activeVariant)}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <label className="block mb-1 font-medium">Cost price</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    ₹
                  </span>
                  <input
                    type="number"
                    name="costPrice"
                    value={variants[activeVariant].costPrice}
                    onChange={handleVariantChange}
                    onWheel={(e) => e.target.blur()}
                    min="0"
                    className={`w-full border rounded-lg px-8 py-1.5 ${
                      getError("costPrice", true, activeVariant)
                        ? "border-red-500"
                        : ""
                    } ${
                      isLoadingProduct ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                    placeholder={isLoadingProduct ? "Loading..." : "0.00"}
                    disabled={isLoadingProduct}
                  />
                </div>
                {getError("costPrice", true, activeVariant) && (
                  <p className="text-red-500 text-sm mt-1">
                    {getError("costPrice", true, activeVariant)}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Right: Images, Description, Stock */}
          <div className="flex-1 space-y-3">
            <div>
              <label className="block mb-1 font-medium">Variant Images</label>
              <p className="text-xs text-gray-500 mb-2">
                Maximum size: 1MB per image | Formats: JPEG, JPG, PNG, WebP
              </p>
              <div className="flex gap-3 flex-wrap">
                {[0, 1, 2, 3].map((idx) => (
                  <label
                    key={idx}
                    className={`relative group w-28 h-28 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-teal-400 transition ${
                      getError("images", true, activeVariant)
                        ? "border-red-500"
                        : ""
                    }`}
                  >
                    {variants?.[activeVariant]?.images?.[idx] ? (
                      typeof variants[activeVariant].images[idx] ===
                      "string" ? (
                        <img
                          src={variants[activeVariant].images[idx]}
                          alt="variant"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <img
                          src={URL.createObjectURL(
                            variants[activeVariant].images[idx]
                          )}
                          alt="variant"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      )
                    ) : (
                      <>
                        <span className="text-3xl text-gray-300">📷</span>
                        <span className="text-xs text-gray-400 mt-2">
                          Click to upload
                        </span>
                      </>
                    )}
                    {variants?.[activeVariant]?.images?.[idx] && (
                      <button
                        type="button"
                        className="absolute top-1 right-1 z-10 bg-black/60 text-white text-xs rounded px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemoveImage(idx);
                        }}
                        title="Remove image"
                      >
                        Remove
                      </button>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={(e) => {
                        handleImageChange(idx, e.target.files[0]);
                        e.target.value = "";
                      }}
                    />
                  </label>
                ))}
              </div>
              {getError("images", true, activeVariant) && (
                <p className="text-red-500 text-sm mt-1">
                  {getError("images", true, activeVariant)}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Variant Description
              </label>
              <textarea
                name="description"
                value={variants[activeVariant].description}
                onChange={handleVariantChange}
                className={`w-full border rounded-lg px-3 py-2 ${
                  getError("description", true, activeVariant)
                    ? "border-red-500"
                    : ""
                } ${isLoadingProduct ? "bg-gray-100 cursor-not-allowed" : ""}`}
                rows={3}
                placeholder={
                  isLoadingProduct
                    ? "Loading..."
                    : "Write your thoughts here..."
                }
                disabled={isLoadingProduct}
              />
              {getError("description", true, activeVariant) && (
                <p className="text-red-500 text-sm mt-1">
                  {getError("description", true, activeVariant)}
                </p>
              )}
            </div>
            <div className="flex gap-3 items-end">
              <div className="flex flex-col gap-2">
                <label className="block mb-1 font-medium">Stock Status</label>
                <div className="flex gap-4 items-center">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="stockStatus"
                      checked={
                        variants[activeVariant].stockStatus === "instock"
                      }
                      onChange={() => handleStockStatus("instock")}
                      disabled={isLoadingProduct}
                    />
                    <span>In stock</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="stockStatus"
                      checked={
                        variants[activeVariant].stockStatus === "outofstock"
                      }
                      onChange={() => handleStockStatus("outofstock")}
                      disabled={isLoadingProduct}
                    />
                    <span>Out of Stock</span>
                  </label>
                </div>
                {getError("stockStatus", true, activeVariant) && (
                  <p className="text-red-500 text-sm mt-1">
                    {getError("stockStatus", true, activeVariant)}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <label className="block mb-1 font-medium">Stock Quantity</label>
                <input
                  type="number"
                  className={`w-full border rounded-lg px-3 py-1.5 ${
                    getError("stockQuantity", true, activeVariant)
                      ? "border-red-500"
                      : ""
                  } ${
                    isLoadingProduct ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                  value={variants[activeVariant].stockQuantity}
                  onChange={handleStockQuantity}
                  onWheel={(e) => e.target.blur()}
                  min="0"
                  disabled={isLoadingProduct}
                />
                {getError("stockQuantity", true, activeVariant) && (
                  <p className="text-red-500 text-sm mt-1">
                    {getError("stockQuantity", true, activeVariant)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => navigate("/admin/product")}
            className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold"
          >
            Cancel
          </button>
          <div className="flex gap-4">
            <button
              className="bg-green-700 text-white px-6 py-2 rounded-full font-semibold"
              onClick={handlePublishProduct}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Publishing...</span>
                </div>
              ) : isEditMode ? (
                "Update Product"
              ) : (
                "Publish Product"
              )}
            </button>
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() =>
          handleRemoveVariant(
            typeof variantToDelete === "number"
              ? variantToDelete
              : variants.findIndex((v) => v._id === variantToDelete)
          )
        }
        title="Delete Variant"
        message="Are you sure you want to delete this variant? This action cannot be undone."
        confirmButtonText={isDeletingVariant ? "Deleting..." : "Delete"}
        confirmButtonColor="red"
        isLoading={isDeletingVariant}
        isDisabled={isDeletingVariant}
      />
    </div>
  );
}

export default Addproduct;
