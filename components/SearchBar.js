import {Box, Input, InputGroup} from "@chakra-ui/react";
import {useState} from "react";
import {useRouter} from "next/router";

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
    //if(router.pathname === "/results") router.reload();
  }

  return (
    <Box as="form" onSubmit={handleSubmit} {...props}>
      <InputGroup mt={8} maxW="lg" size="lg">
        <Input placeholder="Search..." onChange={e => setQuery(e.target.value)} defaultValue={props.defaultValue} autoFocus mx={{base: 8, md: 0}}/>
      </InputGroup>
    </Box>
  )
}