import { useState } from "react";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import CreatePostInput from "@/components/CreatePostInput";
import { Colors } from "@/constants/Colors";
import CameraIcon from "@/assets/icons/camera.svg";
import MapPin from "@/assets/icons/map-pin.svg";
import Button from "@/components/Button";

const CreatePostsScreen = () => {
  const [postName, setPostName] = useState("");
  const [postLocation, setPostLocation] = useState("");

  const disabledButton = postName.length === 0 || postLocation.length === 0;

  const handlePostNameChange = (value: string) => {
    setPostName(value);
  };

  const handlePostLocationChange = (value: string) => {
    setPostLocation(value);
  };

  const onPublic = () => {
    Alert.alert("Publication done!");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.mainContainer}>
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
});
