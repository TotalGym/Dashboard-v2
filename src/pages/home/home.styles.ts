import styled from "styled-components";
import {
  Bold,
  CenteredColFlexContainer,
  CenteredFlexContainer,
  MainBgColor,
  MainContentPadding,
  XLargeFontSize,
} from "../../styles/general.styles";

export const HomeContainer = styled.div`
  ${MainBgColor}
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const StyledHomeHeader = styled.div`
  ${MainContentPadding}
  color: #4ca07a;
  background-color: #eafaf3;
  user-select: none;
`;

export const StyledHello = styled.span`
  ${XLargeFontSize}
  ${Bold}
`;

export const InfoCardsContainer = styled.div`
  ${CenteredFlexContainer}
  ${MainContentPadding}
  gap: 2em;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 70%;
    align-self: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    ${CenteredColFlexContainer}
  }
`;

export const StyledHomePageChartsContainer = styled.div`
  ${MainContentPadding}
  ${CenteredFlexContainer}
  gap: 2em;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

export const StyledHomePageTablesContainer = styled.div`
  ${MainContentPadding}
  ${CenteredFlexContainer}
  gap: 2em;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
  }
`;
