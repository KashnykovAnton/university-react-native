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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Input from "@/components/Input";
import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import { Colors } from "@/constants/Colors";
import { Variables } from "@/constants/Variables";

type NavigationProps = {
  navigate: (screen: string) => void;
};

export const RegistrationScreen = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [passwordButtonText, setPasswordButtonText] = useState("Показати");
  const [validationError, setValidationError] = useState(false);

  const navigation: NavigationProps = useNavigation();

  const { name, email, password } = formData;

  const disabledButton = !name || !email || !password;

  const handleChange = (key: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  const showPassword = () => {
    if (!password) {
      return;
    }
    setIsPasswordVisible((prev) => !prev);
    passwordButtonText === "Показати" ? setPasswordButtonText("Сховати") : setPasswordButtonText("Показати");
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onSignUp = () => {
    if (!validateEmail(email)) {
      setValidationError(true);
      Alert.alert("Введіть, будь ласка, корректний email!");
    } else {
      setValidationError(false);
      Alert.alert("Credentials:", `Your name: ${name}\nYour email: ${email}\nYour password: ${password}`);
    }
  };

  const onLogin = () => {
    navigation.navigate("Login");
  };

  const handleAddAvatar = () => Alert.alert("Avatar Added");
  const handleDeleteAvatar = () => Alert.alert("Avatar Deleted");

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
              <View style={styles.avatar}>
                <View style={styles.icon}>
                  <IconButton onAdd={handleAddAvatar} onDelete={handleDeleteAvatar} />
                </View>
              </View>
              <Text style={styles.title}>Реєстрація</Text>

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
                  secureTextEntry={isPasswordVisible}
                  button={showPasswordButton}
                />
              </View>

              <View style={[styles.innerContainer, styles.buttonContainer]}>
                <Button onPress={onSignUp} text={"Зареєстуватися"} disabled={disabledButton} />
                <View style={styles.signUpContainer}>
                  <Text style={[styles.baseText, styles.passwordButtonText]}>
                    Вже є акаунт?{" "}
                    <TouchableWithoutFeedback onPress={onLogin}>
                      <Text style={styles.signUpText}>Увійти</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  avatar: {
    width: 120,
    height: 120,
    backgroundColor: Colors.gray,
    borderRadius: 16,
    alignSelf: "center",
    marginTop: -92,
    marginBottom: 32,
  },
  icon: {
    position: "absolute",
    bottom: 14,
    right: -12,
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
  passwordButtonText: {
    color: Colors.linkText,
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 78,
  },
  baseText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
  },
  signUpText: {
    textDecorationLine: "underline",
  },
  validationError: {
    borderWidth: 2,
    borderColor: Colors.red,
  },
});

export default RegistrationScreen;
