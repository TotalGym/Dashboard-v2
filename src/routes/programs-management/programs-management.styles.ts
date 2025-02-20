import styled from "styled-components";
import {
  CenteredColFlexContainer,
  MainContentPadding,
} from "../../styles/general.styles";

export const ProgramsManagementContainer = styled.div`
  ${CenteredColFlexContainer}
  ${MainContentPadding}
  min-height: calc(100vh - 160px);
  justify-content: space-between;
`;

export const StyledPaginationContainer = styled.div`
  margin-top: 5em;
`;

export const StyledPaginationSpan = styled.span`
  width: 4em;
  padding: 1em 2em;
`;
