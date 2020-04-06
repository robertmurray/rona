import styled from "styled-components";
import COLORS from "../../styles/colors";

export const DataCell = styled.div`
  background: ${COLORS.darkteal};
  color: ${COLORS.mediumgray};
  padding: 0.8rem;
  display: grid;
  align-items: center;
  justify-items: right;
  text-align: right;
  font-weight: bold;
  border-bottom: 1px solid ${COLORS.mediumgray};
  display: inline; 
`;

export const CountryCell = styled(DataCell)`
  justify-items: left;
  text-align: left; 
`;

export const DeathCell = styled(DataCell)`
  background: ${props => (props.isOn ? COLORS.pink : COLORS.darkteal)};
  color: ${COLORS.offwhite};
`;

export const NewCasesCell = styled(DataCell)`
  background: ${props => (props.isOn ? COLORS.mediumgray : COLORS.darkteal)};
  color: ${props => (props.isOn ? COLORS.darkteal : COLORS.mediumgray)};
`;

export const IncreaseCell = styled(DataCell)`
  background: ${props => (props.isOn ? COLORS.burgundy : COLORS.darkteal)};
  color: ${COLORS.mediumgray};
`;


export const StateCell = styled(DataCell)`
  justify-items: left;
  text-align: left; 
`;

export const DataSpan = styled.span`
  border-radius: 15px; 
  margin: 0px 5px; 
  padding: 7px; 
`;

export const DeathSpan = styled(DataSpan)`
  background: ${(props) => (props.isOn ? COLORS.pink : COLORS.darkteal)};
  color: ${COLORS.offwhite};
`;

export const PercentSpan = styled(DataSpan)`
  background: ${(props) => (props.isOn ? COLORS.burgundy : COLORS.darkteal)};
  color: ${COLORS.offwhite};
`;

export const IncreaseSpan = styled(DataSpan)`
  color: ${COLORS.mediumteal};
  background: ${COLORS.gray};
`;