import { router } from "expo-router";
import { Text, Pressable } from "react-native";
import { useAuth0 } from "react-native-auth0";

export const LoginButton = () => {
  const { authorize } = useAuth0();
  const login = async () => {
    try {
      await authorize();
      router.navigate("/month");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Pressable onPress={login}>
      <Text className="text-blue-500">Log In</Text>
    </Pressable>
  );
};
