import styled from "styled-components";
import { useState } from "react";
import useStats, { basicOptions } from "../utils/useStats";

import COLORS from "../styles/colors";
import patchedCountries from "../utils/patchCountries"; 
import matchCountryToContinent from "../utils/matchCountryToContinent"; 
import percentIncrease from "../utils/percentIncrease"; 

import CountryGrid from "../components/base/CountryGrid";
import HeaderBlock from "../components/base/HeaderBlock";
import { DataCell, IncreaseCell, NewCasesCell, DeathCell, CountryCell } from "../components/base/DataCell";

const countries = patchedCountries(); 

const CountryBlock = ({ country }) => { 
  const isOn = (newItems) => parseInt(newItems) > 0; 
  return (
    <>
      <CountryCell>{country.country_name}</CountryCell>
      <CountryCell>{country.continent}</CountryCell>
      <DataCell>{country.cases.toLocaleString()}</DataCell>
      <NewCasesCell isOn={isOn(country.new_cases)}>
        {parseInt(country.new_cases) > 0 ? `+${country.new_cases}` : ""}
      </NewCasesCell>
      <IncreaseCell isOn={percentIncrease(country.new_cases.replace(/,/g, ""), country.cases.replace(/,/g, "")) >= 15}>
        {parseInt(country.new_cases) > 0
          ? `+${percentIncrease(country.new_cases.replace(/,/g, ""), country.cases.replace(/,/g, ""))}%`
          : ""}
      </IncreaseCell>
      <DataCell>{country.deaths.toLocaleString()}</DataCell>
      <DeathCell isOn={isOn(country.new_deaths)}>{country.new_deaths.replace(/,/g, "") > 0 ? `+${country.new_deaths}` : ""}</DeathCell>
      <DataCell>{country.total_recovered.toLocaleString()}</DataCell>
      <DataCell>{country.serious_critical.toLocaleString()}</DataCell>
    </>
  );
}

 const CountryList = ({ url })  => {
   const { stats, loading, error } = useStats(url, basicOptions);
   if (loading) return <p>Loading...</p>
   if (error) return <p>Error...</p>;
   
  const getCountries = () => { 
     return matchCountryToContinent(stats.countries_stat, countries)
       .sort((a, b) => (parseInt(a.cases.replace(/,/g, "")) < parseInt(b.cases.replace(/,/g, "")) ? 1 : -1))
       .map((country, idx) => <CountryBlock key={idx} country={country} />); 
  }
  return (
    <CountryGrid>
      <HeaderBlock>
        Country
      </HeaderBlock>
      <HeaderBlock>Continent</HeaderBlock>
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
        Serious
      </HeaderBlock>
      {getCountries()}
    </CountryGrid>
  );
 }

export default CountryList; 
