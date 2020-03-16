import styled from "styled-components";
import useStats, { basicOptions } from "../utils/useStats";

const CountryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-gap: 0.15rem;
`;
const HeaderBlock = styled.div`
  background: #141414;
  font-size: 1.2rem;
  padding: 0.6rem;
  display: grid;
  align-items: center;
  justify-items: center;
  text-align: center;
  font-weight: bold;
`;
const DataCell = styled.div`
  background: #141414;
  padding: 0.5rem;
  display: grid;
  align-items: center;
  justify-items: right;
  text-align: center;
  font-weight: bold;
`;

const CountryCell = styled(DataCell)`
  justify-items: left; 
`

const DeathCell = styled(DataCell)`
  background: ${props => (props.isOn ? "red" : "#141414")};
  color: #f3f3f3;
`;

const NewCasesCell = styled(DataCell)`
  background: ${props => (props.isOn ? "beige" : "#141414")};
  color: #141414;
`;

const IncreaseCell = styled(DataCell)`
  background: ${props => (props.isOn ? "lightpink" : "#141414")};
  color: ${props => (props.isOn ? "#141414" : "#f3f3f3")}
`;

const percentIncrease = (country) => { 
  return Math.floor(
    (parseInt(country.new_cases.replace(/,/g, "")) / parseInt(country.cases.replace(/,/g, ""))) * 100
  );
}

const CountryBlock = ({ country }) => { 
  const isOn = (newItems) => parseInt(newItems) > 0; 
  return (
    <>
      <CountryCell>{country.country_name}</CountryCell>
      <DataCell>{country.cases}</DataCell>
      <NewCasesCell isOn={isOn(country.new_cases)}>
        {parseInt(country.new_cases) > 0 ? `+${country.new_cases}` : ""}
      </NewCasesCell>
      <IncreaseCell isOn={percentIncrease(country) >= 15}>
        {parseInt(country.new_cases) > 0 ? `+${percentIncrease(country)}%` : ""}
      </IncreaseCell>
      <DataCell>{country.deaths}</DataCell>
      <DeathCell isOn={isOn(country.new_deaths)}>{country.new_deaths > 0 ? `+${country.new_deaths}` : ""}</DeathCell>
      <DataCell>{country.total_recovered}</DataCell>
      <DataCell>{country.serious_critical}</DataCell>
    </>
  );
}

 const CountryList = ({ url })  => {
  const { stats, loading, error } = useStats(url, basicOptions);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
   
  const getCountries = () => { 
     return stats.countries_stat.map((country, idx) => <CountryBlock key={ idx } country={ country } /> ); 
  }
  return (
    <CountryGrid>
      <HeaderBlock>
        Country
      </HeaderBlock>
      <HeaderBlock>
        Cases
      </HeaderBlock>
      <HeaderBlock>
        New Cases
      </HeaderBlock>
      <HeaderBlock>
        Increase
      </HeaderBlock>
      <HeaderBlock>
        Deaths
      </HeaderBlock>
      <HeaderBlock>
        New Deaths
      </HeaderBlock>
      <HeaderBlock>
        Recovered
      </HeaderBlock>
      <HeaderBlock>
        Active
      </HeaderBlock>
      {getCountries()}
    </CountryGrid>
  );
 }

export default CountryList; 
