import styled from "styled-components";
import { Bold, CenteredColFlexContainer } from "../../styles/general.styles";
import { NavLink } from "react-router-dom";

export const StyledSpanToHideBurger = styled.span`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: block;
  }
`;

export const HamburgerMenuContainer = styled.div<{ $open: boolean }>`
  ${CenteredColFlexContainer}
  justify-content: space-evenly;
  position: absolute;
  top: 80px;
  left: 0;
  z-index: 999;
  background-color: white;
  height: 100vh;
  width: 500px;

  transform: ${({ $open }) => ($open ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.3s ease-in-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100vw;
  }
`;

export const StyledHamburgerNavLink = styled(NavLink)`
  ${Bold}
  &.active {
    color: ${({ theme }) => theme.colors["font-secondary"]};
  }
`;
