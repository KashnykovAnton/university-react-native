import { Image, Text, View, StyleSheet, Alert, ScrollView, Dimensions } from "react-native";
import Post from "@/components/Post";
import { Colors } from "@/constants/Colors";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const PostsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <View style={styles.userContainer}>
        <Image source={require("../assets/images/avatar-photo.png")} resizeMode="cover" style={styles.avatar} />
        <View style={styles.userTextContainer}>
          <Text style={styles.name}>Natali Romanova</Text>
          <Text style={styles.mail}>email@example.com</Text>
        </View>
      </View>
      <View style={styles.postsContainer}>
        <Post
          url={require("@/assets/images/image-post-01.png")}
          title={"Ліс"}
          comments={0}
          likes={0}
          location={"Ivano-Frankivs'k Region, Ukraine"}
        />
        <Post
          url={require("@/assets/images/image-post-02.png")}
          title={"Захід на Чорному морі"}
          comments={10}
          likes={5}
          location={"Odessa Region, Ukraine"}
        />
        <Post
          url={require("@/assets/images/image-post-03.png")}
          title={"Старий будиночок у Венеції"}
          comments={0}
          likes={0}
          location={"Venice, Italy"}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: SCREEN_WIDTH,
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },

  userContainer: {
    flexDirection: "row",
    marginBottom: 32,
  },

  avatar: {
    marginRight: 8,
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userTextContainer: {
    alignSelf: "center",
    justifyContent: "flex-start",
  },
  name: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.textColor,
  },
  mail: {
    fontSize: 11,
    fontWeight: "400",
    color: Colors.textColor,
    opacity: 0.8,
  },
  postsContainer: {
    gap: 32,
    marginBottom: 64,
  },
});

export default PostsScreen;
