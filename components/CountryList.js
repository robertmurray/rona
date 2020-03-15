import styled from "styled-components";
import useStats from "../utils/useStats";

const CountryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 0.15rem;
`;
const HeaderBlock = styled.div`
  background: #f2f2f2;
  font-size: 1rem;
  padding: 0.1rem;
  display: grid;
  align-items: center;
  justify-items: center;
  text-align: center;
`;
const DataCell = styled.div`
  background: #f3f3f3; 
  padding: 0.5rem; 
  display: grid; 
  align-items: center; 
  justify-items: center; 
  text-align: center; 
`;

const DeathCell = styled(DataCell)`
  background: ${props => props.isOn ? "red" : '#f2f2f2'}; 
  color: #f3f3f3; 
`;

const NewCasesCell = styled(DataCell)`
  background: ${props => props.isOn ? "beige" : '#f2f2f2'}; 
`;

const percentIncrease = (country) => { 
  return `(${Math.floor(
    (parseInt(country.new_cases.replace(/,/g, "")) / parseInt(country.cases.replace(/,/g, ""))) * 100
  )}%)`;
}

const CountryBlock = ({ country }) => { 
  return (
    <>
      <DataCell>{country.country_name}</DataCell>
      <DataCell>{country.cases}</DataCell>
      <NewCasesCell isOn={parseInt(country.new_cases) > 0 }>
        {parseInt(country.new_cases) > 0 ? `+${country.new_cases} ${percentIncrease(country)}` : ""}
      </NewCasesCell>
      <DataCell>{country.deaths}</DataCell>
      <DeathCell isOn={parseInt(country.new_deaths) > 0}>{country.new_deaths > 0 ? `+${country.new_deaths}` : ""}</DeathCell>
      <DataCell>{country.total_recovered}</DataCell>
      <DataCell>
        {country.serious_critical} / {country.region}
      </DataCell>
    </>
  );
}

 const CountryList = ({ url })  => {
  const { stats, loading, error } = useStats(url);
  console.log(stats, loading, error);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
   
   const getCountries = () => { 
     return stats.countries_stat.map((country, idx) => <CountryBlock key={ idx } country={ country } /> ); 
  }
  return (
    <CountryGrid>
      <HeaderBlock>
        <h5>Country</h5>
      </HeaderBlock>
      <HeaderBlock>
        <h5>Cases</h5>
      </HeaderBlock>
            <HeaderBlock>
        <h5>New Cases</h5>
      </HeaderBlock>
      <HeaderBlock>
        <h5>Deaths</h5>
      </HeaderBlock>
            <HeaderBlock>
        <h5>New Deaths</h5>
      </HeaderBlock>
      <HeaderBlock>
        <h5>Recovered</h5>
      </HeaderBlock>
      <HeaderBlock>
        <h5>Active / Serious</h5>
      </HeaderBlock>
      {getCountries()}
    </CountryGrid>
  );
 }

export default CountryList; 
