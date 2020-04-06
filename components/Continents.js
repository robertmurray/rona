import styled from "styled-components";
import { useState } from "react";
import useStats, { basicOptions } from "../utils/useStats";

import HeaderBlock from "../components/base/HeaderBlock";
import ContinentGrid from "../components/base/ContinentGrid";
  
import COLORS from "../styles/colors";
import patchedCountries from "../utils/patchCountries";
import matchCountryToContinent from "../utils/matchCountryToContinent";
import sumByContinent from "../utils/sumByContinent"; 
import percentIncrease from "../utils/percentIncrease"; 

import { COUNTRIES_URL } from "../lib/urls"; 


import {
  DataCell,
  IncreaseCell,
  NewCasesCell,
  DeathCell,
  CountryCell,
  DeathSpan,
  PercentSpan,
  DataSpan,
  IncreaseSpan,
} from "../components/base/DataCell";

const countries = patchedCountries();

const ContinentBlock = ({ continent }) => {
  const isOn = newItems => parseInt(newItems) > 0;
  return (
    <>
      <CountryCell>{continent.name}</CountryCell>
      <DataCell>
        <DataSpan isOn={true}>
          {parseInt(continent.new_cases) > 0 ? `+${continent.new_cases.toLocaleString()}` : ""}
        </DataSpan>
        {parseInt(continent.new_cases) > 0 ? (
          <IncreaseSpan isOn={true}>+{percentIncrease(continent.new_cases, continent.cases)}%</IncreaseSpan>
        ) : (
          ""
        )}
        {continent.cases.toLocaleString()}
      </DataCell>
      <DataCell>
        {continent.new_deaths > 0 ? <DeathSpan isOn={true}>+{continent.new_deaths.toLocaleString()}</DeathSpan> : ""}
        {continent.deaths.toLocaleString()}
      </DataCell>
      <DataCell>{continent.total_recovered.toLocaleString()}</DataCell>
      <DataCell>{continent.serious_critical.toLocaleString()}</DataCell>
    </>
  );
};

const ContinentHeader = () => { 
  return (
    <>
      <HeaderBlock>Continent</HeaderBlock>
      <HeaderBlock>Cases</HeaderBlock>
      <HeaderBlock>Deaths</HeaderBlock>
      <HeaderBlock>Recovered</HeaderBlock>
      <HeaderBlock>Serious</HeaderBlock>
    </>
  );
}


const Continents = () => {
  const { stats, loading, error } = useStats(COUNTRIES_URL, basicOptions);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const getContinents = () => {
    return sumByContinent(matchCountryToContinent(stats.countries_stat, countries)).map((continent, idx) => (
      <ContinentBlock key={idx} continent={continent} />
    ));
  };

  return (
    <ContinentGrid>
      <ContinentHeader />
      {getContinents()}
    </ContinentGrid>
  );
};

export default Continents; 