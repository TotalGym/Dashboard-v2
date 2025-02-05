import styled from "styled-components";
import { MediumBold } from "../../styles/general.styles";

export const BasicButton = styled.button<{ $width?: string }>`
  ${MediumBold}
  background-color: ${({ theme }) => theme.colors["bg-secondary"]};
  color: white;
  padding: 1em;
  border-radius: 5px;
  min-width: ${({ $width }) => ($width ? "" : "176px")};
  width: ${({ $width }) => ($width ? $width : "")};
  user-select: none;

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
