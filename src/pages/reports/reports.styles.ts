import styled from "styled-components";
import {
  CenteredColFlexContainer,
  MainBgColor,
  MainContentPadding,
} from "../../styles/general.styles";

export const ReportsContainer = styled.div`
  ${MainBgColor}
  ${MainContentPadding}
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center;
  column-gap: 2em;
  min-height: calc(100vh - 160px);

  row-gap: 2em;
  @media (max-width: 1135px) {
    grid-template-columns: 1fr;
  }
`;

export const StyledReportCard = styled.div`
  ${MainContentPadding}
  ${CenteredColFlexContainer}
  gap: 1em;
  background-color: white;
  font-size: larger;
  font-weight: bold;
  height: 180px;
  min-width: 240px;
  width: 300px;
  max-width: 380px;
  border-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

export const Container = styled.div`
  ${MainBgColor}
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
  text-align: center;
`;

export const Metadata = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const MetadataText = styled.p`
  margin: 5px 0;
  font-size: 16px;
  color: #555;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const TableHeader = styled.thead`
  background-color: ${({ theme }) => theme.colors["bg-secondary"]};
  color: #fff;
`;

export const TableHeaderCell = styled.th`
  padding: 12px;
  text-align: left;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
  &:hover {
    background-color: #f1f1f1;
  }
`;

export const TableCell = styled.td`
  padding: 12px;
  text-align: left;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

export const PaginationButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors["bg-secondary"]};
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgb(16, 186, 95);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const LoadingMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: #555;
  padding: 20px;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: #ff0000;
  padding: 20px;
`;
