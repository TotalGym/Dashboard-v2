import { Product } from "../../types/products.types";
import Button from "../button/button.component";
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
      <h2>Sell Product</h2>
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
            Product Price: {product.price}
          </StyledSellProductText>
          <StyledSellProductText>
            Available Quantity: {product.inventoryCount}
          </StyledSellProductText>
        </div>
        <FormInput
          formInputType={FormInputTypes.modalInput}
          placeholder="Quantity"
          type="number"
          max={product.inventoryCount}
        />
        <FormInput
          formInputType={FormInputTypes.modalInput}
          placeholder="Trainee"
          type="search"
        />
        <Button type="submit">Sell</Button>
      </StyledSellProductForm>
    </SellProductFormContainer>
  );
};
export default SellProductForm;
