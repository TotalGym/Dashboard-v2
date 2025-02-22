import { useEffect, useState } from "react";
import Button from "../../components/button/button.component";
import Modal from "../../components/modal/modal.component";
import { useGetAllEquipmentQuery } from "../../features/equipment/equipment.api.slice";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { ButtonTypes } from "../../components/button/button.types";
import AddEquipmentForm from "../../components/equipment-forms/add-equipment-form";

const EquipmentManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { equipmentPage } = useParams();
  const pageNumber = Number(equipmentPage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: equipments,
    isLoading,
    isError,
  } = useGetAllEquipmentQuery({
    limit: 10,
    page: pageNumber,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
    <>
      <Button onClick={() => setIsModalOpen(true)}>Add New Equipment</Button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <Modal
          open={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          title="Add New Equipment"
        >
          <AddEquipmentForm toggleModalOpen={setIsModalOpen} />
        </Modal>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          equipments?.data.results.map((equipment) => (
            <div
              key={equipment._id}
              style={{
                cursor: "pointer",
              }}
              onClick={() =>
                navigate(`/equipmentDetails/${equipment._id}`, {
                  state: { from: pageNumber },
                })
              }
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
          ))
        )}
      </div>
      {numberOfPages > 1 ? (
        pagesArray.map((item, index) => (
          <Button
            buttonType={ButtonTypes.paginationButton}
            key={index}
            disabled={item === pageNumber}
            onClick={() => navigate(`/equipment/${item}`)}
          >
            {item}
          </Button>
        ))
      ) : (
        <Button
          buttonType={ButtonTypes.paginationButton}
          disabled={pageNumber === 1}
        >
          1
        </Button>
      )}
    </>
  );
};

export default EquipmentManagement;
