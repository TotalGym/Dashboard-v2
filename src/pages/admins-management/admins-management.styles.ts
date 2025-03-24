import styled from "styled-components";
import {
  CenteredColFlexContainer,
  MainBgColor,
  MainContentPadding,
} from "../../styles/general.styles";

export const AdminManagementContainer = styled.div`
  ${MainBgColor}
  ${MainContentPadding}
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 160px);
  border-radius: 30px;

  @media (max-width: 768px) {
    border-radius: 20px;
    padding: 1rem;
    min-height: calc(100vh - 160px);
    min-width: 350px;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-width: 250px;

  @media (max-width: 768px) {
    margin-top: 1rem;
    box-shadow: none;
  }
`;

export const StyledTableHead = styled.thead`
  background-color: ${({ theme }) => theme.colors["font-secondary"]};
  color: white;

  @media (max-width: 480px) {
    display: none;
  }
`;

export const StyledTableRow = styled.tr`
  cursor: pointer;
  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  @media (max-width: 480px) {
    display: block;
    margin-bottom: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 0.5rem;
  }
`;

export const StyledTableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
  text-align: left;

  @media (max-width: 480px) {
    display: block;
    border-bottom: none;
    padding: 0.5rem;
    text-align: right;
    position: relative;
    padding-left: 50%;

    &::before {
      content: attr(data-label);
      position: absolute;
      left: 1rem;
      width: calc(50% - 1rem);
      padding-right: 1rem;
      text-align: left;
      font-weight: bold;
      color: ${({ theme }) => theme.colors["font-secondary"]};
    }
  }

  @media (max-width: 360px) {
    font-size: 0.9rem;
  }
`;

export const StyledTableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

export const StyledRoleBadge = styled.span<{ $isSuperAdmin: boolean }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${({ $isSuperAdmin }) =>
    $isSuperAdmin ? "#e3f2fd" : "#e8f5e9"};
  color: ${({ $isSuperAdmin }) => ($isSuperAdmin ? "#1976d2" : "#2e7d32")};

  @media (max-width: 480px) {
    float: right;
  }
`;

export const StyledLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const StyledErrorMessage = styled.div`
  padding: 2rem;
  color: #d32f2f;
  text-align: center;

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 0.9rem;
  }
`;

export const StyledTitle = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    text-align: center;
  }
`;
export const StyledConfirmationModal = styled.div`
  padding: 1.5rem;
  max-width: 400px;
  margin: 0 auto;
`;

export const StyledConfirmationText = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.5;
  text-align: center;
`;

export const StyledConfirmationActions = styled.div`
  ${CenteredColFlexContainer}
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const StyledDeleteButton = styled.button`
  background: none;
  border: none;
  color: #d32f2f;
  cursor: pointer;
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(211, 47, 47, 0.1);
  }

  &:disabled {
    color: #9e9e9e;
    cursor: not-allowed;
    background-color: transparent;
  }
`;
