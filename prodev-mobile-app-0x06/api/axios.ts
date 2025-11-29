import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: 'https://api.example.com', // Replace with real backend URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mocking logic would go here if we were using axios-mock-adapter
// For now, the stores are using setTimeout to simulate async actions directly.
// This file serves as the setup for when a real backend is ready.

export default api;
