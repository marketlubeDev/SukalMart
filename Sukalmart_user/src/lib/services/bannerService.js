import axiosInstance from "../axios/axiosInstance";

export async function fetchAllBanners(signal) {
    const response = await axiosInstance.get("/banner", { signal });
    return response.data;
}

export async function fetchCategoryBanners(signal) {
    const response = await axiosInstance.get("/banner/get-all-banners-by-category", { signal });
    return response.data;
}


