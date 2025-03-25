import styled from "styled-components";
import {
  CenteredColFlexContainer,
  MainBgColor,
} from "../../styles/general.styles";

export const ProgramsManagementContainer = styled.div`
  ${CenteredColFlexContainer}
  ${MainBgColor}
  padding-top: 1em;
  justify-content: space-between;
`;

export const StyledPaginationContainer = styled.div`
  margin-top: 5em;
`;

export const StyledPaginationSpan = styled.span`
  width: 4em;
  padding: 1em 2em;
`;
