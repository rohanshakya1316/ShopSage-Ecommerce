import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      // Add a product to the cart. If it already exists, increase quantity.
      addToCart: (product) => {
        const items = get().items;
        const existing = items.find((item) => item._id === product._id);

        if (existing) {
          set({
            items: items.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          });
        } else {
          set({
            items: [...items, { ...product, quantity: 1 }],
          });
        }
      },

      // Remove a product entirely from the cart.
      removeFromCart: (productId) => {
        set({
          items: get().items.filter((item) => item._id !== productId),
        });
      },

      // Update quantity directly (e.g. from a cart page +/- control).
      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return;
        set({
          items: get().items.map((item) =>
            item._id === productId ? { ...item, quantity } : item,
          ),
        });
      },

      // Clear the entire cart (e.g. after checkout).
      clearCart: () => set({ items: [] }),

      // Total number of items (for the navbar badge, sums quantities).
      getTotalCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      // Total price of everything in the cart.
      getTotalPrice: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: "cart-storage", // localStorage key — cart persists across page reloads
    },
  ),
);

export default useCartStore;
