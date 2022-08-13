import {
  Box,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import {useState} from "react";

export default function Images(props) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [selectedImage, setSelectedImage] = useState();

  const handleOpen = (page) => {
    setSelectedImage(page);
    onOpen();
  }

  return (
    <SimpleGrid minChildWidth="300px" mt={{base: 4, sm: 8}} spacing={4}>
      {props.searchResults?.Results.map((page, i) => (
        <Box key={i} rounded="md" px={2} py={1} align="center" w="fit-content"
        >

          <Image src={page.Image} maxH="200px" onClick={() => handleOpen(page)} _hover={{cursor: "pointer"}}/>

          <Text onClick={() => window.open(page.Image, "_blank")}
                color="blue.400"
                fontWeight={600}
                align="left"
                _hover={{cursor: "pointer", textDecoration: "underline"}}
          >
            {page.Title}
          </Text>
          <Text align="left" color="gray.500" fontSize="sm">{page.Source}</Text>
        </Box>
      ))}

      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>{selectedImage?.Title}</ModalHeader>
          <ModalCloseButton/>
          <ModalBody align="center">
            <Image id={selectedImage?.Image} src={selectedImage?.Image} rounded="md" maxHeight="container.sm"/>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => window.open(selectedImage.Image, "_blank")}>View source</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </SimpleGrid>
  )
}