import styled from "styled-components";
import { MainBgColor } from "../../styles/general.styles";

export const SalesHistoryContainer = styled.div`
  ${MainBgColor}
  max-width: 100%;
  margin-top: 2em;
  padding: 20px;
  padding-inline: 6em;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const StyledRecord = styled.div`
  padding: 15px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;

  h3 {
    margin-bottom: 5px;
    color: #333;
  }

  p {
    margin: 2px 0;
    color: #555;
  }
`;

export const StyledLoader = styled.p`
  text-align: center;
  font-weight: bold;
  color: #007bff;
`;

export const SkeletonLoader = styled.div`
  width: 100%;
  height: 148px;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
  border-radius: 5px;
  margin-bottom: 10px;

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;
