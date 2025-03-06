import styled, { keyframes } from "styled-components";
import { MainBgColor, MainContentPadding } from "../../styles/general.styles";

export const EquipmentDetailsContainer = styled.div`
  ${MainBgColor}
  ${MainContentPadding}
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

export const StyledEquipmentInfo = styled.div`
  cursor: pointer;
  text-align: center;

  p {
    margin: 5px 0;
    font-size: 18px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors["font-secondary"]};
  }

  span {
    font-weight: normal;
    color: ${({ theme }) => theme.colors["font-primary"]};
  }
`;

export const StyledImage = styled.img`
  width: 500px;
  height: 500px;
  object-fit: contain;
  border-radius: 10px;
`;

export const StyledModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const StyledButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

export const StyledEquipmentSkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

export const StyledEquipmentSkeletonBox = styled.div<{ $width?: string }>`
  width: ${({ $width }) => $width || "100%"};
  height: 20px;
  background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 8px;
`;

export const StyledEquipmentSkeletonImage = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 8px;
  background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite linear;
`;
