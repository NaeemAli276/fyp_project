import { Stack } from "expo-router";
import '../global.css'
import { useFonts } from 'expo-font'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient()

export default function TabLayout() {
  
  const [fontsLoaded, error] = useFonts({
    'Poppins-ExtraLight': require('../../assets/fonts/Poppins/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('../../assets/fonts/Poppins/Poppins-Light.ttf'),
    'Poppins-Thin': require('../../assets/fonts/Poppins/Poppins-Thin.ttf'),
    'Poppins-light': require('../../assets/fonts/Poppins/Poppins-Light.ttf'),
    'Poppins-Regular': require('../../assets/fonts/Poppins/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../../assets/fonts/Poppins/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../../assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins/Poppins-Bold.ttf'),
    'Poppins-Black': require('../../assets/fonts/Poppins/Poppins-Black.ttf'),
  })

  return (
    <QueryClientProvider
      client={queryClient}
    >
      <Stack
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="index"/>
        <Stack.Screen name="loginScreen"/>
        <Stack.Screen name="registerScreen"/>
        <Stack.Screen name="splashScreen"/>
        <Stack.Screen name="settingsScreen"/>
      </Stack>
    </QueryClientProvider>
  );
}
