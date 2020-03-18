import styled from "styled-components";
import useStats, { basicOptions } from "../utils/useStats";
import COLORS from "../styles/colors";

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
`;
const StatBlock = styled.div`
  background: ${COLORS.gray};
  background: linear-gradient(
    140deg,
    ${COLORS.gray} 0%,
    ${COLORS.mediumgray} 65%
  );
  color: ${COLORS.darkteal};
  font-size: 3rem;
  padding: 2rem;
  display: grid;
  align-items: center;
  justify-items: center;
  text-align: center;
`;

const DeathBlock = styled(StatBlock)`
  background-color: ${COLORS.burgundy};
  background-image: linear-gradient(
    135deg,
    ${COLORS.burgundy} 0%,
    ${COLORS.mediumburgundy} 65%
  );
  color: ${COLORS.mediumgray};
`;

const RecoveredBlock = styled(StatBlock)`
  background-color: ${COLORS.mediumteal};
  background-image: linear-gradient(
    135deg,
    ${COLORS.mediumteal} 0%,
    ${COLORS.teal} 65%
  );
  color: ${COLORS.offwhite};
`;

const Stats = ({ url }) => {
  const { stats, loading, error } = useStats(url, basicOptions);
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
