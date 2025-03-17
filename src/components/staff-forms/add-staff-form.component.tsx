import { useForm, SubmitHandler } from "react-hook-form";
import { useAddStaffMutation } from "../../services/staff.services";
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
  password: string;
  payroll: {
    salary: number;
  };
};

const AddStaffForm = ({ closeModal }: { closeModal: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const [addStaff, { isLoading }] = useAddStaffMutation();

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
      const staffData = {
        name: data.name,
        role: data.role,
        contact: {
          email: data.contact.email,
          phoneNumber: data.contact.phoneNumber,
        },
        password: data.password,
        payroll: {
          salary: data.payroll.salary,
        },
      };

      const response = await addStaff(staffData).unwrap();
      if (response) {
        toast.success("Staff created successfully", {
          position: "top-right",
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
        });
        closeModal();
      }
    } catch (error) {
      console.log(error);
      toast.error((error as { data: { message: string } }).data.message, {
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

      <FormLabel>Password</FormLabel>
      <FormInput
        formInputType={FormInputTypes.modalInput}
        placeholder="Password"
        type="password"
        {...register("password", { required: "Password is required" })}
      />
      {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

      <FormLabel>Role</FormLabel>
      <FormSelect {...register("role", { required: "Role is required" })}>
        <option selected disabled>
          Select role
        </option>
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
        {isLoading ? "Adding..." : "Add Staff"}
      </Button>
    </FormContainer>
  );
};

export default AddStaffForm;
