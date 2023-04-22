import { useToast } from "@chakra-ui/react";
import React from "react";

/**
 * This component is used to render the status message
 * @param messageTitle  message needs to be displayed
 * @param messageDesc
 * @param error
 * @returns
 */
const ToastMessage = (
  messageTitle: string,
  messageDesc: string,
  error: boolean
) => {
  const toast = useToast();
  const toastIdRef = React.useRef() || null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const close = () => {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const closeAll = () => {
    toast.closeAll();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return toast({
    title: messageTitle,
    description: messageDesc,
    status: error ? "error" : "success",
    position: "top",
    duration: 3000,
    isClosable: true,
  });
};

export default ToastMessage;
