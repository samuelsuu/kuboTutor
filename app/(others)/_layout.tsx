import { Stack } from "expo-router";

export default function OthersLayout() {
  return (
    <Stack>
      <Stack.Screen name="Transaction" options={{headerShown: false}}/>
      
    </Stack>
  )
}
