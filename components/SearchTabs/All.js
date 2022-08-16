import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Link,
  Text,
  useColorModeValue,
  useToast,
  VStack
} from "@chakra-ui/react";
import {FaExternalLinkAlt, FaRegClipboard, FaWikipediaW} from "react-icons/fa";
import CopyURL from "@/lib/CopyURL";

export default function All(props) {
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const wikiResultsHeadingBg = useColorModeValue("gray.50", "gray.900");
  const wikiLogoBg = useColorModeValue("white", "gray.700");
  const secondaryTextColor = useColorModeValue("gray.500", "gray.400");

  const toast = useToast();

  const category = props.wikiResults?.categories[0].title.replace("Category:", "").replace("Categorie:", "");

  return (
    <Flex mt={{base: 4, sm: 8}} flexDir={{base: "column-reverse", md: "row"}}>
      <VStack align="left" maxW="container.sm" ml={{base: 4, md: 16}} mr={{base: 4, md: 16}} spacing={4}>
        {props.searchResults?.items?.map((page, i) => (
          <Box key={i} rounded="md" border="1px" borderColor={borderColor} w="full" px={2} py={1} pos="relative">
            <Link href={page.link} target="_blank" fontSize="sm" color="gray.500">
              {page.link}
            </Link>

            <Link href={page.link} target="_blank" color="blue.400" fontWeight={600} fontSize="xl" display="block"
            >
              {page.title}
            </Link>
            <Text>{page.snippet}</Text>
          </Box>
        ))}
      </VStack>

      {props.wikiResults?.pageid && props.searchResults &&
        <Box border="1px" borderColor={borderColor} rounded="md" h="fit-content" pos="relative"
             mx={{base: 4, md: 0}} mb={{base: 6, md: 0}} maxW="md" minW={{base: "", md: "md"}}
        >
          <Image src={props.wikiResults?.thumbnail?.source} borderRadius="0.375rem 0.375rem 0 0" w="full" maxH="250px"
                 objectFit="cover" bg="gray.50"
          />
          <Box w="full" px={4} py={2} borderBottom="1px" borderColor={borderColor} bg={wikiResultsHeadingBg} borderRadius={!props.wikiResults?.thumbnail && "0.375rem 0.375rem 0 0"}>
            <Flex align="center">
              <Icon as={FaWikipediaW} boxSize={9} mr={3} bg={wikiLogoBg} p={1} rounded="md" boxShadow="md"/>
              <Heading style={{hyphens: "auto"}}>{props.wikiResults?.title}</Heading>
            </Flex>
            <Text mt={1} color={secondaryTextColor}>
              {category}
            </Text>
          </Box>

          <Text p={4}>{props.wikiResults?.extract}</Text>

          <Flex justifyContent="space-between" px={{base: 2, md: 4}} py={{base: 2, md: 4}}>
            <Flex>
              <IconButton icon={<FaRegClipboard/>} fontSize="20px" onClick={() => CopyURL(toast, props.wikiResults?.fullurl)} mr={2}/>
              <IconButton icon={<FaExternalLinkAlt/>} mr={4} onClick={() => window.open(props.wikiResults?.fullurl)}/>
            </Flex>
            <Button onClick={() => window.location.href = props.wikiResults?.fullurl}
                    colorScheme="blue">
              Open in Wiki
            </Button>
          </Flex>
        </Box>
      }
    </Flex>
  )
}