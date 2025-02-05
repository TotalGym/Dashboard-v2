import styled from "styled-components";
import {
  CenteredColFlexContainer,
  MediumFontSize,
  MediumBold,
} from "../../../styles/general.styles";

export const LoginFormContainer = styled.div`
  ${CenteredColFlexContainer}
  row-gap: 3em;
`;

export const StyledFormText = styled.p`
  color: #646d82;
  ${MediumFontSize}
  ${MediumBold}
  opacity: 0.5;
`;

export const StyledLoginForm = styled.form`
  ${CenteredColFlexContainer}
`;

export const StyledForgetPasswordContainer = styled.div`
  width: 400px;
  display: flex;
  justify-content: center;
  margin-top: 4em;
  margin-bottom: 4em;
`;

export const StyledForgetPasswordText = styled.span`
  cursor: pointer;

  &:hover {
    opacity: 0.5;
    text-decoration: underline;
  }
`;
