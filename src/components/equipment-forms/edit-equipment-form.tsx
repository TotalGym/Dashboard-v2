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
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useUpdateEquipmentMutation } from "../../features/equipment/equipment.api.slice";
import { addNewEquipmentSchema } from "../../utils/yup/yup.utils";
import { Equipment } from "../../types/equipment..types";

export type EquipmentFormInputs = {
  name: string;
  type: string;
  image: string;
  quantity: number;
  status: "Available" | "Under Maintenance";
};

type EditEquipmentFormProps = {
  equipment: Equipment;
  toggleModalOpen: (close: boolean) => void;
};

const EditEquipmentForm = ({
  equipment,
  toggleModalOpen,
}: EditEquipmentFormProps) => {
  const [updateEquipment, { isLoading }] = useUpdateEquipmentMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<EquipmentFormInputs>({
    defaultValues: equipment,
    resolver: yupResolver(addNewEquipmentSchema),
  });

  const onSubmit: SubmitHandler<EquipmentFormInputs> = async (data) => {
    const updatedData: Partial<Equipment> = {};
    if (data.name !== equipment.name) updatedData.name = data.name;
    if (data.type !== equipment.type) updatedData.type = data.type;
    if (data.quantity !== equipment.quantity)
      updatedData.quantity = data.quantity;
    if (data.image !== equipment.image) updatedData.image = data.image;
    if (data.status !== equipment.status) updatedData.status = data.status;

    try {
      const response = await updateEquipment({
        equipmentID: equipment._id,
        updatedFields: updatedData,
      }).unwrap();
      if (response) {
        toast.success("Equipment updated successfully");
      }
      setTimeout(() => toggleModalOpen(false), 1000);
    } catch (error) {
      if (error) toast.error("Failed to update equipment details");
      reset(equipment);
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
          placeholder="Image URL"
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
        <Button type="submit" isLoading={isLoading} disabled={!isDirty}>
          Update Equipment
        </Button>
      </StyledEquipmentsForm>
    </EquipmentsFormContainer>
  );
};

export default EditEquipmentForm;
