import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useUpdateProgramMutation } from "../../services/programs.services";
import { Program } from "../../types/programs.types";
import { daysOfWeek, ProgramFormInputs } from "./add-program-form.component";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  AddProgramFormContainer,
  StyledAddProgramForm,
  StyledDaySelect,
  StyledExerciseAndScheduleContainer,
  StyledExerciseLablesContainer,
  StyledProgramDescriptionTextArea,
  StyledProgramFormsText,
  StyledSubmitButtonContainer,
  StyledSubmitText,
} from "./program-forms.styles";
import FormInput from "../form-input/form-input.component";
import { FormInputTypes } from "../form-input/form-input.types";
import Button from "../button/button.component";
import { yupResolver } from "@hookform/resolvers/yup";
import { addNewProgramSchema } from "../../utils/yup/yup.utils";
import { MessagedError } from "../../types/error.types";
import { useNavigate } from "react-router-dom";

type EditProgramFormProps = {
  program: Program;
  from: string;
  toggleModalOpen: (close: boolean) => void;
};

const EditProgramForm = ({
  program,
  from,
  toggleModalOpen,
}: EditProgramFormProps) => {
  const navigate = useNavigate();
  const [updateProgram, { isLoading }] = useUpdateProgramMutation();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProgramFormInputs>({
    defaultValues: program,
    resolver: yupResolver(addNewProgramSchema),
  });

  const {
    fields: exerciseFields,
    append: appendExercise,
    remove: removeExercise,
  } = useFieldArray({ control, name: "exercises" });
  const {
    fields: scheduleFields,
    append: appendSchedule,
    remove: removeSchedule,
  } = useFieldArray({ control, name: "schedule" });

  const onSubmit: SubmitHandler<ProgramFormInputs> = async (data) => {
    const updatedData: Partial<Program> = {};

    if (data.programName !== program.programName)
      updatedData.programName = data.programName;
    if (data.description !== program.description)
      updatedData.description = data.description;
    if (data.monthlyPrice !== program.monthlyPrice)
      updatedData.monthlyPrice = data.monthlyPrice;
    if (data.annuallyPrice !== program.annuallyPrice)
      updatedData.annuallyPrice = data.annuallyPrice;
    if (data.image !== program.image) updatedData.image = data.image;
    if (
      data.exercises.length !== program.exercises.length ||
      JSON.stringify(data.exercises) !== JSON.stringify(program.exercises)
    ) {
      updatedData.exercises = data.exercises;
    }
    if (
      data.schedule.length !== program.schedule.length ||
      JSON.stringify(data.schedule) !== JSON.stringify(program.schedule)
    ) {
      updatedData.schedule = data.schedule;
    }

    try {
      const response = await updateProgram({
        programID: program._id,
        updatedFields: updatedData,
      }).unwrap();
      if (response) {
        toast.success("Program updated successfully");

        if (data.programName !== program.programName) {
          navigate(`/programsDetails/${data.programName}`, {
            replace: true,
            state: { from: from },
          });
        }
      }
      setTimeout(() => toggleModalOpen(false), 1000);
    } catch (error) {
      if (error) toast.error("Failed to update program");
      reset(program);
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
    <AddProgramFormContainer>
      <StyledAddProgramForm onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          formInputType={FormInputTypes.modalInput}
          {...register("programName")}
          placeholder="Program Name"
        />
        <StyledProgramDescriptionTextArea
          {...register("description")}
          placeholder="Program Description"
        />
        <FormInput
          formInputType={FormInputTypes.modalInput}
          {...register("image")}
          placeholder="Image URL"
        />

        <FormInput
          formInputType={FormInputTypes.modalInput}
          type="number"
          {...register("monthlyPrice")}
          placeholder="Monthly Price"
        />
        <FormInput
          formInputType={FormInputTypes.modalInput}
          type="number"
          {...register("annuallyPrice")}
          placeholder="Annually Price"
        />

        <StyledExerciseLablesContainer>
          <StyledProgramFormsText>Exercises</StyledProgramFormsText>
          <StyledProgramFormsText>Sets</StyledProgramFormsText>
          <StyledProgramFormsText>Repetitions</StyledProgramFormsText>
        </StyledExerciseLablesContainer>
        {exerciseFields.map((exercise, index) => (
          <StyledExerciseAndScheduleContainer key={exercise.id}>
            <FormInput
              formInputType={FormInputTypes.modalInput}
              {...register(`exercises.${index}.name`)}
              placeholder="Exercise Name"
            />
            <FormInput
              formInputType={FormInputTypes.modalInput}
              type="number"
              {...register(`exercises.${index}.sets`)}
              placeholder="Sets"
            />
            <FormInput
              formInputType={FormInputTypes.modalInput}
              type="number"
              {...register(`exercises.${index}.repetitions`)}
              placeholder="Repetitions"
            />
            <Button
              width="100px"
              type="button"
              onClick={() => removeExercise(index)}
              disable={exerciseFields.length === 1}
            >
              Remove
            </Button>
          </StyledExerciseAndScheduleContainer>
        ))}
        <Button
          type="button"
          width="150px"
          onClick={() => {
            if (exerciseFields.length < 6) {
              appendExercise({ name: "", sets: 0, repetitions: 0 });
            }
          }}
          disable={exerciseFields.length === 6}
        >
          Add Exercise
        </Button>

        <StyledProgramFormsText>Schedule</StyledProgramFormsText>
        {scheduleFields.map((schedule, index) => (
          <StyledExerciseAndScheduleContainer key={schedule.id}>
            <StyledDaySelect
              {...register(`schedule.${index}.day`)}
              defaultValue=""
            >
              <option value="" disabled>
                Select a day
              </option>
              {daysOfWeek.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </StyledDaySelect>
            <FormInput
              formInputType={FormInputTypes.modalInput}
              type="time"
              {...register(`schedule.${index}.startTime`)}
              label="Start Time"
            />
            <FormInput
              formInputType={FormInputTypes.modalInput}
              type="time"
              {...register(`schedule.${index}.endTime`)}
              label="End Time"
            />
            <Button
              width="100px"
              type="button"
              onClick={() => removeSchedule(index)}
              disable={scheduleFields.length === 1}
            >
              Remove
            </Button>
          </StyledExerciseAndScheduleContainer>
        ))}
        <Button
          type="button"
          width="150px"
          onClick={() => {
            if (scheduleFields.length < 7) {
              appendSchedule({ day: "", startTime: "", endTime: "" });
            }
          }}
          disable={scheduleFields.length === 7}
        >
          Add Schedule
        </Button>

        <StyledSubmitButtonContainer>
          <Button type="submit" width="250px" disable={!isDirty || isLoading}>
            <StyledSubmitText>
              {isLoading ? "Loading..." : "Update"}
            </StyledSubmitText>
          </Button>
        </StyledSubmitButtonContainer>
      </StyledAddProgramForm>
    </AddProgramFormContainer>
  );
};
export default EditProgramForm;
