import CountryList from "../components/CountryList";
import Header from "../components/Header";

const BASE_URL = "https://coronavirus-monitor.p.rapidapi.com/coronavirus/";
const COUNTRIES_URL = `${BASE_URL}cases_by_country.php`;

const Countries = () => { 
  return (
    <>
      <Header/>
      <h2>Affected Countries </h2>
      <CountryList url={COUNTRIES_URL}></CountryList>
    </>
  )
}

export default Countries