import {Box, Text, useColorModeValue, VStack} from "@chakra-ui/react";

export default function All(props) {
  const borderColor = useColorModeValue("gray.100", "gray.700");

  return (
    <VStack align="left" maxW="container.md" mt={{base: 4, sm: 8}} mx={{base: 8, md: 16}} spacing={4}>
      {props.searchResults?.items?.map((page, i) => (
        <Box key={i} rounded="md" border="1px solid" w="full" px={2} py={1}
             borderColor={borderColor}
        >
          <Text onClick={() => window.location.href = page.link} fontSize="sm"
                _hover={{cursor: "pointer", textDecoration: "underline"}}
                color="gray.500"
          >
            {page.link}
          </Text>

          <Text onClick={() => window.open(page.link, "_blank")}
                color="blue.400"
                fontWeight={600}
                fontSize="xl"
                _hover={{cursor: "pointer", textDecoration: "underline"}}
          >
            {page.title}
          </Text>
          <Text>{page.snippet}</Text>
        </Box>
      ))}
    </VStack>
  )
}