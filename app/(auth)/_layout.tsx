import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="signUp" options={{headerShown: false}}/>
       <Stack.Screen name="login" options={{headerShown: false}}/>
       <Stack.Screen name="forgetPassword" options={{headerShown: false}}/>
    </Stack>
  )
}
