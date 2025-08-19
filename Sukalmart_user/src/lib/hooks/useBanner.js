import { useEffect, useState } from "react";
import { fetchAllBanners, fetchCategoryBanners } from "@/lib/services/bannerService";

export default function useBanner(options = {}) {
  const { type = "category" } = options;

  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    async function load() {
      try {
        const apiResponse =
          type === "category"
            ? await fetchCategoryBanners(controller.signal)
            : await fetchAllBanners(controller.signal);

        const items = Array.isArray(apiResponse?.data) ? apiResponse.data : [];

        const normalized = items.map((item) => {
          const categoryName = item?.category?.name;
          return {
            id: item?._id || item?.id || Math.random().toString(36).slice(2),
            image: item?.image || "",
            mobileImage: item?.mobileImage || item?.image || "",
            title: categoryName || item?.title || "",
            subtitle: item?.category?.description || "",
            description: item?.description || (item?.percentage ? `${item.percentage}% off` : ""),
          };
        });

        setBanners(normalized);
      } catch (err) {
        if (err?.name !== "CanceledError" && err?.name !== "AbortError") {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, [type]);

  return { banners, loading, error };
}


