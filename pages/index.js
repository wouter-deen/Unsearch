import Head from 'next/head'
import {Box, Text} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import NavBar from "@/components/NavBar";
import Header from "@/components/LandingPage/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  const [showFooter, setShowFooter] = useState(true);
  useEffect(() => {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      setShowFooter(false);
    }
  }, [])

  return (
    <div>
      <Head>
        <title>Unsearch</title>
        <meta name="description" content="A private and secure search engine. Free from Unsea."/>
        <link rel="icon" href="/favicon.png"/>
      </Head>

      <Box align="center" pos="relative" minH="100vh">
        <NavBar/>
        <Header/>

        <SearchBar/>

        <Text mt={2} fontSize="sm" color="gray.400">We only use 🍪 to save your language preference.</Text>

        {showFooter && <Footer pos="absolute"/>}
      </Box>
    </div>
  )
}
