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
import { useSellProductMutation } from "../../features/products/products.api.slice";
import { toast } from "react-toastify";
import { useDebounce } from "../../hooks/useDebounce";

type FormValues = {
  quantity: number;
  searchTrainee: string;
};

const SellProductForm = ({
  product,
  toggleIsModalOpen,
}: {
  product: Product;
  toggleIsModalOpen: (open: boolean) => void;
}) => {
  const [sellProduct, { isLoading, isError, error, isSuccess }] =
    useSellProductMutation();

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

  useEffect(() => {
    if (isSuccess) {
      toggleIsModalOpen(false);
      toast.success("Equipment Sold Successfully", {
        position: "top-right",
        closeOnClick: true,
        draggable: true,
      });
    }
  });

  const [selectedTrainee, setSelectedTrainee] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [data, setData] = useState<{ id: string; name: string }[] | null>(null);
  const dropdownRef = useRef<HTMLUListElement | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [searchTrainee] = useLazySearchTraineesByNameQuery();

  const searchValue = watch("searchTrainee");
  const debouncedSearch = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debouncedSearch.trim() === "") {
      setShowDropdown(false);
      setData(null);
      return;
    }

    const fetchTrainees = async () => {
      setNotFound(false);
      setSelectedTrainee(null);

      try {
        const results = await searchTrainee({ search: debouncedSearch }).unwrap();
        setData(results.data);
        setShowDropdown(results.data.length > 0);
      } catch (error) {
        if ((error as { status: number }).status === 404) {
          setNotFound(true);
          setShowDropdown(false);
        }
      }
    };

    fetchTrainees();
  }, [debouncedSearch, searchTrainee]);

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

  const onSubmit = async (data: FormValues) => {
    if (!selectedTrainee) return;

    try {
      await sellProduct({
        ProductID: product._id,
        quantitySold: data.quantity,
        TraineeID: selectedTrainee.id,
      }).unwrap();

      console.log("Product sold successfully");
    } catch (err) {
      console.error("Failed to sell product:", err);
    }
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
            autoComplete="off"
            {...register("searchTrainee")}
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
          disable={!selectedTrainee || watch("quantity") === 0 || isLoading}
        >
          {isLoading ? "Processing..." : "Sell"}
        </Button>
        {isError && (
          <p style={{ color: "red" }}>
            Error: {(error as { message: string })?.message}
          </p>
        )}
      </StyledSellProductForm>
    </SellProductFormContainer>
  );
};

export default SellProductForm;
