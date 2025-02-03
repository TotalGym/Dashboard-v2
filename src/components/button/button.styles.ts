import styled from "styled-components";
import { MediumBold } from "../../styles/general.styles";

export const BasicButton = styled.button<{ $width?: string }>`
  ${MediumBold}
  background-color: ${({ theme }) => theme.colors["bg-secondary"]};
  color: white;
  padding: 1em;
  border-radius: 5px;
  min-width: 176px;
  width: ${({ $width }) => ($width ? $width : "")};
  user-select: none;

  &:hover {
    background-color: white;
    color: ${({ theme }) => theme.colors["bg-secondary"]};
    outline: 2px solid ${({ theme }) => theme.colors["bg-secondary"]};
  }
`;
