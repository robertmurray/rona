import styled from "styled-components";
import useStats, { basicOptions } from "../utils/useStats";
import stateHash from "../lib/states";
import COLORS from "../styles/colors";

const StateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 0.15rem;
`;
const HeaderBlock = styled.div`
  background: ${COLORS.darkteal};
  color: ${COLORS.offwhite};
  font-size: 1.2rem;
  padding: 0.6rem;
  display: grid;
  align-items: center;
  justify-items: center;
  text-align: center;
  font-weight: bold;
`;
const DataCell = styled.div`
  background: ${COLORS.darkteal};
  color: ${COLORS.mediumgray};
  padding: 0.5rem;
  display: grid;
  align-items: center;
  justify-items: right;
  text-align: center;
  font-weight: bold;
`;

const StateCell = styled(DataCell)`
  justify-items: left;
`;


const DeathCell = styled(DataCell)`
  background: ${props => (props.isOn ? COLORS.pink : COLORS.darkteal)};
  color: ${COLORS.offwhite};
`;

const NewCasesCell = styled(DataCell)`
  background: ${props => (props.isOn ? COLORS.mediumgray : COLORS.darkteal)};
  color: ${COLORS.darkteal};
`;

const IncreaseCell = styled(DataCell)`
  background: ${props => (props.isOn ? COLORS.burgundy : COLORS.darkteal)};
  color: ${COLORS.mediumgray};
`;

// const percentIncrease = country => {
//   return Math.floor((parseInt(country.new_cases.replace(/,/g, "")) / parseInt(country.cases.replace(/,/g, ""))) * 100);
// };

const StateBlock = ({ state }) => {
  const isOn = newItems => parseInt(newItems) > 0;
  return (
    <>
      <StateCell>{stateHash[state.state]}</StateCell>
      <DataCell>{state.positive ? state.positive.toLocaleString() : ""}</DataCell>
      {/* <NewCasesCell isOn={isOn(country.new_cases)}>
        {parseInt(country.new_cases) > 0 ? `+${country.new_cases}` : ""}
      </NewCasesCell> */}
      {/* <IncreaseCell isOn={percentIncrease(country) >= 15}>
        {parseInt(country.new_cases) > 0 ? `+${percentIncrease(country)}%` : ""}
      </IncreaseCell> */}
      <DeathCell>{state.death ? state.death.toLocaleString() : ""}</DeathCell>
      <DataCell>{state.hospitalized ? state.hospitalized.toLocaleString() : ""}</DataCell>
      {/* <DeathCell isOn={isOn(country.new_deaths)}>{country.new_deaths > 0 ? `+${country.new_deaths}` : ""}</DeathCell> */}
      <DataCell>{state.pending ? state.pending.toLocaleString() : ""}</DataCell>
      <DataCell>{state.totalTestResults.toLocaleString()}</DataCell>
    </>
  );
};

const StateList = ({ url }) => {
  const { stats, loading, error } = useStats(url);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const orderedStates = stats.sort((a, b) =>  a.positive < b.positive ? 1 : -1)
  const getStates = () => {
    return orderedStates.map((state, idx) => <StateBlock key={idx} state={state} />);
  };
  return (
    <StateGrid>
      <HeaderBlock>State</HeaderBlock>
      <HeaderBlock>Positive</HeaderBlock>
      <HeaderBlock>Deaths</HeaderBlock>
      <HeaderBlock>Hospitalized</HeaderBlock>
      <HeaderBlock>Pending Tests</HeaderBlock>
      <HeaderBlock>Total Tested</HeaderBlock>
      {getStates()}
    </StateGrid>
  );
};

export default StateList;
