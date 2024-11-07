import { useState } from "react";
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
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";
import { Variables } from "@/constants/Variables";

type NavigationProps = {
  navigate: (screen: string) => void;
};

export const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [passwordButtonText, setPasswordButtonText] = useState("Показати");
  const [validationError, setValidationError] = useState(false);

  const navigation: NavigationProps = useNavigation();

  const { email, password } = formData;

  const disabledButton = !email || !password;

  const handleChange = (key: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  const showPassword = () => {
    setIsPasswordVisible((prev) => !prev);
    passwordButtonText === "Показати" ? setPasswordButtonText("Сховати") : setPasswordButtonText("Показати");
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onLogin = () => {
    if (!validateEmail(email)) {
      setValidationError(true);
      Alert.alert("Введіть, будь ласка, корректний email!");
    } else {
      setValidationError(false);
      navigation.navigate("Home");
    }
  };

  const onSignUp = () => {
    navigation.navigate("Registration");
  };

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
              <Text style={styles.title}>Увійти</Text>

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
                  secureTextEntry={isPasswordVisible}
                  button={showPasswordButton}
                />
              </View>

              <View style={[styles.innerContainer, styles.buttonContainer]}>
                <Button onPress={onLogin} text={"Увійти"} disabled={disabledButton} />
                <View style={styles.signUpContainer}>
                  <Text style={[styles.baseText, styles.passwordButtonText]}>
                    Немає акаунту?{" "}
                    <TouchableWithoutFeedback onPress={onSignUp}>
                      <Text style={styles.signUpText}>Зареєструватися</Text>
                    </TouchableWithoutFeedback>
                  </Text>
                </View>
              </View>
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
  title: {
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 36,
    textAlign: "center",
  },
  innerContainer: {
    gap: 16,
  },
  inputContainer: {
    marginTop: 32,
  },
  buttonContainer: {
    marginTop: 42,
  },
  baseText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
  },
  loginButtonText: {
    color: Colors.white,
    textAlign: "center",
  },
  passwordButtonText: {
    color: Colors.linkText,
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 144,
  },
  signUpText: {
    textDecorationLine: "underline",
  },
  validationError: {
    borderWidth: 2,
    borderColor: Colors.red,
  },
});
