import { useState } from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Staff } from "../../types/staff.types";
import { recentlyAttendingStaff } from "../../mock/mock.data";

import {
  RecentlyAttendingStaffTableCell,
  RecentlyAttendingStaffTableContainer,
  RecentlyAttendingStaffTableRow,
} from "./recently-attending-staff-table.styles";
import { StyledTableHeader } from "../last-added-trainee-table/last-added-trainees-table.styles";

const columnHelper = createColumnHelper<Staff>();

const columns = [
  columnHelper.accessor("attendanceTime", {
    cell: (props) => (
      <>
        {props
          .getValue()
          ?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </>
    ),
  }),
  columnHelper.accessor("name", {}),
  columnHelper.accessor("role", {}),
];

const RecentlyAttendingStaffTable = () => {
  const [data] = useState<Staff[]>(recentlyAttendingStaff);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <RecentlyAttendingStaffTableContainer>
      <StyledTableHeader>RECENTLY ATTENDING STAFF</StyledTableHeader>
      {table.getRowModel().rows.map((row, index) => (
        <RecentlyAttendingStaffTableRow key={index}>
          {row.getVisibleCells().map((cell, index) => (
            <RecentlyAttendingStaffTableCell
              key={index}
              $colored={cell.column.id === "name"}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </RecentlyAttendingStaffTableCell>
          ))}
        </RecentlyAttendingStaffTableRow>
      ))}
    </RecentlyAttendingStaffTableContainer>
  );
};
export default RecentlyAttendingStaffTable;
