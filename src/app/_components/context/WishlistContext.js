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
        setItems((prev) => {
          const exists = prev.some((p) => p.id === product.id);
          if (exists) {
            return prev.filter((p) => p.id !== product.id);
          }
          return [{ ...product }, ...prev];
        });
      },
      isInWishlist: (id) => items.some((p) => p.id === id),
      remove: (id) => setItems((prev) => prev.filter((p) => p.id !== id)),
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