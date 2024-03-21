import { Button, Text, View, StyleSheet } from "react-native";
import { useAuth0 } from "react-native-auth0";
import { LoginButton } from "../components/LoginButton";

export default function Home() {
  const { user, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );
  }

  const loggedIn = user !== undefined && user !== null;

  return (
    <View style={styles.container}>
      <LoginButton />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});
