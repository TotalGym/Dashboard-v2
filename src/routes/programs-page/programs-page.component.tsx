import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useGetProgramsQuery } from "../../features/programs/programs.api.slice";
import {
  ProgramsPageContainer,
  StyledColoredText,
  StyledProgramCard,
  StyledProgramSkeletonCard,
} from "./programs-page.styles";

const ProgramgsPage = () => {
  const { programsPage } = useParams();
  const navigate = useNavigate();

  const {
    data: programs,
    isLoading,
    isError,
    isFetching,
  } = useGetProgramsQuery({
    page: Number(programsPage),
    limit: 3,
  });

  if (isError)
    return (
      <p>
        something went wrong <Link to={"/"}>Go to Home Page</Link>
      </p>
    );

  if (programs?.data.results.length === 0) {
    return <Navigate to={"/programs/1"} replace />;
  }

  return (
    <ProgramsPageContainer>
      {isLoading
        ? Array.from({ length: 3 }).map((_, index) => (
            <StyledProgramSkeletonCard key={index}>
              <div className="skeleton-text"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-image"></div>
            </StyledProgramSkeletonCard>
          ))
        : programs?.data.results.map((program) => (
            <StyledProgramCard
              key={program._id}
              onClick={() =>
                navigate(`/programsDetails/${program.programName}`, {
                  state: { from: `${programsPage}` },
                })
              }
            >
              <StyledColoredText>
                Program Name: <span>{program.programName}</span>
              </StyledColoredText>
              <StyledColoredText>
                Program Description: <span>{program.description}</span>
              </StyledColoredText>
              <img
                src={program.image}
                alt={`${program.programName}`}
                width={"400px"}
                height={"400px"}
              />
            </StyledProgramCard>
          ))}
      {isFetching &&
      programs?.data.results &&
      programs.data.results.length < 3 ? (
        <StyledProgramSkeletonCard>
          <div className="skeleton-text"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-image"></div>
        </StyledProgramSkeletonCard>
      ) : null}
    </ProgramsPageContainer>
  );
};
export default ProgramgsPage;
