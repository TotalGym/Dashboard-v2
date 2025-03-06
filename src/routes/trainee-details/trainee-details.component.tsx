import { useParams } from "react-router-dom";
import { useGetTraineeDataByIdQuery } from "../../features/trainees/trainees.api.slice";
import {
  TraineeDetailsContainer,
  StyledInfoContainer,
  Label,
  Value,
  StyledSkeleton,
  StyledDetailsContainer,
} from "./trainee-details.styles";
import Button from "../../components/button/button.component";

const TraineeDetails = () => {
  const { traineeID } = useParams<{ traineeID: string }>();
  const { data, isLoading } = useGetTraineeDataByIdQuery({ id: traineeID! });

  if (isLoading) {
    return <StyledSkeleton>Loading trainee details...</StyledSkeleton>;
  }

  if (!data?.data) {
    return <TraineeDetailsContainer>No trainee found.</TraineeDetailsContainer>;
  }

  const trainee = data.data;

  return (
    <TraineeDetailsContainer>
      <div
        style={{
          display: "flex",
          gap: "1em",
        }}
      >
        <Button>Edit Trainee Data</Button>
        <Button redColored>Delete Trainee</Button>
      </div>
      <StyledDetailsContainer>
        <h1>{trainee.name}</h1>
        <StyledInfoContainer>
          <Label>Email:</Label>
          <Value>{trainee.contact.email}</Value>
        </StyledInfoContainer>
        <StyledInfoContainer>
          <Label>Phone Number:</Label>
          <Value>{trainee.contact.phoneNumber}</Value>
        </StyledInfoContainer>
        <StyledInfoContainer>
          <Label>Gender:</Label>
          <Value>{trainee.gender}</Value>
        </StyledInfoContainer>
        <StyledInfoContainer>
          <Label>Status:</Label>
          <Value>{trainee.status}</Value>
        </StyledInfoContainer>
        <StyledInfoContainer>
          <Label>Subscription Type:</Label>
          <Value>{trainee.subscriptionType}</Value>
        </StyledInfoContainer>
        <StyledInfoContainer>
          <Label>Assigned Coaches:</Label>
          <Value>{trainee.assignedCoach.join(", ") || "None"}</Value>
        </StyledInfoContainer>
        <StyledInfoContainer>
          <Label>Created At:</Label>
          <Value>{new Date(trainee.createdAt).toLocaleDateString()}</Value>
        </StyledInfoContainer>
      </StyledDetailsContainer>
    </TraineeDetailsContainer>
  );
};

export default TraineeDetails;
