import styled from "styled-components";
import {
  Bold,
  CenteredFlexContainer,
  MainContainersHeight,
  MainContentPadding,
  XLargeFontSize,
} from "../../styles/general.styles";

export const HomeContainer = styled.div`
  ${MainContainersHeight}
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors["bg-primary"]};
`;

export const StyledHomeHeader = styled.div`
  ${MainContentPadding}
  color: #4ca07a;
  background-color: #eafaf3;
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
