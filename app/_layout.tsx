import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { I18nextProvider } from 'react-i18next';
import i18n from '../utils/i18n';
import { ThemeProvider as CustomThemeProvider } from '@/utils/theme';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const customTransition: Partial<NativeStackNavigationOptions> = {
  animation: 'slide_from_bottom',
  presentation: 'transparentModal',
  gestureEnabled: true,
  gestureDirection: 'vertical' as const,
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <I18nextProvider i18n={i18n}>
        <CustomThemeProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
              <Stack.Screen
                name="play"
                options={{
                  ...customTransition,
                  contentStyle: { backgroundColor: 'transparent' },
                }}
              />
            </Stack>
          </ThemeProvider>
        </CustomThemeProvider>
      </I18nextProvider>
    </SafeAreaProvider>
  );
}
