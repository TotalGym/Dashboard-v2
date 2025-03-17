import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetStaffQuery } from "../../services/staff.services";
import { Staff } from "../../types/staff.types";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import {
  StaffManagementContainer,
  StyledStaffManagementPagination,
  StyledStaffManagementTable,
  StyledViewDetails,
} from "./staff-management.styles";
import Button from "../../components/button/button.component";
import Modal from "../../components/modal/modal.component";
import AddStaffForm from "../../components/staff-forms/add-staff-form.component";

const StaffManagementPage = () => {
  const [page, setPage] = useState(1);
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const limit = 10;
  const { data, isLoading, isError } = useGetStaffQuery({ page, limit });
  const navigate = useNavigate();

  const totalPages = data?.data.totalCount
    ? Math.ceil(data.data.totalCount / limit)
    : 1;

  const columns: ColumnDef<Staff>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "contact.email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <StyledViewDetails
          onClick={() => navigate(`/staff/${row.original._id}`)}
        >
          View Details
        </StyledViewDetails>
      ),
    },
  ];

  const table = useReactTable({
    data: data?.data.results || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: totalPages,
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize: limit,
      },
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading staff data.</p>;

  return (
    <StaffManagementContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "2em",
        }}
      >
        <Button onClick={() => setIsAddStaffModalOpen(true)}>
          Add New Staff
        </Button>
      </div>
      <Modal
        closeModal={() => setIsAddStaffModalOpen(false)}
        open={isAddStaffModalOpen}
        title="Add Staff"
      >
        <AddStaffForm closeModal={() => setIsAddStaffModalOpen(false)} />
      </Modal>
      <h1 style={{ textAlign: "center" }}>Staff Management</h1>
      <StyledStaffManagementTable>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} data-column={header.column.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} data-column={cell.column.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledStaffManagementTable>
      <StyledStaffManagementPagination>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </StyledStaffManagementPagination>
    </StaffManagementContainer>
  );
};

export default StaffManagementPage;
