import { useState } from "react";
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
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";

type NavigationProps = {
  navigate: (screen: string) => void;
};

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [passwordButtonText, setPasswordButtonText] = useState("Показати");

  const navigation: NavigationProps = useNavigation();

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const showPassword = () => {
    setIsPasswordVisible((prev) => !prev);
    passwordButtonText === "Показати" ? setPasswordButtonText("Сховати") : setPasswordButtonText("Показати");
  };

  const onLogin = () => {
    // Alert.alert("Credentials", `Your email: ${email}\nYour password: ${password}`);
    navigation.navigate("Home");
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
                <Input value={email} placeholder="Адреса електронної пошти" onTextChange={handleEmailChange} />
                <Input
                  value={password}
                  placeholder="Пароль"
                  onTextChange={handlePasswordChange}
                  secureTextEntry={isPasswordVisible}
                  button={showPasswordButton}
                />
              </View>

              <View style={[styles.innerContainer, styles.buttonContainer]}>
                <Button onPress={onLogin} text={"Увійти"} />
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
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  formContainer: {
    width: SCREEN_WIDTH,
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
});
