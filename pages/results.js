import Head from 'next/head'
import {
  Box, Flex, Image, SimpleGrid,
  Spinner,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber, Tab, TabList, TabPanel, TabPanels, Tabs,
  Text,
  useColorModeValue,
  VStack
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import {Host} from "@/lib/Host";
import nookies from "nookies";
import {useRouter} from "next/router";
import All from "@/components/SearchTabs/All";
import Images from "@/components/SearchTabs/Images";

export default function Results() {
  const cookies = nookies.get(undefined);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState();
  const [query, setQuery] = useState();
  const [pageNum, setPageNum] = useState(1);
  const [method, setMethod] = useState("Search");

  const changeMethod = async (newMethod) => {
    await router.push({
      pathname: "/results",
      query: {query: query, pageNum: 1, method: newMethod}
    })
  }


  useEffect(() => {
    const query = router.query;
    setSearchResults(null);
    setMethod(query.method)
    setPageNum(query.pageNum);
    setQuery(query.query);
  }, [router.query])

  useEffect(() => {
    if(method && query && pageNum) {
      setLoading(true);
      fetch(`${Host()}/api/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          method: method,
          query: query,
          pageNum: pageNum,
          languageISO: "en-US"
        }),
      }).then((response) => response.json())
        .then(res => {
          console.log(res);
          setSearchResults(res);
          setLoading(false);
        }).catch(e => console.log(e));
    }
  }, [cookies?.searchLanguage, query, method])

  return (
    <div>
      <Head>
        <title>Unsearch</title>
        <meta name="description" content="Unsearch results"/>
        <link rel="icon" href="/favicon.png"/>
      </Head>

      <Box align="left" pos="relative" minH="100vh">
        <NavBar/>
        <Box>
          <SearchBar defaultValue={query} ml={{base: 8, sm: 32}}/>

          <Tabs mt={4}>
            <TabList>
              <Tab ml={{base: 8, sm: 32}} onClick={() => changeMethod("Search")}>All</Tab>
              <Tab onClick={() => changeMethod("Images")}>Images</Tab>
              <Tab onClick={() => changeMethod("Videos")}>Videos</Tab>
              <Tab onClick={() => changeMethod("News")}>News</Tab>
              <Tab onClick={() => changeMethod("Shopping")}>Shopping</Tab>
              <Tab onClick={() => changeMethod("Books")}>Books</Tab>
            </TabList>

            <TabPanels>
              <TabPanel p={0}>
                <All searchResults={searchResults}/>
              </TabPanel>

              <TabPanel>
                <Images searchResults={searchResults}/>
              </TabPanel>

              <TabPanel>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>

          {loading && <Spinner size="lg" mt={4}/>}


        </Box>
        <Footer pos={loading ? "absolute" : "relative"}/>
      </Box>
    </div>
  )
}
