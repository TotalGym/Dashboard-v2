import { useNavigate, useParams } from "react-router-dom";
import { useGetProgramByNameQuery } from "../../features/programs/programs.api.slice";
import Button from "../../components/button/button.component";

const ProgramDetails = () => {
  const { programName } = useParams();
  const navigate = useNavigate();
  const {
    data: program,
    isLoading,
    isError,
  } = useGetProgramByNameQuery({ programName });

  if (isLoading) return <p>Loading program details...</p>;
  if (isError || !program) return <p>Failed to load program details.</p>;

  return (
    <div>
      <Button onClick={() => navigate("/programs")}>
        Back To All Programs
      </Button>
      <Button>Edit Program</Button>

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
