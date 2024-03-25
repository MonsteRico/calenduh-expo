import { Slot } from "expo-router";
import { Auth0Provider } from "react-native-auth0";
import "expo-dev-client";
// Import your global CSS file
import "../global.css";
import { View } from "react-native";
import { useColorScheme } from "react-native";
import { DateTime } from "luxon";
import { DayBeingViewedContext } from "@/hooks/contexts";
import { useState } from "react";
import { useToday } from "@/hooks/useToday";
export default function Root(props) {
  const today = useToday();

  const [dayBeingViewed, setDayBeingViewed] = useState<DateTime<true>>(today);

  const colorScheme = useColorScheme();
  console.log(colorScheme);
  // Set up the auth context and render our layout inside of it.
  return (
    <Auth0Provider
      domain={"dev-dufhiacaibuescfm.us.auth0.com"}
      clientId={"oER0yBq9p898R7kslgShWKjPkwAT0vfK"}
    >
      <DayBeingViewedContext.Provider
        value={{ value: dayBeingViewed, setValue: setDayBeingViewed }}
      >
        <View className={colorScheme + " bg-background text-primary"}>
          <Slot />
        </View>
      </DayBeingViewedContext.Provider>
    </Auth0Provider>
  );
}
