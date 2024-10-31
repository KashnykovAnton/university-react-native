import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";

import AvatarAdd from "@/assets/images/avatarAdd.svg";
import AvatarDel from "@/assets/images/avatarDel.svg";

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
