import { useForm, SubmitHandler } from "react-hook-form";
import { useUpdateStaffMutation } from "../../features/staff/staff.api.slice";
import Button from "../../components/button/button.component";
import { toast } from "react-toastify";
import FormInput from "../form-input/form-input.component";
import { FormInputTypes } from "../form-input/form-input.types";
import {
  FormContainer,
  FormLabel,
  FormSelect,
  ErrorText,
} from "./staff-forms.styles";
import { useEffect } from "react";

type FormInputs = {
  name: string;
  contact: {
    email: string;
    phoneNumber: string;
  };
  role: "Coach" | "EquipmentManager" | "SalesManager";
  payroll: {
    salary: number;
  };
};

type UpdateStaffFormProps = {
  closeModal: () => void;
  staffData: FormInputs & { _id: string }; // Include the staff ID for updating
};

const UpdateStaffForm = ({ closeModal, staffData }: UpdateStaffFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>();

  const [updateStaff, { isLoading }] = useUpdateStaffMutation();

  useEffect(() => {
    if (staffData) {
      setValue("name", staffData.name);
      setValue("contact.email", staffData.contact.email);
      setValue("contact.phoneNumber", staffData.contact.phoneNumber);
      setValue("role", staffData.role);
      setValue("payroll.salary", staffData.payroll.salary);
    }
  }, [staffData, setValue]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((error) => {
        if (error?.message) {
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

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const updatedStaffData = {
        _id: staffData._id, // Include the staff ID for the update
        name: data.name,
        role: data.role,
        contact: {
          email: data.contact.email,
          phoneNumber: data.contact.phoneNumber,
        },
        payroll: {
          salary: data.payroll.salary,
        },
      };

      const response = await updateStaff(updatedStaffData).unwrap();
      if (response) {
        toast.success("Staff updated successfully", {
          position: "top-right",
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
        });
        closeModal();
      }
    } catch (error) {
      console.log(error);
      let errorMessage = "An error occurred while updating the staff.";
      if ((error as { status: number }).status === 404) {
        errorMessage = "Resource not found. Please check the endpoint.";
      } else if ((error as { data: { message: string } }).data?.message) {
        errorMessage = (error as { data: { message: string } }).data.message;
      }
      toast.error(errorMessage, {
        position: "top-right",
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormLabel>Name</FormLabel>
      <FormInput
        formInputType={FormInputTypes.modalInput}
        placeholder="Name"
        {...register("name", { required: "Name is required" })}
      />
      {errors.name && <ErrorText>{errors.name.message}</ErrorText>}

      <FormLabel>Email</FormLabel>
      <FormInput
        formInputType={FormInputTypes.modalInput}
        placeholder="Email"
        type="email"
        {...register("contact.email", { required: "Email is required" })}
      />
      {errors.contact?.email && (
        <ErrorText>{errors.contact.email.message}</ErrorText>
      )}

      <FormLabel>Phone Number</FormLabel>
      <FormInput
        formInputType={FormInputTypes.modalInput}
        placeholder="Phone Number"
        type="text"
        {...register("contact.phoneNumber", {
          required: "Phone number is required",
          pattern: {
            value: /^[+\d]?[0-9\s-]*$/,
            message:
              "Invalid phone number. Only numbers, spaces, dashes, and an optional leading '+' are allowed.",
          },
        })}
      />
      {errors.contact?.phoneNumber && (
        <ErrorText>{errors.contact.phoneNumber.message}</ErrorText>
      )}

      <FormLabel>Role</FormLabel>
      <FormSelect {...register("role", { required: "Role is required" })}>
        <option value="Coach">Coach</option>
        <option value="EquipmentManager">Equipment Manager</option>
        <option value="SalesManager">Sales Manager</option>
      </FormSelect>
      {errors.role && <ErrorText>{errors.role.message}</ErrorText>}

      <FormLabel>Salary</FormLabel>
      <FormInput
        formInputType={FormInputTypes.modalInput}
        placeholder="Salary"
        type="number"
        {...register("payroll.salary", {
          required: "Salary is required",
          valueAsNumber: true,
        })}
      />
      {errors.payroll?.salary && (
        <ErrorText>{errors.payroll.salary.message}</ErrorText>
      )}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Updating..." : "Update Staff"}
      </Button>
    </FormContainer>
  );
};

export default UpdateStaffForm;
