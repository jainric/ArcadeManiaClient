import { Flex, Menu, MenuButton, Icon, Text } from "@chakra-ui/react";
import React from "react";

import type { NavItemProps } from "../../../types/components/common";

/**
 * NavItemMenu Component to render container for NavItems
 *
 * @param NavItemProps props
 * @returns NavItemMenu
 */
export const NavItemMenu: React.FC<NavItemProps> = ({
  navSize,
  title,
  icon,
  active,
  children,
}) => {
  return (
    <Flex
      mt={5}
      flexDir="column"
      w="100%"
      alignItems={navSize === "small" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <MenuButton
          title={title}
          fontSize="lg"
          w="100%"
          backgroundColor={active ? "AEC8CA" : "none"}
          p={navSize === "small" ? "23px" : "5px"}
          borderRadius={8}
          _hover={{ textDecor: "none", background: "#AEC8CA" }}
        >
          <Flex justifyContent="center" alignItems="center">
            <Icon
              as={icon}
              fontSize="xl"
              color={active ? "#82AAAD" : "gray.500"}
            />
            <Text
              ml={5}
              display={navSize === "small" ? "none" : "flex"}
              transition="0.5s ease-out"
            >
              {title}
            </Text>
          </Flex>
        </MenuButton>
        {children}
      </Menu>
    </Flex>
  );
};
