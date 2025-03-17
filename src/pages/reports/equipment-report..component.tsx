import { useState } from "react";
import { useGetEquipmentReportsQuery } from "../../services/reports.services";
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
export interface EquipmentReportItem {
  Name: string;
  Quantity: number;
  Status: string;
}

export interface PaginationDetails {
  page: number;
  limit: number;
}

export interface EquipmentReportData {
  reportName: string;
  totalCount: number;
  next: PaginationDetails | null;
  reportData: EquipmentReportItem[];
}

export interface GetEquipmentReportResponse {
  success: boolean;
  message: string;
  data: EquipmentReportData;
  error: string | null;
}

const EquipmentReport = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, error, isLoading, isError } = useGetEquipmentReportsQuery({
    page,
    limit,
  });

  if (isLoading) {
    return <LoadingMessage>Loading equipment reports...</LoadingMessage>;
  }

  if (isError) {
    return (
      <ErrorMessage>
        Error fetching equipment reports: {JSON.stringify(error)}
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
      <Title>Equipment Reports</Title>

      <Metadata>
        <MetadataText>
          <strong>Report Name:</strong> {reportName}
        </MetadataText>
        <MetadataText>
          <strong>Total Equipment Items:</strong> {totalCount}
        </MetadataText>
      </Metadata>

      <Table>
        <TableHeader>
          <tr>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Quantity</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </tr>
        </TableHeader>
        <tbody>
          {reportData?.map((equipment, index) => (
            <TableRow key={index}>
              <TableCell>{equipment.Name}</TableCell>
              <TableCell>{equipment.Quantity}</TableCell>
              <TableCell>{equipment.Status}</TableCell>
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

export default EquipmentReport;
