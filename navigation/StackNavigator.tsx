import LoginScreen from "@/screens/LoginScreen";
import RegistrationScreen from "@/screens/RegistrationScreen";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTabNavigator";
import CommentsScreen from "@/screens/CommentsScreen";
import { useNavigation } from "@react-navigation/native";
import BackButton from "@/components/BackButton";

const Stack = createStackNavigator();

const commonScreenOptions = () => ({
  headerShown: false,
  headerRightContainerStyle: { padding: 16 },
  headerLeftContainerStyle: { padding: 16 },
});

const StackNavigator = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={commonScreenOptions}>
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
      <Stack.Screen name="Home" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
