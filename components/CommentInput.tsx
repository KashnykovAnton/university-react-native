import { Alert, StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";

type CommentInputProps = TextInputProps & {
  value: string;
  onTextChange: (value: string) => void;
};

import SendIcon from "@/assets/icons/send.svg";
import { Colors } from "@/constants/Colors";

const CommentInput = ({ value, onTextChange, placeholder }: CommentInputProps) => {
  const handleCommentSend = () => {
    Alert.alert("Comment send!");
  };
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onTextChange}
        style={styles.text}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.iconWrapper} onPress={handleCommentSend}>
        <SendIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    backgroundColor: Colors.gray,
    borderRadius: 100,
  },
  text: {
    flex: 1,
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
    color: Colors.textColor,
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.orange,
  },
});

export default CommentInput;
