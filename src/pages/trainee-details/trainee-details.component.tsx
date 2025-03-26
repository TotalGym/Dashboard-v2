import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteTraineeMutation,
  useGetTraineeDataByIdQuery,
} from "../../services/trainee.services";
import {
  TraineeDetailsContainer,
  StyledInfoContainer,
  Label,
  Value,
  StyledSkeleton,
  StyledDetailsContainer,
  StyledButtonsContainer,
  StyledP,
} from "./trainee-details.styles";
import Button from "../../components/button/button.component";
import { useState } from "react";
import Modal from "../../components/modal/modal.component";
import EditTraineeForm from "../../components/trainee-forms/edit-trainee.form";
import { TraineeFormInputs } from "../../components/trainee-forms/edit-trainee.form";
import { useAppSelector } from "../../app/hooks";
import { selectAvailabelCoaches } from "../../features/staff/staff.slice";
import { StyledProductDeleteModalContent } from "../product-details/product-details.styles";
import { StyledConfirmDeleteText } from "../program-details/program-details.styles";
import { toast } from "react-toastify";
import { useCreatePaymentMutation } from "../../services/payment.services";

const TraineeDetails = () => {
  const navigate = useNavigate();
  const coaches = useAppSelector(selectAvailabelCoaches);
  const { traineeID } = useParams<{ traineeID: string }>();
  const { data, isLoading } = useGetTraineeDataByIdQuery({ id: traineeID! });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const [deleteTrainee, { isLoading: isDeleting }] = useDeleteTraineeMutation();
  const [createPayment, { isLoading: isPaying }] = useCreatePaymentMutation();

  if (isLoading) {
    return <StyledSkeleton>Loading trainee details...</StyledSkeleton>;
  }

  if (!data?.data) {
    return <TraineeDetailsContainer>No trainee found.</TraineeDetailsContainer>;
  }

  const trainee = data.data;

  const coach = coaches?.filter(
    (coach) => coach._id === trainee.assignedCoach
  )[0]?.name;

  const initialFormData: TraineeFormInputs = {
    name: trainee.name,
    email: trainee.contact.email,
    password: "",
    phoneNumber: trainee.contact.phoneNumber,
    gender: trainee.gender,
    subscriptionType: trainee.subscriptionType,
    selectedProgram: trainee.selectedPrograms[0]?._id || "",
    assignedCoach: trainee.assignedCoach || "",
  };

  const handleDelete = async () => {
    try {
      await deleteTrainee(trainee._id).unwrap();
      navigate(`/trainees`);
      setTimeout(() => toast.success("Trainee Successfully Deleted"), 500);
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handlePayment = async () => {
    try {
      const res = await createPayment({
        TraineeID: trainee._id,
        ProgramID: trainee.selectedPrograms[0]._id,
      }).unwrap();
      if (res.success) {
        setIsCheckoutModalOpen(false);
        toast.success("payment created successfuly");
      }
    } catch {
      setIsCheckoutModalOpen(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <TraineeDetailsContainer>
      <StyledButtonsContainer>
        <Link to={"/trainees"}>
          <Button>Back to all Trainees</Button>
        </Link>
        <Button onClick={() => setIsEditModalOpen(true)}>
          Edit Trainee Data
        </Button>
        <Button onClick={() => setIsCheckoutModalOpen(true)}>Checkout</Button>
        <Button redColored onClick={() => setIsDeleteModalOpen(true)}>
          Delete Trainee
        </Button>
      </StyledButtonsContainer>
      <Modal
        open={isDeleteModalOpen}
        closeModal={() => setIsDeleteModalOpen(false)}
      >
        <StyledProductDeleteModalContent>
          <StyledConfirmDeleteText>
            Do you want to delete this product?
          </StyledConfirmDeleteText>
          <Button redColored onClick={handleDelete} isLoading={isDeleting}>
            Confirm Delete
          </Button>
        </StyledProductDeleteModalContent>
      </Modal>
      <Modal
        open={isEditModalOpen}
        closeModal={() => setIsEditModalOpen(false)}
        title="Edit Trainee Data"
      >
        <EditTraineeForm
          initialData={initialFormData}
          toggleModalOpen={setIsEditModalOpen}
          traineeID={trainee._id}
        />
      </Modal>
      <Modal
        open={isCheckoutModalOpen}
        closeModal={() => setIsCheckoutModalOpen(false)}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
            alignItems: "center",
            gap: "1em",
            padding: "2em",
            width: "100%",
          }}
        >
          {trainee.paymentVerification ? (
            <p
              style={{
                color: "red",
              }}
            >
              Trainee Already checked out
            </p>
          ) : (
            <StyledP>Are You Sure You Want To Checkout Trainee</StyledP>
          )}
          <Button
            width="280px"
            onClick={handlePayment}
            isLoading={isPaying}
            disable={trainee.paymentVerification}
          >
            Checkout
          </Button>
        </div>
      </Modal>
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
          <Label>Assigned Coache:</Label>
          <Value>{coach || "N/A"}</Value>
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
