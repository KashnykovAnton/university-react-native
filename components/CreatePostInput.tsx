import { ReactNode } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { Colors } from "@/constants/Colors";

type CreatePostInputProps = TextInputProps & {
  value: string;
  onTextChange: (value: string) => void;
  icon?: ReactNode;
  autofocus?: boolean;
};

const CreatePostInput = ({
  value,
  onTextChange,
  icon,
  placeholder,
  onFocus,
  autofocus = false,
}: CreatePostInputProps) => {
  return (
    <View style={styles.container}>
      {icon && icon}
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onTextChange}
        style={styles.text}
        autoCapitalize="none"
        onFocus={onFocus}
        autoFocus={autofocus}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    gap: 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.inputBorder,
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

export default CreatePostInput;
