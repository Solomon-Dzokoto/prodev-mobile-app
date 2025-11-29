import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/useAuthStore';
export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'customer' | 'driver'>('customer');
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const router = useRouter();

  const handleLogin = async () => {
    await login(email, role);
    if (role === 'customer') {
      router.replace('/(customer)/home');
    } else {
      router.replace('/(driver)/home');
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Text className="text-2xl font-bold mb-8">Uber Clone Login</Text>

      <TextInput
        className="w-full bg-gray-100 p-4 rounded-lg mb-4"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <View className="flex-row mb-6 w-full justify-between">
        <TouchableOpacity
          className={`flex-1 p-3 rounded-lg mr-2 ${role === 'customer' ? 'bg-black' : 'bg-gray-200'}`}
          onPress={() => setRole('customer')}
        >
          <Text className={`text-center font-semibold ${role === 'customer' ? 'text-white' : 'text-black'}`}>Customer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 p-3 rounded-lg ml-2 ${role === 'driver' ? 'bg-black' : 'bg-gray-200'}`}
          onPress={() => setRole('driver')}
        >
          <Text className={`text-center font-semibold ${role === 'driver' ? 'text-white' : 'text-black'}`}>Driver</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        className="w-full bg-black p-4 rounded-lg"
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-center font-bold">Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        className="mt-4"
        onPress={() => router.push('/(auth)/register')}
      >
        <Text className="text-blue-500">Don&apos;t have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}
