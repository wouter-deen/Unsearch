import {Box, Flex, Icon, Text, useColorModeValue, VStack} from "@chakra-ui/react";
import {FaClock} from "react-icons/fa";

export default function News(props) {
  const borderColor = useColorModeValue("gray.100", "gray.700");

  return (
    <VStack align="left" maxW="container.md" mt={{base: 4, sm: 8}} mx={{base: 8, md: 16}} spacing={4}>
      {props.newsResults?.Results?.map((page, i) => (
        <Box key={i} rounded="md" border="1px solid" w="full" px={2} py={1}
             borderColor={borderColor}
        >
          <Text fontWeight={700}>{page.Publisher}</Text>

          <Text onClick={() => window.open(page.Link, "_blank")}
                color="blue.400"
                fontWeight={600}
                fontSize="xl"
                _hover={{cursor: "pointer", textDecoration: "underline"}}
          >
            {page.Title}
          </Text>
          <Text>{page.Description}</Text>
          <Flex pl={1} pr={2} align="center" w="fit-content" rounded="full" mb={1} mt={2} color="#fff" bg={
            page?.PublishedAt?.includes("mins") ? "green.400"
            : (page?.PublishedAt?.includes("hours")) ? "green.600"
            : (page?.PublishedAt?.includes("hour")) ? "green.400"
            : page?.PublishedAt?.includes("days") ? "yellow.500"
            : page?.PublishedAt?.includes("day") ? "yellow.500"
            : page?.PublishedAt?.includes("week") ? "orange.500"
            : page?.PublishedAt?.includes("weeks") ? "orange.500"
            : page?.PublishedAt?.includes("LIVE") && "red.500"
          }>
            <Icon as={FaClock} boxSize={4} mr={1.5}/>
            <Text fontSize="sm">{page.PublishedAt}</Text>
          </Flex>
        </Box>
      ))}
    </VStack>
  )
}