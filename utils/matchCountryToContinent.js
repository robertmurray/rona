const matchCountryToContinent = (countries, countriesByContinents) => {
  return countries.map((country, idx) => {
    const countryByContentinent = countriesByContinents.find(c => c.country === country.country_name);
    country.continent = countryByContentinent ? countryByContentinent.continent : null;
    return country;
  });
};
   
export default matchCountryToContinent; 