import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const Variables = {
  SCREEN_WIDTH: width,
  SCREEN_HEIGHT: height,
};