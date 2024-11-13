import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import Button from "./Button";
import { Colors } from "@/constants/Colors";

type ButtonComponentProps = {
  handlePress: () => void;
  textButton: string;
  disable: boolean;
  questionText: string;
  handleAct: () => void;
  linktext: string;
};

const ButtonComponent = ({
  handlePress,
  textButton,
  disable,
  questionText,
  handleAct,
  linktext,
}: ButtonComponentProps) => {
  return (
    <View style={styles.buttonContainer}>
      <Button onPress={handlePress} text={textButton} disabled={disable} />
      <View style={styles.signUpContainer}>
        <Text style={styles.passwordButtonText}>
          {questionText}
          <TouchableWithoutFeedback onPress={handleAct}>
            <Text style={styles.signUpText}>{linktext}</Text>
          </TouchableWithoutFeedback>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    gap: 16,
    marginTop: 42,
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 78,
  },
  passwordButtonText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
    color: Colors.linkText,
  },
  signUpText: {
    textDecorationLine: "underline",
  },
});

export default ButtonComponent;
