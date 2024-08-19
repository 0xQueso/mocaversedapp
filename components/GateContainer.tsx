import {
  Button,
  Text,
  Box,
  Input,
  useDisclosure,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAccount } from "wagmi";
import ReserveFormModal from "./ReserveFormModal";

export type GateProps = {
  mainHeader: string;
  secondaryHeader: string;
  phrase: string;
  image: JSX.Element;
  info: string;
  buttonText: string;
  withInput?: boolean;
};

const GateContainer: React.FC<GateProps> = ({
  mainHeader,
  secondaryHeader,
  phrase,
  image,
  info,
  buttonText,
  withInput,
}) => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validCode, setValidCode] = useState(false);

  const { data: account } = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const verifyCode = async () => {
    if (!account || !code) {
      toast({
        title: account ? "Code not provided" : "Wallet not connected",
        status: "error",
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/verifyCode?code=${code}`);
      const result = await response.json();
      setValidCode(result.valid);
      onOpen();
    } catch (error) {
      console.error("Error verifying code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      bg="#141E3C"
      width="400px"
      paddingY={10}
      paddingX={5}
      textAlign="center"
      rounded="xl"
      alignItems={"center"}
      flexDir={"column"}
    >
      <Text fontWeight="bold" fontSize="sm">
        {mainHeader}
      </Text>
      <Text fontWeight="extrabold" color="#EFCD5E" fontSize="lg">
        {secondaryHeader}
      </Text>
      <Text mb={4}>{phrase}</Text>
      <Box height={32} mb={10}>
        {image}
      </Box>
      {withInput ? (
        <Input
          placeholder="Enter invite code"
          bg="white"
          fontSize="sm"
          rounded="full"
          color="black"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      ) : (
        <Text color="green">{info}</Text>
      )}
      <Button
        isLoading={isLoading}
        loadingText="Submitting"
        colorScheme="yellow"
        rounded="full"
        marginTop={4}
        fontWeight="bold"
        onClick={verifyCode}
      >
        {buttonText}
      </Button>
      {validCode && (
        <ReserveFormModal isOpen={isOpen} closeModal={onClose} code={code} />
      )}
    </Flex>
  );
};

export default GateContainer;
