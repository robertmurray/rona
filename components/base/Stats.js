import styled from "styled-components";
import useStats, { basicOptions } from "../../utils/useStats";
import COLORS from "../../styles/colors";

export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
`;
export const StatBlock = styled.div`
  background: ${COLORS.gray};
  background: linear-gradient(140deg, ${COLORS.gray} 0%, ${COLORS.mediumgray} 65%);
  color: ${COLORS.darkteal};
  font-size: 3rem;
  padding: 2rem;
  display: grid;
  align-items: center;
  justify-items: center;
  text-align: center;
`;

export const DeathBlock = styled(StatBlock)`
  background-color: ${COLORS.burgundy};
  background-image: linear-gradient(135deg, ${COLORS.burgundy} 0%, ${COLORS.mediumburgundy} 65%);
  color: ${COLORS.mediumgray};
`;

export const RecoveredBlock = styled(StatBlock)`
  background-color: ${COLORS.mediumteal};
  background-image: linear-gradient(135deg, ${COLORS.mediumteal} 0%, ${COLORS.teal} 65%);
  color: ${COLORS.offwhite};
`;
