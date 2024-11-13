import { useEffect, useState } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { uid } from "uid";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";
import CreatePostInput from "@/components/CreatePostInput";
import CenterTabButton from "@/components/CenterTabButton";
import CameraField from "@/components/CameraField";
import IconButton from "@/components/IconButton";
import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";
import { Variables } from "@/constants/Variables";
import MapPin from "@/assets/icons/map-pin.svg";
import TrashIcon from "@/assets/icons/trash.svg";
import { HomeTabNavigationProps } from "@/types/types";
import { addPost, uploadImage } from "@/utils/firestore";
import { getCurrentUser } from "@/redux/store/selectors";

const CreatePostsScreen = () => {
  const [postName, setPostName] = useState("");
  const [postLocation, setPostLocation] = useState("");
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const navigation: HomeTabNavigationProps = useNavigation();
  const user = useSelector(getCurrentUser);
  const disabledButton = !postName || !postLocation || !capturedImage;
  const isLocationExist = Object.keys(location).length > 0;

  useEffect(() => {
    (async () => {
      if (modalVisible) {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
        } else {
          let locationData = await Location.getCurrentPositionAsync({});
          setLocation({ latitude: locationData.coords.latitude, longitude: locationData.coords.longitude });
        }
      }
    })();
  }, [modalVisible]);

  useEffect(() => {
    return navigation.addListener("focus", () => {
      onClear();
    });
  }, [navigation]);

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
      setCapturedImage(uri);
    }
  };

  const handleDeletePhoto = async () => {
    setCapturedImage(null);
  };

  const onPostNameChange = (value: string) => {
    setPostName(value);
  };

  const onPostLocationChange = (value: string) => {
    setPostLocation(value);
  };

  const onPublic = () => {
    setModalVisible(true);
  };

  const createImageUrl = async (uri: string | null) => {
    if (!uri) {
      return "";
    }
    const response = await fetch(uri);
    const file = await response.blob();
    const fileName = uri.split("/").pop() || "";
    const fileType = file.type;
    const imageFile = new File([file], fileName, { type: fileType });
    const imageUrl = await uploadImage(user.uid, imageFile, fileName, "postsPhotos");
    return imageUrl;
  };

  const onModalClose = async () => {
    setModalVisible(false);
    if (isLocationExist && user?.uid) {
      const imageUrl: string = await createImageUrl(capturedImage);

      const post = {
        id: uid(),
        title: postName,
        postLocation: postLocation,
        coordsLocation: location,
        capturedImage: imageUrl,
      };
      await addPost(user.uid, post);
      setTimeout(() => onClear(), 1000);
      navigation.navigate("Posts");
    } else {
      console.log("Location or userId doesn't exist");
    }
  };

  const onClear = () => {
    setPostName("");
    setPostLocation("");
    setLocation({ latitude: 0, longitude: 0 });
    setErrorMsg("");
    setCapturedImage(null);
  };

  let text;
  if (errorMsg) {
    text = errorMsg;
  } else if (isLocationExist) {
    text = `You shared your location:\n lat: ${location.latitude}\n long: ${location.longitude}`;
  } else {
    text = "Location not available";
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainContainer}>
        <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={onModalClose}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalParagraph}>{text}</Text>
              <Button onPress={onModalClose} text={"Close"} disabled={false} />
            </View>
          </View>
        </Modal>

        <ScrollView>
          <View style={styles.scrollContainer}>
            {capturedImage ? (
              <Image source={{ uri: capturedImage }} resizeMode="cover" style={styles.image} />
            ) : (
              <CameraField image={capturedImage} setImage={setCapturedImage} />
            )}
            <View style={styles.textContainer}>
              <Text style={styles.text}>Зробіть фото або додайте з галереї</Text>
              <IconButton onAdd={handleAddPhoto} onDelete={handleDeletePhoto} hasPhoto={capturedImage} />
            </View>
            <View style={styles.inputsContainer}>
              <CreatePostInput value={postName} placeholder={"Назва..."} onTextChange={onPostNameChange} />
              <CreatePostInput
                value={postLocation}
                placeholder={"Місцевість..."}
                onTextChange={onPostLocationChange}
                icon={<MapPin />}
              />
            </View>
            <Button onPress={onPublic} text={"Опубліковати"} disabled={disabledButton} />
          </View>
        </ScrollView>

        <View style={styles.iconButtonContainer}>
          <CenterTabButton onPress={onClear} style={styles.iconButton}>
            <TrashIcon />
          </CenterTabButton>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.overlay,
  },
  modalContainer: {
    width: Variables.SCREEN_WIDTH * 0.8,
    padding: 20,
    borderRadius: 16,
    backgroundColor: Colors.white,
    alignItems: "center",
  },
  modalParagraph: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  scrollContainer: {
    gap: 32,
  },
  image: {
    width: Variables.SCREEN_WIDTH - 32,
    height: 240,
    borderRadius: 8,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: -16,
  },
  text: {
    flex: 1,
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
    color: Colors.placeholderText,
  },
  inputsContainer: {
    gap: 16,
  },
  iconButtonContainer: {
    marginBottom: 34,
    flexDirection: "row",
    justifyContent: "center",
  },
  iconButton: {
    backgroundColor: Colors.gray,
  },
});
