import { StyleSheet, TouchableOpacity } from "react-native";
import AvatarAdd from "@/assets/icons/avatarAdd.svg";
import AvatarDel from "@/assets/icons/avatarDel.svg";

type IconButtonProps = {
  hasPhoto: string | undefined | null;
  onAdd: () => void;
  onDelete: () => void;
};

const IconButton = ({ onAdd, onDelete, hasPhoto }: IconButtonProps) => {
  const handlePress = () => {
    if (hasPhoto) {
      onDelete();
    } else {
      onAdd();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      {hasPhoto ? <AvatarDel style={styles.avatarDel} /> : <AvatarAdd />}
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  avatarDel: {
    transform: [{ rotate: "45deg" }],
  },
});
