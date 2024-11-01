import { useFonts } from "expo-font";
import { ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import RegistrationScreen from "@/screens/RegistrationScreen";
import LoginScreen from "@/screens/LoginScreen";
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

  const MainStack = createStackNavigator();

  return (
    <NavigationContainer independent={true}>
      <MainStack.Navigator initialRouteName="Registration" screenOptions={{ headerShown: false }}>
        <MainStack.Screen name="Registration" component={RegistrationScreen} />
        <MainStack.Screen name="Login" component={LoginScreen} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
