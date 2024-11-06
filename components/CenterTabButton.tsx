import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { Colors } from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

type CenterTabButtonProps = {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const CenterTabButton = ({ children, onPress, style }: CenterTabButtonProps) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.orange,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CenterTabButton;
