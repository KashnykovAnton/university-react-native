import { TouchableOpacity } from "react-native";
import ArrowLeft from "@/assets/icons/arrow-left.svg";

type BackButtonProps = {
  onPress: () => void;
};

const BackButton = ({ onPress }: BackButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ArrowLeft />
    </TouchableOpacity>
  );
};

export default BackButton;
