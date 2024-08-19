import { Box, Flex, Image } from "@chakra-ui/react";
import GateContainer from "../GateContainer";

export function Gates() {
  const gates = [
    {
      mainHeader: "I own a",
      secondaryHeader: "Moca NFT",
      phrase:
        "Own a Moca NFT(s) to claim Moca ID and get extra Moca holder benefits!",
      image: <Image height={"150px"} src="/threeImage.png" />,
      info: "*Your Moca must be staked for the entire previous weekly staking period",
      buttonText: "Claim with Mocas!",
      withInput: false,
    },
    {
      mainHeader: "Use My",
      secondaryHeader: "Invite Code",
      phrase:
        "Enter a Mocaverse distributed invite code to claim your own exclusive Moda ID!",
      image: <Image height={"150px"} src="/codeImage.png" />,
      info: "Button here",
      buttonText: "Claim with Code!",
      withInput: true,
    },
  ];

  return (
    <Flex
      bg={"#0A1428"}
      w={"full"}
      textColor={"white"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={50}
    >
      {gates.map((gate, idx) => (
        <Flex key={idx}>
          <GateContainer
            mainHeader={gate.mainHeader}
            secondaryHeader={gate.secondaryHeader}
            phrase={gate.phrase}
            image={gate.image}
            info={gate.info}
            buttonText={gate.buttonText}
            withInput={gate.withInput}
          />
        </Flex>
      ))}
    </Flex>
  );
}
