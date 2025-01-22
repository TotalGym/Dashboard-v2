import styled from "styled-components";
import { Bold, MainContentPadding } from "../../styles/general.styles";

export const FooterContainer = styled.footer`
  ${MainContentPadding}
  color: ${({ theme }) => theme.colors["font-secondary"]};
  width: 100%;

  span {
    ${Bold}
  }
`;
