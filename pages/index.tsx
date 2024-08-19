import { Flex, Box, Text, Button, useDisclosure } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useAccount } from "wagmi";
import SelectWalletModal from "../components/SelectWalletModal";
import { Gates } from "../components/gates";

const Home: NextPage = () => {
  const { data: account } = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Head>
        <title>Mocaverse Gate</title>
        <meta name="description" content="Mocaverse Gate passage" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
        />
      </Head>

      <Box height={"100vh"} bg={"#0A1428"}>
        <Flex
          width="full"
          justifyContent={{ base: "center", sm: "space-between" }}
          alignItems="center"
          paddingY={2}
          paddingX={4}
          flexWrap="wrap"
        >
          <Text color="white" fontWeight="bold" fontSize="2xl">
            Mocaverse Gate
          </Text>

          {account ? (
            <Flex
              bg={{ base: "white", sm: "#EECD5E" }}
              paddingLeft={2}
              alignItems="center"
              borderRadius="8px"
              fontSize="lg"
              border="1px solid"
              borderColor="#EECD5E"
            >
              <Text>ETH</Text>
              <Text
                bg="blackAlpha.800"
                paddingX={3}
                paddingY={1}
                borderRadius="8px"
                marginLeft={2}
                color="white"
              >
                {account.address}
              </Text>
            </Flex>
          ) : (
            <Button fontSize="lg" colorScheme="blackAlpha" onClick={onOpen}>
              Connect Wallet
            </Button>
          )}
        </Flex>

        <Flex height={"full"}>
          <Gates />
        </Flex>

        <SelectWalletModal isOpen={isOpen} closeModal={onClose} />
      </Box>
    </>
  );
};

export default Home;
