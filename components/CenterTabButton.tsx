import { StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";

type CenterTabButtonProps = {
  children: React.ReactNode;
};

const CenterTabButton = ({ children }: CenterTabButtonProps) => {
  return <View style={styles.button}>{children}</View>;
};

const styles = StyleSheet.create({
  button: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.orange,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CenterTabButton;
