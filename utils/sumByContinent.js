const sumByContinent = (countries) => { 
  const continents = {}; 
  countries.map((country, idx) => {
    if (continents.hasOwnProperty(country.continent)) {
      const continent = continents[country.continent];
      const update = {
        cases: parseInt(country.cases.replace(/,/g, "")) + continent.cases,
        new_cases: parseInt(country.new_cases.replace(/,/g, "")) + continent.new_cases,
        deaths: parseInt(country.deaths.replace(/,/g, "")) + continent.deaths,
        new_deaths: parseInt(country.new_deaths.replace(/,/g, "")) + continent.new_deaths,
        total_recovered: parseInt(country.total_recovered.replace(/,/g, "")) + continent.total_recovered,
        serious_critical: parseInt(country.serious_critical.replace(/,/g, "")) + continent.serious_critical
      };
      continents[country.continent] = update;
    } else {
      const update = {
        cases: parseInt(country.cases.replace(/,/g, "")),
        new_cases: parseInt(country.new_cases.replace(/,/g, "")),
        deaths: parseInt(country.deaths.replace(/,/g, "")),
        new_deaths: parseInt(country.new_deaths.replace(/,/g, "")),
        total_recovered: parseInt(country.total_recovered.replace(/,/g, "")),
        serious_critical: parseInt(country.serious_critical.replace(/,/g, ""))
      };
      
      continents[country.continent] = update;
    }
  }); 

  const output = []; 
  for (let [k, v] of Object.entries(continents)) { 
    output.push({
      name: k,
      ...v
    })
  }
  return output.sort((a, b) =>  a.cases < b.cases ? 1 : -1); 
}

export default sumByContinent;