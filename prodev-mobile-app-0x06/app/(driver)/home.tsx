import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { useRideStore, Ride } from '../../store/useRideStore';
import { useAuthStore } from '../../store/useAuthStore';

export default function DriverHomeScreen() {
  const user = useAuthStore((state) => state.user);
  const { currentRide, completeRide, isLoading } = useRideStore();

  // Mock available rides for demonstration
  const [rides, setRides] = useState<Ride[]>([]);

  useEffect(() => {
    // Simulate fetching available rides
    setRides([
        {
            id: 'ride_123',
            pickup: '123 Main St',
            dropoff: '456 Market St',
            status: 'pending',
            price: 25,
            customerId: 'cust_1'
        },
        {
            id: 'ride_124',
            pickup: '789 Broadway',
            dropoff: '101 Pine St',
            status: 'pending',
            price: 18,
            customerId: 'cust_2'
        }
    ]);
  }, []);

  const handleAcceptRide = async (ride: Ride) => {
    if (user) {
        // In a real app, this would be an API call
        // For demo, we just set it as current ride in store
        // We'll mimic the store logic here for "accepting" from the list
        useRideStore.setState({ currentRide: { ...ride, status: 'accepted', driverId: user.id } });
    }
  };

  const handleCompleteRide = async () => {
     if (currentRide) {
         await completeRide(currentRide.id);
     }
  };

  const renderRideItem = ({ item }: { item: Ride }) => (
    <View className="bg-gray-100 p-4 rounded-lg mb-4 border border-gray-200">
      <View className="flex-row justify-between items-center mb-2">
         <Text className="font-bold text-lg">${item.price}</Text>
         <Text className="text-gray-500 text-sm">2.5 mi</Text>
      </View>
      <Text className="mb-1"><Text className="font-bold">Pickup:</Text> {item.pickup}</Text>
      <Text className="mb-3"><Text className="font-bold">Dropoff:</Text> {item.dropoff}</Text>

      <TouchableOpacity
        className="bg-black p-3 rounded-lg"
        onPress={() => handleAcceptRide(item)}
      >
        <Text className="text-white text-center font-bold">Accept Ride</Text>
      </TouchableOpacity>
    </View>
  );

  if (currentRide) {
      return (
          <View className="flex-1 bg-white p-4 justify-center items-center">
              <Text className="text-2xl font-bold mb-4">Current Job</Text>
              <View className="bg-gray-100 w-full p-6 rounded-xl border border-gray-200 shadow-sm">
                  <Text className="text-xl font-bold text-green-600 mb-4 text-center">In Progress</Text>
                  <Text className="mb-2 text-lg"><Text className="font-bold">Pickup:</Text> {currentRide.pickup}</Text>
                  <Text className="mb-4 text-lg"><Text className="font-bold">Dropoff:</Text> {currentRide.dropoff}</Text>
                  <Text className="text-3xl font-bold text-center mb-6">${currentRide.price}</Text>

                  <TouchableOpacity
                    className="bg-green-600 p-4 rounded-lg"
                    onPress={handleCompleteRide}
                    disabled={isLoading}
                  >
                     {isLoading ? (
                        <ActivityIndicator color="white" />
                     ) : (
                        <Text className="text-white text-center font-bold text-lg">Complete Ride</Text>
                     )}
                  </TouchableOpacity>
              </View>
          </View>
      )
  }

  return (
    <View className="flex-1 bg-white p-4">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-2xl font-bold">Available Jobs</Text>
        <View className="bg-gray-100 px-3 py-1 rounded-full">
            <Text className="font-bold">Online</Text>
        </View>
      </View>

      <FlatList
        data={rides}
        renderItem={renderRideItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text className="text-center text-gray-500 mt-10">No rides available currently.</Text>}
      />
    </View>
  );
}
