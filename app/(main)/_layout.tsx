import { Slot } from "expo-router";
import { Auth0Provider } from "react-native-auth0";
import "expo-dev-client";
// Import your global CSS file
import { SafeAreaView, Text, View } from "react-native";
import { LogoutButton } from "@/components/LogoutButton";

export default function MainLayout(props) {
  // Set up the auth context and render our layout inside of it.
  return (
    <SafeAreaView>
      <View className="flex flex-row">
        <Text>Header</Text>
        <LogoutButton />
      </View>
      <Slot />
    </SafeAreaView>
  );
}
