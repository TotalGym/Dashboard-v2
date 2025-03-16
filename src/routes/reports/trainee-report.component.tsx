import { useState } from "react";
import { useGetTraineeReportsQuery } from "../../features/reports/reports.api.slice";
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
export interface TraineeReportItem {
  Name: string;
  Email: string;
  MembershipStartDate: string;
  MembershipEndDate: string;
  SelectedPrograms: string[];
}

export interface PaginationDetails {
  page: number;
  limit: number;
}

export interface TraineeReportData {
  reportName: string;
  totalCount: number;
  next: PaginationDetails | null;
  reportData: TraineeReportItem[];
}

export interface GetTraineeReportResponse {
  success: boolean;
  message: string;
  data: TraineeReportData;
  error: string | null;
}

const TraineeReport = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, error, isLoading, isError } = useGetTraineeReportsQuery({
    page,
    limit,
  });

  if (isLoading) {
    return <LoadingMessage>Loading trainee reports...</LoadingMessage>;
  }

  if (isError) {
    return (
      <ErrorMessage>
        Error fetching trainee reports: {JSON.stringify(error)}
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
      <Title>Trainee Reports</Title>

      <Metadata>
        <MetadataText>
          <strong>Report Name:</strong> {reportName}
        </MetadataText>
        <MetadataText>
          <strong>Total Trainees:</strong> {totalCount}
        </MetadataText>
      </Metadata>

      <Table>
        <TableHeader>
          <tr>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Membership Start Date</TableHeaderCell>
            <TableHeaderCell>Membership End Date</TableHeaderCell>
            <TableHeaderCell>Selected Programs</TableHeaderCell>
          </tr>
        </TableHeader>
        <tbody>
          {reportData?.map((trainee, index) => (
            <TableRow key={index}>
              <TableCell>{trainee.Name}</TableCell>
              <TableCell>{trainee.Email}</TableCell>
              <TableCell>
                {new Date(trainee.MembershipStartDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(trainee.MembershipEndDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {trainee.SelectedPrograms.join(", ") || "No programs selected"}
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

export default TraineeReport;
