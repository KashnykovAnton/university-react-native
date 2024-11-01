import { StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../constants/Colors";

type ButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
};

const Button = ({ children, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    height: 51,
    borderRadius: 100,
    backgroundColor: Colors.orange,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
});
