import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";

type PostProps = {
  url: ReturnType<typeof require>;
  text: string;
  date: string;
  user?: boolean;
};

const CommentMessage = ({ url, text, date, user = false }: PostProps) => {
  return (
    <View style={styles.mainContainer}>
      {!user && <Image source={url} resizeMode="cover" style={styles.postImage} />}
      <View style={[styles.messageWrapper, user && styles.messageUserWrapper]}>
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.dateText}>{date}</Text>
      </View>
      {user && <Image source={url} resizeMode="cover" style={styles.postImage} />}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignSelf: "stretch",
    gap: 16,
    alignItems: "flex-start",
    width: 343,
  },
  postImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  messageWrapper: {
    padding: 16,
    borderRadius: 6,
    borderTopLeftRadius: 0,
    backgroundColor: Colors.gray,
    width: "100%",
  },
  messageUserWrapper: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 0,
  },
  text: {
    fontWeight: "400",
    fontSize: 13,
    lineHeight: 18,
    color: Colors.textColor,
  },
  dateText: {
    fontWeight: "400",
    fontSize: 10,
    color: Colors.placeholderText,
  },
});

export default CommentMessage;
