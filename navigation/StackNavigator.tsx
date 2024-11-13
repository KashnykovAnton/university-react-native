import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "@/screens/LoginScreen";
import RegistrationScreen from "@/screens/RegistrationScreen";
import CommentsScreen from "@/screens/CommentsScreen";
import MapScreen from "@/screens/MapScreen";
import BackButton from "@/components/BackButton";
import BottomTabNavigator from "./BottomTabNavigator";
import { getCurrentUser } from "@/redux/store/selectors";

const Stack = createStackNavigator();

const commonScreenOptions = () => ({
  headerShown: false,
  headerRightContainerStyle: { padding: 16 },
  headerLeftContainerStyle: { padding: 16 },
});

const StackNavigator = () => {
  const navigation = useNavigation();
  const user = useSelector(getCurrentUser);
  return (
    <Stack.Navigator initialRouteName={user.uid ? "Home" : "Login"} screenOptions={commonScreenOptions}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          headerShown: true,
          title: "Коментарі",
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        }}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerShown: true,
          title: "Карта",
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        }}
      />
      <Stack.Screen name="Home" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
