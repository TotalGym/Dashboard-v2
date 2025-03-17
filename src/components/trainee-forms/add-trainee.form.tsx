import { yupResolver } from "@hookform/resolvers/yup";
import { traineeSchema } from "../../utils/yup/yup.utils";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect } from "react";
import {
  TraineeFormContainer,
  StyledTraineeForm,
} from "./trainee-forms.styles";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { FormInputTypes } from "../form-input/form-input.types";
import { useAppSelector } from "../../app/hooks";
import { selectPrograms } from "../../features/programs/programs.slice";
import { selectAvailabelCoaches } from "../../features/staff/staff.slice";
import {
  AddTraineeRequest,
  useAddTraineMutation,
} from "../../services/trainee.services";

export type TraineeFormInputs = {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: string;
  subscriptionType: string;
  selectedProgram?: string;
  assignedCoach?: string;
};

const AddTraineeForm = ({
  toggleModalOpen,
}: {
  toggleModalOpen: (close: boolean) => void;
}) => {
  const availablePrograms = useAppSelector(selectPrograms);
  const availableCoaches = useAppSelector(selectAvailabelCoaches);
  const [addTrainee, { isLoading }] = useAddTraineMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TraineeFormInputs>({
    resolver: yupResolver(traineeSchema),
  });

  const onSubmit: SubmitHandler<TraineeFormInputs> = async (data) => {
    try {
      const traineeData: AddTraineeRequest = {
        name: data.name,
        contact: {
          email: data.email,
          phoneNumber: data.phoneNumber,
        },
        password: data.password,
        gender: data.gender,
        subscriptionType: data.subscriptionType,
        selectedPrograms: data.selectedProgram ? [data.selectedProgram] : [],
        assignedCoach: data.assignedCoach || undefined,
      };

      await addTrainee(traineeData).unwrap();
      toast.success("Trainee added successfully!");
      reset();
      toggleModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to add trainee");
    }
  };

  useEffect(() => {
    Object.values(errors).forEach((error) => {
      if (error?.message) toast.error(error.message);
    });
  }, [errors]);

  return (
    <TraineeFormContainer>
      <StyledTraineeForm onSubmit={handleSubmit(onSubmit)}>
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
          {...register("password")}
          type="password"
          formInputType={FormInputTypes.modalInput}
        />
        <FormInput
          placeholder="Phone Number"
          {...register("phoneNumber")}
          formInputType={FormInputTypes.modalInput}
        />
        <select {...register("gender")}>
          <option value="" disabled selected>
            Select Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select {...register("subscriptionType")}>
          <option value="" disabled selected>
            Subscription Type
          </option>
          <option value="monthly">Monthly</option>
          <option value="annually">Annually</option>
        </select>
        <select {...register("selectedProgram")}>
          <option value="" disabled selected>
            Select Program
          </option>
          {availablePrograms?.map((program) => (
            <option key={program._id} value={program._id}>
              {program.programName}
            </option>
          ))}
        </select>
        <select {...register("assignedCoach")}>
          <option value="" disabled selected>
            Select Coach
          </option>
          {availableCoaches?.map((coach) => (
            <option key={coach._id} value={coach._id}>
              {coach.name}
            </option>
          ))}
        </select>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Trainee"}
        </Button>
      </StyledTraineeForm>
    </TraineeFormContainer>
  );
};

export default AddTraineeForm;
