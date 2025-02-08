import { Link, useNavigate, useParams } from "react-router-dom";
import { StyledProgramsContainer } from "../programs-management/programs-management.styles";
import { useGetProgramsQuery } from "../../features/programs/programs.api.slice";

const ProgramgsPage = () => {
  const { programsPage } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, isFetching } = useGetProgramsQuery({
    page: Number(programsPage),
    limit: 3,
  });

  if (isError)
    return (
      <p>
        something went wrong <Link to={"/"}>Go to Home Page</Link>
      </p>
    );

  return (
    <StyledProgramsContainer>
      {isLoading || isFetching ? (
        <p>Loading...</p>
      ) : (
        data?.results.map((program) => (
          <div
            key={program._id}
            onClick={() =>
              navigate(`/programsDetails/${program.programName}`, {
                state: { from: `${programsPage}` },
              })
            }
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
  );
};
export default ProgramgsPage;
