import styled from "styled-components";
import {
  Bold,
  CenteredFlexContainer,
  MainContentPadding,
  XLargeFontSize,
} from "../../styles/general.styles";

export const HomeContainer = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors["bg-primary"]};
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
`;

export const StyledHomePageChartsContainer = styled.div`
  ${MainContentPadding}
  ${CenteredFlexContainer}
  gap: 2em;
`;

export const StyledHomePageTablesContainer = styled.div`
  ${MainContentPadding}
  ${CenteredFlexContainer}
  gap: 2em;
`;
