import { Image, StyleSheet, View } from "react-native";
import IconButton from "./IconButton";
import { Colors } from "@/constants/Colors";

type ProfilePhotoProps = {
  photoUrl: string | undefined;
  handleAdd: () => void;
  handleDel: () => void;
};

const ProfilePhotoComponent = ({ photoUrl, handleAdd, handleDel }: ProfilePhotoProps) => {
  return (
    <View style={styles.container}>
      {photoUrl ? <Image source={{ uri: photoUrl }} style={styles.photo} /> : <View style={styles.photo}></View>}
      <View style={styles.icon}>
        <IconButton onAdd={handleAdd} onDelete={handleDel} hasPhoto={photoUrl} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 120,
    height: 120,
    alignSelf: "center",
    marginTop: -92,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 16,
    alignSelf: "center",
    backgroundColor: Colors.gray,
  },
  icon: {
    position: "absolute",
    bottom: 14,
    right: -12,
  },
});

export default ProfilePhotoComponent;
