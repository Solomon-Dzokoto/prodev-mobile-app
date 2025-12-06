import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateUser: (updates) => set((state) => ({ user: { ...state.user, ...updates } })),
    }),
    {
      name: 'graveease-auth',
    }
  )
)

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(item => item.id === product.$id);
        if (existingItem) {
          set({
            items: currentItems.map(item =>
              item.id === product.$id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...currentItems, { ...product, id: product.$id, quantity: 1 }] });
        }
      },
      removeItem: (productId) => set({ items: get().items.filter(item => item.id !== productId) }),
      updateQuantity: (productId, quantity) => set({
        items: get().items.map(item => item.id === productId ? { ...item, quantity } : item)
      }),
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    {
      name: 'graveease-cart',
    }
  )
)
