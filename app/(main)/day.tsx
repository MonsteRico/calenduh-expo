import { router } from "expo-router";
import { Text, View } from "react-native";

export default function DayScreen() {
    console.log("DayScreen");
    return (
        <View className="flex flex-col">
            <Text
                className="text-primary"
                onPress={() => {
                    // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
                    router.navigate("/month");
                }}
            >
                Back
            </Text>
        </View>
    );
}
