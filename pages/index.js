import styled,{ createGlobalStyle } from 'styled-components';
import useStats from '../utils/useStats';
import Stats from '../components/Stats';
import CountryList from "../components/CountryList"; 
import America from "../components/America";
import States from "../components/States"; 

const GlobalStyle = createGlobalStyle`
  html {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  }

  body { 
    width: 80%; 
    margin: auto; 
    background-color: #000000; 
    color: #f3f3f3; 
  }
`;

const BASE_URL = "https://coronavirus-monitor.p.rapidapi.com/coronavirus/";
const WORLD_URL = `${BASE_URL}worldstat.php`; 
const COUNTRIES_URL = `${BASE_URL}cases_by_country.php`; 
const US_URL = "https://covidtracking.com/api/us";
const US_STATES_URL = "https://covidtracking.com/api/states";

const Content = styled.div`

`; 

export default function IndexPage() {
  return (
    <Content>
      <GlobalStyle />
      <h1>COVID-19 Dashboard</h1>
      <Stats url={WORLD_URL}></Stats>
      <h2>US Cases</h2>
      <America url={US_URL}></America>
      <h2>US States</h2>
      <States url={US_STATES_URL}></States>
      <h2>Affected Countries</h2>
      <CountryList url={COUNTRIES_URL}></CountryList>
    </Content>
  );
}
