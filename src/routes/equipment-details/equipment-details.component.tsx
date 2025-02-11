import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteEquipmentMutation,
  useGetEquipmentByIdQuery,
} from "../../features/equipment/equipment.api.slice";
import Button from "../../components/button/button.component";
import { useState } from "react";
import Modal from "../../components/modal/modal.component";
import { StyledConfirmDeleteText } from "../program-details/program-details.styles";
import { toast } from "react-toastify";

const EquipmentDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
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

  if (isLoading) return <p>Loading...</p>;

  if (isError || !equipment) return <p>something went wrong</p>;

  return (
    <>
      <Button onClick={() => navigate(`/equipment/${from}`)}>
        Back to All Equipment
      </Button>
      //todo: handle equipment edit
      <Button>Edit Equipment Details</Button>
      <Button redColored onClick={() => setIsConfirmDeleteModalOpen(true)}>
        Delete Equipment
      </Button>
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
            Do You Want To Delete This Equipment
          </StyledConfirmDeleteText>
          <Button
            redColored
            onClick={() => handleDelete(equipment._id)}
            isLoading={isDeleting}
          >
            Confirm Delete
          </Button>
        </div>
      </Modal>
      <div
        key={equipment._id}
        style={{
          cursor: "pointer",
        }}
      >
        <p>{equipment.name}</p>
        <p>{equipment.quantity}</p>
        <p>{equipment.type}</p>
        <p>{equipment.status}</p>
        <img
          src={equipment.image}
          alt="equipment-image"
          width={500}
          height={500}
        />
      </div>
    </>
  );
};
export default EquipmentDetails;
