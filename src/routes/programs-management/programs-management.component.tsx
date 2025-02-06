import { useNavigate } from "react-router-dom";
import Button from "../../components/button/button.component";
import { useGetProgramsQuery } from "../../features/programs/programs.api.slice";
import {
  ProgramsManagementContainer,
  StyledPaginationSpan,
  StyledProgramsContainer,
} from "./programs-management.styles";
import { useState } from "react";
import Modal from "../../components/modal/modal.component";
import AddProgramForm from "../../components/ProgramForms/add-program-form.component";
import { ButtonTypes } from "../../components/button/button.types";

const ProgramsManagement = () => {
  const [page, setPage] = useState(1);
  const limit = 3;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading, isError, isFetching } = useGetProgramsQuery({
    page,
    limit,
  });
  const totalPages = Math.ceil((data?.totalCount || 0) / limit);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  if (isError) return <p>something went wrong</p>;

  return (
    <ProgramsManagementContainer>
      <Button onClick={() => setIsModalOpen(true)}>Add Program</Button>
      <Modal
        open={isModalOpen}
        title="Add New Program"
        closeModal={() => setIsModalOpen(false)}
      >
        <AddProgramForm toggleModalOpen={setIsModalOpen} />
      </Modal>
      <StyledProgramsContainer>
        {isLoading || isFetching ? (
          <p>Loading...</p>
        ) : (
          data?.results.map((program) => (
            <div
              key={program._id}
              onClick={() => navigate(`/programs/${program.programName}`)}
              style={{
                cursor: "pointer",
              }}
            >
              <p>name: {program.programName}</p>
              <p>description: {program.description}</p>
              <p>price: {program.monthlyPrice}</p>
              <img
                src={program.image}
                alt={`${program.programName}`}
                width={"400px"}
                height={"400px"}
              />
            </div>
          ))
        )}
      </StyledProgramsContainer>
      <div>
        <Button
          onClick={handlePrevPage}
          disabled={page === 1}
          buttonType={ButtonTypes.paginationButton}
        >
          &lt;
        </Button>
        <StyledPaginationSpan>
          {page} of {totalPages}
        </StyledPaginationSpan>
        <Button
          onClick={handleNextPage}
          disabled={page === totalPages}
          buttonType={ButtonTypes.paginationButton}
        >
          &gt;
        </Button>
      </div>
    </ProgramsManagementContainer>
  );
};

export default ProgramsManagement;
