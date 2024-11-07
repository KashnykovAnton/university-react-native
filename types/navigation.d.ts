import type { StaticParamList } from "@react-navigation/native";

const HomeTabs = createBottomTabNavigator({
  screens: {
    Posts: PostsScreen,
    CreatePost: ProfileScreen,
    Profile: ProfileScreen,
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    Login: LoginScreen,
    Registration: RegistrationScreen,
    Comments: CommentsScreen,
    Map: MapScreen,
    Home: HomeTabs,
  },
});

export type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
