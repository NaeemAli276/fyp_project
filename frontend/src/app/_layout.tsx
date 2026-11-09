import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font'

// SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // const [fontsLoaded, error] = useFonts({
  //   'Poppins-ExtraLight': require('../assets/fonts/Poppins/Poppins-ExtraLight.ttf'),
  //   'Poppins-Light': require('../assets/fonts/Poppins/Poppins-Light.ttf'),
  //   'Poppins-Thin': require('../assets/fonts/Poppins/Poppins-Thin.ttf'),
  //   'Poppins-light': require('../assets/fonts/Poppins/Poppins-Light.ttf'),
  //   'Poppins-Regular': require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
  //   'Poppins-Medium': require('../assets/fonts/Poppins/Poppins-Medium.ttf'),
  //   'Poppins-SemiBold': require('../assets/fonts/Poppins/Poppins-SemiBold.ttf'),
  //   'Poppins-Bold': require('../assets/fonts/Poppins/Poppins-Bold.ttf'),
  //   'Poppins-Black': require('../assets/fonts/Poppins/Poppins-Black.ttf'),
  // })

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name='index'/>
        <Stack.Screen name='contactListScreen'/>
        <Stack.Screen name='loginScreen'/>
        <Stack.Screen name='registerScreen'/>
      </Stack>
    </ThemeProvider>
  );
}
