import styled from "styled-components";
import {
  CenteredColFlexContainer,
  CenteredFlexContainer,
} from "../../styles/general.styles";

export const ProfileLogoContainer = styled.div`
  ${CenteredFlexContainer}
  cursor: pointer;
  position: relative;
  background-color: black;
  border-radius: 50%;
  padding: 2px;
`;

export const StyledArrow = styled.span<{ $shown: boolean }>`
  cursor: pointer;
  position: absolute;
  right: -20px;
  transform: ${({ $shown }) => ($shown ? "rotate(180deg)" : "")};
`;

export const StyledLogOutContainer = styled.div<{ $shown: boolean }>`
  ${CenteredColFlexContainer}
  gap: 1em;
  background-color: white;
  height: 250px;
  width: 250px;
  border-radius: 2em;
  border: 5px solid ${({ theme }) => theme.colors["bg-secondary"]};
  position: absolute;
  top: 4em;
  margin-right: calc(200px / 2);
  z-index: 1;
  display: ${({ $shown }) => ($shown ? "flex" : "none")};
`;
