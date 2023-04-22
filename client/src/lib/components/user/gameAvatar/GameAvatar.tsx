import { Avatar } from "@chakra-ui/react";

import type { UserInfoProps } from "../../../types/components/common";
import React from "react";

/**
 * Component to render Avatars.
 *
 * @param UserInfoProps props
 * @returns GameAvatar.
 */
const GameAvatar: React.FC<UserInfoProps> = ({ name, icon, size }) => {
  const sz = size ?? "md";
  return <Avatar name={name} src={icon} size={sz} />;
};

export default GameAvatar;
