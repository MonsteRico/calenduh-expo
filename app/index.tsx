import { Button, Text, View, StyleSheet } from "react-native";
import { useAuth0 } from "react-native-auth0";
import { LoginButton } from "../components/LoginButton";
import { colorScheme, useColorScheme } from "nativewind";

export default function SignIn() {
  const { user, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  const loggedIn = user !== undefined && user !== null;

  return (
    <View className="flex flex-col items-center justify-center min-h-screen">
      <View className="md:w-full max-w-md p-8 space-y-6 shadow-md bg-accent rounded-lg">
        <Text className="text-3xl font-bold text-center text-card-foreground">
          Sign In to Calenduh
        </Text>
        <Text className="text-sm text-center text-card-foreground">
          The cleanest calendar app you&apos;ve ever used. No bloat. Duh.
        </Text>
        <View className="space-y-4">
          <LoginButton />
        </View>
      </View>
    </View>
  );
}
