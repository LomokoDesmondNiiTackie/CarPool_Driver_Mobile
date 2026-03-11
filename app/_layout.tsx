import { Stack } from "expo-router";
import { useAuthStore } from "@/store/auth.store";

export default function RootLayout() {
    const isLoggedIn = useAuthStore((state) => state.isAuthenticated);
    return (
        <Stack>
            <Stack.Protected guard={!isLoggedIn}>
                <Stack.Screen name="auth/login"  options={{ headerShown: false, animation: "slide_from_left"  }} />
            </Stack.Protected>

            <Stack.Protected guard={isLoggedIn}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack.Protected>
        </Stack>
    );
}