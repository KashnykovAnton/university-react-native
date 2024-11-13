import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import ButtonComponent from "@/components/ButtonComponent";
import Input from "@/components/Input";
import Title from "@/components/Title";
import { Colors } from "@/constants/Colors";
import { Variables } from "@/constants/Variables";
import { RootStackNavigationProps } from "@/types/types";
import { loginDB } from "@/utils/auth";
import { getCurrentUser } from "@/redux/store/selectors";

const initialFormData = {
  email: "",
  password: "",
};

export const LoginScreen = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isPasswordHide, setIsPasswordHide] = useState(true);
  const [passwordButtonText, setPasswordButtonText] = useState("Показати");
  const [validationError, setValidationError] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);
  const navigation: RootStackNavigationProps = useNavigation();

  const { email, password } = formData;

  const disabledButton = !email || !password;

  const handleChange = (key: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  const showPassword = () => {
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

  const onLogin = async () => {
    if (!validateEmail(email)) {
      setValidationError(true);
      Alert.alert("Введіть, будь ласка, корректний email!");
    } else {
      setValidationError(false);
      try {
        await loginDB({ email, password }, dispatch);
      } catch (error) {
        Alert.alert("Error logging in", (error as Error).message);
      }
    }
  };

  const onSignUp = () => {
    navigation.navigate("Registration");
  };

  const onClear = () => {
    setFormData(initialFormData);
    setIsPasswordHide(true);
    setPasswordButtonText("Показати");
    setValidationError(false);
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
              <Title text="Увійти" />

              <View style={[styles.innerContainer, styles.inputContainer]}>
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
                handlePress={onLogin}
                textButton="Увійти"
                disable={disabledButton}
                questionText="Немає акаунту? "
                handleAct={onSignUp}
                linktext="Зареєструватися"
              />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

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
  innerContainer: {
    gap: 16,
  },
  inputContainer: {
    marginTop: 32,
  },
  baseText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
  },
  passwordButtonText: {
    color: Colors.linkText,
  },
  validationError: {
    borderWidth: 2,
    borderColor: Colors.red,
  },
});
