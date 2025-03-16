import { useState } from "react";
import { useGetPaymentReportsQuery } from "../../features/reports/reports.api.slice";
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
export interface PaymentReportItem {
  TraineeName: string;
  TraineeEmail: string;
  Amount: number;
  Status: string;
  DueDate: string;
  PaymentDate: string;
}

export interface PaginationDetails {
  page: number;
  limit: number;
}

export interface PaymentReportData {
  reportName: string;
  totalCount: number;
  next: PaginationDetails | null;
  reportData: PaymentReportItem[];
}

export interface GetPaymentReportResponse {
  success: boolean;
  message: string;
  data: PaymentReportData;
  error: string | null;
}

const PaymentReport = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, error, isLoading, isError } = useGetPaymentReportsQuery({
    page,
    limit,
  });

  if (isLoading) {
    return <LoadingMessage>Loading payment reports...</LoadingMessage>;
  }

  if (isError) {
    return (
      <ErrorMessage>
        Error fetching payment reports: {JSON.stringify(error)}
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
      <Title>Payment Reports</Title>

      <Metadata>
        <MetadataText>
          <strong>Report Name:</strong> {reportName}
        </MetadataText>
        <MetadataText>
          <strong>Total Payments:</strong> {totalCount}
        </MetadataText>
      </Metadata>

      <Table>
        <TableHeader>
          <tr>
            <TableHeaderCell>Trainee Name</TableHeaderCell>
            <TableHeaderCell>Trainee Email</TableHeaderCell>
            <TableHeaderCell>Amount</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Due Date</TableHeaderCell>
            <TableHeaderCell>Payment Date</TableHeaderCell>
          </tr>
        </TableHeader>
        <tbody>
          {reportData?.map((payment, index) => (
            <TableRow key={index}>
              <TableCell>{payment.TraineeName}</TableCell>
              <TableCell>{payment.TraineeEmail}</TableCell>
              <TableCell>${payment.Amount.toFixed(2)}</TableCell>
              <TableCell>{payment.Status}</TableCell>
              <TableCell>
                {new Date(payment.DueDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(payment.PaymentDate).toLocaleDateString()}
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

export default PaymentReport;
