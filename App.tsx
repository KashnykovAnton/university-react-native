import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Colors } from "@/constants/Colors";
import StackNavigator from "./navigation/StackNavigator";

export default function Index() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color={Colors.orange} />;
  }

  return (
    <NavigationContainer independent={true}>
      <StackNavigator />
    </NavigationContainer>
  );
}
