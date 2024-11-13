import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch } from "react-redux";
import CreatePostsScreen from "@/screens/CreatePostsScreen";
import PostsScreen from "@/screens/PostsScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import LogoutButton from "@/components/LogoutButton";
import BackButton from "@/components/BackButton";
import CenterTabButton from "@/components/CenterTabButton";
import Grid from "@/assets/icons/grid.svg";
import GridFocus from "@/assets/icons/grid-focus.svg";
import Plus from "@/assets/icons/plus.svg";
import User from "@/assets/icons/user.svg";
import UserFocus from "@/assets/icons/user-focus.svg";
import { logoutDB } from "@/utils/auth";
import { RootStackNavigationProps } from "@/types/types";

const Tab = createBottomTabNavigator();

const commonScreenOptions = () => ({
  tabBarShowLabel: false,
  headerRightContainerStyle: { padding: 16 },
  headerLeftContainerStyle: { padding: 16 },
});

const BottomTabNavigator = () => {
  const dispatch = useDispatch();
  const navigation: RootStackNavigationProps = useNavigation();

  const handleLogout = async () => {
    await logoutDB(dispatch);
    navigation.navigate("Login");
  };

  return (
    <Tab.Navigator initialRouteName="Публікації" screenOptions={commonScreenOptions}>
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публікації",
          headerRight: () => <LogoutButton onPress={handleLogout} />,
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <GridFocus />;
            } else {
              return <Grid />;
            }
          },
        }}
      />
      <Tab.Screen
        name="CreatePost"
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          title: "Створити публікацію",
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
          tabBarIcon: () => (
            <CenterTabButton>
              <Plus />
            </CenterTabButton>
          ),
          tabBarStyle: { display: "none" },
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <UserFocus />;
            } else {
              return <User />;
            }
          },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
