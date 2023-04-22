import {
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Modal,
    useDisclosure,
  } from "@chakra-ui/react";
  import React from "react";
  import type { ModalDataProps } from "../../../../lib/types/components/common";
  
  /**
   * This component creates and renders the a modal with action button
   * @returns Modal Component
   */
  const ModalComponent: React.FC<ModalDataProps> = ({
    modalHeader,
    modalCotent,
    actionButtonText,
    buttonAction,
  }) => {
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
    /**
     * This method is used to set the action method to the button along with the close action
     */
    const setActionButton = () => {
      buttonAction();
      onClose();
    };
    return (
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalHeader}</ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody>{modalCotent}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={setActionButton}>
              {actionButtonText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  // exporting the modal component
  export default ModalComponent;
  