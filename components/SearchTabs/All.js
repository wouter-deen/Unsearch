import {Box, Text, useColorModeValue, VStack} from "@chakra-ui/react";

export default function All(props) {
  const borderColor = useColorModeValue("gray.100", "gray.700");

  return (
    <VStack textAlign="left" maxW="container.md" mt={{base: 4, sm: 8}} ml={{base: 8, sm: 32}} spacing={4}>
      {props.searchResults?.Results.map((page, i) => (
        <Box key={i} rounded="md" border="1px solid" w="full" px={2} py={1}
             borderColor={borderColor}
        >
          <Text onClick={() => window.location.href = page.Link} fontSize="sm"
                _hover={{cursor: "pointer", textDecoration: "underline"}}
                color="gray.500"
          >
            {page.Link}
          </Text>

          <Text onClick={() => window.open(page.Link, "_blank")}
                color="blue.400"
                fontWeight={600}
                fontSize="xl"
                _hover={{cursor: "pointer", textDecoration: "underline"}}
          >
            {page.Title}
          </Text>
          <Text>{page.Description}</Text>
        </Box>
      ))}
    </VStack>
  )
}