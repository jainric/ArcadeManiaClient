import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Button,
    useColorModeValue,
  } from "@chakra-ui/react";
  
  import type { PopOverProps } from "../../../../lib/types/components/common";
import React from "react";
  
  /**
   * This component creates and renders the popover modal along with it's trigger button
   * @returns Popover Component
   */
  const PopOver: React.FC<PopOverProps> = ({
    popOverHeader,
    popOverCotent,
    triggerButtonText,
  }) => {
    return (
      <Popover>
        <PopoverTrigger>
          <Button color={useColorModeValue("gray.600", "white")}>
            {triggerButtonText}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow color={useColorModeValue("gray.600", "white")} />
          <PopoverCloseButton />
          <PopoverHeader color={useColorModeValue("gray.600", "white")}>
            {popOverHeader}
          </PopoverHeader>
          <PopoverBody color={useColorModeValue("gray.600", "white")}>
            {popOverCotent}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
  };
  
  // exporting popover component
  export default PopOver;