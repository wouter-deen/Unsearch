import {Box, Flex, Icon, Text, useBreakpointValue, useColorModeValue, VStack} from "@chakra-ui/react";
import {FaClock} from "react-icons/fa";

export default function News(props) {
  const borderColor = useColorModeValue("gray.100", "gray.700");
  const alignTime = useBreakpointValue({base: "left", md: "center"});
  const flexDirTime = useBreakpointValue({base: "column", md: "row"});

  return (
    <VStack align="left" maxW="container.md" mt={{base: 4, sm: 8}} mx={{base: 8, md: 16}} spacing={4}>
      {props.newsResults?.Results?.map((page, i) => (
        <Box key={i} rounded="md" border="1px" w="full" px={2} py={1}
             borderColor={borderColor}
        >
          <Flex align={alignTime} flexDir={flexDirTime}>
            <Text fontWeight={700} mr={3}>{page.Publisher}</Text>

            <Flex pl={1} pr={2} align="center" w="fit-content" rounded="full" mb={1} mt={2} color="#fff" bg={
                  page?.PublishedAt?.includes("min") ? "green.400"
                  : page?.PublishedAt?.includes("minutes") ? "green.400"
                  : page?.PublishedAt?.includes("minuten") ? "green.400"
                  : page?.PublishedAt?.includes("hours") ? "green.600"
                  : page?.PublishedAt?.includes("hour") ? "green.400"
                  : page?.PublishedAt?.includes("uur") ? "green.600"
                  : page?.PublishedAt?.includes("days") ? "orange.500"
                  : page?.PublishedAt?.includes("day") ? "yellow.500"
                  : page?.PublishedAt?.includes("dag") ? "yellow.500"
                  : page?.PublishedAt?.includes("dagen") ? "orange.500"
                  : page?.PublishedAt?.includes("LIVE") ? "red.500"
                  : "gray.500"
                }
                  className={page?.PublishedAt?.includes("minuten") && "blob green"}
            >
              <Icon as={FaClock} boxSize={4} mr={1.5}/>
              <Text fontSize="sm">{page.PublishedAt}</Text>
            </Flex>

          </Flex>

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