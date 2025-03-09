import styled from "styled-components";
import { CenteredFlexContainer } from "../../styles/general.styles";

export const TraineeFormContainer = styled.div`
  ${CenteredFlexContainer}
  padding: 3rem 5rem;

  select {
    border: 1px solid black;
    padding: 0.5em;
    border-radius: 3px;
  }
`;

export const StyledTraineeForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
