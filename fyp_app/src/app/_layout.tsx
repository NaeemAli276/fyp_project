import { Redirect, Stack, useRouter } from "expo-router";
import '../global.css'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { DevToolsBubble } from 'react-native-react-query-devtools';
import * as Clipboard from 'expo-clipboard'; // For Expo
import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useFonts } from 'expo-font'

const queryClient = new QueryClient()

const onCopy = async (text: string) => {
  try {
    await Clipboard.setStringAsync(text);
    return true;
  } catch {
    return false;
  }
};


export default function TabLayout() {

  const { isAuthenticated, isLoading } = useAuthStore()

  const router = useRouter()

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

  useEffect(() => {
    useAuthStore.getState().initialise()
  }, [])

  useEffect(() => {
    // Wait until fonts and auth check are finished before navigating
    if (isLoading) return router.replace('/splashScreen');

    if (isAuthenticated) {
      router.replace('/');
    } else {
      router.replace('/greetingScreen');
    }
  }, [isAuthenticated, isLoading]);

  return (
    <QueryClientProvider
      client={queryClient}
    >
      <Stack
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen name="index"/>
          <Stack.Screen name="settingsScreen"/>
          <Stack.Screen name="[id]"/>
          <Stack.Screen name="searchPage"/>
        </Stack.Protected>
        <Stack.Screen name="splashScreen"/>
        <Stack.Screen name="greetingScreen"/>
        <Stack.Screen name="loginScreen"/>
        <Stack.Screen name="registerScreen"/>
      </Stack>
      <DevToolsBubble onCopy={onCopy} queryClient={queryClient} />
    </QueryClientProvider>
  );
}
