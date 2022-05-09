import { extendTheme } from "@chakra-ui/react";

const config = {
    initialColorMode: "light",
    useSystemColorMode: false,
}

const theme = extendTheme({ 
    config,
    fonts: {
        heading: "Chivo",
        body: "Chivo"
    }
});

export default theme;