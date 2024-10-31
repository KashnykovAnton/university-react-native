import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
  Alert,
  TouchableOpacity,
} from "react-native";
import Input from "@/components/Input";
import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import { Colors } from "@/constants/Colors";
import { useState } from "react";

export const RegistrationScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [passwordButtonText, setPasswordButtonText] = useState("Показати");

  const handleNameChange = (value: string) => {
    setName(value);
  };

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
    Alert.alert("Credentials", `Your email: ${email}\nYour password: ${password}`);
  };

  const onSignUp = () => {
    Alert.alert("Sign up!");
  };

  const handleAddAvatar = () => Alert.alert("Avatar Added");
  const handleDeleteAvatar = () => Alert.alert("Avatar Deleted");

  const showPasswordButton = (
    <TouchableOpacity onPress={showPassword}>
      <Text style={[styles.baseText, styles.passwordButtonText]}>{passwordButtonText}</Text>
    </TouchableOpacity>
  );
  return (
    <ImageBackground
      source={require("../assets/images/background.png")}
      resizeMode="cover"
      style={styles.backgroundImg}
    >
      <View style={styles.formContainer}>
        <View style={styles.avatar}>
          <View style={styles.icon}>
            <IconButton onAdd={handleAddAvatar} onDelete={handleDeleteAvatar} />
          </View>
        </View>
        <Text style={styles.title}>Реєстрація</Text>

        <View style={[styles.innerContainer, styles.inputContainer]}>
          <Input value={name} autoFocus={true} placeholder="Логін" onTextChange={handleNameChange} />
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
          <Button onPress={onLogin}>
            <Text style={[styles.baseText, styles.loginButtonText]}>Увійти</Text>
          </Button>

          <View style={styles.signUpContainer}>
            <Text style={[styles.baseText, styles.passwordButtonText]}>
              Немає акаунту?
              <TouchableWithoutFeedback onPress={onSignUp}>
                <Text style={styles.signUpText}> Зареєструватися</Text>
              </TouchableWithoutFeedback>
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default RegistrationScreen;

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
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  formContainer: {
    width: "100%",
    height: "65%",
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
  },
  signUpText: {
    textDecorationLine: "underline",
  },
});
