import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProgramMutation,
  useGetProgramByNameQuery,
} from "../../services/programs.services";
import { toast } from "react-toastify";
import Button from "../../components/button/button.component";
import Modal from "../../components/modal/modal.component";
import EditProgramForm from "../../components/Program-forms/edit-program-form.component";
import {
  ProgramDetailsContainer,
  ProgramImage,
  ProgramInfo,
  ProgramDescription,
  ButtonGroup,
  StyledConfirmDeleteText,
  DeleteModalContent,
  ExerciseContainer,
  ScheduleContainer,
  SkeletonContainer,
  SkeletonImage,
  SkeletonText,
} from "./program-details.styles";

const ProgramDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { programName } = useParams();
  const from = location.state?.from;

  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [isEditProgramModalOpen, setIsEditProgramModalOpen] = useState(false);

  const {
    data: programData,
    isLoading,
    isError,
  } = useGetProgramByNameQuery({ programName });
  const program = programData?.data;
  const [deleteProgram, { isLoading: isDeleting }] = useDeleteProgramMutation();

  if (isLoading) {
    return (
      <ProgramDetailsContainer>
        <SkeletonContainer>
          <SkeletonImage />
          <SkeletonText $width="60%" />
          <SkeletonText $width="40%" />
          <SkeletonText $width="80%" />
        </SkeletonContainer>
      </ProgramDetailsContainer>
    );
  }

  if (isError || !program) return <p>Something went wrong</p>;

  const handleDelete = async () => {
    try {
      await deleteProgram(program._id).unwrap();
      navigate(`/programs/${from}`, { replace: true });
      setTimeout(() => toast.success("Program Successfully Deleted"), 500);
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <ProgramDetailsContainer>
      <ButtonGroup>
        <Button onClick={() => navigate(`/programs/${from}`)}>
          Back to All Programs
        </Button>
        <Button onClick={() => setIsEditProgramModalOpen(true)}>
          Edit Program
        </Button>
        <Button redColored onClick={() => setIsConfirmDeleteModalOpen(true)}>
          Delete Program
        </Button>
      </ButtonGroup>

      <Modal
        open={isEditProgramModalOpen}
        closeModal={() => setIsEditProgramModalOpen(false)}
        title="Edit Program"
      >
        <EditProgramForm
          program={program}
          from={from}
          toggleModalOpen={setIsEditProgramModalOpen}
        />
      </Modal>

      <Modal
        open={isConfirmDeleteModalOpen}
        closeModal={() => setIsConfirmDeleteModalOpen(false)}
      >
        <DeleteModalContent>
          <StyledConfirmDeleteText>
            Do you want to delete this program?
          </StyledConfirmDeleteText>
          <Button redColored onClick={handleDelete} isLoading={isDeleting}>
            Confirm Delete
          </Button>
        </DeleteModalContent>
      </Modal>

      <ProgramImage src={program.image} alt={program.programName} />
      <ProgramInfo>
        <p>
          <strong>Program Name:</strong> {program.programName}
        </p>
        <p>
          <strong>Monthly Price:</strong> ${program.monthlyPrice}
        </p>
        <p>
          <strong>Annual Price:</strong> ${program.annuallyPrice}
        </p>
        <p>
          <strong>Number of Participants:</strong>{" "}
          {program.registeredTrainees.length}
        </p>
      </ProgramInfo>
      <ProgramDescription>
        <strong>Description:</strong> {program.description}
      </ProgramDescription>

      <h3>Exercises</h3>
      {program.exercises.map((exercise) => (
        <ExerciseContainer key={exercise._id}>
          <p>
            <strong>Name:</strong> {exercise.name}
          </p>
          <p>
            <strong>Sets:</strong> {exercise.sets}
          </p>
          <p>
            <strong>Repetitions:</strong> {exercise.repetitions}
          </p>
        </ExerciseContainer>
      ))}

      <h3>Schedule</h3>
      {program.schedule.map((day) => (
        <ScheduleContainer key={day._id}>
          <p>
            <strong>Day:</strong> {day.day}
          </p>
          <p>
            <strong>Starts at:</strong> {day.startTime}
          </p>
          <p>
            <strong>Ends at:</strong> {day.endTime}
          </p>
        </ScheduleContainer>
      ))}
    </ProgramDetailsContainer>
  );
};

export default ProgramDetails;
