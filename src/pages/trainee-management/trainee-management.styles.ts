import styled from "styled-components";
import { MainBgColor } from "../../styles/general.styles";

export const TraineeManagementContainer = styled.div`
  ${MainBgColor}
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-height: 100vh;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
`;

export const StyledThead = styled.thead`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const StyledTH = styled.th`
  background: ${({ theme }) => theme.colors["bg-secondary"]};
  color: white;
  padding: 20px;
  text-align: center;

  @media (max-width: 768px) {
    &:nth-child(n + 4) {
      display: none;
    }
  }
`;

export const StyledTD = styled.td`
  padding: 20px 10px;
  border-bottom: 1px solid #ddd;
  text-align: center;
  user-select: none;

  @media (max-width: 768px) {
    &:nth-child(n + 4) {
      display: none;
    }
  }
`;

export const StyledTR = styled.tr`
  &:nth-child(even) {
    background: #f2f2f2;
  }

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  cursor: pointer;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

export const StyledSkeleton = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(90deg, #eee, #ddd, #eee);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #777;
`;

export const StyledDropDown = styled.ul`
  position: absolute;
  background-color: white;
  width: 100%;
  li {
    cursor: pointer;
    height: 50px;
    padding: 1em;
    border: 1px solid ${({ theme }) => theme.colors["bg-secondary"]};

    &:hover {
      opacity: 0.8;
      background-color: lightgreen;
    }
  }
`;
