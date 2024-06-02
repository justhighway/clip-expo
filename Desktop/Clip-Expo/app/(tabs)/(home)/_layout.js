import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="BoxModal"
        options={{ presentation: "modal", headerShown: true }}
      />
      <Stack.Screen
        name="AlertModal"
        options={{ presentation: "modal", headerShown: true }}
      />
    </Stack>
  );
}
