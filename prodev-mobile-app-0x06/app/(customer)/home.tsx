import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useState } from 'react';
import { useRideStore } from '../../store/useRideStore';
import { useAuthStore } from '../../store/useAuthStore';
import MapView from 'react-native-maps';

export default function CustomerHomeScreen() {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');

  const user = useAuthStore((state) => state.user);
  const { currentRide, isLoading, requestRide, cancelRide } = useRideStore();

  const handleRequestRide = async () => {
    if (!pickup || !dropoff) {
      Alert.alert('Error', 'Please enter both pickup and dropoff locations');
      return;
    }
    if (user) {
        await requestRide(pickup, dropoff, user.id);
    }
  };

  const handleCancelRide = async () => {
    if (currentRide) {
        await cancelRide(currentRide.id);
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Map Placeholder */}
      <View className="flex-1 bg-gray-200 w-full relative">
         {/* Note: MapView might not work in all environments without API keys/proper config.
             If it fails to render, it serves as a placeholder.
             For web, we might need a different component, but nativewind handles style.
         */}
         <MapView
            className="flex-1 w-full h-full"
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
         />

         <View className="absolute top-10 left-5 right-5 bg-white p-4 rounded-lg shadow-lg">
             <Text className="text-lg font-bold mb-2">Where to?</Text>
             {!currentRide ? (
                <>
                    <TextInput
                        className="bg-gray-100 p-3 rounded-lg mb-2"
                        placeholder="Pickup Location"
                        value={pickup}
                        onChangeText={setPickup}
                    />
                    <TextInput
                        className="bg-gray-100 p-3 rounded-lg mb-4"
                        placeholder="Dropoff Location"
                        value={dropoff}
                        onChangeText={setDropoff}
                    />
                    <TouchableOpacity
                        className="bg-black p-4 rounded-lg"
                        onPress={handleRequestRide}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text className="text-white text-center font-bold">Request Ride</Text>
                        )}
                    </TouchableOpacity>
                </>
             ) : (
                <View>
                    <Text className="text-lg font-semibold text-green-600 mb-2">Ride Requested!</Text>
                    <Text className="mb-1"><Text className="font-bold">Pickup:</Text> {currentRide.pickup}</Text>
                    <Text className="mb-1"><Text className="font-bold">Dropoff:</Text> {currentRide.dropoff}</Text>
                    <Text className="mb-4"><Text className="font-bold">Status:</Text> {currentRide.status}</Text>
                    <Text className="mb-4 text-xl font-bold">${currentRide.price}</Text>

                    <TouchableOpacity
                        className="bg-red-500 p-4 rounded-lg"
                        onPress={handleCancelRide}
                        disabled={isLoading}
                    >
                         {isLoading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text className="text-white text-center font-bold">Cancel Ride</Text>
                        )}
                    </TouchableOpacity>
                </View>
             )}
         </View>
      </View>
    </View>
  );
}
