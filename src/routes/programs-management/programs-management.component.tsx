import { useNavigate } from "react-router-dom";
import Button from "../../components/button/button.component";
import { useGetProgramsQuery } from "../../features/programs/programs.api.slice";
import {
  ProgramsManagementContainer,
  StyledProgramsContainer,
} from "./programs-management.styles";
import FormInput from "../../components/form-input/form-input.component";
import { FormInputTypes } from "../../components/form-input/form-input.types";

const ProgramsManagement = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetProgramsQuery({
    page: 1,
    limit: 5,
  });

  if (isError) return <p>something went wrong</p>;

  return (
    <ProgramsManagementContainer>
      <FormInput
        formInputType={FormInputTypes.SearchInput}
        placeholder="Search Programs"
      />
      <Button>Add Program</Button>
      <StyledProgramsContainer>
        {isLoading ? (
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
    </ProgramsManagementContainer>
  );
};

export default ProgramsManagement;
