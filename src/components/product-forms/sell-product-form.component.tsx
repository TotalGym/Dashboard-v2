import { Product } from "../../types/products.types";
import FormInput from "../form-input/form-input.component";
import { FormInputTypes } from "../form-input/form-input.types";
import {
  SellProductFormContainer,
  StyledSellProductForm,
  StyledSellProductText,
} from "./product-forms.styles";

const SellProductForm = ({ product }: { product: Product }) => {
  return (
    <SellProductFormContainer>
      <StyledSellProductForm>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1em",
          }}
        >
          <StyledSellProductText>
            product name: {product.productName}
          </StyledSellProductText>
          <StyledSellProductText>
            Available Quantity: {product.inventoryCount}{" "}
          </StyledSellProductText>
        </div>
        <FormInput
          formInputType={FormInputTypes.modalInput}
          placeholder="Quantity"
          type="number"
        />
      </StyledSellProductForm>
    </SellProductFormContainer>
  );
};
export default SellProductForm;
