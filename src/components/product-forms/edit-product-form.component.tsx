import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdateProductMutation } from "../../services/products.services";
import { Product } from "../../types/products.types";
import { ProductFormInputs } from "./add-product-form.component";
import { addNewProductSchema } from "../../utils/yup/yup.utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useEffect } from "react";
import {
  ProductsFormContainer,
  StyledProductsForm,
} from "./product-forms.styles";
import FormInput from "../form-input/form-input.component";
import { FormInputTypes } from "../form-input/form-input.types";
import Button from "../button/button.component";

const EditProductForm = ({
  product,
  toggleModalOpen,
}: {
  product: Product;
  toggleModalOpen: (close: boolean) => void;
}) => {
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProductFormInputs>({
    defaultValues: product,
    resolver: yupResolver(addNewProductSchema),
  });

  const onSubmit: SubmitHandler<ProductFormInputs> = async (data) => {
    const updatedData: Partial<Product> = {};
    if (data.productName !== product.productName)
      updatedData.productName = data.productName;
    if (data.description !== product.description)
      updatedData.description = data.description;
    if (data.price !== product.price) updatedData.price = data.price;
    if (data.image !== product.image) updatedData.image = data.image;
    if (data.inventoryCount !== product.inventoryCount)
      updatedData.inventoryCount = data.inventoryCount;

    try {
      const response = await updateProduct({
        productId: product._id,
        updatedFields: updatedData,
      }).unwrap();
      if (response) {
        toast.success("Product updated successfully");
      }
      setTimeout(() => toggleModalOpen(false), 1000);
    } catch (error) {
      if (error) toast.error("Failed to update product details");
      reset(product);
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
        <Button type="submit" isLoading={isLoading} disable={!isDirty}>
          Update Product
        </Button>
      </StyledProductsForm>
    </ProductsFormContainer>
  );
};
export default EditProductForm;
