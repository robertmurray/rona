import styled from "styled-components";
import useStats from "../utils/useStats";
import COLORS from "../styles/colors";

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
`;
const StatBlock = styled.div`
  background: ${COLORS.gray};
  background: linear-gradient(140deg, ${COLORS.gray} 0%, ${COLORS.mediumgray} 65%);
  color: ${COLORS.darkteal};
  font-size: 2rem;
  padding: 1rem;
  display: grid;
  align-items: center;
  justify-items: center;
  text-align: center;
`;

const DeathBlock = styled(StatBlock)`
  background-color: ${COLORS.burgundy};
  background-image: linear-gradient(135deg, ${COLORS.burgundy} 0%, ${COLORS.mediumburgundy} 65%);
  color: ${COLORS.offwhite};
`;

const RecoveredBlock = styled(StatBlock)`
  background-color: ${COLORS.mediumteal};
  background-image: linear-gradient(135deg, ${COLORS.mediumteal} 0%, ${COLORS.teal} 65%);
  color: ${COLORS.mediumgray};
`;

const America = ({ url }) => {
  const { stats, loading, error } = useStats(url);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const getPercentRecovered = () => {
    return Math.floor(
      (parseInt(stats.total_recovered.replace(/,/g, "")) /
        (parseInt(stats.total_cases.replace(/,/g, "")) - parseInt(stats.total_deaths.replace(/,/g, "")))) *
        100
    );
  };
  return (
    <StatGrid>
      <StatBlock>
        <p>Positive:</p>
        <span>{stats[0].positive}</span>
      </StatBlock>
      <DeathBlock>
        <p>Deaths:</p>
        <span>{stats[0].death}</span>
      </DeathBlock>
      <RecoveredBlock>
        <p>Tested:</p>
        <span>{stats[0].total}</span>
      </RecoveredBlock>
    </StatGrid>
  );
};

export default America;
