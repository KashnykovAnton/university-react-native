import React, { useRef, Dispatch, SetStateAction } from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Variables } from "@/constants/Variables";
import { Colors } from "@/constants/Colors";
import CameraIcon from "@/assets/icons/camera.svg";

type CameraProps = {
  image: string | null;
  setImage: Dispatch<SetStateAction<string | null>>;
};

const CameraField = ({ image, setImage }: CameraProps) => {
  const [permission, requestPermission] = useCameraPermissions();
  const camera = useRef(null);

  if (!permission) {
    return <View />;
  }

const takePhoto = async () => {
    if (!camera.current) return;
    const image = await (camera.current as any).takePictureAsync();
    await MediaLibrary.saveToLibraryAsync(image.uri);
    setImage(image.uri);
};

  return (
    <View style={styles.profileImageContainer}>
      {image ? (
        <View>
          <Image source={{ uri: image }} style={styles.capturedImage} />
          <View style={styles.photoCircleLight}>
            <CameraIcon fill={Colors.white} />
          </View>
        </View>
      ) : (
        <CameraView ref={camera} style={styles.camera} facing={"back"}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.photoCircle} onPress={takePhoto}>
              <CameraIcon />
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
};

export default CameraField;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  profileImageContainer: {
    position: "relative",
  },
  capturedImage: {
    width: Variables.SCREEN_WIDTH - 32,
    height: 240,
    borderRadius: 8,
  },
  camera: {
    width: Variables.SCREEN_WIDTH - 32,
    height: 240,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    alignSelf: "center",
    marginTop: 32,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  photoCircle: {
    position: "absolute",
    right: "50%",
    top: "50%",
    transform: [{ translateX: 30 }, { translateY: -25 }],
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  photoCircleLight: {
    position: "absolute",
    right: "50%",
    top: "50%",
    transform: [{ translateX: 30 }, { translateY: -25 }],
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
