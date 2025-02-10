import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProgramMutation,
  useGetProgramByNameQuery,
} from "../../features/programs/programs.api.slice";
import Button from "../../components/button/button.component";
import { useState } from "react";
import Modal from "../../components/modal/modal.component";
import { StyledConfirmDeleteText } from "./program-details.styles";
import { toast } from "react-toastify";
import EditProgramForm from "../../components/Program-forms/edit-program-form.component";

const ProgramDetails = () => {
  const location = useLocation();
  const from = location.state?.from;
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [isEditProgramModalOpen, setisEditProgramModalOpen] = useState(false);
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
      if (response.message === "Program deleted") {
        toast.success("Program Successfully Deleted", {
          position: "top-right",
          closeOnClick: true,
          draggable: true,
        });
        setTimeout(() => {
          navigate(`/programs/${from}`, { replace: true });
        }, 1500);
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
      <Modal
        open={isConfirmDeleteModalOpen}
        closeModal={() => setIsConfirmDeleteModalOpen(false)}
      >
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
      <Modal
        open={isEditProgramModalOpen}
        closeModal={() => setisEditProgramModalOpen(false)}
        title="Edit Program"
      >
        <EditProgramForm
          program={program}
          from={from}
          toggleModalOpen={setisEditProgramModalOpen}
        />
      </Modal>
      <Button onClick={() => navigate(`/programs/${from}`)}>
        Back To All Programs
      </Button>
      <Button onClick={() => setisEditProgramModalOpen(true)}>
        Edit Program
      </Button>
      <Button
        redColored={true}
        onClick={() => setIsConfirmDeleteModalOpen(true)}
      >
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
        <strong>Monthly Price:</strong> ${program.monthlyPrice}
        <strong>Annual Price:</strong> ${program.annuallyPrice}
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
