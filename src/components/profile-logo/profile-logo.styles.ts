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

export const StyledArrow = styled.span`
  cursor: pointer;
  position: absolute;
  right: -20px;
`;
