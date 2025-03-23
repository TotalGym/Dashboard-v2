import { useState } from "react";
import Button from "../../components/button/button.component";
import Modal from "../../components/modal/modal.component";
import { useGetAllEquipmentQuery } from "../../services/equipment.services";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ButtonTypes } from "../../components/button/button.types";
import AddEquipmentForm from "../../components/equipment-forms/add-equipment-form";
import {
  EquipmentManagementContainer,
  StyledEquipmentGrid,
  StyledEquipmentCard,
  StyledEquipmentSkeletonCard,
  StyledEquipmenmtPaginationContainer,
} from "./equipment-management.styles";

const EquipmentManagement = () => {
  const navigate = useNavigate();
  const { equipmentPage } = useParams();
  const pageNumber = Number(equipmentPage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: equipments,
    isLoading,
    isFetching,
    isError,
  } = useGetAllEquipmentQuery({
    limit: 10,
    page: pageNumber,
  });

  if (isError) return <p>Something went wrong</p>;

  const numberOfPages = Math.ceil((equipments?.data.totalCount || 0) / 10);
  const pagesArray = Array.from(
    { length: numberOfPages },
    (_, index) => index + 1
  );

  if (equipments?.data.results.length === 0) {
    return <Navigate to={"/equipment/1"} replace />;
  }

  return (
    <EquipmentManagementContainer>
      <Button onClick={() => setIsModalOpen(true)}>Add New Equipment</Button>
      <Modal
        open={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        title="Add New Equipment"
      >
        <AddEquipmentForm toggleModalOpen={setIsModalOpen} />
      </Modal>

      <StyledEquipmentGrid>
        {isLoading || isFetching
          ? Array.from({ length: 6 }).map((_, index) => (
              <StyledEquipmentSkeletonCard key={index} />
            ))
          : equipments?.data.results.map((equipment) => (
              <StyledEquipmentCard
                key={equipment._id}
                onClick={() =>
                  navigate(`/equipmentDetails/${equipment._id}`, {
                    state: { from: pageNumber },
                  })
                }
              >
                <p>
                  <strong>Name:</strong> {equipment.name}
                </p>
                <p>
                  <strong>Quantity:</strong> {equipment.quantity}
                </p>
                <p>
                  <strong>Type:</strong> {equipment.type}
                </p>
                <p>
                  <strong>Status:</strong> {equipment.status}
                </p>
                <img src={equipment.image} alt="equipment-image" />
              </StyledEquipmentCard>
            ))}
      </StyledEquipmentGrid>

      {numberOfPages > 1 && (
        <StyledEquipmenmtPaginationContainer>
          {pagesArray.map((item, index) => (
            <Button
              buttonType={ButtonTypes.paginationButton}
              key={index}
              disable={item === pageNumber}
              onClick={() => navigate(`/equipment/${item}`)}
            >
              {item}
            </Button>
          ))}
        </StyledEquipmenmtPaginationContainer>
      )}
    </EquipmentManagementContainer>
  );
};

export default EquipmentManagement;
