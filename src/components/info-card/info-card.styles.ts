import styled from "styled-components";
import {
  Bold,
  MainContentPadding,
  MediumFontSize,
  XXLargeFontSize,
} from "../../styles/general.styles";

export const InfoCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  ${MainContentPadding}
  width: 443px;
  height: 180px;
  background-color: white;
  border-radius: 2em;
  cursor: pointer;
  transition: width 0.5s;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    &:hover {
      width: 500px;
      border: 1.5px solid ${({ theme }) => theme.colors["font-secondary"]};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}){
    width: 400px;

    &:hover {
      opacity: 0.9;
      border: 1.5px solid ${({ theme }) => theme.colors["font-secondary"]};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}){
    width: 380px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}){
    width: 275px;
  }
`;

export const StyledNumberIcon = styled.p<{ $numberColorSwitched: boolean }>`
  display: flex;
  justify-content: center;
  position: relative;
  height: 3.5em;
  width: 3.5em;

  span {
    ${XXLargeFontSize}
    position: absolute;
    bottom: 0;
    color: ${({ theme, $numberColorSwitched }) =>
      $numberColorSwitched
        ? theme.colors["font-secondary-2"]
        : theme.colors["font-secondary"]};
  }
`;

export const StyledInfoText = styled.p`
  ${Bold}
  ${MediumFontSize}
  line-height: 24px;
  margin-left: 1.2em;
`;
