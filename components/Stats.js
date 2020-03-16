import styled from 'styled-components';
import useStats, { basicOptions } from '../utils/useStats';

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
`;
const StatBlock = styled.div`
  background: #141414;
  background: linear-gradient(140deg, rgba(34, 33, 54, 1) 0%, rgba(9, 9, 121, 1) 47%);
  border-radius: 1rem;
  font-size: 2rem;
  padding: 2rem;
  display: grid;
  align-items: center;
  justify-items: center;
  text-align: center;
`;

const Stats = ({ url }) => {
  const { stats, loading, error } = useStats(url, basicOptions);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const getPercentRecovered = () => { 
    return Math.floor(
      (parseInt(stats.total_recovered.replace(/,/g, "")) /
        (parseInt(stats.total_cases.replace(/,/g, "")) - parseInt(stats.total_deaths.replace(/,/g, "")))) *
        100
    );
  }
  return (
    <StatGrid>
      <StatBlock>
        <h3>Confirmed:</h3>
        <span>{stats.total_cases}</span>
        <span style={{ color: "darkgray" }}>+{stats.new_cases}</span>
      </StatBlock>
      <StatBlock>
        <h3>Deaths:</h3>
        <span>{stats.total_deaths}</span>
        <span style={{ color: "red" }}>+{stats.new_deaths}</span>
      </StatBlock>
      <StatBlock>
        <h3>Recovered:</h3>
        <span>{stats.total_recovered}</span>
        <span style={{ color: "green" }}>{getPercentRecovered()}%</span>
      </StatBlock>
    </StatGrid>
  );
}

export default Stats; 
