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

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    &:hover {
      width: 500px;
      border: 1.5px solid ${({ theme }) => theme.colors["font-secondary"]};
    }
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
