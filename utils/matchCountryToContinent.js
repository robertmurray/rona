const matchCountryToContinent = (countries, countriesByContinents) => {
  return countries.map((country, idx) => {
    const countryByContentinent = countriesByContinents.find(c => country.country_name === c.country);
    country.continent = countryByContentinent ? countryByContentinent.continent : null;

    return country;
  });
};
   
export default matchCountryToContinent; 