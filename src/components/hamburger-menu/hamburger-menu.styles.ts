import styled from "styled-components";
import { Bold, CenteredColFlexContainer } from "../../styles/general.styles";
import { NavLink } from "react-router-dom";

export const StyledSpanToHideBurger = styled.span`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: block;
  }
`;

export const HamburgerMenuContainer = styled.div`
  ${CenteredColFlexContainer}
  justify-content: space-evenly;
  position: absolute;
  top: 80px;
  left: 0;
  z-index: 999;
  background-color: white;
  height: 100vh;
  width: 500px;

  @media(max-width: ${({theme})=>theme.breakpoints.sm}){
    width: 50vw;
  }
`;

export const StyledHamburgerNavLink = styled(NavLink)`
  ${Bold}
  &.active {
    color: ${({ theme }) => theme.colors["font-secondary"]};
  }
`;
