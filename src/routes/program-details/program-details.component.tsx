import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProgramMutation,
  useGetProgramByNameQuery,
} from "../../features/programs/programs.api.slice";
import Button from "../../components/button/button.component";
import { useState } from "react";
import Modal from "../../components/modal/modal.component";
import { StyledConfirmDeleteText } from "./program-details.styles";
import { toast } from "react-toastify";

const ProgramDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { programName } = useParams();
  const navigate = useNavigate();
  const {
    data: program,
    isLoading,
    isError,
  } = useGetProgramByNameQuery({ programName });

  const [deleteProgram, { isLoading: isDeleting }] = useDeleteProgramMutation();

  const handleDelete = async (programID: string) => {
    try {
      const response = await deleteProgram(programID).unwrap();
      if (response) {
        navigate("/programs");
      }
    } catch (err) {
      if (err) {
        toast.error("something went wrong", {
          position: "top-right",
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
        });
      }
    }
  };

  if (isLoading) return <p>Loading program details...</p>;
  if (isError || !program) return <p>Failed to load program details.</p>;

  return (
    <div>
      <Modal open={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <StyledConfirmDeleteText>
            Do You Want To Delete This Program
          </StyledConfirmDeleteText>
          <Button
            redColored
            onClick={() => handleDelete(program._id)}
            isLoading={isDeleting}
          >
            Confirm Delete
          </Button>
        </div>
      </Modal>
      <Button onClick={() => navigate("/programs")}>
        Back To All Programs
      </Button>
      <Button>Edit Program</Button>
      <Button redColored={true} onClick={() => setIsModalOpen(true)}>
        Delete Program
      </Button>

      <img
        src={program.image}
        alt={program.programName}
        width="500px"
        height="500px"
      />
      <h2>{program.programName}</h2>
      <p>
        <strong>Description:</strong> {program.description}
      </p>
      <p>
        <strong>Price:</strong> ${program.monthlyPrice}
      </p>
      {program.exercises.map((excersie) => (
        <div key={excersie._id}>
          <hr />
          <p>{excersie.name}</p>
          <p>sets: {excersie.sets}</p>
          <p>repetitions: {excersie.repetitions}</p>
          <hr />
        </div>
      ))}
      <p>Number of participants: {program.registeredTrainees.length}</p>
      <h3>Schedule</h3>
      {program.schedule.map((day) => (
        <div key={day._id}>
          <p>Day: {day.day}</p>
          <p>Starts at: {day.startTime}</p>
          <p>Ends at: {day.endTime}</p>
        </div>
      ))}
    </div>
  );
};
export default ProgramDetails;
