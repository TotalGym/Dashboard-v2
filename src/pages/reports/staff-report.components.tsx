import { useState } from "react";
import { useGetStaffReportsQuery } from "../../services/reports.services";
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

export interface PaymentDetails {
  salary: number;
  bonus: number;
  deductions: number;
  payDate: string;
}

export interface StaffReportItem {
  Name: string;
  Role: string;
  Email: string;
  Payment: PaymentDetails;
}

export interface PaginationDetails {
  page: number;
  limit: number;
}

export interface StaffReportData {
  reportName: string;
  totalCount: number;
  next: PaginationDetails | null;
  reportData: StaffReportItem[];
}

export interface GetStaffReportResponse {
  success: boolean;
  message: string;
  data: StaffReportData;
  error: string | null;
}

const StaffReport = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, error, isLoading, isError } = useGetStaffReportsQuery({
    page,
    limit,
  });

  if (isLoading) {
    return <LoadingMessage>Loading staff reports...</LoadingMessage>;
  }

  if (isError) {
    return (
      <ErrorMessage>
        Error fetching staff reports: {JSON.stringify(error)}
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
      <Title>Staff Reports</Title>

      <Metadata>
        <MetadataText>
          <strong>Report Name:</strong> {reportName}
        </MetadataText>
        <MetadataText>
          <strong>Total Staff Members:</strong> {totalCount}
        </MetadataText>
      </Metadata>

      <Table>
        <TableHeader>
          <tr>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Role</TableHeaderCell>
            <TableHeaderCell>Salary</TableHeaderCell>
            <TableHeaderCell>Bonus</TableHeaderCell>
            <TableHeaderCell>Deductions</TableHeaderCell>
            <TableHeaderCell>Pay Date</TableHeaderCell>
          </tr>
        </TableHeader>
        <tbody>
          {reportData?.map((staff, index) => (
            <TableRow key={index}>
              <TableCell>{staff.Name}</TableCell>
              <TableCell>{staff.Email}</TableCell>
              <TableCell>{staff.Role}</TableCell>
              <TableCell>{staff.Payment.salary}</TableCell>
              <TableCell>{staff.Payment.bonus}</TableCell>
              <TableCell>{staff.Payment.deductions}</TableCell>
              <TableCell>
                {new Date(staff.Payment.payDate).toLocaleDateString()}
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

export default StaffReport;
