import {
  Box,
  Button,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  Wrap
} from "@chakra-ui/react";
import {useState} from "react";
import {FaExternalLinkAlt} from "react-icons/fa";

export default function Images(props) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [selectedImage, setSelectedImage] = useState();

  const borderColor = useColorModeValue("gray.200", "gray.700");

  const handleOpen = (page) => {
    setSelectedImage(page);
    onOpen();
  }

  console.log(props.imageResults)

  return (
    <Wrap mt={{base: 4, sm: 8}} ml={{base: 8, md: 16}} spacing={4} spacingY={6}>
      {props.imageResults !== [] && props.imageResults?.map((image, i) => (
        <Box key={i} rounded="md" align="center" maxW="xs" w="fit-content" border="1px" borderColor={borderColor} h="fit-content">
          <Box pos="relative" w="full">
            <IconButton aria-label={"open"} icon={<FaExternalLinkAlt/>} pos="absolute" top={1} right={1} size="xs"
              onClick={() => window.open(image.link, "_blank")} bg="blackAlpha.600" backdropFilter="blur(10px)"
              _hover={{backgroundColor: "RGBA(0, 0, 0, 0.25)"}} transition="ease 100ms" color="#fff"
            />
            <Box pos="absolute" right={1} bottom={1} px={.5} bg="blackAlpha.600" backdropFilter="blur(10px)"
                 fontSize="xs" rounded="sm" color="white"
            >
              {image.image.height}x{image.image.width}</Box>
            <Image src={image.image.thumbnailLink} objectFit="cover" onClick={() => handleOpen(image)} maxH="150px" w="full"
                   _hover={{cursor: "pointer"}} borderRadius=".375rem .375rem 0 0" alt="image"/>
          </Box>

          <Box px={2} py={2}>
            <Text onClick={() => handleOpen(image)}
                  color="blue.400"
                  fontWeight={600}
                  align="left"
                  _hover={{cursor: "pointer", textDecoration: "underline"}}
            >
              {image.title}
            </Text>
            <Text align="left" color="gray.500" fontSize="sm" whiteSpace="nowrap" overflow="hidden"
                  textOverflow="ellipsis" maxW="300px" _hover={{cursor: "pointer", textDecoration: "underline"}}
                  onClick={() => window.open(image.image.contextLink, "_blank")}
            >{image.image.contextLink}</Text>
          </Box>

        </Box>
      ))}

      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>{selectedImage?.title}</ModalHeader>
          <ModalCloseButton/>
          <ModalBody align="center">
            <Image id={selectedImage?.link} src={selectedImage?.link} rounded="md" objectFit="cover" maxH="600px" alt="image"/>
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => window.open(selectedImage?.image.contextLink, "_blank")} mr={3}>
              Open source
            </Button>
            <Button onClick={() => window.open(selectedImage?.link, "_blank")} mr={3} rightIcon={<FaExternalLinkAlt/>}>View image</Button>
            <Button colorScheme='blue' onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Wrap>
  )
}