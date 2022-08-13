import { extendTheme } from "@chakra-ui/react"

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
  fonts: {
    heading: 'Poppins, sans-serif',
    body: 'Inter, sans-serif',
  },
  colors: {
    brand: {
      100: "#f7fafc",
      // ...
      900: "#1a202c",
    },
  },
}

const theme = extendTheme({ config })

export default theme