import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import AvatarAdd from "@/assets/icons/avatarAdd.svg";
import AvatarDel from "@/assets/icons/avatarDel.svg";

type IconButtonProps = {
  onAdd: () => void;
  onDelete: () => void;
};

const IconButton = ({ onAdd, onDelete }: IconButtonProps) => {
  const [hasAvatar, setHasAvatar] = useState(false);

  const handlePress = () => {
    if (hasAvatar) {
      onDelete();
    } else {
      onAdd();
    }
    setHasAvatar(!hasAvatar);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      {hasAvatar ? <AvatarDel style={styles.avatarDel} /> : <AvatarAdd />}
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  avatarDel: {
    transform: [{ rotate: "45deg" }],
  },
});
