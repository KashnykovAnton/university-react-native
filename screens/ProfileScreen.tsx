import { useCallback, useEffect, useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Post from "@/components/Post";
import LogoutButton from "@/components/LogoutButton";
import ProfilePhotoComponent from "@/components/ProfilePhotoComponent";
import { Colors } from "@/constants/Colors";
import { Variables } from "@/constants/Variables";
import { logoutDB } from "@/utils/auth";
import { getPosts, getUser, updateUserInFirestore, uploadImage } from "@/utils/firestore";
import { PostProps, RootStackNavigationProps } from "@/types/types";
import { getCurrentUser } from "@/redux/store/selectors";
import { setUserInfo } from "@/redux/reducers/userSlice";
import { DocumentData } from "firebase/firestore";

const ProfileScreen = () => {
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState<DocumentData | null>(null);
  const [profileLocalPhoto, setProfileLocalPhoto] = useState("");

  const user = useSelector(getCurrentUser);
  const dispatch = useDispatch();
  const navigation: RootStackNavigationProps = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        await getUserData();
        await getPostsData();
      };
      fetchData();
    }, [user.uid])
  );

  useEffect(() => {
    if (userData?.profilePhoto) {
      setProfileLocalPhoto(userData?.profilePhoto);
    } else {
      setProfileLocalPhoto("@/assets/images/default-avatar.jpg");
    }
  }, [userData]);

  const getUserData = async () => {
    const fetchedUserData = await getUser(user.uid);
    setUserData(fetchedUserData);
  };

  const getPostsData = async () => {
    const fetchedPostsData = await getPosts(user.uid);
    setPosts(fetchedPostsData);
  };

  const handleAddPhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && user) {
      const uri = result.assets[0].uri;
      setProfileLocalPhoto(uri);
      const imageUrl = await createImageUrl(uri);
      await updateUserInFirestore(user.uid, { profilePhoto: imageUrl });

      dispatch(
        setUserInfo({
          ...user,
          profilePhoto: imageUrl,
        })
      );
    }
  };

  const handleDeletePhoto = async () => {
    setProfileLocalPhoto("");
    if (user) {
      await updateUserInFirestore(user.uid, { profilePhoto: "" });
      dispatch(
        setUserInfo({
          ...user,
          profilePhoto: "",
        })
      );
    }
  };

  const createImageUrl = async (uri: string) => {
    if (!uri) {
      return "";
    }
    const response = await fetch(uri);
    const file = await response.blob();
    const fileName = uri.split("/").pop() || "";
    const fileType = file.type;
    const imageFile = new File([file], fileName, { type: fileType });
    const imageUrl = await uploadImage(user.uid, imageFile, fileName, "profilePhotos");
    return imageUrl;
  };

  const handleLogout = () => {
    logoutDB(dispatch);
    navigation.navigate("Login");
  };

  return (
    <ImageBackground source={require("@/assets/images/background.png")} resizeMode="cover" style={styles.backgroundImg}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <View style={styles.logout}>
            <LogoutButton onPress={handleLogout} />
          </View>
          <ProfilePhotoComponent
            photoUrl={profileLocalPhoto}
            handleAdd={handleAddPhoto}
            handleDel={handleDeletePhoto}
          />
          <Text style={styles.title}>{userData?.displayName}</Text>

          <View style={styles.postsContainer}>
            {posts.map((item: PostProps) => (
              <Post {...item} key={item.id} profile={true} />
            ))}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImg: {
    position: "relative",
    width: Variables.SCREEN_WIDTH,
    height: Variables.SCREEN_HEIGHT,
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    width: Variables.SCREEN_WIDTH,
  },
  mainContainer: {
    flexGrow: 1,
    width: Variables.SCREEN_WIDTH,
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
