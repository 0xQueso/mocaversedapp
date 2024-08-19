import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAccount, useSignMessage } from "wagmi";

export type ReserveFormModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  code: string;
};

const isValidEmail = (email: string) => {
  // Basic email validation regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const ReserveFormModal = ({
  isOpen,
  closeModal,
  code,
}: ReserveFormModalProps) => {
  const { data: account } = useAccount();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const { signMessageAsync } = useSignMessage();

  const handleSignMessage = async () => {
    if (!email && !code) return;

    const message = JSON.stringify({ email, code });

    try {
      return await signMessageAsync({ message });
    } catch (error) {
      toast({
        title: "Error signing message",
        status: "error",
        isClosable: true,
        position: "bottom-right",
      });
      throw error;
    }
  };

  const verifyReservation = async () => {
    try {
      const signature = await handleSignMessage();
      const response = await fetch("/api/reserve", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          ethAddress: account?.address,
          signature,
          code,
        }),
      });

      if (response.ok) {
        toast({
          title: "Successfully submitted",
          status: "success",
          isClosable: true,
          position: "bottom-right",
        });
        closeModal();
      } else {
        const errorData = await response.json();
        toast({
          title: errorData.message || "Submission failed",
          status: "error",
          isClosable: true,
          position: "bottom-right",
        });
      }
    } catch (error: any) {
      toast({
        title: error.message || "Unexpected error",
        status: "error",
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setEmailError("Invalid email address");
      return;
    }

    setEmailError("");
    await verifyReservation();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Account Reservation</ModalHeader>
        <ModalCloseButton _focus={{ boxShadow: "none" }} />
        <ModalBody pb={6}>
          <Box borderWidth="1px" borderRadius="lg" p={4} mx="auto">
            <form onSubmit={handleSubmit}>
              <FormControl isInvalid={!!emailError}>
                <FormLabel>Email Address</FormLabel>
                <Input
                  rounded="full"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
                <FormErrorMessage>{emailError}</FormErrorMessage>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Ethereum Address</FormLabel>
                <Input
                  rounded="full"
                  type="text"
                  value={account?.address}
                  isDisabled
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Invitation Code</FormLabel>
                <Input rounded="full" type="text" value={code} isDisabled />
              </FormControl>

              <Button
                mt={4}
                colorScheme="yellow"
                type="submit"
                rounded="full"
                width="full"
              >
                Submit
              </Button>
            </form>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ReserveFormModal;
