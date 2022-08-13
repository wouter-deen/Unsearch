import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {useState} from "react";
import {useRouter} from "next/router";

export default function SearchBar(props) {
  const [language, setLanguage] = useState({iso: "en-US", readable: "EN"});
  const [query, setQuery] = useState("");
  const router = useRouter();

  const method = () => {
    if(router.query.method) {
      return router.query.method;
    } else return "Search";
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    await router.push({
      pathname: "/results",
      query: {query: query, pageNum: 1, method: method()}
    })
    //if(router.pathname === "/results") router.reload();
  }

  return (
    <Box as="form" onSubmit={handleSubmit} {...props}>
      <InputGroup mt={8} maxW="lg" size="lg">
        <Input placeholder="Search..." onChange={e => setQuery(e.target.value)} defaultValue={props.defaultValue} autoFocus/>
        <InputRightElement width='5.5rem'>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} h='1.75rem' size='sm'>
              {language.readable}
            </MenuButton>
            <MenuList fontSize="md">
              <MenuItem>English (US)</MenuItem>
              <MenuItem>Nederlands</MenuItem>
            </MenuList>
          </Menu>
        </InputRightElement>
      </InputGroup>
    </Box>
  )
}