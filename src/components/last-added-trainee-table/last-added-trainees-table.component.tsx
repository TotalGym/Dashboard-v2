import { useState } from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Trainee } from "../../types/trainee.types";
import { lastAddedTraineesData } from "../../mock/mock.data";

import {
  LastAddedTraineesTableContainer,
  StyledCellText,
  StyledLastAddedCell,
  StyledLastAddedRow,
  StyledLastAddedTableHead,
  StyledLastAddedTH,
  StyledShowMoreText,
  StyledStatusCell,
  StyledTableHeader,
} from "./last-added-trainees-table.styles";

const columnHelper = createColumnHelper<Trainee>();

const columns = [
  columnHelper.accessor("number", {
    header: "NO",
    cell: (props) => <StyledCellText $width="25px">{props.getValue()}</StyledCellText>,
  }),
  columnHelper.accessor("name", {
    header: "NAME",
    cell: (props) => <StyledCellText $width="200px" $margin="40px">{props.getValue()}</StyledCellText>,
  }),
  columnHelper.accessor("assignedCoach", {
    header: "ASSIGNED COACH",
    cell: (props) => <StyledCellText $width="200px">{props.getValue()}</StyledCellText>,
  }),
  columnHelper.accessor("dateOfAdmit", {
    header: "DATE OF ADMIT",
    cell: (props) => (
      <StyledCellText $width="200px">
        {props.getValue()?.toLocaleTimeString()}
      </StyledCellText>
    ),
  }),
  columnHelper.accessor("subscribtionType", {
    header: "SUBSCRIPTION TYPE",
    cell: (props) => <StyledCellText $width="200px">{props.getValue()}</StyledCellText>,
  }),
  columnHelper.accessor("status", {
    header: "STATUS",
    cell: (props) => (
      <StyledStatusCell $status={props.getValue()}>
        {props.getValue()}
      </StyledStatusCell>
    ),
  }),
];

const LastAddedTraineesTable = () => {
  const [data, setData] = useState<Trainee[]>(lastAddedTraineesData);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <LastAddedTraineesTableContainer>
      <StyledTableHeader>LAST ADDED TRAINEES</StyledTableHeader>
      {table.getHeaderGroups().map((headerGroup, index) => (
        <StyledLastAddedTableHead key={index}>
          {headerGroup.headers.map((header, index) => (
            <StyledLastAddedTH key={index}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </StyledLastAddedTH>
          ))}
        </StyledLastAddedTableHead>
      ))}
      {table.getRowModel().rows.map((row, index) => (
        <StyledLastAddedRow key={index}>
          {row.getVisibleCells().map((cell, index) => (
            <StyledLastAddedCell key={index}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </StyledLastAddedCell>
          ))}
        </StyledLastAddedRow>
      ))}
      <StyledShowMoreText>Show More</StyledShowMoreText>
    </LastAddedTraineesTableContainer>
  );
};
export default LastAddedTraineesTable;
