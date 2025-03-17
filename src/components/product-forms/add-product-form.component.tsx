import { yupResolver } from "@hookform/resolvers/yup";
import { useAddProductMutation } from "../../services/products.services";
import { addNewProductSchema } from "../../utils/yup/yup.utils";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect } from "react";
import {
  ProductsFormContainer,
  StyledProductsForm,
} from "./product-forms.styles";
import FormInput from "../form-input/form-input.component";
import { FormInputTypes } from "../form-input/form-input.types";
import Button from "../button/button.component";

export type ProductFormInputs = {
  productName: string;
  description: string;
  image: string;
  inventoryCount: number;
  price: number;
};

const AddProductForm = ({
  toggleModalOpen,
}: {
  toggleModalOpen: (close: boolean) => void;
}) => {
  const [addProduct, { isLoading }] = useAddProductMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormInputs>({
    resolver: yupResolver(addNewProductSchema),
  });

  const onSubmit: SubmitHandler<ProductFormInputs> = async (data) => {
    try {
      const response = await addProduct(data).unwrap();
      if (response) {
        toast.success("Product Added Successfully", {
          position: "top-right",
          closeOnClick: true,
          draggable: true,
        });
        reset();
        setTimeout(() => {
          toggleModalOpen(false);
        }, 1000);
      }
    } catch (error) {
      if (error) {
        toast.error("something went wrong", {
          position: "top-right",
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
        });
      }
    }
  };

  useEffect(() => {
    const errorsArray = Object.values(errors);
    if (errorsArray.length > 0) {
      errorsArray.forEach((error) => {
        if (error.message) {
          toast.error(error.message, {
            position: "top-right",
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true,
          });
        }
      });
    }
  }, [errors]);

  return (
    <ProductsFormContainer>
      <StyledProductsForm onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          formInputType={FormInputTypes.modalInput}
          placeholder="Product Name"
          {...register("productName")}
        />
        <FormInput
          formInputType={FormInputTypes.modalInput}
          placeholder="Description"
          {...register("description")}
        />
        <FormInput
          formInputType={FormInputTypes.modalInput}
          placeholder="Image"
          {...register("image")}
        />
        <FormInput
          formInputType={FormInputTypes.modalInput}
          type="number"
          min={0}
          placeholder="Price"
          {...register("price")}
        />
        <FormInput
          formInputType={FormInputTypes.modalInput}
          type="number"
          min={0}
          placeholder="Quantity"
          {...register("inventoryCount")}
        />
        <Button type="submit" isLoading={isLoading}>
          Add Product
        </Button>
      </StyledProductsForm>
    </ProductsFormContainer>
  );
};
export default AddProductForm;
