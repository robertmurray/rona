import useStats from "../utils/useStats";
import Stats from "../components/Stats";
import America from "../components/America";
import Continents from "../components/Continents"; 
import Header from "../components/Header";

const BASE_URL = "https://coronavirus-monitor.p.rapidapi.com/coronavirus/";
const WORLD_URL = `${BASE_URL}worldstat.php`;
const COUNTRIES_URL = `${BASE_URL}cases_by_country.php`;
const US_URL = "https://covidtracking.com/api/us";

export default function IndexPage() {
  return (
    <div>
      <Header />
      <h1>COVID - 19 Dashboard </h1>
      <Stats url={WORLD_URL}> </Stats>
      <h2>Continents</h2>
      <Continents url={COUNTRIES_URL}></Continents>
      <h2>US Cases </h2>
      <America url={US_URL}> </America>
    </div>
  );
}
