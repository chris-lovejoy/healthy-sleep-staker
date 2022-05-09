import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from './theme';
import "@fontsource/chivo/400.css";
import "@fontsource/chivo/700.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
        <App />
    </ChakraProvider>
  </React.StrictMode>
);
