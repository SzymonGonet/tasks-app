/* eslint-disable @typescript-eslint/no-floating-promises */
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import React, { useEffect } from 'react';

import SpaceMono from '@/assets/fonts/SpaceMono-Regular.ttf';

const LightTheme = {
  dark: false,
  colors: {
    primary: '#32CD32',
    background: '#FFFFFF',
    card: '#FFFFFF',
    border: '#808080',
    text: '#000000',
    notification: '#0F172A',
  },
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono,
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <ThemeProvider value={LightTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="tasks" />
      </Stack>
    </ThemeProvider>
  );
}
