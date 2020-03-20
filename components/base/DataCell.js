import styled from "styled-components";
import COLORS from "../../styles/colors";

export const DataCell = styled.div`
  background: ${COLORS.darkteal};
  color: ${COLORS.mediumgray};
  padding: 0.5rem;
  display: grid;
  align-items: center;
  justify-items: right;
  text-align: center;
  font-weight: bold;
`;

export const CountryCell = styled(DataCell)`
  justify-items: left;
`;

export const DeathCell = styled(DataCell)`
  background: ${props => (props.isOn ? COLORS.pink : COLORS.darkteal)};
  color: ${COLORS.offwhite};
`;

export const NewCasesCell = styled(DataCell)`
  background: ${props => (props.isOn ? COLORS.mediumgray : COLORS.darkteal)};
  color: ${COLORS.darkteal};
`;

export const IncreaseCell = styled(DataCell)`
  background: ${props => (props.isOn ? COLORS.burgundy : COLORS.darkteal)};
  color: ${COLORS.mediumgray};
`;
