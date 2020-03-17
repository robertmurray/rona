import GlobalStyle from "../styles/global";
import useStats from "../utils/useStats";
import Stats from "../components/Stats";
import CountryList from "../components/CountryList";
import America from "../components/America";
import States from "../components/States";

const BASE_URL = "https://coronavirus-monitor.p.rapidapi.com/coronavirus/";
const WORLD_URL = `${BASE_URL}worldstat.php`;
const COUNTRIES_URL = `${BASE_URL}cases_by_country.php`;
const US_URL = "https://covidtracking.com/api/us";
const US_STATES_URL = "https://covidtracking.com/api/states";

export default function IndexPage() {
  return (
    <div>
      <GlobalStyle />
      <h1> COVID - 19 Dashboard </h1>
      <Stats url={WORLD_URL}> </Stats>
      <h2> US Cases </h2>
      <America url={US_URL}> </America>
      <h2> US States </h2>
      <States url={US_STATES_URL}> </States>
      <h2> Affected Countries </h2>
      <CountryList url={COUNTRIES_URL}></CountryList>
    </div>
  );
}
