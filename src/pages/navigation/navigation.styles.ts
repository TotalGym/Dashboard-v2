import styled from "styled-components";
import {
  CenteredFlexContainer,
  MediumBold,
  MediumFontSize,
} from "../../styles/general.styles";
import { NavLink } from "react-router-dom";

export const NavigationContainer = styled.div`
  ${CenteredFlexContainer}
  justify-content: space-evenly;
  padding-top: 0.5em;
  height: 80px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    .hide-from-nav-bar {
      display: none;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    .hide-from-nav-bar {
      display: none;
    }
  }
`;

export const StyledNavigationList = styled.ul`
  ${CenteredFlexContainer}
  ${MediumFontSize} 
  gap: 2.5em;
`;

export const StyledNavigationListItem = styled.li`
  ${MediumBold}

  @media(max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

export const StyledNavigationNavLink = styled(NavLink)`
  position: relative;
  text-decoration: none;
  color: ${({ theme }) => theme.colors["font-primary"]};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    &:hover {
      opacity: 0.7;
    }

    &.active:hover {
      opacity: 1;
    }
  }

  &.active {
    color: ${({ theme }) => theme.colors["font-secondary"]};
  }

  &.active::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -20px;
    height: 4px;
    background-color: ${({ theme }) => theme.colors["font-secondary"]};
    border-radius: 1px;
  }
`;

export const BellIconAndProfileContainer = styled.div`
  ${CenteredFlexContainer}
  gap: 1.6em;
`;

export const BellIconContainer = styled.div`
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 0.5px;
    height: 2.3em;
    background-color: gray;
  }

  &::before {
    left: -10px;
  }

  &::after {
    right: -10px;
  }
`;

export const HideLogoSpan = styled.span`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;
