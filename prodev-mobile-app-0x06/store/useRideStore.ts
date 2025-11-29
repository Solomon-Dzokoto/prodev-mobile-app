import { create } from 'zustand';

export interface Ride {
  id: string;
  pickup: string;
  dropoff: string;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  price: number;
  driverId?: string;
  customerId: string;
}

interface RideState {
  currentRide: Ride | null;
  availableRides: Ride[]; // For drivers
  isLoading: boolean;
  requestRide: (pickup: string, dropoff: string, customerId: string) => Promise<void>;
  cancelRide: (rideId: string) => Promise<void>;
  acceptRide: (rideId: string, driverId: string) => Promise<void>;
  completeRide: (rideId: string) => Promise<void>;
}

export const useRideStore = create<RideState>((set) => ({
  currentRide: null,
  availableRides: [],
  isLoading: false,
  requestRide: async (pickup, dropoff, customerId) => {
    set({ isLoading: true });
    // Simulate API call
    setTimeout(() => {
      const newRide: Ride = {
        id: Math.random().toString(36).substr(2, 9),
        pickup,
        dropoff,
        status: 'pending',
        price: Math.floor(Math.random() * 20) + 10,
        customerId,
      };
      set({ currentRide: newRide, isLoading: false });
    }, 1000);
  },
  cancelRide: async (rideId) => {
    set({ isLoading: true });
    setTimeout(() => {
      set({ currentRide: null, isLoading: false });
    }, 500);
  },
  acceptRide: async (rideId, driverId) => {
     // In a real app, this would update the specific ride in a list
     // For this store, we'll just simulate moving it to currentRide if it matches
     set({ isLoading: true });
     setTimeout(() => {
        set((state) => {
            const ride = state.availableRides.find(r => r.id === rideId);
            if (ride) {
                return {
                    currentRide: { ...ride, status: 'accepted', driverId },
                    availableRides: state.availableRides.filter(r => r.id !== rideId),
                    isLoading: false
                }
            }
            return { isLoading: false };
        })
     }, 500);
  },
  completeRide: async (rideId) => {
    set({ isLoading: true });
    setTimeout(() => {
        set({ currentRide: null, isLoading: false });
    }, 500);
  }
}));
