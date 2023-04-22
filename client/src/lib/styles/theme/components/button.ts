import type { ComponentStyleConfig } from "@chakra-ui/react";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "full",
  },
  sizes: {
    sm: {
      px: 0, // ovveriding inline in 64px
      py: 0, // ovveriding inline in 64px
      height: "var(--chakra-sizes-7)",
      minWidth: "var(--chakra-sizes-7)",
    },
  },
};
