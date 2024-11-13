import { NavigationProp } from "@react-navigation/native";
import { HomeTabParamList, RootStackParamList } from "./navigation";

export type PostProps = {
  id: string;
  title: string;
  postLocation: string;
  capturedImage: string;
  coordsLocation: { latitude: number; longitude: number };
  profile?: boolean;
  comments?: number;
  likes?: number;
};

export interface UserData {
  uid: string;
  email: string;
  displayName?: string;
  profilePhoto?: string;
}

export type RootStackNavigationProps = NavigationProp<RootStackParamList>;
export type HomeTabNavigationProps = NavigationProp<HomeTabParamList>;
