import { createGlobalStyle } from "styled-components";
import COLORS from "./colors";

const GlobalStyle = createGlobalStyle`
  html {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  }

  body { 
    width: 80%; 
    margin: auto; 
    background-color: background-color: ${COLORS.darkteal};
    background-image: linear-gradient(135deg, ${COLORS.darkteal} 0%, ${COLORS.mediumteal} 72%);
    color: ${COLORS.offwhite}; 
    padding-bottom: 40px; 
  }
`;


export default GlobalStyle