import styled from "styled-components";
import COLORS from "../../styles/colors";

const StateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 0rem;
`;

export const StateDetailVerticalGrid  = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 1rem;
`

export const StateDetailGrid = styled.div`
  display: grid; 
  grid-template-columns: repeat(2, 1fr); 
  grid-gap: 1.5rem; 
`;

export default StateGrid;
