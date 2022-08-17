import Head from 'next/head'
import {
  Box,
  Flex,
  Icon,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue
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
import {FaExclamationTriangle, FaLock} from "react-icons/fa";
import News from "@/components/SearchTabs/News";

export default function Results() {
  const cookies = nookies.get(undefined);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState();
  const [imageResults, setImageResults] = useState([]);
  const [newsResults, setNewsResults] = useState([]);
  const [wikiResults, setWikiResults] = React.useState();

  const [query, setQuery] = useState();
  const [pageNum, setPageNum] = useState(1);
  const [method, setMethod] = useState("Search");
  const [tabIndex, setTabIndex] = React.useState(0);

  const [langState, setLangState] = useState();

  useEffect(() => {
    if(!cookies.lang) {
      setLangState("en");
    } else setLangState(cookies.lang)
  }, [cookies.lang])

  useEffect(() => {
    const query = router.query;
    if(query.method === "Images") setTabIndex(1);
    if(query.method === "News") setTabIndex(2);
  }, [router.query])

  const changeMethod = async (newMethod) => {
    await router.push({
      pathname: "/results",
      query: {q: query, pageNum: 1, method: newMethod}
    })
    if(newMethod === "Search") setTabIndex(0);
    if(newMethod === "Images") setTabIndex(1);
    if(newMethod === "News") setTabIndex(2);
  }

  useEffect(() => {
    const query = router.query;
    if(query.method) {
      setMethod(query.method)
    } else setMethod("Search")
    if(query.pageNum) setPageNum(query.pageNum);
    setQuery(query.q);
  }, [router.query])

  function GoogleSearch(start) {
    const searchType = method === "Images" ? "&searchType=image" : "";
    fetch(`https://www.googleapis.com/customsearch/v1?key=${process.env.NEXT_PUBLIC_GOOGLE_SEARCH_API_KEY}&cx=${process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CX}&q=${query}${searchType}&start=${start}&lr=lang_${langState}`, {
      method: "GET"
    }).then((response) => response.json())
      .then(res => {
        if(method === "Images") {
          setImageResults(oldArray => [...oldArray, ...res.items]);
        } else setSearchResults(res);
        setLoading(false);
      })
  }

  function WikiSearch() {
    fetch(`https://${langState}.wikipedia.org/w/api.php?origin=*&format=json&action=query&list=search&srlimit=1&srsearch=${query}&srqiprofile=mlr-1024rs`)
      .then((listResponse) => {
        return listResponse.json();
      })
      .then(function(listResponse) {
        console.log(listResponse)
        setWikiResults(null);
        const searchResults = listResponse.query.search;
        const pageID = searchResults[0]?.pageid;
        if(pageID) {
          fetch(`https://${langState}.wikipedia.org/w/api.php?format=json&action=query&prop=extracts|pageimages|categories|info|pageprops&ppprop=disambiguation&exintro&exsentences=3&explaintext&pithumbsize=500&redirects=1&inprop=url&cllimit=1&origin=*&pageids=${pageID}`)
            .then((res) => {
              return res.json();
            })
            .then(function(res) {
              console.log(res)
              if(!res.query.pages[pageID]?.extract.toLowerCase().includes(query.toLowerCase().split(" ")[0])) return;
              const category = res.query?.pages[pageID].categories[0].title;
              if(category.includes("Wikipedia:")) return;
              if(category.includes("disambiguation")) return;
              const pageid = res.query.pages && Object.keys(res.query.pages)[0];
              const page = res.query.pages[pageid];
              setWikiResults(page);
            })
            .catch(function(error){console.log(error)});
        }
      })
      .catch(function(error){console.log(error);});
  }

  useEffect(() => {
    if(method && query && pageNum) {
      setLoading(true);

      if(method === "Images") {
        setImageResults([])
        GoogleSearch(31)
        GoogleSearch(21)
        GoogleSearch(11)
        GoogleSearch(1)
      } else if(method === "Search" || !method) {
        GoogleSearch(1);
        WikiSearch();
      } else if(method === "News") {
        console.log("Searching News...")
        fetch(`${Host()}/api/search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            method: method,
            query: query,
            pageNum: pageNum,
            languageISO: langState
          }),
        }).then((response) => response.json())
          .then(res => {
            console.log(res)
            if(method === "News") setNewsResults(res);
            setLoading(false);
        }).catch(e => console.log(e));
      }
    }
  }, [query, method])

  const Anonymized = ({engine}) => (
    <Flex mx={{base: 4, md: 16}} mt={3} align="center">
      <Icon as={FaLock} mr={2} color="#48BB78"/>
      <Text color={useColorModeValue("gray.500", "gray.400")}>Anonymized search results from {engine}</Text>
    </Flex>
  )

  return (
    <div>
      <Head>
        <title>Unsearch</title>
        <meta name="description" content={`Results for ${query}`}/>
        <link rel="icon" href="/favicon.png"/>
      </Head>

      <Box align="left" pos="relative" minH="100vh">
        <NavBar/>
        <Box>
          <SearchBar defaultValue={query} mx={{base: 0, md: 16}}/>

          <Tabs mt={4} isLazy index={tabIndex}>
            <TabList>
              <Tab ml={{base: 4, md: 16}} onClick={() => changeMethod("Search")}>All</Tab>
              <Tab onClick={() => changeMethod("Images")}>Images</Tab>
              <Tab onClick={() => changeMethod("News")}>News</Tab>
            </TabList>

            <TabPanels>
              <TabPanel p={0}>
                <Anonymized engine="Google"/>
                {loading && <Spinner size="lg" mt={4} ml={{base: 8, md: 16}}/>}
                <All searchResults={searchResults} wikiResults={wikiResults}/>
              </TabPanel>

              <TabPanel p={0}>
                <Anonymized engine="Google"/>
                {loading && <Spinner size="lg" mt={4} ml={{base: 8, md: 16}}/>}
                <Images imageResults={imageResults}/>
              </TabPanel>

              <TabPanel p={0}>
                <Anonymized engine="Google and Yahoo"/>
                {langState !== "en" && langState !== "nl" &&
                  <Flex mx={{base: 8, md: 16}} mt={3} align="center">
                    <Icon as={FaExclamationTriangle} mr={2} color="orange.400"/>
                    <Text>Your language is currently not yet fully supported for Unsea News.</Text>
                  </Flex>
                }
                {loading && <Spinner size="lg" mt={4} ml={{base: 8, md: 16}}/>}
                <News newsResults={newsResults}/>
              </TabPanel>
            </TabPanels>
          </Tabs>

        </Box>
        <Footer pos={loading ? "absolute" : "relative"}/>
      </Box>
    </div>
  )
}
