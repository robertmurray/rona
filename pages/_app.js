import GlobalStyle from "../styles/global";
import GoogleFontLoader from "react-google-font-loader";
import fetch from "node-fetch";

const loadGoogleFontLoader = () => { 
  return typeof window !== "undefined" ? (
    <GoogleFontLoader
      fonts={[
        {
          font: "Roboto",
          weights: [400, "400i"],
        },
        {
          font: "Roboto Mono",
          weights: [400, 700],
        },
      ]}
      subsets={["cyrillic-ext", "greek"]}
    />
  ) : null 
}

const App = ({ Component, pageProps }) => {

  return (
    <>
      {loadGoogleFontLoader ()}
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default App; 
