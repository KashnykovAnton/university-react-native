import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import Post from "@/components/Post";
import { Colors } from "@/constants/Colors";
import AvatarDel from "@/assets/icons/avatarDel.svg";
import LogoutButton from "@/components/LogoutButton";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const ProfileScreen = () => {
  const handleLogout = () => {
    console.log("Logout");
  };

  return (
    <ImageBackground source={require("@/assets/images/background.png")} resizeMode="cover" style={styles.backgroundImg}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <View style={styles.logout}>
            <LogoutButton onPress={handleLogout} />
          </View>
          <View style={styles.avatarContainer}>
            <Image source={require("@/assets/images/avatar-photo.png")} style={styles.avatar} />
            <View style={styles.icon}>
              <AvatarDel />
            </View>
          </View>
          <Text style={styles.title}>Natali Romanova</Text>

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
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImg: {
    width: SCREEN_WIDTH,
    height: "100%",
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    width: SCREEN_WIDTH,
  },
  mainContainer: {
    width: SCREEN_WIDTH,
    gap: 32,
    marginTop: 164,
    paddingHorizontal: 16,
    paddingTop: 22,
    backgroundColor: Colors.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  logout: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  avatarContainer: {
    position: "relative",
    width: 120,
    height: 120,
    alignSelf: "center",
    marginTop: -92,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
    alignSelf: "center",
  },
  icon: {
    position: "absolute",
    bottom: 14,
    right: -12,
    transform: [{ rotate: "45deg" }],
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 36,
    textAlign: "center",
  },
  postsContainer: {
    gap: 32,
    marginBottom: 64,
  },
});

export default ProfileScreen;
