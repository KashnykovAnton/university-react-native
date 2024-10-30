import { StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../constants/Colors";

type ButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
};

const Button = ({ children, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity style={[style.button]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default Button;

const style = StyleSheet.create({
  button: {
    borderRadius: 100,
    backgroundColor: Colors.orange,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
});
