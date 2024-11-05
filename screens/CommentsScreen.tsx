import { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CommentMessage from "@/components/CommentMessage";
import CommentInput from "@/components/CommentInput";
import { Colors } from "@/constants/Colors";

const CommentsScreen = () => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (value: string) => {
    setComment(value);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.mainContainer}>
          <ScrollView>
            <View style={styles.topContainer}>
              <Image
                source={require("@/assets/images/image-post-02.png")}
                resizeMode="cover"
                style={styles.postImage}
              />
              <View style={styles.commentsContainer}>
                <CommentMessage
                  url={require("@/assets/images/comment-avatar.png")}
                  text={
                    "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!"
                  }
                  date={"09 червня, 2020 | 08:40"}
                />
                <CommentMessage
                  url={require("@/assets/images/avatar-photo.png")}
                  text={
                    "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images."
                  }
                  date={"09 червня, 2020 | 09:14"}
                  user={true}
                />
                <CommentMessage
                  url={require("@/assets/images/comment-avatar.png")}
                  text={"Thank you! That was very helpful!"}
                  date={"09 червня, 2020 | 09:20"}
                />
              </View>
            </View>
          </ScrollView>
          <View style={{ paddingBottom: 32 }}>
            <CommentInput value={comment} onTextChange={handleCommentChange} placeholder={"Коментувати..."} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    justifyContent: "space-between",
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
  topContainer: {
    gap: 32,
  },
  postImage: {
    borderRadius: 8,
    width: "100%",
  },
  commentsContainer: {
    gap: 24,
  },
});

export default CommentsScreen;
