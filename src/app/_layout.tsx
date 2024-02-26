/* eslint-disable @typescript-eslint/no-floating-promises */
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import SpaceMono from '@/assets/fonts/SpaceMono-Regular.ttf';
import CustomDrawer from '@/components/drawer';

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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          screenOptions={{
            drawerHideStatusBarOnOpen: true,
            drawerType: 'back',
            headerShown: false,
          }}
          drawerContent={CustomDrawer}>
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: 'Notes',
            }}
          />
          <Drawer.Screen
            name="author"
            options={{
              drawerLabel: 'Author',
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
