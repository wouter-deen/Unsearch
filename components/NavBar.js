import {Flex, IconButton, Image, useColorMode, useColorModeValue} from "@chakra-ui/react";
import {ImSun} from "react-icons/im";
import {FaHome, FaMoon} from "react-icons/fa";
import {useRouter} from "next/router";

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  return (
    <Flex h="72px" align="center" bgColor={useColorModeValue('gray.50', 'gray.900')}
          borderBottom="1px solid" borderBottomColor={useColorModeValue("gray.200", "gray.700")}
    >
      <Flex justifyContent="space-between" w="full" px={4}>
        <Flex align="center">
          {useColorModeValue(<Image src="/logo.svg" h={8} alt="Logo"/>, <Image src="/logo_white.svg" h={8} alt="Logo"/>)}

          <IconButton aria-label={"color mode"} fontSize="20px" ml={8} icon={<FaHome/>}
                      onClick={() => router.push("/")}
          />

        </Flex>

        <IconButton aria-label={"color mode"} fontSize="20px"
                    icon={useColorModeValue(<FaMoon/>, <ImSun/>)}
                    onClick={toggleColorMode}
        />
      </Flex>
    </Flex>
  )
}