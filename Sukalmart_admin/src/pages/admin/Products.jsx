import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { listProducts, searchProducts } from "../../sevices/ProductApis";
import LoadingSpinner from "../../components/spinner/LoadingSpinner";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";

import PageHeader from "../../components/Admin/PageHeader";
import ProductTable from "../../components/Admin/Product/components/Table/ProductTable";
import Pagination from "../../components/Admin/Product/components/Pagination/Pagination";
import { Modal } from "../../components/shared/Modal";
import { BulkOfferForm } from "../../components/Admin/Product/components/Forms/BulkOfferForm";
import { useSelector } from "react-redux";
import { adminUtilities } from "../../sevices/adminApis";

function Products({ role }) {
  // const stores = useSelector((state) => state.adminUtilities.stores);
  // const brands = useSelector((state) => state.adminUtilities.brands);
  // const categories = useSelector((state) => state.adminUtilities.categories);
  const store = useSelector((state) => state.store.store);
  const [stores, setStores] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [labels, setLabels] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [pageRender, setPageRender] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selectedStore, setSelectedStore] = useState(store?._id);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");
  const [selectedActiveStatus, setSelectedActiveStatus] = useState("all");
  const [showSubcategory, setShowSubcategory] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [productCounts, setProductCounts] = useState({
    all: 0,
    active: 0,
    inactive: 0,
    outOfStock: 0,
    drafts: 0
  });
  const navigate = useNavigate();

  const [showBulkOfferModal, setShowBulkOfferModal] = useState(false);
  const [isProductSelected, setIsProductSelected] = useState(false);
  const selectedProductsCount = selectedProducts?.length;

  // handleIsProductSelected
  useEffect(() => {
    const handleIsProductSelected = () => {
      if (selectedProducts.length > 0) {
        setIsProductSelected(true);
      } else {
        setIsProductSelected(false);
      }
    };
    handleIsProductSelected();
  }, [selectedProducts]);

  useEffect(() => {
    setSelectedSubcategory("All Subcategories");
    if (selectedCategory) {
      setShowSubcategory(
        subcategories?.filter(
          (subcategory) => subcategory?.category === selectedCategory
        )
      );
    } else {
      setShowSubcategory([]);
    }
  }, [selectedCategory]);

  // Fetch products when page changes or on initial load
  useEffect(() => {
    const fetchAdminUtilities = async () => {
      try {
        const res = await adminUtilities();
        setStores(res?.data?.stores);
        setBrands(res?.data?.brands);
        setCategories(res?.data?.categories);
        setSubcategories(res?.data?.subcategories);
        setLabels(res?.data?.labels);
      } catch (err) {
        console.log(err);
        toast.error("Failed to fetch admin utilities");
      }
    };
    fetchAdminUtilities();
  }, []);

  useEffect(() => {
    let filter = {};
    if (selectedStore) {
      filter.store = selectedStore;
    }
    if (selectedBrand && selectedBrand !== "All Brands") {
      filter.brandId = selectedBrand;
    }
    if (selectedCategory && selectedCategory !== "All Categories") {
      filter.categoryId = selectedCategory;
    }
    
    // Handle tab-based filtering
    if (activeTab !== "all") {
      if (activeTab === "active") {
        filter.activeStatus = "active";
      } else if (activeTab === "inactive") {
        filter.activeStatus = "inactive";
      } else if (activeTab === "outOfStock") {
        filter.stock = 0;
      } else if (activeTab === "drafts") {
        filter.isDraft = true;
      }
    }
    
    if (selectedSubcategory && selectedSubcategory !== "All Subcategories") {
      filter.subcategoryId = selectedSubcategory;
    }
    if (selectedLabel && selectedLabel !== "All Labels") {
      filter.labelId = selectedLabel;
    }
    if (searchKeyword) {
      filter.search = searchKeyword;
    }
    fetchProducts(currentPage, filter);
  }, [
    currentPage,
    pageRender,
    pageSize,
    selectedStore,
    selectedBrand,
    selectedCategory,
    activeTab,
    selectedSubcategory,
    selectedLabel,
    searchKeyword,
  ]);

  const fetchProducts = async (page, filter) => {
    try {
      setIsLoading(true);

      const res = await listProducts(page, pageSize, filter);
      setProducts(res?.data?.data?.products);
      setTotalPages(res?.data?.data?.totalPages);
      
      // Update product counts (this would ideally come from the API)
      setProductCounts({
        all: res?.data?.data?.totalProducts || 0,
        active: res?.data?.data?.activeCount || 0,
        inactive: res?.data?.data?.inactiveCount || 0,
        outOfStock: res?.data?.data?.outOfStockCount || 0,
        drafts: res?.data?.data?.draftsCount || 0
      });
    } catch (err) {
      toast.error("Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search input changes
  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchKeyword(value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle All products checkbox selection
  const handleSelectAll = (e, currentPage) => {
    if (e.target.checked) {
      // Select all products on the current page
      setSelectedProducts((prevSelected) => [
        ...prevSelected,
        ...products.map((product) => product._id),
      ]);
      setIsProductSelected(true);
    } else {
      // Deselect only the products from the current page
      setSelectedProducts((prevSelected) =>
        prevSelected.filter(
          (productId) => !products.some((product) => product._id === productId)
        )
      );
      setIsProductSelected(false);
    }
  };

  const clearSelectedProducts = () => {
    setSelectedProducts([]);
    setIsProductSelected(false);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white relative">
      <PageHeader content="Products" marginBottom="mb-0" />
      
      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="flex space-x-8 px-6">
          <button
            onClick={() => handleTabChange("all")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "all"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            All Products <span className="ml-2 bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-xs">{productCounts.all}</span>
          </button>
          <button
            onClick={() => handleTabChange("active")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "active"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Active <span className="ml-2 bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-xs">{productCounts.active}</span>
          </button>
          <button
            onClick={() => handleTabChange("inactive")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "inactive"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Inactive <span className="ml-2 bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-xs">{productCounts.inactive}</span>
          </button>
          <button
            onClick={() => handleTabChange("outOfStock")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "outOfStock"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Out of stock <span className="ml-2 bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-xs">{productCounts.outOfStock}</span>
          </button>
          <button
            onClick={() => handleTabChange("drafts")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "drafts"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Drafts <span className="ml-2 bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-xs">{productCounts.drafts}</span>
          </button>
        </div>
      </div>

      {/* Filters - Now more compact and below tabs */}
      <div className="bg-white px-6 py-4 border-b">
        <div className="flex gap-4 flex-wrap">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All Categories">All Categories</option>
            {categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category?.name}
              </option>
            ))}
          </select>

          <select
            value={selectedSubcategory}
            onChange={(e) => {
              setSelectedSubcategory(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={!selectedCategory || selectedCategory === "All Categories"}
          >
            <option value="All Subcategories">All Subcategories</option>
            {showSubcategory?.map((subcategory) => (
              <option key={subcategory._id} value={subcategory._id}>
                {subcategory?.name}
              </option>
            ))}
          </select>

          <select
            value={selectedLabel}
            onChange={(e) => {
              setSelectedLabel(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All Labels">All Labels</option>
            {labels?.map((label) => (
              <option key={label._id} value={label._id}>
                {label?.name}
              </option>
            ))}
          </select>

          {/* Search moved to filters area */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchKeyword}
                onChange={handleSearchInput}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search products..."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 m-6">
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {/* Table section with loading state */}
          <div className="overflow-y-auto flex-1 relative">
            {isLoading && (
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                <LoadingSpinner color="primary" text="Loading..." fullScreen />
              </div>
            )}
            {!isLoading && products?.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating a new product.</p>
                <div className="mt-6">
                  <button
                    onClick={() =>
                      navigate("addproduct", {
                        state: {
                          storeId: store?._id,
                        },
                      })
                    }
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    + Add Product
                  </button>
                </div>
              </div>
            ) : (
              <ProductTable
                products={products}
                onSelectAll={handleSelectAll}
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
                isProductSelected={isProductSelected}
                selectedProductsCount={selectedProductsCount}
                role={role}
                currentPage={currentPage}
                refetchProducts={fetchProducts}
              />
            )}
          </div>

          {/* Pagination */}
          {!isLoading && totalPages > 1 && (
            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-700">
                  <span>Showing</span>
                  <span className="mx-2 font-medium">{((currentPage - 1) * pageSize) + 1}</span>
                  <span>to</span>
                  <span className="mx-2 font-medium">{Math.min(currentPage * pageSize, productCounts.all)}</span>
                  <span>of</span>
                  <span className="mx-2 font-medium">{productCounts.all}</span>
                  <span>results</span>
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Add Button */}
      {!isProductSelected && products?.length > 0 && (
        <button
          onClick={() =>
            navigate("addproduct", {
              state: {
                storeId: store?._id,
              },
            })
          }
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors z-50"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      )}

      {/* Bulk Offer Modal */}
      <Modal
        isOpen={showBulkOfferModal}
        onClose={() => setShowBulkOfferModal(false)}
      >
        <BulkOfferForm
          onClose={() => setShowBulkOfferModal(false)}
          isProductSelected={isProductSelected}
          selectedProducts={selectedProducts}
          setPageRender={setPageRender}
          clearSelectedProducts={clearSelectedProducts}
        />
      </Modal>
    </div>
  );
}

export default Products;
