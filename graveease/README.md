# GraveEase

Ghana's first online marketplace for coffins.

## Features

- **Buyer Flow**: Browse, Search, Cart, Checkout with Paystack mock.
- **Seller Flow**: Dashboard, Inventory Management.
- **Admin Flow**: Vetting, Analytics.
- **Tech Stack**: React, Vite, TailwindCSS, Zustand, React Query, Appwrite (Mocked).

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Configuration

- **Appwrite**: Configured in `src/lib/api.js`. Currently using a mock implementation for demonstration. To use real Appwrite, uncomment the client initialization and provide Project ID/Endpoint.
- **Paystack**: Mocked in `src/pages/Checkout.jsx`.
- **Email**: Mocked via console logs/toasts (Resend integration ready).

## Structure

- `src/components`: UI components (Shadcn/UI based).
- `src/pages`: Route components.
- `src/lib`: Utilities and API layer.
- `src/store`: Zustand state management.
