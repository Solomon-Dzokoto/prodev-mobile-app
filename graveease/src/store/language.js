import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useLanguageStore = create(
  persist(
    (set) => ({
      language: 'en', // 'en' or 'tw'
      toggleLanguage: () => set((state) => ({ language: state.language === 'en' ? 'tw' : 'en' })),
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'graveease-lang',
    }
  )
)

export const translations = {
    en: {
        browseCoffins: "Browse Coffins",
        sellerDashboard: "Seller Dashboard",
        admin: "Admin",
        login: "Login",
        sellerLogin: "Seller Login",
        logout: "Logout",
        searchPlaceholder: "Search by region or type...",
        searchButton: "Search",
        heroTitle: "Find the Perfect Rest Nearby",
        heroSubtitle: "Discreet, reliable, and dignified coffin delivery from local Ghanaian artisans.",
        featuredCoffins: "Featured Coffins",
        browseAll: "Browse All Products",
        filters: "Filters",
        region: "Region",
        priceRange: "Price Range",
        addToCart: "Add to Cart",
        buyNow: "Buy Now",
        cartEmpty: "Your cart is empty",
        checkout: "Checkout",
        proceedCheckout: "Proceed to Checkout",
    },
    tw: {
        browseCoffins: "Hwe Adaka",
        sellerDashboard: "Otonfo Dashboard",
        admin: "Opanyin",
        login: "Wura Mu",
        sellerLogin: "Otonfo Wura Mu",
        logout: "Pue",
        searchPlaceholder: "Hwehwɛ nea wopɛ...",
        searchButton: "Hwehwɛ",
        heroTitle: "Nya Adaka A Eye Wɔ Wo Mpɔtam",
        heroSubtitle: "Yɛde adaka ba wo fie wɔ Ghana man mu nyinaa.",
        featuredCoffins: "Adaka A Yɛayi Asi Hɔ",
        browseAll: "Hwɛ Adaka Nyinaa",
        filters: "Yi Nea Wopɛ",
        region: "Mantam",
        priceRange: "Ne Boɔ",
        addToCart: "Fa Ka Ho",
        buyNow: "Tɔ Seisei",
        cartEmpty: "Wo kɛtɛ no mu da hɔ",
        checkout: "Tua Ka",
        proceedCheckout: "Kɔ Tua Ka",
    }
}
