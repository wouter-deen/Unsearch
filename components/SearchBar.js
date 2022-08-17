import {Box, IconButton, Input, InputGroup, InputRightElement} from "@chakra-ui/react";
import {useState} from "react";
import {useRouter} from "next/router";
import {FaSearch} from "react-icons/fa";

export default function SearchBar(props) {
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
      query: {q: query, pageNum: 1, method: method()}
    })

    //remove focus from search bar when submitting
    if (document.activeElement instanceof HTMLElement)
      document.activeElement.blur();
  }

  return (
    <Box as="form" onSubmit={handleSubmit} {...props} px={{base: 4, md: 0}}>
      <InputGroup mt={4} maxW="lg" size="lg">
        <InputRightElement>
          <IconButton icon={<FaSearch/>} variant="ghost" onClick={handleSubmit} aria-label="submit"/>
        </InputRightElement>
        <Input placeholder="Search..." autoCapitalize="none" onChange={e => setQuery(e.target.value)}
               defaultValue={props.defaultValue} autoFocus
        />
      </InputGroup>
    </Box>
  )
}