import styled from "styled-components";
import {
  Bold,
  CenteredColFlexContainer,
  CenteredFlexContainer,
} from "../../styles/general.styles";

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

export const SellProductFormContainer = styled.div`
  ${CenteredFlexContainer}
  width: 300px;
  height: 300px;
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
