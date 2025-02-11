import styled from "styled-components";
import {
  CenteredFlexContainer,
} from "../../styles/general.styles";

export const EquipmentsFormContainer = styled.div`
  ${CenteredFlexContainer}
  width: 500px;
  height: 500px;
`;

export const StyledEquipmentsForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;

`;

export const StyledStatusSelect = styled.select`
  border: 1px solid black;
  padding: 0.5em;
  border-radius: 3px;
  width: 196.8px;
`;
