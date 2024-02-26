import { Slot } from "expo-router";
import { SessionProvider } from "@/components/auth/AuthContext";
import * as AppleAuthentication from "expo-apple-authentication";
export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
