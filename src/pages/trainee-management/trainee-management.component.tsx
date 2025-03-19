import { useEffect, useState } from "react";
import {
  useGetTraineesDataQuery,
  useLazySearchTraineesByNameQuery,
} from "../../services/trainee.services";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  TraineeManagementContainer,
  StyledTable,
  StyledTH,
  StyledTD,
  StyledTR,
  StyledPagination,
  StyledSkeleton,
  StyledDropDown,
} from "./trainee-management.styles";
import { Trainee } from "../../types/trainee.types";
import Button from "../../components/button/button.component";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../../components/modal/modal.component";
import AddTraineeForm from "../../components/trainee-forms/add-trainee.form";
import FormInput from "../../components/form-input/form-input.component";
import { FormInputTypes } from "../../components/form-input/form-input.types";
import { useDebounce } from "../../hooks/useDebounce";

const columnHelper = createColumnHelper<Trainee>();

const columns = [
  columnHelper.accessor("name", {
    header: "NAME",
  }),
  columnHelper.accessor("contact.email", {
    header: "EMAIL",
  }),
  columnHelper.accessor("contact.phoneNumber", {
    header: "PHONE NUMBER",
  }),
  columnHelper.accessor("assignedCoach", {
    header: "ASSIGNED COACHES",
    cell: ({ getValue }) => {
      const coach =
        typeof getValue() === "string" ? JSON.parse(getValue()) : getValue();
      return coach?.name || "N/A";
    },
  }),
  columnHelper.accessor("subscriptionType", {
    header: "SUBSCRIPTION TYPE",
  }),
  columnHelper.accessor("status", {
    header: "STATUS",
  }),
];

const TraineeManagement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<{ id: string; name: string }[] | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const [searchTrainee, { isLoading: isSearching }] =
    useLazySearchTraineesByNameQuery();

  const debouncedSearch = useDebounce(searchText, 500);

  const isModalOpen: boolean = location.state?.ModalOpen;

  const [isAddNewTraineeModalOpen, setIsAddNewTraineeModalOpen] = useState(
    isModalOpen || false
  );

  const [page, setPage] = useState(1);
  const limit = 10;
  const { data: trainees, isLoading } = useGetTraineesDataQuery({
    page,
    limit,
  });

  const table = useReactTable({
    data: trainees?.data.results || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (debouncedSearch.trim() === "") {
      setShowDropdown(false);
      setData(null);
      return;
    }

    const fetchTrainees = async () => {
      setNotFound(false);

      try {
        const results = await searchTrainee({
          search: debouncedSearch,
        }).unwrap();
        setData(results.data);
        setShowDropdown(results.data.length > 0);
      } catch (error) {
        if ((error as { status: number }).status === 404) {
          setNotFound(true);
          setShowDropdown(false);
        }
      }
    };

    fetchTrainees();
  }, [debouncedSearch, searchTrainee]);

  return (
    <TraineeManagementContainer>
      <div
        style={{
          position: "relative",
        }}
      >
        <FormInput
          formInputType={FormInputTypes.SearchInput}
          placeholder="SearchTrainees"
          type="search"
          autoComplete="off"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {!isSearching && showDropdown && data && data.length > 0 && (
          <StyledDropDown>
            {data.map((trainee) => (
              <li key={trainee.id} onClick={() => navigate(`${trainee.id}`)}>
                {trainee.name}
              </li>
            ))}
          </StyledDropDown>
        )}
        {isSearching && <p>Loading...</p>}
        {notFound && searchText !== "" && <p>No Trainee found</p>}
      </div>
      <Button onClick={() => setIsAddNewTraineeModalOpen((prev) => !prev)}>
        Add New Trainee
      </Button>
      <Modal
        open={isAddNewTraineeModalOpen}
        closeModal={() => setIsAddNewTraineeModalOpen(false)}
        title="ADD NEW TRAINEE"
      >
        <AddTraineeForm toggleModalOpen={setIsAddNewTraineeModalOpen} />
      </Modal>
      {isLoading ? (
        <StyledSkeleton>Loading trainees...</StyledSkeleton>
      ) : (
        <StyledTable>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <StyledTR key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <StyledTH key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </StyledTH>
                ))}
              </StyledTR>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <StyledTR
                key={row.id}
                onClick={() => navigate(`/trainees/${row.original._id}`)}
              >
                {row.getVisibleCells().map((cell) => (
                  <StyledTD key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </StyledTD>
                ))}
              </StyledTR>
            ))}
          </tbody>
        </StyledTable>
      )}

      <StyledPagination>
        <Button
          disable={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          width="100px"
        >
          Previous
        </Button>
        <span>Page {page}</span>
        <Button
          disable={!trainees?.data.next}
          onClick={() => setPage((prev) => prev + 1)}
          width="100px"
        >
          Next
        </Button>
      </StyledPagination>
    </TraineeManagementContainer>
  );
};

export default TraineeManagement;
