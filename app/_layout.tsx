import { Slot } from "expo-router";
import { Auth0Provider } from "react-native-auth0";
import "expo-dev-client";
// Import your global CSS file
import "../global.css"

export default function Root(props) {
  // Set up the auth context and render our layout inside of it.
  return (
    <Auth0Provider
      domain={"dev-dufhiacaibuescfm.us.auth0.com"}
      clientId={"oER0yBq9p898R7kslgShWKjPkwAT0vfK"}
    >
      <Slot />
    </Auth0Provider>
  );
}
