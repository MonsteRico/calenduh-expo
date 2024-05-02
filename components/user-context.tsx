import { useSession } from "@/components/ctx";
import { useStorageState } from "../hooks/useStorageState";
import { AppleAuthenticationCredential } from "expo-apple-authentication";
import React, { createContext } from "react";
import * as SecureStorage from "expo-secure-store";

const UserContext = React.createContext<{
    email: string;
    userId: string;
    name: string;
}>({
    email: "",
    userId: "",
    name: "",
});

export function useUser() {
    const value = React.useContext(UserContext);
    if (process.env.NODE_ENV !== "production") {
        if (!value) {
            throw new Error(
                "useSession must be wrapped in a <UserProvider />"
            );
        }
    }

    return value;
}

export function UserContextProvider(props: React.PropsWithChildren) {
    const userJson = SecureStorage.getItem("apple-credentials");
    const user = JSON.parse(userJson) as AppleAuthenticationCredential;
    return (
        <UserContext.Provider
            value={{
                email: user.email,
                userId: user.user,
                name: user.fullName.nickname ?? user.fullName.givenName ?? user.fullName.familyName ?? user.email ?? "User",
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
}
