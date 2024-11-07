import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Colors } from "../constants/Colors";

type ButtonProps = {
  onPress: () => void;
  text: string;
  disabled?: boolean;
};

const Button = ({ onPress, disabled = false, text }: ButtonProps) => {
  return (
    <TouchableOpacity style={[styles.button, disabled && styles.disabled]} onPress={onPress} disabled={disabled}>
      <Text style={[styles.baseText, styles.buttonText, disabled && styles.disabledText]}>{text}</Text>
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
  disabled: {
    backgroundColor: Colors.gray,
  },
  baseText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
  },
  buttonText: {
    color: Colors.white,
    textAlign: "center",
  },
  disabledText: {
    color: Colors.placeholderText,
  },
});
