import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
  Alert,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import Input from "@/components/Input";
import Title from "@/components/Title";
import ButtonComponent from "@/components/ButtonComponent";
import ProfilePhotoComponent from "@/components/ProfilePhotoComponent";
import { Colors } from "@/constants/Colors";
import { Variables } from "@/constants/Variables";
import { registerDB } from "@/utils/auth";
import { RootStackNavigationProps } from "@/types/types";
import { getCurrentUser } from "@/redux/store/selectors";
import { uploadImage } from "@/utils/firestore";

const initialFormData = {
  name: "",
  email: "",
  password: "",
};

export const RegistrationScreen = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isPasswordHide, setIsPasswordHide] = useState(true);
  const [passwordButtonText, setPasswordButtonText] = useState("Показати");
  const [validationError, setValidationError] = useState(false);
  const [profileLocalPhoto, setProfileLocalPhoto] = useState("");

  const user = useSelector(getCurrentUser);
  const navigation: RootStackNavigationProps = useNavigation();

  const { name, email, password } = formData;
  const disabledButton = !name || !email || !password;

  const handleChange = (key: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
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
    }
  };

  const handleDeletePhoto = async () => {
    setProfileLocalPhoto("");
  };

  const showPassword = () => {
    if (!password) {
      return;
    }
    setIsPasswordHide((prev) => !prev);
    passwordButtonText === "Показати" ? setPasswordButtonText("Сховати") : setPasswordButtonText("Показати");
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (user.uid) {
      navigation.navigate("Home");
    }
  }, [user.uid, navigation]);

  const onSignUp = async () => {
    if (!validateEmail(email)) {
      setValidationError(true);
      Alert.alert("Введіть, будь ласка, корректний email!");
    } else {
      setValidationError(false);
      try {
        const profilePhoto = await createImageUrl(profileLocalPhoto);
        await registerDB({ name, email, password, profilePhoto });
      } catch (error) {
        Alert.alert("registration error", (error as Error).message);
      }
    }
  };

  const onLogin = () => {
    navigation.navigate("Login");
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

  const onClear = () => {
    setFormData(initialFormData);
    setIsPasswordHide(true);
    setPasswordButtonText("Показати");
    setValidationError(false);
    setProfileLocalPhoto("");
  };

  useEffect(() => {
    return navigation.addListener("focus", () => {
      onClear();
    });
  }, [navigation]);

  const showPasswordButton = (
    <TouchableOpacity onPress={showPassword}>
      <Text style={[styles.baseText, styles.passwordButtonText]}>{passwordButtonText}</Text>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        resizeMode="cover"
        style={styles.backgroundImg}
      >
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.formContainer}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <ProfilePhotoComponent
                photoUrl={profileLocalPhoto}
                handleAdd={handleAddPhoto}
                handleDel={handleDeletePhoto}
              />
              <Title text="Реєстрація" style={styles.title} />
              <View style={[styles.innerContainer, styles.inputContainer]}>
                <Input
                  value={name}
                  autoFocus={true}
                  placeholder="Логін"
                  onTextChange={(value) => handleChange("name", value)}
                />
                <Input
                  value={email}
                  placeholder="Адреса електронної пошти"
                  onTextChange={(value) => handleChange("email", value)}
                  style={validationError && styles.validationError}
                />
                <Input
                  value={password}
                  placeholder="Пароль"
                  onTextChange={(value) => handleChange("password", value)}
                  secureTextEntry={isPasswordHide}
                  button={showPasswordButton}
                />
              </View>
              <ButtonComponent
                handlePress={onSignUp}
                textButton="Зареєстуватися"
                disable={disabledButton}
                questionText="Вже є акаунт? "
                handleAct={onLogin}
                linktext="Увійти"
              />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  backgroundImg: {
    position: "absolute",
    top: 0,
    bottom: 0,
    height: "100%",
    width: Variables.SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  formContainer: {
    width: Variables.SCREEN_WIDTH,
    backgroundColor: Colors.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  title: {
    marginTop: 32,
  },
  innerContainer: {
    gap: 16,
  },
  inputContainer: {
    marginTop: 32,
  },
  passwordButtonText: {
    color: Colors.linkText,
  },
  baseText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
  },
  validationError: {
    borderWidth: 2,
    borderColor: Colors.red,
  },
});

export default RegistrationScreen;
