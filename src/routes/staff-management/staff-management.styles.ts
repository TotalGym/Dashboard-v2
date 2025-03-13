import styled from "styled-components";

export const StaffManagementContainer = styled.div`
  padding: 20px;
  font-family: "Arial", sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  font-size: large;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: small;
  }
`;

export const StyledStaffManagementTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;

  th,
  td {
    padding: 12px 15px;
    text-align: center;
  }

  th {
    background-color: ${({ theme }) => theme.colors["bg-secondary"]};
    color: white;
    font-weight: bold;
  }

  td {
    border-bottom: 1px solid #ddd;
  }

  tr:hover {
    background-color: #f1f1f1;
    transition: background-color 0.2s ease;
  }

  tr:last-child td {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    th[data-column="contact.email"],
    td[data-column="contact.email"],
    th[data-column="role"],
    td[data-column="role"] {
      display: none;
    }

    th,
    td {
      padding: 8px 10px;
    }
  }
`;

export const StyledStaffManagementPagination = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  button {
    width: 90px;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors["bg-secondary"]};
    color: white;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.2s ease;

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      &:hover {
        background-color: rgb(32, 232, 105);
        transform: translateY(-1px);
      }
    }

    &:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
      transform: none;
    }
  }

  span {
    font-size: 14px;
    color: #333;
  }
`;

export const StyledViewDetails = styled.button`
  background-color: ${({ theme }) => theme.colors["bg-secondary"]};
  color: white;
  border-radius: 0.5em;
  padding: 1em;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    &:hover {
      opacity: 0.8;
    }
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 3px;
  }
`;
