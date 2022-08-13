import Head from 'next/head'
import {Box, Text} from "@chakra-ui/react";
import React from "react";
import NavBar from "@/components/NavBar";
import Header from "@/components/LandingPage/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Unsearch</title>
        <meta name="description" content="Unsearch"/>
        <link rel="icon" href="/favicon.png"/>
      </Head>

      <Box align="center" pos="relative" minH="100vh">
        <NavBar/>
        <Header/>

        <SearchBar/>

        <Text mt={2} fontSize="sm" color="gray.400">We only use 🍪 to save your language preference.</Text>

        <Footer pos="absolute"/>
      </Box>
    </div>
  )
}
