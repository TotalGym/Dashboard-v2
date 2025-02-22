import { useEffect, useRef, useState } from "react";
import { Product } from "../../types/products.types";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { FormInputTypes } from "../form-input/form-input.types";
import {
  SellProductFormContainer,
  StyledSellProductForm,
  StyledSellProductText,
} from "./product-forms.styles";
import { useSearchTraineesByNameQuery } from "../../features/trainees/trainees.api.slice";

const SellProductForm = ({ product }: { product: Product }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrainee, setSelectedTrainee] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef<HTMLUListElement | null>(null); 

  const { data, isLoading } = useSearchTraineesByNameQuery({
    search: searchTerm,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowDropdown(true);
  };

  const handleSelectTrainee = (traineeId: string, traineeName: string) => {
    setSelectedTrainee(traineeId);
    setSearchTerm(traineeName);
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <SellProductFormContainer>
      <h2>Sell Product</h2>
      <StyledSellProductForm>
        <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
          <StyledSellProductText>
            Product Name: {product.productName}
          </StyledSellProductText>
          <StyledSellProductText>
            Product Price: {product.price}$
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

        <div style={{ position: "relative" }}>
          <FormInput
            formInputType={FormInputTypes.modalInput}
            placeholder="Search Trainee"
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setShowDropdown(true)}
          />

          {isLoading && <p>Loading...</p>}

          {showDropdown && data && data.data.length > 0 && (
            <ul
              ref={dropdownRef}
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "100%",
                backgroundColor: "white",
                border: "1px solid #ccc",
                listStyle: "none",
                padding: 0,
                margin: 0,
                maxHeight: "150px",
                overflowY: "auto",
                zIndex: 1000,
              }}
            >
              {data.data.map((trainee) => (
                <li
                  key={trainee.id}
                  onClick={() => handleSelectTrainee(trainee.id, trainee.name)}
                  style={{
                    padding: "8px",
                    cursor: "pointer",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  {trainee.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <Button type="submit" disabled={!selectedTrainee}>
          Sell
        </Button>
      </StyledSellProductForm>
    </SellProductFormContainer>
  );
};

export default SellProductForm;
