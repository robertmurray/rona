import States from "../components/States";
import Header from "../components/Header";

const US_STATES_URL = "https://covidtracking.com/api/states";
const USStates = () => { 
  return (
    <>
      <Header/>
      <h2> US States </h2>
      <States url={US_STATES_URL}> </States>
    </>
  )
}

export default USStates; 