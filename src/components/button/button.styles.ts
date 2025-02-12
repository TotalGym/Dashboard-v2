import styled from "styled-components";
import { MediumBold, XXXLargeFontSize } from "../../styles/general.styles";

export const BasicButton = styled.button<{
  $width?: string;
  $redColored?: boolean;
}>`
  ${MediumBold}
  background-color: ${({ theme, $redColored }) => {
    if ($redColored) {
      return theme.colors["font-secondary-2"];
    }
    return theme.colors["bg-secondary"];
  }};
  color: white;
  padding: 1em;
  border-radius: 5px;
  min-width: ${({ $width }) => ($width ? "" : "176px")};
  width: ${({ $width }) => ($width ? $width : "")};
  user-select: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    &:not(:disabled):hover {
      background-color: white;
      color: ${({ theme, $redColored }) => {
        if ($redColored) {
          return theme.colors["font-secondary-2"];
        }
        return theme.colors["bg-secondary"];
      }};
      outline: 2px solid
        ${({ theme, $redColored }) => {
          if ($redColored) {
            return theme.colors["font-secondary-2"];
          }

          return theme.colors["bg-secondary"];
        }};
    }
  }

  &:disabled {
    cursor: no-drop;
    opacity: 0.6;
  }
`;

export const CloseModalButton = styled.button`
  padding: 5px;
  width: 2em;
  height: 2em;
  background-color: ${({ theme }) => theme.colors["font-secondary-2"]};
  border-radius: 0.5em;

  position: absolute;
  top: 1em;
  right: 1em;

  &:hover {
    opacity: 0.7;
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const PaginationButton = styled.button`
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors["bg-secondary"]};
  color: white;
  width: 1.5em;
  height: 1.5em;
  ${XXXLargeFontSize}

  &:not(:disabled):hover {
    background-color: white;
    color: ${({ theme }) => theme.colors["bg-secondary"]};
    outline: 2px solid ${({ theme }) => theme.colors["bg-secondary"]};
  }

  &:disabled {
    cursor: no-drop;
    opacity: 0.6;
  }
`;
