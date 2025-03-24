import { useState } from "react";
import Button from "../../components/button/button.component";
import {
  useGetAdminsQuery,
  useDeleteAdminMutation,
} from "../../services/admins.services";
import {
  AdminManagementContainer,
  StyledTable,
  StyledTableHead,
  StyledTableRow,
  StyledTableCell,
  StyledTableHeaderCell,
  StyledRoleBadge,
  StyledLoadingContainer,
  StyledErrorMessage,
  StyledTitle,
  StyledDeleteButton,
  StyledConfirmationModal,
  StyledConfirmationText,
  StyledConfirmationActions,
} from "./admins-management.styles";
import Modal from "../../components/modal/modal.component";
import AddAdminForm from "../../components/admin-forms/add-admin-form.component";
import { toast } from "react-toastify";

const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${month} ${day}, ${year} ${hours}:${minutes}`;
};

const AdminManagement = () => {
  const { data: admins, isLoading, isError } = useGetAdminsQuery();
  const [deleteAdmin, { isLoading: isDeleting }] = useDeleteAdminMutation();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleDeleteClick = (adminId: string, adminName: string) => {
    setAdminToDelete({ id: adminId, name: adminName });
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!adminToDelete) return;

    try {
      await deleteAdmin(adminToDelete.id).unwrap();
      toast.success(`Admin ${adminToDelete.name} deleted successfully`, {
        autoClose: 400,
      });
      setIsDeleteModalOpen(false);
      setAdminToDelete(null);
    } catch {
      toast.error(`Failed to delete admin ${adminToDelete.name}`);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setAdminToDelete(null);
  };

  return (
    <AdminManagementContainer>
      <StyledTitle>Admin Management</StyledTitle>
      <Button onClick={() => setIsAddModalOpen(true)}>Add new Admin</Button>

      {/* Add Admin Modal */}
      <Modal closeModal={() => setIsAddModalOpen(false)} open={isAddModalOpen}>
        <AddAdminForm toggleModalOpen={setIsAddModalOpen} />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal closeModal={handleCancelDelete} open={isDeleteModalOpen}>
        <StyledConfirmationModal>
          <StyledConfirmationText>
            Are you sure you want to delete admin{" "}
            <strong>{adminToDelete?.name}</strong>?
            <br />
            This action cannot be undone.
          </StyledConfirmationText>
          <StyledConfirmationActions>
            <Button onClick={handleCancelDelete} disable={isDeleting}>
              Cancel
            </Button>
            <Button
              redColored
              onClick={handleConfirmDelete}
              isLoading={isDeleting}
              disable={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </StyledConfirmationActions>
        </StyledConfirmationModal>
      </Modal>

      {isLoading ? (
        <StyledLoadingContainer>
          <p>Loading admins...</p>
        </StyledLoadingContainer>
      ) : isError ? (
        <StyledErrorMessage>
          Error loading admins data. Please try again later.
        </StyledErrorMessage>
      ) : (
        <StyledTable>
          <StyledTableHead>
            <StyledTableRow>
              <StyledTableHeaderCell>Name</StyledTableHeaderCell>
              <StyledTableHeaderCell>Email</StyledTableHeaderCell>
              <StyledTableHeaderCell>Role</StyledTableHeaderCell>
              <StyledTableHeaderCell>Created At</StyledTableHeaderCell>
              <StyledTableHeaderCell>Actions</StyledTableHeaderCell>
            </StyledTableRow>
          </StyledTableHead>
          <tbody>
            {admins?.data.results.map((admin) => (
              <StyledTableRow key={admin._id}>
                <StyledTableCell data-label="Name">
                  {admin.name}
                </StyledTableCell>
                <StyledTableCell data-label="Email">
                  {admin.email}
                </StyledTableCell>
                <StyledTableCell data-label="Role">
                  <StyledRoleBadge $isSuperAdmin={admin.role === "SuperAdmin"}>
                    {admin.role}
                  </StyledRoleBadge>
                </StyledTableCell>
                <StyledTableCell data-label="Created At">
                  {formatDate(admin.createdAt)}
                </StyledTableCell>
                <StyledTableCell data-label="Actions">
                  <StyledDeleteButton
                    onClick={() => handleDeleteClick(admin._id, admin.name)}
                    disabled={isDeleting}
                  >
                    Delete
                  </StyledDeleteButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </tbody>
        </StyledTable>
      )}
    </AdminManagementContainer>
  );
};

export default AdminManagement;
