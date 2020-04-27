import useStats from "../utils/useStats";
import stateHash from "../lib/states";

import { StateDetailGrid } from "../components/base/StateGrid";
import StateDeathComposed from "../components/charts/StateDeathComposed";
import StateTotals from "../components/charts/StateTotals";
import StatePositiveComposed from "../components/charts/StatePositiveComposed";
import StateTotalsPie from "../components/charts/StateTotalsPie";

import { US_STATE_DAILY_URL } from "../lib/urls";

const addThreeDayAverages = (data) => {
  // let outputData = [];
  for (let i = 0; i < data.length; i++) {
    // three day average for deaths
    let day0DeathIncrease =
      data[i - 1] !== undefined
        ? data[i - 1].deathIncrease !== (null || undefined)
          ? data[i - 1].deathIncrease
          : 0
        : 0;

    let day1DeathIncrease =
      data[i].deathIncrease !== null ? data[i].deathIncrease : 0;
    let day2DeathIncrease =
      data[i + 1] !== undefined
        ? data[i + 1].deathIncrease !== (null || undefined)
          ? data[i + 1].deathIncrease
          : data[i].deathIncrease
        : data[i].deathIncrease; // if we are on the last day, use the last day's numbers for the last 2 data points in the average
    data[i].deathThreeDayAverage = Math.floor(
      (day0DeathIncrease + day1DeathIncrease + day2DeathIncrease) / 3
    );

    // three day average for deaths
    let day0CasesIncrease =
      data[i - 1] !== undefined
        ? data[i - 1].positiveIncrease !== (null || undefined)
          ? data[i - 1].positiveIncrease
          : 0
        : 0;

    let day1CasesIncrease =
      data[i].positiveIncrease !== null ? data[i].positiveIncrease : 0;
    let day2CasesIncrease =
      data[i + 1] !== undefined
        ? data[i + 1].positiveIncrease !== (null || undefined)
          ? data[i + 1].positiveIncrease
          : data[i].positiveIncrease
        : data[i].positiveIncrease; // if we are on the last day, use the last day's numbers for the last 2 data points in the average
    data[i].casesThreeDayAverage = Math.floor(
      (day0CasesIncrease + day1CasesIncrease + day2CasesIncrease) / 3
    );
  }
  return data;
};

const StateDetail = ({ id }) => {
  const { stats, loading, error } = useStats(US_STATE_DAILY_URL(id));
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const latestData = stats[0];
  const sortedData = addThreeDayAverages(
    stats.sort((a, b) => (a.date > b.date ? 1 : -1))
  );

  return (
    <>
      <h2>State of {stateHash[id]}</h2>
      <StateDetailGrid>
        <>
          <StateTotalsPie data={latestData} />
        </>
        <div>
          <StateTotals data={sortedData} />
          <h3>New Cases</h3>
          <StatePositiveComposed data={sortedData} />
          <h3>New Deaths</h3>
          <StateDeathComposed data={sortedData} />
        </div>
      </StateDetailGrid>
    </>
  );
};

export default StateDetail;
