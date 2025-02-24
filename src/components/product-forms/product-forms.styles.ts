import styled from "styled-components";
import { Bold, CenteredColFlexContainer } from "../../styles/general.styles";

export const ProductsFormContainer = styled.div`
  ${CenteredColFlexContainer}
  width: 300px;
  height: 420px;
  padding-top: 2em;
`;

export const StyledProductsForm = styled.form`
  ${CenteredColFlexContainer}
  gap: 2em;
  height: 100%;
`;

export const SellProductFormContainer = styled.div`
  ${CenteredColFlexContainer}
  width: 300px;
  height: 420px;
`;

export const StyledSellProductForm = styled.form`
  ${CenteredColFlexContainer}
  gap: 2em;
  height: 100%;
`;

export const StyledSellProductText = styled.p`
  ${Bold}
  color: ${({ theme }) => theme.colors["font-secondary"]};
  border-bottom: 1px solid gray;
  padding-bottom: 1em;
`;

export const StyledTraineesList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #ccc;
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 150px;
  overflow-y: auto;
  z-index: 1001;

  li {
    padding: 8px;
    cursor: pointer;
    border-bottom: 1px solid #ddd;
  }
`;

export const StyledNotFoundText = styled.p`
  color: red;
  margin-top: 1em;
`;
