import { Link, useNavigate, useParams } from "react-router-dom";

import {
  useDeleteStaffMutation,
  useGetStaffByIdQuery,
} from "../../features/staff/staff.api.slice";
import {
  StaffDetailsContainer,
  StyledStaffDetailsInfoRow,
  StyledStaffDetailsLabel,
  StyledStaffDetailsSection,
  StyledStaffDetailsSectionTitle,
  StyledStaffDetailsTitle,
  StyledStaffDetailsValue,
} from "./staff-details.styles";
import Button from "../../components/button/button.component";
import { useState } from "react";
import Modal from "../../components/modal/modal.component";
import UpdateStaffForm from "../../components/staff-forms/edit-staff-form.component";
import {
  DeleteModalContent,
  StyledConfirmDeleteText,
} from "../program-details/program-details.styles";
import { toast } from "react-toastify";

const StaffDetails = () => {
  const navigate = useNavigate();
  const { staffId } = useParams<{ staffId: string }>();
  const { data, error, isLoading } = useGetStaffByIdQuery({ id: staffId });
  const [isEditModalOpane, setisEditModalOpane] = useState(false);
  const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);

  const [deleteStaff, { isLoading: isDeleting }] = useDeleteStaffMutation();

  const handleDelete = async () => {
    try {
      await deleteStaff(staffId!).unwrap();
      navigate("/staff");
      toast.success("Staff deleted successfully", {
        position: "top-right",
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
      setisDeleteModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete staff. Please try again.", {
        position: "top-right",
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

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
    <div
      style={{
        padding: "2em",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1em",
          marginBottom: "2em",
        }}
      >
        <Link to={"/staff"}>
          <Button>Back to All Staff</Button>
        </Link>
        <Button onClick={() => setisEditModalOpane(true)}>
          Edit Staff Details
        </Button>
        <Button redColored onClick={() => setisDeleteModalOpen(true)}>
          Delete Staff
        </Button>
      </div>
      <Modal
        open={isEditModalOpane}
        closeModal={() => setisEditModalOpane(false)}
      >
        <UpdateStaffForm
          closeModal={() => setisEditModalOpane(false)}
          staffData={staff}
        />
      </Modal>
      <Modal
        open={isDeleteModalOpen}
        closeModal={() => setisDeleteModalOpen(false)}
      >
        <DeleteModalContent>
          <StyledConfirmDeleteText>
            Do you want to delete this staff?
          </StyledConfirmDeleteText>
          <Button redColored onClick={handleDelete} isLoading={isDeleting}>
            Confirm Delete
          </Button>
        </DeleteModalContent>
      </Modal>
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
    </div>
  );
};

export default StaffDetails;
