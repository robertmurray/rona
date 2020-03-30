import countries from "country-json/src/country-by-continent"; 

const patchCountries = () => {
  return [
    { country: "Kazakhstan", continent: "Asia" },
    ...countries,
    { country: "S. Korea", continent: "Asia" },
    { country: "USA", continent: "North America" },
    { country: "UK", continent: "Europe" },
    { country: "Diamond Princess", continent: "Intl Conveyance" },
    { country: "Czechia", continent: "Europe" },
    { country: "Russia", continent: "Asia" },
    { country: "UAE", continent: "Asia" },
    { country: "Taiwan", continent: "Asia" },
    { country: "Serbia", continent: "Europe" },
    { country: "Sri Lanka", continent: "Asia" },
    { country: "Réunion", continent: "Asia" },
    { country: "Channel Islands", continent: "Europe" },
    { country: "Curaçao", continent: "North America" },
    { country: "DRC", continent: "Africa" },
    { country: "Saint Martin", continent: "North America" },
    { country: "U.S. Virgin Islands", continent: "North America" },
    { country: "CAR", continent: "Africa" },
    { country: "Vatican City", continent: "Europe" },
    { country: "St. Vincent Grenadines", continent: "North America" },
    { country: "Faeroe Islands", continent: "South America" },
    { country: "Eswatini", continent: "Africa" },
    { country: "St. Barth", continent: "North America" },
    { country: "Montenegro", continent: "Europe" }, 
    { country: "Sint Maarten", continent: "North America" }, 
    { country: "Fiji", continent: "Asia" },
    { country: "Isle of Man", continent: "Europe" }, 
    { country: "Cabo Verde", continent: "Africa" }, 
    { country: "Timor-Leste", continent: "Asia" }, 
    { country: "Turks and Caicos", continent: "North America" },
    { country: "Libya", continent: "Africa" },
    { country: "British Virgin Islands", continent: "North America" },
    { country: "MS Zaandam", continent: "Intl Conveyance"}
  ];
};


export default patchCountries; 