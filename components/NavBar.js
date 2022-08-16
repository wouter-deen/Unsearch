import {
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react";
import {ImSun} from "react-icons/im";
import {FaMoon} from "react-icons/fa";
import {useRouter} from "next/router";
import {TbLanguage} from "react-icons/tb";
import nookies from "nookies";
import {useEffect, useState} from "react";

export default function NavBar() {
  const {toggleColorMode } = useColorMode();
  const router = useRouter();
  const cookies = nookies.get(undefined);
  const [langState, setLangState] = useState();

  const setLanguage = (lang) => {
    nookies.set(undefined, 'lang', lang, { path: '/' });
    setLangState(lang);
    router.reload();
  }

  useEffect(() => {
    if(!cookies.lang) {
      setLanguage("en");
    } else setLangState(cookies.lang)
  }, [cookies.lang, setLanguage])

  return (
    <Flex h="72px" align="center" bgColor={useColorModeValue('gray.50', 'gray.900')}
          borderBottom="1px" borderBottomColor={useColorModeValue("gray.200", "gray.700")}
    >
      <Flex justifyContent="space-between" w="full" px={4} align="center">
        {useColorModeValue(
          <Image src="/logo.svg" h={8} alt="Logo" onClick={() => router.push("/")} _hover={{cursor: "pointer"}}/>,
          <Image src="/logo_white.svg" h={8} alt="Logo" onClick={() => router.push("/")} _hover={{cursor: "pointer"}}/>
        )}

        <Flex align="center" fontFamily="inter">
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<TbLanguage/>}
              fontSize="24px"
              mr={4}
            />
            <MenuList>
              <MenuOptionGroup value={langState} title="Search language">
                <MenuItemOption command='EN' onClick={() => setLanguage("en")} value="en">
                  English
                </MenuItemOption>
                <MenuItemOption command='NL' onClick={() => setLanguage("nl")} value="nl">
                  Nederlands
                </MenuItemOption>
                <MenuItemOption command='DE' onClick={() => setLanguage("de")} value="de">
                  German
                </MenuItemOption>
                <MenuItemOption command='ES' onClick={() => setLanguage("es")} value="es">
                  Spanish
                </MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <IconButton aria-label={"color mode"} fontSize="20px"
                      icon={useColorModeValue(<FaMoon/>, <ImSun/>)}
                      onClick={toggleColorMode}
          />
        </Flex>


      </Flex>
    </Flex>
  )
}