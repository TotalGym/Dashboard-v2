import styled from "styled-components";
import {
  Bold,
  CenteredColFlexContainer,
  CenteredFlexContainer,
  LargeFontSize,
  XLargeFontSize,
} from "../../styles/general.styles";

export const AddProgramFormContainer = styled.div`
  ${CenteredColFlexContainer}
  width: 750px;
`;

export const StyledAddProgramForm = styled.form`
  ${CenteredColFlexContainer}
  align-items: flex-start;
  gap: 0.5em;
`;

export const StyledProgramDescriptionTextArea = styled.textarea`
  resize: none;
  height: 80px;
  width: 400px;
  border: 1px solid black;
  padding: 0.5em;
  border-radius: 3px;
`;

export const StyledProgramFormsText = styled.span`
  ${LargeFontSize}
  ${Bold}
  color: ${({ theme }) => theme.colors["font-secondary"]};
  margin-top: 0.5em;
`;

export const StyledExerciseLablesContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 0.65fr 1fr;
  text-align: left;
`;

export const StyledExerciseAndScheduleContainer = styled.div`
  ${CenteredFlexContainer}
  gap: 0.75em;
`;

export const StyledSubmitText = styled.span`
  ${Bold}
  ${XLargeFontSize}
`;
