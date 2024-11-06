import { useState } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { Colors } from "../constants/Colors";

type InputProps = TextInputProps & {
  value: string;
  onTextChange: (value: string) => void;
  button?: React.ReactNode;
};

const Input = ({
  value,
  placeholder,
  onTextChange,
  button,
  secureTextEntry = false,
  autoFocus = false,
  style,
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, isFocused && styles.focused, style]}>
      <TextInput
        value={value}
        autoFocus={autoFocus}
        placeholder={placeholder}
        onChangeText={onTextChange}
        style={styles.text}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {button && <View style={styles.passwordButton}>{button}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    backgroundColor: Colors.gray,
  },
  text: {
    flex: 1,
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
    color: Colors.textColor,
  },
  focused: {
    backgroundColor: Colors.white,
    borderColor: Colors.orange,
  },
  passwordButton: {
    marginLeft: 8,
  },
});

export default Input;
