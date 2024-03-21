import { Text } from "react-native";
import { useAuth0 } from "react-native-auth0";

export const Profile = () => {
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
