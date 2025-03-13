import { useForm, SubmitHandler } from "react-hook-form";
import { Roles } from "../../types/staff.types";
import { useAddStaffMutation } from "../../features/staff/staff.api.slice";
import Button from "../../components/button/button.component";
import { toast } from "react-toastify";
import FormInput from "../form-input/form-input.component";
import { FormInputTypes } from "../form-input/form-input.types";
import { FormContainer, FormLabel, FormSelect } from "./staff-forms.styles";
import { useEffect } from "react";

type FormInputs = {
  name: string;
  contact: {
    email: string;
    phoneNumber: string;
  };
  role: Roles;
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

      <FormLabel>Email</FormLabel>
      <FormInput
        formInputType={FormInputTypes.modalInput}
        placeholder="Email"
        type="email"
        {...register("contact.email", { required: "Email is required" })}
      />

      <FormLabel>Phone Number</FormLabel>
      <FormInput
        formInputType={FormInputTypes.modalInput}
        placeholder="Phone Number"
        type="text"
        {...register("contact.phoneNumber", {
          required: "Phone number is required",
        })}
      />

      <FormLabel>Password</FormLabel>
      <FormInput
        formInputType={FormInputTypes.modalInput}
        placeholder="Password"
        type="password"
        {...register("password", { required: "Password is required" })}
      />

      <FormLabel>Role</FormLabel>
      <FormSelect {...register("role", { required: "Role is required" })}>
        {Object.values(Roles).map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </FormSelect>

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

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Adding..." : "Add Staff"}
      </Button>
    </FormContainer>
  );
};

export default AddStaffForm;
