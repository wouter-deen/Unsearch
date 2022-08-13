import React from "react";
import {
  Box,
  ButtonGroup,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Link,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import {FaGithub, FaInstagram, FaLinkedin, FaRegCopyright} from "react-icons/fa";
import {useRouter} from "next/router";

const FooterHeading = (props) => (
  <Heading
    as="h4"
    color={useColorModeValue('gray.600', 'gray.400')}
    fontSize="sm"
    fontWeight="semibold"
    textTransform="uppercase"
    letterSpacing="wider"
    {...props}
  />
)

const LinkGrid = (props) => {
  const router = useRouter();
  return (
    <SimpleGrid columns={3} {...props}>
      <Box minW="130px">
        <FooterHeading mb="4">about</FooterHeading>
        <Stack>
          <Link onClick={() => window?.open("www.unsea.nl/projecten", "_blank")}>Projects</Link>
          <Link onClick={() => window?.open("www.unsea.nl/over", "_blank")}>About Unsea</Link>
        </Stack>
      </Box>
      <Box minW="130px">
        <FooterHeading mb="4">Contact</FooterHeading>
        <Stack>
          <Link onClick={() => window?.open("www.unsea.nl/contact", "_blank")}>Contact page</Link>
          <Link href="mailto:hello@unsea.nl">Send email</Link>
        </Stack>
      </Box>
    </SimpleGrid>
  )
}

const SocialMediaLinks = (props) => (
  <ButtonGroup variant="ghost" {...props}>
    <IconButton as="a" href="https://www.polywork.com/wouterdeen" target="_blank" aria-label="LinkedIn" icon={<Image src="/polywork.svg" boxSize="20px" alt="Polywork"/>}/>
    <IconButton as="a" href="https://www.linkedin.com/in/wouter-deen/" target="_blank" aria-label="LinkedIn" icon={<FaLinkedin fontSize="20px" />}/>
    <IconButton as="a" href="https://github.com/wouter-deen" target="_blank" aria-label="GitHub" icon={<FaGithub fontSize="20px" />} />
    <IconButton as="a" href="https://www.instagram.com/wouterdeen" target="_blank" aria-label="Instagram" icon={<FaInstagram fontSize="20px" />} />
  </ButtonGroup>
)


export default function Footer(props) {
  return (
    <Flex w="full" pos={props.pos} bottom="0" mt={{base: 8, sm: 16}} bg={useColorModeValue("gray.50", "gray.900")}>
      <Box as="footer" role="contentinfo" mx="auto" w="full" maxW="container.xl" py="12" align="left">
        <Stack spacing="10" divider={<StackDivider />}>
          <Stack direction={{ base: 'column', lg: 'row' }} spacing={{ base: '10', lg: '28' }}>
            <Box flex="1">
              {useColorModeValue(<Image src="/logo.svg" h={8} alt="Logo"/>, <Image src="/logo_white.svg" h={8} alt="Logo"/>)}
            </Box>
            <LinkGrid spacing={{ base: '10', md: '20', lg: '28' }} flex="3" />
          </Stack>
          <Stack
            direction={{ base: 'column-reverse', md: 'row' }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Text><Icon as={FaRegCopyright} boxSize={4} mb={-.5}/> {new Date().getFullYear()} Unsea Cloud Software • All rights reserved.</Text>
            <SocialMediaLinks/>
          </Stack>
        </Stack>
      </Box>
    </Flex>
  )
}