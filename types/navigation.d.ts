import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Login: undefined;
  Registration: undefined;
  Comments: undefined;
  Map: {coordsLocation: { latitude: number; longitude: number } };
  Home: undefined;
};

export type HomeTabParamList = {
  Posts: undefined;
  CreatePost: undefined;
  Profile: undefined;
};

const HomeTabs = createBottomTabNavigator<HomeTabParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
