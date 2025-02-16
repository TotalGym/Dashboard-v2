import styled from "styled-components";
import { CenteredFlexContainer } from "../../styles/general.styles";

export const ProductsFormContainer = styled.div`
  ${CenteredFlexContainer}
  width: 500px;
  height: 500px;
`;

export const StyledProductsForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
`;
