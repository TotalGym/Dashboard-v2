import { Outlet, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/button/button.component";
import { useGetProgramsQuery } from "../../services/programs.services";
import {
  ProgramsManagementContainer,
  StyledPaginationContainer,
  StyledPaginationSpan,
} from "./programs-management.styles";
import { useEffect, useState } from "react";
import Modal from "../../components/modal/modal.component";
import AddProgramForm from "../../components/Program-forms/add-program-form.component";
import { ButtonTypes } from "../../components/button/button.types";

const ProgramsManagement = () => {
  const { programsPage } = useParams();
  const [page, setPage] = useState(Number(programsPage));
  const limit = 3;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const {
    data: programs,
    isLoading,
    isError,
    isFetching,
  } = useGetProgramsQuery({
    page,
    limit,
  });
  const totalPages = Math.ceil((programs?.data.totalCount || 0) / limit);

  useEffect(() => {
    setPage(Number(programsPage) || 1);
  }, [programsPage]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
      navigate(`/programs/${page + 1}`);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      navigate(`/programs/${page - 1}`);
    }
  };

  if (isError) return <p>something went wrong</p>;

  return (
    <>
      <ProgramsManagementContainer>
        <Button onClick={() => setIsModalOpen(true)}>Add New Program</Button>
        <Modal
          open={isModalOpen}
          title="Add New Program"
          closeModal={() => setIsModalOpen(false)}
        >
          <AddProgramForm toggleModalOpen={setIsModalOpen} />
        </Modal>
        <Outlet />
        <StyledPaginationContainer>
          <Button
            onClick={handlePrevPage}
            disable={page === 1 || isFetching}
            buttonType={ButtonTypes.paginationButton}
          >
            &lt;
          </Button>
          <StyledPaginationSpan>
            {isLoading || isFetching
              ? "loading..."
              : `${page} of ${totalPages}`}
          </StyledPaginationSpan>
          <Button
            onClick={handleNextPage}
            disable={page === totalPages || isFetching}
            buttonType={ButtonTypes.paginationButton}
          >
            &gt;
          </Button>
        </StyledPaginationContainer>
      </ProgramsManagementContainer>
    </>
  );
};

export default ProgramsManagement;
