import {
  EquipmentDetailsContainer,
  StyledEquipmentInfo,
  StyledImage,
  StyledModalContent,
  StyledButtonGroup,
  StyledEquipmentSkeletonContainer,
  StyledEquipmentSkeletonImage,
  StyledEquipmentSkeletonBox,
} from "./equipment-details.styles";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteEquipmentMutation,
  useGetEquipmentByIdQuery,
} from "../../services/equipment.services";
import Button from "../../components/button/button.component";
import { useState } from "react";
import Modal from "../../components/modal/modal.component";
import { StyledConfirmDeleteText } from "../program-details/program-details.styles";
import { toast } from "react-toastify";
import EditEquipmentForm from "../../components/equipment-forms/edit-equipment-form";

const EquipmentDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [isEditEquipmentModalOpen, setIsEditEquipmentModalOpen] =
    useState(false);

  const { equipmentId } = useParams();
  const from = location.state?.from;
  const {
    data: equipmentData,
    isLoading,
    isError,
  } = useGetEquipmentByIdQuery({ id: equipmentId });
  const equipment = equipmentData?.data;

  const [deleteEquipment, { isLoading: isDeleting }] =
    useDeleteEquipmentMutation();

  const handleDelete = async (equipmentID: string) => {
    try {
      await deleteEquipment(equipmentID).unwrap();

      navigate(`/equipment/${from}`, { replace: true });

      setTimeout(() => {
        toast.success("Equipment Successfully Deleted", {
          position: "top-right",
          closeOnClick: true,
          draggable: true,
        });
      }, 500);
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

  if (isLoading)
    return (
      <StyledEquipmentSkeletonContainer>
        <StyledEquipmentSkeletonImage />
        <StyledEquipmentSkeletonBox $width="55%" />
        <StyledEquipmentSkeletonBox $width="40%" />
        <StyledEquipmentSkeletonBox $width="50%" />
        <StyledEquipmentSkeletonBox $width="40%" />
        <StyledEquipmentSkeletonBox $width="30%" />
      </StyledEquipmentSkeletonContainer>
    );
  if (isError || !equipment) return <p>something went wrong</p>;

  return (
    <EquipmentDetailsContainer>
      <StyledButtonGroup>
        <Button onClick={() => navigate(`/equipment/${from}`)}>
          Back to All Equipment
        </Button>
        <Button onClick={() => setIsEditEquipmentModalOpen(true)}>
          Edit Equipment Details
        </Button>
      </StyledButtonGroup>
      <Modal
        open={isEditEquipmentModalOpen}
        closeModal={() => setIsEditEquipmentModalOpen(false)}
        title="Edit Equipment Details"
      >
        <EditEquipmentForm
          toggleModalOpen={setIsEditEquipmentModalOpen}
          equipment={equipment}
        />
      </Modal>
      <Button redColored onClick={() => setIsConfirmDeleteModalOpen(true)}>
        Delete Equipment
      </Button>
      <Modal
        open={isConfirmDeleteModalOpen}
        closeModal={() => setIsConfirmDeleteModalOpen(false)}
      >
        <StyledModalContent>
          <StyledConfirmDeleteText>
            Do You Want To Delete This Equipment?
          </StyledConfirmDeleteText>
          <Button
            redColored
            onClick={() => handleDelete(equipment._id)}
            isLoading={isDeleting}
          >
            Confirm Delete
          </Button>
        </StyledModalContent>
      </Modal>
      <StyledEquipmentInfo key={equipment._id}>
        <p>
          Equipment Name: <span>{equipment.name}</span>
        </p>
        <p>
          Quantity: <span>{equipment.quantity}</span>
        </p>
        <p>
          Type: <span>{equipment.type}</span>
        </p>
        <p>
          Status: <span>{equipment.status}</span>
        </p>
        <StyledImage src={equipment.image} alt="equipment-image" />
      </StyledEquipmentInfo>
    </EquipmentDetailsContainer>
  );
};

export default EquipmentDetails;
