import { useFonts } from "expo-font";
import { ActivityIndicator } from "react-native";
import RegistrationScreen from "@/screens/RegistrationScreen";
import { Colors } from "@/constants/Colors";

export default function Index() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
      return <ActivityIndicator size="large" color={Colors.orange} />;
  }
  return <RegistrationScreen />;
}
