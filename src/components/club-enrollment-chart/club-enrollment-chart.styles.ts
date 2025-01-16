import styled from "styled-components";
import { Bold, CenteredColFlexContainer } from "../../styles/general.styles";

export const ClubEnrollmentChartContainer = styled.div`
  ${CenteredColFlexContainer}
  row-gap: 2em;
  background-color: white;
  padding: 2em;
  border-radius: 1em;
  width: 400px;
  height: 400px;
`;

export const StyledEnrollmentChartTitle = styled.p`
  ${Bold}
`;
