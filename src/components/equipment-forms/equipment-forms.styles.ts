import styled from "styled-components";
import { CenteredColFlexContainer } from "../../styles/general.styles";

export const EquipmentsFormContainer = styled.div`
  ${CenteredColFlexContainer}
  width: 300px;
  height: 420px;
  padding-top: 2em;
`;

export const StyledEquipmentsForm = styled.form`
  ${CenteredColFlexContainer}
  gap: 2em;
  height: 100%;
`;

export const StyledStatusSelect = styled.select`
  border: 1px solid black;
  padding: 0.5em;
  border-radius: 3px;
  width: 196.8px;
`;
