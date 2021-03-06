import Link from "next/link";
import useStats from "../utils/useStats";
import stateHash from "../lib/states";

import HeaderBlock from "../components/base/HeaderBlock";
import StateGrid from "../components/base/StateGrid";

import {
  DataCell,
  DeathCell,
  StateCell,
  DeathSpan,
} from "../components/base/DataCell";

import { US_STATES_URL } from "../lib/urls";

// const percentIncrease = country => {
//   return Math.floor((parseInt(country.new_cases.replace(/,/g, "")) / parseInt(country.cases.replace(/,/g, ""))) * 100);
// };

const StateBlock = ({ state }) => {
  return (
    <>
      <StateCell>
        <Link href={`/state/${state.state}`}>{stateHash[state.state]}</Link>
      </StateCell>
      <DataCell>
        {state.positive ? state.positive.toLocaleString() : ""}
      </DataCell>
      <DeathCell>
        {state.death ? (
          <DeathSpan isOn={true}>{state.death.toLocaleString()}</DeathSpan>
        ) : (
          ""
        )}
      </DeathCell>
      <DataCell>
        {state.hospitalized ? state.hospitalized.toLocaleString() : ""}
      </DataCell>
      {/* <DeathCell isOn={isOn(country.new_deaths)}>{country.new_deaths > 0 ? `+${country.new_deaths}` : ""}</DeathCell> */}
      <DataCell>{state.pending ? state.pending.toLocaleString() : ""}</DataCell>
      <DataCell>{state.totalTestResults.toLocaleString()}</DataCell>
    </>
  );
};

const StateHeader = () => {
  return (
    <>
      <HeaderBlock>State</HeaderBlock>
      <HeaderBlock>Positive</HeaderBlock>
      <HeaderBlock>Deaths</HeaderBlock>
      <HeaderBlock>Hospitalized</HeaderBlock>
      <HeaderBlock>Pending Tests</HeaderBlock>
      <HeaderBlock>Total Tested</HeaderBlock>
    </>
  );
};

const StateList = () => {
  const { stats, loading, error } = useStats(US_STATES_URL);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const orderedStates = stats.sort((a, b) =>
    a.positive < b.positive ? 1 : -1
  );
  const getStates = () => {
    return orderedStates.map((state, idx) => (
      <StateBlock key={idx} state={state} />
    ));
  };
  return (
    <StateGrid>
      <StateHeader />
      {getStates()}
    </StateGrid>
  );
};

export default StateList;
