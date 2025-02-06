import styled from "styled-components";
import { Bold } from "../../styles/general.styles";

export const StyledConfirmDeleteText = styled.p`
  ${Bold}
  padding: 1em;
  color: ${({ theme }) => theme.colors["font-secondary-2"]};
`;
