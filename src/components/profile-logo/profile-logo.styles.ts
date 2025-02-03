import styled from "styled-components";
import { CenteredFlexContainer } from "../../styles/general.styles";

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
  ${CenteredFlexContainer}
  background-color: white;
  height: 100px;
  width: 250px;
  position: absolute;
  top: 4em;
  margin-right: calc(200px / 2);
  z-index: 1;
  display: ${({ $shown }) => ($shown ? "flex" : "none")};
`;
