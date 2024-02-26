import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import { useSession } from "@/components/auth/AuthContext";

export default function Page() {
  const {data} = useQuery({
    queryFn: async () => {
      const response = await fetch("/hello")
      const data = await response.json();
      return data;
    }
  })
  const { signOut } = useSession();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}
      >
        Sign Out
      </Text>
    </View>
  );
}
