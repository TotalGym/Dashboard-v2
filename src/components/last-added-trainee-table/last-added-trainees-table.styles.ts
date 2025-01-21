import styled from "styled-components";
import {
  Bold,
  CenteredFlexContainer,
  MediumFontSize,
} from "../../styles/general.styles";

export const LastAddedTraineesTableContainer = styled.div`
  width: 1100px;
  height: 580px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  padding: 2em;
  border-radius: 1em;
`;

export const StyledTableHeader = styled.h3`
  ${Bold}
  margin-bottom: 6px;
`;

export const StyledLastAddedTableHead = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 0.5fr 1.1fr 1.1fr 1fr 1fr 0.5fr;
  cursor: pointer;
  padding: 1em;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: gray;
    opacity: 0.5;
    bottom: 0;
  }
`;

export const StyledLastAddedTH = styled.span`
  ${Bold}
  color: #cbd1d9;
`;

export const StyledLastAddedRow = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 0.5fr 1.1fr 1.1fr 1fr 1fr 0.5fr;

  cursor: pointer;
  padding: 1em;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: gray;
    opacity: 0.5;
    bottom: 0;
  }
`;

export const StyledLastAddedCell = styled.div`
  ${MediumFontSize}
`;

export const StyledStatusCell = styled.div<{ $status: string }>`
  ${CenteredFlexContainer}
  width: 70px;
  height: 32px;
  color: white;
  background-color: ${({ $status }) => {
    if ($status === "active") {
      return "#2CD889";
    } else if ($status === "new") {
      return "#FFCD54";
    } else {
      return "#FF6565";
    }
  }};
  border-radius: 5px;
`;

export const StyledShowMoreText = styled.p`
  ${Bold}
  cursor: pointer;
  color: ${({ theme }) => theme.colors["font-secondary"]};
  margin-top: 2em;
`;
