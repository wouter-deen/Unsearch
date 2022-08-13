import {Box, Flex, Heading, Image, Text, useColorModeValue} from "@chakra-ui/react";
import React from "react";

export default function Header() {
  return (
    <Box w="fit-content">
      <Flex marginTop={{base: 12, sm: 32}} align="center">
        {useColorModeValue(
          <Image height={{base: "3rem", sm: "4.5rem"}} src="/logo_no_text.svg"/>,
          <Image height={{base: "3rem", sm: "4.5rem"}} src="/logo_no_text_white.svg"/>
        )}
        <Heading size={{base: "3xl", sm: "4xl"}}>&nbsp;Unsearch</Heading>
      </Flex>

      <Flex align="flex-end" justify="right">
        <Text fontSize="xl">By&nbsp;</Text>
        {useColorModeValue(<Image h="1.6rem" src="/logo_text_only.svg"/>, <Image h="1.6rem" src="/logo_text_only_white.svg"/>)}
      </Flex>

    </Box>
  )
}