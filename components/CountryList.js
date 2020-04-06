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

import { COUNTRIES_URL } from "../lib/urls"; 

const countries = patchedCountries(); 

const CountryBlock = ({ country }) => { 
  const isOn = (newItems) => parseInt(newItems) > 0; 
  const isDeathRateHigh = () => { 
    return percentIncrease(country.deaths.replace(/,/g, ""), country.cases.replace(/,/g, "")) > 4;
  }

  const isIncreaseHigh = () =>
    percentIncrease(country.new_cases.replace(/,/g, ""), country.cases.replace(/,/g, "")) >= 15;
  
  return (
    <>
      <CountryCell>{country.country_name}</CountryCell>
      <CountryCell>{country.continent}</CountryCell>
      {/* <DataCell>{country.cases.toLocaleString()}</DataCell> */}
      <NewCasesCell isOn={isOn(country.new_cases)}>
        {country.cases.toLocaleString()}
        {parseInt(country.new_cases) > 0 ? `  (+${country.new_cases})` : ""}
      </NewCasesCell>
      {/* <IncreaseCell isOn={isIncreaseHigh()}>
        {parseInt(country.new_cases) > 0
          ? `+${percentIncrease(country.new_cases.replace(/,/g, ""), country.cases.replace(/,/g, ""))}%`
          : ""}
      </IncreaseCell> */}
      <DeathCell isOn={isDeathRateHigh()}>
        {country.deaths.toLocaleString()}
        {" ("}
        {percentIncrease(country.deaths.replace(/,/g, ""), country.cases.replace(/,/g, ""))}
        {"%)"}
      </DeathCell>
      <DeathCell isOn={isOn(country.new_deaths)}>
        {country.new_deaths.replace(/,/g, "") > 0 ? `+${country.new_deaths}` : ""}
      </DeathCell>
      <DataCell>{country.total_recovered.toLocaleString()}</DataCell>
      <DataCell>{country.serious_critical.toLocaleString()}</DataCell>
    </>
  );
}

 const CountryList = ()  => {
   const { stats, loading, error } = useStats(COUNTRIES_URL, basicOptions);
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
      {/* <HeaderBlock>
        Increase
      </HeaderBlock> */}
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
