import { Redirect, Slot } from "expo-router";
import { Auth0Provider } from "react-native-auth0";
import "expo-dev-client";
// Import your global CSS file
import { SafeAreaView, Text, View } from "react-native";
import { LogoutButton } from "@/components/LogoutButton";
import { useSession } from "@/components/ctx";
import { UserContextProvider } from "@/components/user-context";

export default function MainLayout(props) {
    const { userId, isLoading } = useSession();
    // You can keep the splash screen open, or render a loading screen like we do here.
    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    // Only require authentication within the (app) group's layout as users
    // need to be able to access the (auth) group and sign in again.
    if (!userId) {
        console.log("User not authenticated. Redirecting to sign-in.");
        // On web, static rendering will stop here as the user is not authenticated
        // in the headless Node process that the pages are rendered in.
        return <Redirect href="/sign-in" />;
    }

    return (
        <UserContextProvider>
            <SafeAreaView>
                <View className="flex !flex-row justify-center">
                    <Text className="text-primary">Header</Text>
                </View>
                <Slot />
            </SafeAreaView>
        </UserContextProvider>
    );
}
