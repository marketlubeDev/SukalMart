import axiosInstance from "../axios/axiosInstance";

export async function fetchProducts(params = {}, signal) {
    const response = await axiosInstance.get("/product/get-products", { params, signal });
    return response.data;
}

export async function fetchProductById(productId, signal) {
    const response = await axiosInstance.get(`/product/get-product/${productId}`, { signal });
    return response.data; 
}

export async function searchProducts(query, signal) {
    const response = await axiosInstance.get("/product/search", { params: { query }, signal });
    return response.data;
}


