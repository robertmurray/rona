import countries from "country-json/src/country-by-continent"; 

const patchCountries = () => {
  return [
    ...countries,
    { country: "S. Korea", continent: "Asia" },
    { country: "USA", continent: "North America" },
    { country: "UK", continent: "Europe" },
    { country: "Diamond Princess", continent: "International Conveyance" },
    { country: "Czechia", continent: "Europe" },
    { country: "Russia", continent: "Asia" },
    { country: "UAE", continent: "Asia" },
    { country: "Taiwan", continent: "Asia" },
    { country: "Serbia", continent: "Europe" },
    { country: "Sri Lanka", continent: "Asia" },
    { country: "Kazakhstan", continent: "Asia" },
    { country: "Réunion", continent: "Asia" },
    { country: "Channel Islands", continent: "Europe" },
    { country: "Curaçao", continent: "North America" },
    { country: "DRC", continent: "Africa" },
    { country: "Saint Martin", continent: "North America" },
    { country: "U.S. Virgin Islands", continent: "North America" },
    { country: "CAR", continent: "Africa" },
    { country: "Vatican City", continent: "Europe" },
    { country: "St. Vincent Grenadines", continent: "North America" }
  ];
};


export default patchCountries; 