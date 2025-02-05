import { useForm, useFieldArray } from "react-hook-form";
import FormInput from "../form-input/form-input.component";
import { FormInputTypes } from "../form-input/form-input.types";
import Button from "../button/button.component";

import {
  AddProgramFormContainer,
  StyledAddProgramForm,
  StyledExerciseAndScheduleContainer,
  StyledExerciseLablesContainer,
  StyledProgramDescriptionTextArea,
  StyledProgramFormsText,
  StyledSubmitText,
} from "./program-forms.styles";

type Exercise = {
  name: string;
  sets: number;
  repetitions: number;
};

type Schedule = {
  day: string;
  startTime: string;
  endTime: string;
};

type ProgramFormValues = {
  programName: string;
  exercises: Exercise[];
  description: string;
  image: string;
  monthlyPrice: number;
  annuallyPrice?: number;
  schedule: Schedule[];
};

const AddProgramForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProgramFormValues>({
    defaultValues: {
      exercises: [{ name: "", sets: undefined, repetitions: undefined }],
      schedule: [{ day: "", startTime: undefined, endTime: undefined }],
    },
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

  const onSubmit = (data: ProgramFormValues) => {
    console.log(data);
  };

  return (
    <AddProgramFormContainer>
      <StyledAddProgramForm onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          formInputType={FormInputTypes.modalInput}
          {...register("programName")}
          placeholder="Program Name"
        />
        {errors.programName && <p>Program name is required</p>}

        <StyledProgramDescriptionTextArea
          {...register("description")}
          placeholder="Program Description"
        />
        {errors.description && <p>Description is required</p>}

        <FormInput
          formInputType={FormInputTypes.modalInput}
          {...register("image")}
          placeholder="Image URL"
        />
        {errors.image && <p>Image URL is required</p>}

        <FormInput
          formInputType={FormInputTypes.modalInput}
          type="number"
          {...register("monthlyPrice")}
          placeholder="Monthly Price"
        />
        {errors.monthlyPrice && <p>Monthly price is required</p>}

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
            <FormInput
              formInputType={FormInputTypes.modalInput}
              {...register(`schedule.${index}.day`)}
              placeholder="Day"
            />
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
            <StyledSubmitText>Submit</StyledSubmitText>
          </Button>
        </div>
      </StyledAddProgramForm>
    </AddProgramFormContainer>
  );
};

export default AddProgramForm;
