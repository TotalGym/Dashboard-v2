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

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 500px;
  }
`;

export const StyledAddProgramForm = styled.form`
  ${CenteredColFlexContainer}
  align-items: flex-start;
  gap: 0.5em;
  width: 100%;

  @media (max-width: 520px) {
    justify-content: flex-start;
  }
`;

export const StyledProgramDescriptionTextArea = styled.textarea`
  resize: none;
  height: 80px;
  width: 400px;
  border: 1px solid black;
  padding: 0.5em;
  border-radius: 3px;

  @media (max-width: 520px) {
    width: 300px;
    height: 50px;
  }
`;

export const StyledProgramFormsText = styled.span`
  ${LargeFontSize}
  ${Bold}
  color: ${({ theme }) => theme.colors["font-secondary"]};
  margin-top: 0.5em;

  @media (max-width: 520px) {
    display: none;
  }
`;

export const StyledExerciseLablesContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 0.65fr 1fr;
  text-align: left;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const StyledInputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  gap: 1em;
`;

export const StyledSmallScreenLabel = styled.label`
  display: none;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

export const StyledExerciseAndScheduleContainer = styled.div`
  ${CenteredFlexContainer}
  gap: 0.75em;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: baseline;
  }
`;

export const StyledScheduleContainer = styled.div`
  ${CenteredFlexContainer}
  gap: 0.75em;

  @media (max-width: 520px) {
    flex-direction: column;
  }
`;

export const StyledExtraSmallLabel = styled.label`
  display: none;

  @media (max-width: 520px) {
    display: block;
  }
`;

export const StyledTextGrid = styled.div`
  display: grid;
  grid-template-columns: 1.7fr 1.5fr 1fr;
  text-align: left;
`;

export const StyledSubmitText = styled.span`
  ${Bold}
  ${XLargeFontSize}
`;

export const StyledDaySelect = styled.select`
  border: 1px solid black;
  padding: 0.5em;
  border-radius: 3px;
`;

export const StyledSubmitButtonContainer = styled.div`
  align-self: center;

  @media (max-width: 520px) {
    align-self: auto;
  }
`;
