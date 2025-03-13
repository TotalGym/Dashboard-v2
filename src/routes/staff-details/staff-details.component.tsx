import { useParams } from "react-router-dom";

import { useGetStaffByIdQuery } from "../../features/staff/staff.api.slice";
import {
  StaffDetailsContainer,
  StyledStaffDetailsInfoRow,
  StyledStaffDetailsLabel,
  StyledStaffDetailsSection,
  StyledStaffDetailsSectionTitle,
  StyledStaffDetailsTitle,
  StyledStaffDetailsValue,
} from "./staff-details.styles";

const StaffDetails = () => {
  const { staffId } = useParams<{ staffId: string }>();
  const { data, error, isLoading } = useGetStaffByIdQuery({ id: staffId });

  if (isLoading)
    return <StaffDetailsContainer>Loading...</StaffDetailsContainer>;
  if (error)
    return (
      <StaffDetailsContainer>
        Error loading staff details.
      </StaffDetailsContainer>
    );
  if (!data)
    return <StaffDetailsContainer>No staff data found.</StaffDetailsContainer>;

  const staff = data.data;

  return (
    <>
      <StaffDetailsContainer>
        <StyledStaffDetailsTitle>{staff.name}</StyledStaffDetailsTitle>

        <StyledStaffDetailsSection>
          <StyledStaffDetailsSectionTitle>
            Contact Information
          </StyledStaffDetailsSectionTitle>
          <StyledStaffDetailsInfoRow>
            <StyledStaffDetailsLabel>Email:</StyledStaffDetailsLabel>
            <StyledStaffDetailsValue>
              {staff.contact.email}
            </StyledStaffDetailsValue>
          </StyledStaffDetailsInfoRow>
          <StyledStaffDetailsInfoRow>
            <StyledStaffDetailsLabel>Phone Number:</StyledStaffDetailsLabel>
            <StyledStaffDetailsValue>
              {staff.contact.phoneNumber}
            </StyledStaffDetailsValue>
          </StyledStaffDetailsInfoRow>
        </StyledStaffDetailsSection>

        <StyledStaffDetailsSection>
          <StyledStaffDetailsSectionTitle>
            Payroll Information
          </StyledStaffDetailsSectionTitle>
          <StyledStaffDetailsInfoRow>
            <StyledStaffDetailsLabel>Salary:</StyledStaffDetailsLabel>
            <StyledStaffDetailsValue>
              ${staff.payroll.salary?.toLocaleString()}
            </StyledStaffDetailsValue>
          </StyledStaffDetailsInfoRow>
          {staff.payroll.bonus && (
            <StyledStaffDetailsInfoRow>
              <StyledStaffDetailsLabel>Bonus:</StyledStaffDetailsLabel>
              <StyledStaffDetailsValue>
                ${staff.payroll.bonus?.toLocaleString()}
              </StyledStaffDetailsValue>
            </StyledStaffDetailsInfoRow>
          )}
          {staff.payroll.deduction && (
            <StyledStaffDetailsInfoRow>
              <StyledStaffDetailsLabel>Deduction:</StyledStaffDetailsLabel>
              <StyledStaffDetailsValue>
                ${staff.payroll.deduction?.toLocaleString()}
              </StyledStaffDetailsValue>
            </StyledStaffDetailsInfoRow>
          )}
          {staff.payroll.payDate && (
            <StyledStaffDetailsInfoRow>
              <StyledStaffDetailsLabel>Pay Date:</StyledStaffDetailsLabel>
              <StyledStaffDetailsValue>
                {new Date(staff.payroll.payDate)?.toLocaleDateString()}
              </StyledStaffDetailsValue>
            </StyledStaffDetailsInfoRow>
          )}
        </StyledStaffDetailsSection>

        {staff.attendance && staff.attendance.length > 0 && (
          <StyledStaffDetailsSection>
            <StyledStaffDetailsSectionTitle>
              Attendance
            </StyledStaffDetailsSectionTitle>
            {staff.attendance.map((attendance) => (
              <StyledStaffDetailsInfoRow key={attendance._id}>
                <StyledStaffDetailsLabel>Date:</StyledStaffDetailsLabel>
                <StyledStaffDetailsValue>
                  {new Date(attendance.date)?.toLocaleDateString()}
                </StyledStaffDetailsValue>
              </StyledStaffDetailsInfoRow>
            ))}
          </StyledStaffDetailsSection>
        )}

        <StyledStaffDetailsSection>
          <StyledStaffDetailsSectionTitle>
            Other Information
          </StyledStaffDetailsSectionTitle>
          <StyledStaffDetailsInfoRow>
            <StyledStaffDetailsLabel>Role:</StyledStaffDetailsLabel>
            <StyledStaffDetailsValue>{staff.role}</StyledStaffDetailsValue>
          </StyledStaffDetailsInfoRow>
          <StyledStaffDetailsInfoRow>
            <StyledStaffDetailsLabel>Status:</StyledStaffDetailsLabel>
            <StyledStaffDetailsValue>
              {staff.status || "N/A"}
            </StyledStaffDetailsValue>
          </StyledStaffDetailsInfoRow>
          <StyledStaffDetailsInfoRow>
            <StyledStaffDetailsLabel>Created At:</StyledStaffDetailsLabel>
            <StyledStaffDetailsValue>
              {staff.createdAt
                ? new Date(staff.createdAt)?.toLocaleDateString()
                : "N/A"}
            </StyledStaffDetailsValue>
          </StyledStaffDetailsInfoRow>
        </StyledStaffDetailsSection>
      </StaffDetailsContainer>
    </>
  );
};

export default StaffDetails;
