import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { adminSchema } from "../../utils/yup/yup.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { FormInputTypes } from "../form-input/form-input.types";
import { useAddAdminMutation } from "../../services/admins.services";
import { AdminFormContainer, StyledAdminForm } from "./admin-forms.styles";

type AdminFormInputs = {
  name: string;
  email: string;
  password: string;
  role: "Admin" | "SuperAdmin";
};

interface AddAdminFormProps {
  toggleModalOpen: (close: boolean) => void;
}

const AddAdminForm: React.FC<AddAdminFormProps> = ({ toggleModalOpen }) => {
  const [addAdmin, { isLoading }] = useAddAdminMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminFormInputs>({
    resolver: yupResolver(adminSchema),
  });

  const onSubmit: SubmitHandler<AdminFormInputs> = async (data) => {
    try {
      await addAdmin(data).unwrap();
      toast.success("Admin added successfully!");
      reset();
      toggleModalOpen(false);
    } catch (error) {
      if (error) toast.error("Failed to add admin");
    }
  };

  useEffect(() => {
    Object.values(errors).forEach((error) => {
      if (error?.message) toast.error(error.message);
    });
  }, [errors]);

  return (
    <AdminFormContainer>
      <StyledAdminForm onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          placeholder="Name"
          {...register("name")}
          formInputType={FormInputTypes.modalInput}
        />
        <FormInput
          placeholder="Email"
          {...register("email")}
          formInputType={FormInputTypes.modalInput}
        />
        <FormInput
          placeholder="Password"
          type="password"
          {...register("password")}
          formInputType={FormInputTypes.modalInput}
        />
        <select {...register("role")} defaultValue="">
          <option value="" disabled>
            Select Role
          </option>
          <option value="Admin">Admin</option>
          <option value="SuperAdmin">SuperAdmin</option>
        </select>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Admin"}
        </Button>
      </StyledAdminForm>
    </AdminFormContainer>
  );
};

export default AddAdminForm;
