import styled from "styled-components";
import useStats from "../utils/useStats";
import COLORS from "../styles/colors";

import { StatGrid, StatBlock, DeathBlock, RecoveredBlock } from "../components/base/Stats"; 

import { US_URL } from "../lib/urls"; 
const America = () => {
  const { stats, loading, error } = useStats("/api/america");
  if (loading) return <p> Loading... </p>;
  if (error) return <p> Error... </p>;

  console.log("stats: ", stats);

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
        <h5>Positive:</h5>
        <span>{stats[0].positive.toLocaleString()} </span>
      </StatBlock>
      <RecoveredBlock>
        <h5>Tested:</h5>
        <span>{stats[0].total.toLocaleString()}</span>
      </RecoveredBlock>
      <DeathBlock>
        <h5>Deaths:</h5>
        <span>{stats[0].death.toLocaleString()}</span>
     </DeathBlock>  
    </StatGrid>
  );
};

export default America;
