import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import FormInput from "../form-input/form-input.component";
import { FormInputTypes } from "../form-input/form-input.types";
import Button from "../button/button.component";

import {
  AddProgramFormContainer,
  StyledAddProgramForm,
  StyledDaySelect,
  StyledExerciseAndScheduleContainer,
  StyledExerciseLablesContainer,
  StyledProgramDescriptionTextArea,
  StyledProgramFormsText,
  StyledSubmitText,
} from "./program-forms.styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { addNewProgramSchema } from "../../utils/yup/yup.utils";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { MessagedError } from "../../types/error.types";
import { useAddProgramMutation } from "../../features/programs/programs.api.slice";

type Exercise = {
  _id?: string;
  name: string;
  sets: number;
  repetitions: number;
};

type Schedule = {
  _id?: string;
  day: string;
  startTime: string;
  endTime: string;
};

export type ProgramFormInputs = {
  programName: string;
  exercises: Exercise[];
  description: string;
  image: string;
  monthlyPrice: number;
  annuallyPrice: number;
  schedule: Schedule[];
};

export const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const AddProgramForm = ({
  toggleModalOpen,
}: {
  toggleModalOpen: (close: boolean) => void;
}) => {
  const [addProgram, { isLoading }] = useAddProgramMutation();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProgramFormInputs>({
    defaultValues: {
      exercises: [{ name: "", sets: undefined, repetitions: undefined }],
      schedule: [{ day: "", startTime: undefined, endTime: undefined }],
    },
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
    try {
      const response = await addProgram(data).unwrap();
      if (response) {
        toast.success("Program Added Successfully", {
          position: "top-right",
          closeOnClick: true,
          autoClose: 1000,
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
              disabled={exerciseFields.length === 1}
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
          disabled={exerciseFields.length === 6}
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
              disabled={scheduleFields.length === 1}
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
          disabled={scheduleFields.length === 7}
        >
          Add Schedule
        </Button>

        <div
          style={{
            alignSelf: "center",
          }}
        >
          <Button type="submit" width="250px">
            <StyledSubmitText>
              {isLoading ? "Loading..." : "Submit"}
            </StyledSubmitText>
          </Button>
        </div>
      </StyledAddProgramForm>
    </AddProgramFormContainer>
  );
};

export default AddProgramForm;
