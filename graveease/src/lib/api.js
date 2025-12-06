// Mock Appwrite Implementation for Demo purposes
// In production, this would use the actual Appwrite SDK

import { Client, Account, Databases, Storage, Functions } from "appwrite";

const client = new Client();
// client.setEndpoint('https://cloud.appwrite.io/v1').setProject('YOUR_PROJECT_ID');

// Helper to simulate delays
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock Data
const MOCK_SELLERS = [
  {
    $id: 'seller1',
    email: 'kofi@coffins.gh',
    role: 'seller',
    location: { lat: 5.6037, lng: -0.1870, region: 'Accra' },
    verified: true,
    workshopPhotos: ['https://placehold.co/600x400?text=Workshop+1'],
    gpsPin: { lat: 5.6037, lng: -0.1870 },
  },
    {
    $id: 'seller2',
    email: 'adwoa@woodworks.gh',
    role: 'seller',
    location: { lat: 6.6666, lng: -1.6163, region: 'Kumasi' },
    verified: true,
    workshopPhotos: ['https://placehold.co/600x400?text=Workshop+2'],
    gpsPin: { lat: 6.6666, lng: -1.6163 },
  }
];

const MOCK_PRODUCTS = [
  {
    $id: 'prod1',
    sellerId: 'seller1',
    name: 'Traditional Mahogany Coffin',
    description: 'Hand-carved mahogany coffin with gold handles. Elegant and durable.',
    price: 1500,
    stock: 5,
    location: { lat: 5.6037, lng: -0.1870, region: 'Accra' },
    images: ['https://placehold.co/400x300/2D5016/white?text=Mahogany+Coffin'],
    ecoFriendly: false,
    status: 'active'
  },
  {
    $id: 'prod2',
    sellerId: 'seller1',
    name: 'Simple Pine Box',
    description: 'Eco-friendly, untreated pine wood. Minimalist design.',
    price: 450,
    stock: 12,
    location: { lat: 5.6037, lng: -0.1870, region: 'Accra' },
    images: ['https://placehold.co/400x300/555/white?text=Pine+Box'],
    ecoFriendly: true,
    status: 'active'
  },
  {
    $id: 'prod3',
    sellerId: 'seller2',
    name: 'Ashanti Royal Casket',
    description: 'Premium casket with Kente lining and brass fittings.',
    price: 3500,
    stock: 2,
    location: { lat: 6.6666, lng: -1.6163, region: 'Kumasi' },
    images: ['https://placehold.co/400x300/333/gold?text=Royal+Casket'],
    ecoFriendly: false,
    status: 'active'
  }
];

// Mock API
export const api = {
  products: {
    list: async () => {
      await delay(800);
      return { documents: MOCK_PRODUCTS, total: MOCK_PRODUCTS.length };
    },
    get: async (id) => {
        await delay(500);
        return MOCK_PRODUCTS.find(p => p.$id === id);
    },
    create: async (data) => {
        await delay(1000);
        const newProduct = { ...data, $id: `prod${Date.now()}` };
        MOCK_PRODUCTS.push(newProduct);
        return newProduct;
    }
  },
  auth: {
    login: async (email, password) => {
      await delay(1000);
      if (email.includes('admin')) return { $id: 'admin1', email, role: 'admin', name: 'Admin User' };
      if (email.includes('seller')) return MOCK_SELLERS[0];
      return { $id: 'user1', email, role: 'buyer', name: 'Kwame Mensah' };
    },
    getCurrentUser: async () => {
        // In a real app, this would check the session
        return null;
    },
    logout: async () => {
        await delay(500);
    }
  },
  orders: {
      create: async (order) => {
          await delay(1500);
          return { ...order, $id: `ord${Date.now()}`, status: 'pending' };
      },
      list: async () => {
          await delay(800);
          return { documents: [], total: 0 };
      }
  },
  vetting: {
      uploadProof: async (file) => {
          await delay(1500);
          return "https://placehold.co/600x800?text=ID+Proof";
      }
  }
};

export { client };
