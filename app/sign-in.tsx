import { Button, Text, View, StyleSheet } from "react-native";
import { LoginButton } from "../components/LoginButton";
import { colorScheme, useColorScheme } from "nativewind";
import * as AppleAuthentication from "expo-apple-authentication";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { useSession } from "@/components/ctx";

export default function SignIn() {
    const { signIn, userId } = useSession();

    // If the user is already signed in, redirect them to the home screen.
    useEffect(() => {
        if (userId) {
            console.log("already signed in", userId);
            router.replace("/");
        }
    }, [userId]);

    return (
        <View className="flex flex-col items-center justify-center min-h-screen">
            <View className="md:w-full max-w-md p-8 space-y-6 shadow-md bg-accent rounded-lg">
                <Text className="text-3xl font-bold text-center text-card-foreground">
                    Sign In to Calenduh
                </Text>
                <Text className="text-sm text-center text-card-foreground">
                    The cleanest calendar app you&apos;ve ever used. No bloat.
                    Duh.
                </Text>
                <View className="space-y-4">
                    <AppleAuthentication.AppleAuthenticationButton
                        buttonType={
                            AppleAuthentication.AppleAuthenticationButtonType
                                .SIGN_IN
                        }
                        buttonStyle={
                            AppleAuthentication.AppleAuthenticationButtonStyle
                                .BLACK
                        }
                        cornerRadius={5}
                        style={styles.button}
                        onPress={async () => {
                            const success = await signIn();
                            if (!success) {
                                return;
                            }
                            console.log("signed in");
                            // Navigate after signing in. You may want to tweak this to ensure sign-in is
                            // successful before navigating.
                            router.replace("/");
                        }}
                    />
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        width: 200,
        height: 44,
    },
});
