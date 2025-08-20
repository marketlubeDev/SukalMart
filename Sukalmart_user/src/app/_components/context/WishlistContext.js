"use client";

import { createContext, useContext, useMemo, useState, useEffect } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("wishlist_items");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("wishlist_items", JSON.stringify(items));
    } catch {}
  }, [items]);

  const api = useMemo(
    () => ({
      items,
      toggleWishlistItem: (product) => {
        const normalizeId = (val) => String(val).split('_')[0];
        const normalized = normalizeId(product.id);
        setItems((prev) => {
          const exists = prev.some((p) => normalizeId(p.id) === normalized);
          if (exists) {
            return prev.filter((p) => normalizeId(p.id) !== normalized);
          }
          return [{ ...product, id: normalized }, ...prev];
        });
      },
      isInWishlist: (id) => {
        const normalizeId = (val) => String(val).split('_')[0];
        const normalized = normalizeId(id);
        return items.some((p) => normalizeId(p.id) === normalized);
      },
      remove: (id) => {
        const normalizeId = (val) => String(val).split('_')[0];
        const normalized = normalizeId(id);
        setItems((prev) => prev.filter((p) => normalizeId(p.id) !== normalized));
      },
      clear: () => setItems([]),
    }),
    [items]
  );

  return <WishlistContext.Provider value={api}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
} 