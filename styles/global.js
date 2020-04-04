import { createGlobalStyle } from "styled-components";
import COLORS from "./colors";

const GlobalStyle = createGlobalStyle`
  html {
    font-family: 'Roboto', sans-serif;

  }

  body { 
    width: 80%; 
    margin: auto; 
    background: no-repeat center center fixed; 
    background-color: ${COLORS.darkteal};
    background-image: linear-gradient(135deg, ${COLORS.darkteal} 0%, ${COLORS.mediumteal} 72%);
    background-size: cover; 
    color: ${COLORS.offwhite}; 
    padding-bottom: 40px; 
  }

  header { 
    padding: 20px 0px;
  }

  h1, h1, h3 { 
    font-family: 'Roboto';
  }

  a:active, a:link, a:hover, a:visited { 
    color: ${COLORS.offwhite}; 
    text-decoration: none; 
    margin-right: 10px;
  }
`;


export default GlobalStyle