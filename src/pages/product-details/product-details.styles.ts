import styled from "styled-components";
import { MainBgColor, MainContentPadding } from "../../styles/general.styles";

export const ProductDetailsContainer = styled.div`
  ${MainBgColor}
  ${MainContentPadding}
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const StyledProductImage = styled.img`
  width: 500px;
  height: 500px;
  object-fit: contain;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const StyledProductInfo = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: 500;

  p {
    margin: 5px 0;
  }
`;

export const StyledProductDescription = styled.p`
  font-size: 16px;
  text-align: center;
  max-width: 600px;
  color: #555;
`;

export const StyledProductButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const StyledProductDeleteModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

export const StyledProductSkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

export const StyledProductSkeletonBox = styled.div`
  background: #e0e0e0;
  border-radius: 8px;
  animation: pulse 1.5s infinite ease-in-out;
  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.6;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const StyledProductSkeletonImage = styled(StyledProductSkeletonBox)`
  width: 500px;
  height: 500px;
`;

export const StyledProductSkeletonText = styled(StyledProductSkeletonBox)<{
  $width?: string;
}>`
  width: ${(props) => props.$width || "100%"};
  height: 20px;
`;
