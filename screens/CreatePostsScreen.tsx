import { useEffect, useState } from "react";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Keyboard, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import CreatePostInput from "@/components/CreatePostInput";
import { Colors } from "@/constants/Colors";
import CameraIcon from "@/assets/icons/camera.svg";
import MapPin from "@/assets/icons/map-pin.svg";
import Button from "@/components/Button";
import * as Location from "expo-location";
import { Variables } from "@/constants/Variables";
import { useNavigation } from "@react-navigation/native";
import CenterTabButton from "@/components/CenterTabButton";
import TrashIcon from "@/assets/icons/trash.svg";

type NavigationProps = {
  navigate: (screen: string) => void;
};

const CreatePostsScreen = () => {
  const [postName, setPostName] = useState("");
  const [postLocation, setPostLocation] = useState("");
  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const navigation: NavigationProps = useNavigation();

  const disabledButton = !postName || !postLocation;

  const handlePostNameChange = (value: string) => {
    setPostName(value);
  };

  const handlePostLocationChange = (value: string) => {
    setPostLocation(value);
  };

  const onPublic = () => {
    setLocation({});
    setModalVisible(true);
  };

  useEffect(() => {
    (async () => {
      if (modalVisible) {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
        } else {
          let locationData = await Location.getCurrentPositionAsync({});
          const coords = {
            latitude: locationData.coords.latitude,
            longitude: locationData.coords.longitude,
          };
          setLocation(coords);
        }
      }
    })();
  }, [modalVisible]);

  const onModalClose = () => {
    setModalVisible(false);
    setPostName("");
    setPostLocation("");
    navigation.navigate("Публікації");
  };

  const onClear = () => {
    setPostName("");
    setPostLocation("");
  };

  let text;
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `You shared your location: ${JSON.stringify(location)}`;
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
            <View style={styles.cameraContainer}>
              <TouchableOpacity style={styles.cameraField}>
                <View style={styles.cameraWrapper}>
                  <CameraIcon />
                </View>
              </TouchableOpacity>
              <Text style={styles.cameraNotice}>Завантажте фото</Text>
            </View>
            <View style={styles.inputsContainer}>
              <CreatePostInput value={postName} placeholder={"Назва..."} onTextChange={handlePostNameChange} />
              <CreatePostInput
                value={postLocation}
                placeholder={"Місцевість..."}
                onTextChange={handlePostLocationChange}
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
  cameraContainer: {
    gap: 8,
  },
  cameraField: {
    alignItems: "center",
    justifyContent: "center",
    height: 240,
    width: "100%",
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: Colors.inputBorder,
  },
  cameraWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.white,
  },
  cameraNotice: {
    fontSize: 16,
    fontWeight: "400",
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
