import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";
import MessageCircle from "@/assets/icons/message-circle.svg";
import ThumbsUp from "@/assets/icons/thumbs-up.svg";
import MapPin from "@/assets/icons/map-pin.svg";
import { useNavigation } from "@react-navigation/native";

type PostProps = {
  url: ReturnType<typeof require>;
  title: string;
  comments: number;
  likes: number;
  location: string;
  profile?: boolean;
};

type NavigationProps = {
  navigate: (screen: string) => void;
};

const Post = ({ url, title, comments, likes, location, profile = false }: PostProps) => {
  const iconStrokeStyle = comments > 0 ? Colors.orange : Colors.placeholderText;
  const iconFillStyle = comments > 0 ? Colors.orange : "transparent";

  const navigation: NavigationProps = useNavigation();

  const handleCommentsClick = () => navigation.navigate("Comments");
  const handleLocationClick = () => navigation.navigate("Map");

  return (
    <View style={styles.postWrapper}>
      <Image source={url} resizeMode="cover" style={styles.postImage} />
      <Text style={styles.postTitle}>{title}</Text>
      <View style={styles.postBottomWrapper}>
        <View style={styles.postLeftBottomPart}>
          <TouchableOpacity onPress={handleCommentsClick} style={styles.postIconAndText}>
            <MessageCircle stroke={iconStrokeStyle} fill={iconFillStyle} />
            <Text style={styles.postIconText}>{comments}</Text>
          </TouchableOpacity>
          {profile && (
            <View style={styles.postIconAndText}>
              <ThumbsUp />
              <Text style={styles.postIconText}>{likes}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity onPress={handleLocationClick} style={styles.postLocation}>
          <MapPin />
          <Text style={styles.postTextLocation}>{location}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postWrapper: {
    gap: 8,
  },
  postImage: {
    width: "100%",
    height: 280,
    borderRadius: 8,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.textColor,
  },
  postBottomWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postLeftBottomPart: {
    flexDirection: "row",
    gap: 24,
  },
  postIconAndText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  postIcon: {
    color: Colors.orange,
  },
  postIconText: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.textColor,
  },
  postLocation: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  postTextLocation: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.textColor,
    textDecorationLine: "underline",
  },
});

export default Post;
