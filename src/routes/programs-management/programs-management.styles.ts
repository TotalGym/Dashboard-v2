import styled from "styled-components";
import { CenteredColFlexContainer } from "../../styles/general.styles";

export const ProgramsManagementContainer = styled.div`
  ${CenteredColFlexContainer}
  height: calc(100vh - 160px);
`;

export const StyledProgramsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;
