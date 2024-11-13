import { useCallback, useState } from "react";
import { Image, Text, View, StyleSheet, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { DocumentData } from "firebase/firestore";
import Post from "@/components/Post";
import { Colors } from "@/constants/Colors";
import { Variables } from "@/constants/Variables";
import { getPosts, getUser } from "@/utils/firestore";
import { PostProps } from "@/types/types";
import { getCurrentUser } from "@/redux/store/selectors";

const PostsScreen = () => {
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState<DocumentData | null>(null);

  const user = useSelector(getCurrentUser);

  const profilePhotoUrl = userData?.profilePhoto ? userData.profilePhoto : "@/assets/images/default-avatar.jpg";

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        await getUserData();
        await getPostsData();
      };

      fetchData();
    }, [user.uid])
  );

  const getUserData = async () => {
    const fetchedUserData = await getUser(user.uid);
    setUserData(fetchedUserData);
  };

  const getPostsData = async () => {
    const fetchedPostsData = await getPosts(user.uid);
    setPosts(fetchedPostsData);
  };

  return (
    <>
      {posts.length > 0 ? (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.mainContainer}>
            {userData && (
              <View style={styles.userInfoContainer}>
                <Image source={{ uri: profilePhotoUrl }} resizeMode="cover" style={styles.avatar} />
                <View style={styles.userTextContainer}>
                  <Text style={styles.name}>{userData.displayName}</Text>
                  <Text style={styles.mail}>{userData.email}</Text>
                </View>
              </View>
            )}
            <View style={styles.postsContainer}>
              {posts.map((item: PostProps) => (
                <Post {...item} key={item.id} />
              ))}
            </View>
          </ScrollView>
        </View>
      ) : (
        <View style={styles.container}>
          <Text>No posts available</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  mainContainer: {
    width: Variables.SCREEN_WIDTH,
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
  userInfoContainer: {
    flexDirection: "row",
    gap: 8,
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
  },
});

export default PostsScreen;
