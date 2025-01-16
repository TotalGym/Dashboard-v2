import styled from "styled-components";
import { Bold, LargeFontSize } from "../../styles/general.styles";

export const MembersChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  position: relative;
  width: 400px;
  height: 400px;
  background-color: white;
  border-radius: 1em;
  padding-left: 4.5em;
  p {
    ${LargeFontSize}
    ${Bold}
    position: absolute;
    top: 2em;
    left: 2em;
  }
`;

export const StyledChartContainer = styled.div`
  position: absolute;
  left: 100px;
`;

export const StyledStatesContainer = styled.div`
  position: absolute;
  bottom: 2em;
  margin-top: 2em;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 3em;
  row-gap: 1em;
`;

export const StatsText = styled.span<{ $bgcolor: string }>`
  ${Bold}
  position: relative;
  color: #a6b1c2;

  &::before {
    position: absolute;
    left: -2.5em;
    top: 4.5px;
    margin: auto;
    content: "";
    width: 30px;
    height: 6px;
    background-color: ${({ $bgcolor }) => $bgcolor};
    border-radius: 5px;
  }
`;
