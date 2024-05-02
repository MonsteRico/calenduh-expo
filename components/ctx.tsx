import React from "react";
import { useStorageState } from "@/hooks/useStorageState";
import * as AppleAuthentication from "expo-apple-authentication";
import * as SecureStore from "expo-secure-store";

const AuthContext = React.createContext<{
    signIn: () => Promise<boolean>;
    signOut: () => void;
    userId?: string | null;
    isLoading: boolean;
}>({
    signIn: async () => null,
    signOut: () => null,
    userId: null,
    isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = React.useContext(AuthContext);
    if (process.env.NODE_ENV !== "production") {
        if (!value) {
            throw new Error(
                "useSession must be wrapped in a <SessionProvider />"
            );
        }
    }

    return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
    const [[isLoading, userId], setUserId] = useStorageState("userId");

    return (
        <AuthContext.Provider
            value={{
                signIn: async () => {
                    try {
                        const credential =
                            await AppleAuthentication.signInAsync({
                                requestedScopes: [
                                    AppleAuthentication.AppleAuthenticationScope
                                        .FULL_NAME,
                                    AppleAuthentication.AppleAuthenticationScope
                                        .EMAIL,
                                ],
                            });
                        console.log("signed in", credential);
                        SecureStore.setItemAsync(
                            "apple-credentials",
                            JSON.stringify(credential)
                        );
                        setUserId(credential.user);
                        return true;
                        // signed in
                    } catch (e) {
                        if (e.code === "ERR_REQUEST_CANCELED") {
                            // handle that the user canceled the sign-in flow
                            console.log("canceled");
                        } else {
                            // handle other errors
                            console.log("error", e);
                        }
                        return false;
                    }
                },
                signOut: () => {
                    AppleAuthentication.signOutAsync({
                        user: userId,
                    });
                    setUserId(null);
                },
                userId,
                isLoading,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
