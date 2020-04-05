import styled from "styled-components";
import useStats, { basicOptions } from "../utils/useStats";
import COLORS from "../styles/colors";

import { StatGrid, StatBlock, DeathBlock, RecoveredBlock } from "../components/base/Stats"; 

import { WORLD_URL } from "../lib/urls"; 
const Stats = () => {
  const { stats, loading, error } = useStats(WORLD_URL, basicOptions);
  if (loading) return <p> Loading... </p>;
  if (error) return <p> Error... </p>;

  const getPercentRecovered = () => {
    return Math.floor(
      (parseInt(stats.total_recovered.replace(/,/g, "")) /
        (parseInt(stats.total_cases.replace(/,/g, "")) -
          parseInt(stats.total_deaths.replace(/,/g, "")))) *
        100
    );
  };
  return (
    <StatGrid>
      <StatBlock>
        <h6> Cases: </h6> <span> {stats.total_cases} </span>
        <span
          style={{
            color: `${COLORS.teal}`
          }}
        >
          +{stats.new_cases}
        </span>
      </StatBlock>
      <RecoveredBlock>
        <h6> Recovered: </h6> <span> {stats.total_recovered} </span>
        <span
          style={{
            color: "green"
          }}
        >
          {getPercentRecovered()} %
        </span>
      </RecoveredBlock>
      <DeathBlock>
        <h6> Deaths: </h6> <span> {stats.total_deaths} </span>
        <span
          style={{
            color: `${COLORS.pink}`
          }}
        >
          +{stats.new_deaths}
        </span>
      </DeathBlock>
    </StatGrid>
  );
};

export default Stats;
