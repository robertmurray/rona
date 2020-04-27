import useStats, { basicOptions } from "../utils/useStats";

import patchedCountries from "../utils/patchCountries";
import matchCountryToContinent from "../utils/matchCountryToContinent";
import percentIncrease from "../utils/percentIncrease";

import CountryGrid from "../components/base/CountryGrid";
import HeaderBlock from "../components/base/HeaderBlock";
import {
  DataCell,
  CountryCell,
  IncreaseSpan,
  DeathSpan,
  PercentSpan,
} from "../components/base/DataCell";

import { COUNTRIES_URL } from "../lib/urls";

const countries = patchedCountries();

const showNewCases = (country) => {
  return parseInt(country.new_cases) > 0 ? (
    <IncreaseSpan>+{country.new_cases}</IncreaseSpan>
  ) : null;
};

const showDeathPercent = (country) => {
  const isDeathRateHigh = () =>
    percentIncrease(
      country.deaths.replace(/,/g, ""),
      country.cases.replace(/,/g, "")
    ) > 4;
  return (
    <PercentSpan isOn={isDeathRateHigh()}>
      {percentIncrease(
        country.deaths.replace(/,/g, ""),
        country.cases.replace(/,/g, "")
      )}
      %
    </PercentSpan>
  );
};

const CountryBlock = ({ country }) => {
  const isOn = (newItems) => parseInt(newItems) > 0;

  return (
    <>
      <CountryCell>{country.country_name}</CountryCell>
      <CountryCell>{country.continent}</CountryCell>
      <DataCell isOn={isOn(country.new_cases)}>
        {showNewCases(country)}
        {country.cases.toLocaleString()}
      </DataCell>
      <DataCell>
        {showDeathPercent(country)}
        {country.new_deaths.replace(/,/g, "") > 0 ? (
          <DeathSpan isOn={true}>+{country.new_deaths}</DeathSpan>
        ) : (
          ""
        )}
        {country.deaths.toLocaleString()}
      </DataCell>
      <DataCell>{country.total_recovered.toLocaleString()}</DataCell>
      <DataCell>{country.serious_critical.toLocaleString()}</DataCell>
    </>
  );
};

const CountryList = () => {
  const { stats, loading, error } = useStats(COUNTRIES_URL, basicOptions);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const getCountries = () => {
    return matchCountryToContinent(stats.countries_stat, countries)
      .sort((a, b) =>
        parseInt(a.cases.replace(/,/g, "")) <
        parseInt(b.cases.replace(/,/g, ""))
          ? 1
          : -1
      )
      .map((country, idx) => <CountryBlock key={idx} country={country} />);
  };
  return (
    <CountryGrid>
      <HeaderBlock>Country</HeaderBlock>
      <HeaderBlock>Continent</HeaderBlock>
      <HeaderBlock>Cases</HeaderBlock>
      <HeaderBlock>Deaths</HeaderBlock>
      <HeaderBlock>Recovered</HeaderBlock>
      <HeaderBlock>Serious</HeaderBlock>
      {getCountries()}
    </CountryGrid>
  );
};

export default CountryList;
