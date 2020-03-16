import styled from "styled-components";
import useStats from "../utils/useStats";

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
`;
const StatBlock = styled.div`
  background: #141414;
  background: linear-gradient(140deg, rgba(34, 33, 54, 1) 0%, rgba(9, 9, 121, 1) 47%);
  border-radius: 1rem;
  font-size: 1rem;
  padding: 1rem;
  display: grid;
  align-items: center;
  justify-items: center;
  text-align: center;
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
        <h3>Positive:</h3>
        <span>{stats[0].positive}</span>
      </StatBlock>
      <StatBlock>
        <h3>Deaths:</h3>
        <span>{stats[0].death}</span>
      </StatBlock>
      <StatBlock>
        <h3>Tested:</h3>
        <span>{stats[0].total}</span>
      </StatBlock>
    </StatGrid>
  );
};

export default America;
