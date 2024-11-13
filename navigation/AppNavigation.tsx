import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";

const AppNavigation = () => {
  return (
    <NavigationContainer independent={true}>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigation;
