import { StyleSheet, Text, TextStyle } from "react-native";

interface TitleProps {
  text: string;
  style?: TextStyle;
}

const Title = ({ text, style }: TitleProps) => {
  return <Text style={[styles.title, style]}>{text}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 36,
    textAlign: "center",
  },
});

export default Title;
