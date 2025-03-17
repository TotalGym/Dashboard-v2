import { yupResolver } from "@hookform/resolvers/yup";
import { editTraineeSchema } from "../../utils/yup/yup.utils";
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
  useEditTraineeMutation,
} from "../../services/trainee.services";

export type TraineeFormInputs = {
  name: string;
  email: string;
  password?: string;
  phoneNumber: string;
  gender: string;
  subscriptionType: string;
  selectedProgram?: string;
  assignedCoach?: string;
};

const EditTraineeForm = ({
  traineeID,
  toggleModalOpen,
  initialData,
}: {
  traineeID: string;
  toggleModalOpen: (close: boolean) => void;
  initialData: TraineeFormInputs;
}) => {
  const availablePrograms = useAppSelector(selectPrograms);
  const availableCoaches = useAppSelector(selectAvailabelCoaches);
  const [editTrainee, { isLoading }] = useEditTraineeMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<TraineeFormInputs>({
    resolver: yupResolver(editTraineeSchema),
    defaultValues: initialData,
  });

  const onSubmit: SubmitHandler<TraineeFormInputs> = async (data) => {
    const updatedFields: Partial<AddTraineeRequest> = {};

    if (data.name !== initialData.name) updatedFields.name = data.name;
    if (data.email !== initialData.email)
      updatedFields.contact = { ...updatedFields.contact!, email: data.email };
    if (data.phoneNumber !== initialData.phoneNumber)
      updatedFields.contact = {
        ...updatedFields.contact!,
        phoneNumber: data.phoneNumber,
      };
    if (data.password !== initialData.password)
      updatedFields.password = data.password;
    if (data.gender !== initialData.gender) updatedFields.gender = data.gender;
    if (data.subscriptionType !== initialData.subscriptionType)
      updatedFields.subscriptionType = data.subscriptionType;
    if (data.selectedProgram !== initialData.selectedProgram)
      updatedFields.selectedPrograms = data.selectedProgram
        ? [data.selectedProgram]
        : [];
    if (data.assignedCoach !== initialData.assignedCoach)
      updatedFields.assignedCoach = data.assignedCoach;

    try {
      if (Object.keys(updatedFields).length > 0) {
        await editTrainee({ traineeID, updatedFields }).unwrap();
        toast.success("Trainee updated successfully!");
        reset();
        toggleModalOpen(false);
      } else {
        toast.info("No changes detected.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update trainee");
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
          <option value="" disabled>
            Select Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select {...register("subscriptionType")}>
          <option value="" disabled>
            Subscription Type
          </option>
          <option value="monthly">Monthly</option>
          <option value="annually">Annually</option>
        </select>
        <select {...register("selectedProgram")}>
          <option value="" disabled>
            Select Program
          </option>
          {availablePrograms?.map((program) => (
            <option key={program._id} value={program._id}>
              {program.programName}
            </option>
          ))}
        </select>
        <select {...register("assignedCoach")}>
          <option value="" disabled>
            Select Coach
          </option>
          {availableCoaches?.map((coach) => (
            <option key={coach._id} value={coach._id}>
              {coach.name}
            </option>
          ))}
        </select>
        <Button type="submit" disabled={isLoading || !isDirty}>
          {isLoading ? "Updating..." : "Update Trainee"}
        </Button>
      </StyledTraineeForm>
    </TraineeFormContainer>
  );
};

export default EditTraineeForm;
