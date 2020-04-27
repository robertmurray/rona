const BASE_URL = "https://coronavirus-monitor.p.rapidapi.com/coronavirus/";
export const WORLD_URL = `${BASE_URL}worldstat.php`;
export const COUNTRIES_URL = `${BASE_URL}cases_by_country.php`;
export const US_URL = "https://covidtracking.com/api/us";
export const US_STATES_URL = "https://covidtracking.com/api/states";
export const US_STATE_URL = (id) =>
  `https://covidtracking.com/api/states?state=${id}`;
export const US_STATE_DAILY_URL = (id) =>
  `https://covidtracking.com/api/states/daily?state=${id}`;

export const NYT_STATES_CSV =
  "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv";
