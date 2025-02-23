import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Product } from "../../types/products.types";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { FormInputTypes } from "../form-input/form-input.types";
import {
  SellProductFormContainer,
  StyledNotFoundText,
  StyledSellProductForm,
  StyledSellProductText,
  StyledTraineesList,
} from "./product-forms.styles";
import { useLazySearchTraineesByNameQuery } from "../../features/trainees/trainees.api.slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { sellProductSchema } from "../../utils/yup/yup.utils";

type FormValues = {
  quantity: number;
  searchTrainee: string;
};

const SellProductForm = ({ product }: { product: Product }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(sellProductSchema),
    defaultValues: {
      quantity: 0,
      searchTrainee: "",
    },
  });

  const searchTerm = watch("searchTrainee");

  useEffect(() => {
    console.log("Search term updated:", searchTerm);
  }, [searchTerm]);

  const [selectedTrainee, setSelectedTrainee] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [data, setData] = useState<{ id: string; name: string }[] | null>(null);
  const dropdownRef = useRef<HTMLUListElement | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [searchTrainee] = useLazySearchTraineesByNameQuery();

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNotFound(false);
    setValue("searchTrainee", value);

    if (value.trim() === "") {
      setShowDropdown(false);
      setData(null);
      return;
    }

    try {
      const results = await searchTrainee({ search: value }).unwrap();
      setData(results.data);
      setShowDropdown(results.data.length > 0);
    } catch (error) {
      if ((error as { status: number }).status === 404) {
        setNotFound(true);
        setShowDropdown(false);
      }
    }
  };

  const handleSelectTrainee = (traineeId: string, traineeName: string) => {
    setSelectedTrainee({ id: traineeId, name: traineeName });
    setValue("searchTrainee", traineeName);
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

  const onSubmit = (data: FormValues) => {
    if (!selectedTrainee) return;
    console.log("Form Data:", data);
    console.log("Errors:", errors);
  };

  return (
    <SellProductFormContainer>
      <h2>Sell Product</h2>
      <StyledSellProductForm onSubmit={handleSubmit(onSubmit)}>
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
          {...register("quantity", { valueAsNumber: true })}
        />
        {errors.quantity && (
          <p style={{ color: "red" }}>{errors.quantity.message}</p>
        )}

        <div style={{ position: "relative" }}>
          <FormInput
            formInputType={FormInputTypes.modalInput}
            placeholder="Search Trainee"
            type="text"
            {...register("searchTrainee")}
            onChange={handleInputChange}
          />
          {errors.searchTrainee && (
            <StyledNotFoundText>
              {errors.searchTrainee.message}
            </StyledNotFoundText>
          )}
          {notFound && (
            <StyledNotFoundText>No Trainee found</StyledNotFoundText>
          )}
          {showDropdown && data && data.length > 0 && (
            <StyledTraineesList ref={dropdownRef}>
              {data.map((trainee) => (
                <li
                  key={trainee.id}
                  onClick={() => handleSelectTrainee(trainee.id, trainee.name)}
                >
                  {trainee.name}
                </li>
              ))}
            </StyledTraineesList>
          )}
        </div>

        <Button
          type="submit"
          disabled={!selectedTrainee || watch("quantity") === 0}
        >
          Sell
        </Button>
      </StyledSellProductForm>
    </SellProductFormContainer>
  );
};

export default SellProductForm;
