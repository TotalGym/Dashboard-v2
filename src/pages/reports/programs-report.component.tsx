import { useState } from "react";
import { useGetProgramReportQuery } from "../../services/reports.services";
import {
  Container,
  Title,
  Metadata,
  MetadataText,
  Table,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableCell,
  PaginationContainer,
  PaginationButton,
  LoadingMessage,
  ErrorMessage,
} from "./reports.styles";

// Define the types for the API response
export interface Exercise {
  name: string;
  sets: number;
  repetitions: number;
  _id: string;
}

export interface Schedule {
  day: string;
  startTime: string;
  endTime: string;
  _id: string;
}

export interface RegisteredTrainee {
  Name: string;
  Email: string;
}

export interface ProgramReportItem {
  ProgramName: string;
  Description: string;
  Exercises: Exercise[];
  Schedule: Schedule[];
  RegisteredTrainees: RegisteredTrainee[];
}

export interface PaginationDetails {
  page: number;
  limit: number;
}

export interface ProgramReportData {
  reportName: string;
  totalCount: number;
  next: PaginationDetails | null;
  reportData: ProgramReportItem[];
}

export interface GetProgramReportResponse {
  success: boolean;
  message: string;
  data: ProgramReportData;
  error: string | null;
}

const ProgramReport = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, error, isLoading, isError } = useGetProgramReportQuery({
    page,
    limit,
  });

  if (isLoading) {
    return <LoadingMessage>Loading program reports...</LoadingMessage>;
  }

  if (isError) {
    return (
      <ErrorMessage>
        Error fetching program reports: {JSON.stringify(error)}
      </ErrorMessage>
    );
  }

  const reportData = data?.data.reportData;
  const reportName = data?.data.reportName;
  const totalCount = data?.data.totalCount;
  const nextPage = data?.data.next;

  const handleNextPage = () => {
    if (nextPage) {
      setPage(nextPage.page);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <Container>
      <Title>Program Reports</Title>

      <Metadata>
        <MetadataText>
          <strong>Report Name:</strong> {reportName}
        </MetadataText>
        <MetadataText>
          <strong>Total Programs:</strong> {totalCount}
        </MetadataText>
      </Metadata>

      <Table>
        <TableHeader>
          <tr>
            <TableHeaderCell>Program Name</TableHeaderCell>
            <TableHeaderCell>Description</TableHeaderCell>
            <TableHeaderCell>Exercises</TableHeaderCell>
            <TableHeaderCell>Schedule</TableHeaderCell>
            <TableHeaderCell>Registered Trainees</TableHeaderCell>
          </tr>
        </TableHeader>
        <tbody>
          {reportData?.map((program, index) => (
            <TableRow key={index}>
              <TableCell>{program.ProgramName}</TableCell>
              <TableCell>{program.Description}</TableCell>
              <TableCell>
                <ul>
                  {program.Exercises.map((exercise, idx) => (
                    <li key={idx}>
                      {exercise.name} - {exercise.sets} sets x{" "}
                      {exercise.repetitions} reps
                    </li>
                  ))}
                </ul>
              </TableCell>
              <TableCell>
                <ul>
                  {program.Schedule.map((schedule, idx) => (
                    <li key={idx}>
                      {schedule.day}: {schedule.startTime} - {schedule.endTime}
                    </li>
                  ))}
                </ul>
              </TableCell>
              <TableCell>
                <ul>
                  {program.RegisteredTrainees.map((trainee, idx) => (
                    <li key={idx}>
                      {trainee.Name} ({trainee.Email})
                    </li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <PaginationContainer>
        <PaginationButton onClick={handlePreviousPage} disabled={page === 1}>
          Back
        </PaginationButton>
        <PaginationButton onClick={handleNextPage} disabled={!nextPage}>
          Next
        </PaginationButton>
      </PaginationContainer>
    </Container>
  );
};

export default ProgramReport;
