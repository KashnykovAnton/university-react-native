import { TouchableOpacity } from "react-native";
import LogOut from "@/assets/icons/log-out.svg";

type LogoutButtonProps = {
  onPress: () => void;
};

const LogoutButton = ({ onPress }: LogoutButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LogOut />
    </TouchableOpacity>
  );
};

export default LogoutButton;
