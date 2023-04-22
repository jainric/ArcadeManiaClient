import { Box, Center, GridItem } from "@chakra-ui/react";

import type { _2048TileData } from "../../../../../lib/types/components/games/2048.types";

// import styles from "../../../../../../css";
import styles from "./styles/Cell2048.module.scss"
import React from "react";

/**
 * 2048 Cell Component.
 *
 * @param _2048TileData props
 * @returns 2048 Cell
 */
// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
const Cell2048: React.FC<_2048TileData> = ({ value }) => {
  return (
    <Box
      transitionProperty="left top transform"
      transitionDuration="250ms 250ms 10ms"
      transform="scale(1)"
    >
      <GridItem>
        <Center
          h="100px"
          w="100px"
          fontSize="45px"
          borderRadius="4px"
          className={styles[`cell-${value}`]}
        >
          {value > 0 && value}
        </Center>
      </GridItem>
    </Box>
  );
};

export default Cell2048;
