import { Stack, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export default function RootLayout() {
  
  useEffect(() => {
    const checkOnboarding = async () => {
      const onboarded = await AsyncStorage.getItem("onboarded");
      if (onboarded) {
        router.replace("/signUp");
      }
    };

    checkOnboarding();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="routImg" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
       <Stack.Screen name="(others)" options={{ headerShown: false }} />
      <Stack.Screen name="home" />
    </Stack>
  );
}
