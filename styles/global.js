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
    font-family: 'Roboto', sans-serif;
  }

  header { 
    padding: 20px 0px;
  }

  nav { 
    display: inline; 
    float: right; 
    margin-top: -35px;
  }

  h1, h2, h3, h4, h5, h6 { 
    font-family: 'Roboto', sans-serif;
    margin: 10px 10px 10px 0px; 
  }

  a:active, a:link, a:hover, a:visited { 
    color: ${COLORS.offwhite}; 
    text-decoration: none; 
    margin-right: 10px;
  }

  a.header-link { 
    border-left: 2px solid ${COLORS.offwhite}; 
    padding-left: 10px;
    padding-right: 10px; 
  }
`;


export default GlobalStyle