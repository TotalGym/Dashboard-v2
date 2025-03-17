import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { FormInputTypes } from "../form-input/form-input.types";
import {
  EquipmentsFormContainer,
  StyledEquipmentsForm,
  StyledStatusSelect,
} from "./equipment-forms.styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { addNewEquipmentSchema } from "../../utils/yup/yup.utils";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { MessagedError } from "../../types/error.types";
import { useAddEquipmentMutation } from "../../services/equipment.services";

export type EquipmentFormInputs = {
  name: string;
  type: string;
  image: string;
  quantity: number;
  status: "Available" | "Under Maintenance";
};

const AddEquipmentForm = ({
  toggleModalOpen,
}: {
  toggleModalOpen: (close: boolean) => void;
}) => {
  const [addEquipment, { isLoading }] = useAddEquipmentMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EquipmentFormInputs>({
    resolver: yupResolver(addNewEquipmentSchema),
  });

  const onSubmit: SubmitHandler<EquipmentFormInputs> = async (data) => {
    try {
      const response = await addEquipment(data).unwrap();
      if (response) {
        toast.success("Equipment Added Successfully", {
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

        if (Array.isArray(error)) {
          error.forEach((subErrors) => {
            const subErrorsArray = Object.values(subErrors) as MessagedError[];
            subErrorsArray.forEach((subError) => {
              if (subError) {
                toast.error(subError.message, {
                  position: "top-right",
                  hideProgressBar: true,
                  closeOnClick: true,
                  draggable: true,
                });
              }
            });
          });
        }
      });
    }
  }, [errors]);

  return (
    <EquipmentsFormContainer>
      <StyledEquipmentsForm onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          formInputType={FormInputTypes.modalInput}
          placeholder="NAME"
          {...register("name")}
        />
        <FormInput
          formInputType={FormInputTypes.modalInput}
          placeholder="TYPE"
          {...register("type")}
        />
        <FormInput
          formInputType={FormInputTypes.modalInput}
          placeholder="ImageURL"
          {...register("image")}
        />
        <FormInput
          formInputType={FormInputTypes.modalInput}
          type="number"
          placeholder="Quantity"
          {...register("quantity")}
        />
        <StyledStatusSelect defaultValue="" {...register("status")}>
          <option value="" disabled>
            Select Status
          </option>
          <option value="Available">Available</option>
          <option value="Under Maintenance">Under Maintenance</option>
        </StyledStatusSelect>
        <Button type="submit" isLoading={isLoading}>
          Add Equipment
        </Button>
      </StyledEquipmentsForm>
    </EquipmentsFormContainer>
  );
};
export default AddEquipmentForm;
