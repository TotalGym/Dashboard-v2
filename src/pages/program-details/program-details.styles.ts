import styled, { keyframes } from "styled-components";
import { Bold, MainBgColor, MainContentPadding } from "../../styles/general.styles";

export const ProgramDetailsContainer = styled.div`
  ${MainBgColor}
  ${MainContentPadding}
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const ProgramImage = styled.img`
  width: 500px;
  height: 500px;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const ProgramInfo = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: 500;

  p {
    margin: 5px 0;
  }
`;

export const ProgramDescription = styled.p`
  font-size: 16px;
  text-align: center;
  max-width: 600px;
  color: #555;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const DeleteModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

export const ExerciseContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ScheduleContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const StyledConfirmDeleteText = styled.p`
  ${Bold}
  padding: 1em;
  color: ${({ theme }) => theme.colors["font-secondary-2"]};
`;

export const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
`;

const pulse = keyframes`
  0% {
    background-color: #e0e0e0;
  }
  50% {
    background-color: #f5f5f5;
  }
  100% {
    background-color: #e0e0e0;
  }
`;

export const SkeletonImage = styled.div`
  width: 500px;
  height: 500px;
  background-color: #ddd;
  border-radius: 10px;
  animation: ${pulse} 1.5s infinite ease-in-out;
`;

export const SkeletonText = styled.div<{ $width?: string }>`
  width: ${(props) => props.$width || "100%"};
  height: 20px;
  background-color: #ddd;
  border-radius: 5px;
  animation: ${pulse} 1.5s infinite ease-in-out;
`;
