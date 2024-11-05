import CreatePostsScreen from "@/screens/CreatePostsScreen";
import PostsScreen from "@/screens/PostsScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LogoutButton from "@/components/LogoutButton";
import BackButton from "@/components/BackButton";
import CenterTabButton from "@/components/CenterTabButton";
import Grid from "@/assets/icons/grid.svg";
import Plus from "@/assets/icons/plus.svg";
import User from "@/assets/icons/user.svg";

const Tab = createBottomTabNavigator();

const commonScreenOptions = () => ({
  tabBarShowLabel: false,
  headerRightContainerStyle: { padding: 16 },
  headerLeftContainerStyle: { padding: 16 },
});

const BottomTabNavigator = () => {

  const handleLogout = () => {
    console.log("Logout");
  };

  

  return (
    <Tab.Navigator initialRouteName="Публікації" screenOptions={commonScreenOptions}>
      <Tab.Screen
        name="Публікації"
        component={PostsScreen}
        options={{
          headerRight: () => <LogoutButton onPress={handleLogout} />,
          tabBarIcon: () => <Grid />,
        }}
      />
      <Tab.Screen
        name="Створити публікацію"
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
          tabBarIcon: () => (
            <CenterTabButton>
              <Plus />
            </CenterTabButton>
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => <User />,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
