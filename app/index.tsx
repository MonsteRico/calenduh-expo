import { router } from "expo-router";
import { Button, Text, View, StyleSheet, Pressable } from "react-native";
import { useAuth0 } from "react-native-auth0";

export default function Home() {
  const { authorize, clearSession, user, error, isLoading } = useAuth0();

  const onLogin = async () => {
    try {
      await authorize();
    } catch (e) {
      console.log(e);
    }
  };

  const onLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log("Log out cancelled");
    }
  };

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
      {loggedIn && <Text>You are logged in as {user.name}</Text>}
      {!loggedIn && <Text>You are not logged in</Text>}
      {error && <Text>{error.message}</Text>}

      <Pressable onPress={loggedIn ? onLogout : onLogin}>
        <Text className="text-blue-500">{loggedIn ? "Log Out" : "Log In"}</Text>
      </Pressable>
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

const LoginButton = () => {
  const { authorize } = useAuth0();

  const login = async () => {
    try {
      await authorize();
    } catch (e) {
      console.log(e);
    }
  };

  return <Button onPress={login} title="Log in" />;
};

const Profile = () => {
  const { user, error } = useAuth0();
  console.log(user);

  return (
    <>
      {user && <Text>Logged in as {user.name}</Text>}
      {!user && <Text>Not logged in</Text>}
      {error && <Text>{error.message}</Text>}
    </>
  );
};

const LogoutButton = () => {
  const { clearSession } = useAuth0();

  const logout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log(e);
    }
  };

  return <Button onPress={logout} title="Log out" />;
};
