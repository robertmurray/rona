import styled,{ createGlobalStyle } from 'styled-components';
import useStats from '../utils/useStats';
import Stats from '../components/Stats';
import CountryList from "../components/CountryList"; 

const GlobalStyle = createGlobalStyle`
  html {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }, 
  body { 
    width: 1000px; 
    margin: auto; 
  }
`;

const BASE_URL = "https://coronavirus-monitor.p.rapidapi.com/coronavirus/";
const WORLD_URL = `${BASE_URL}worldstat.php`; 
const COUNTRIES_URL = `${BASE_URL}cases_by_country.php`; 

const Content = styled.div`
  margin: auto; 
  max-width: 80%;
`; 

export default function IndexPage() {
  return (
    <Content>
      <GlobalStyle />
      <h1>COVID-19 Dashboard</h1>
      <Stats url={WORLD_URL}></Stats>
      <h2>Affected Countries</h2>
      <CountryList url={COUNTRIES_URL}></CountryList>
    </Content>
  );
}
