import styled from "styled-components";
import { MainBgColor, MainContentPadding } from "../../styles/general.styles";

export const TraineeDetailsContainer = styled.div`
  ${MainContentPadding}
  ${MainBgColor}
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2em;

  h1 {
    color: ${({ theme }) => theme.colors["font-secondary"]};
  }
`;

export const StyledDetailsContainer = styled.div`
  ${MainContentPadding}
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 600px;
  margin: auto;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  min-height: calc(100vh - 160px);
`;

export const StyledInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
`;

export const Label = styled.span`
  font-weight: bold;
  color: #333;
`;

export const Value = styled.span`
  color: #555;
`;

export const StyledSkeleton = styled.div`
  width: 100%;
  height: calc(100vh);
  padding: 20px;
  text-align: center;
  font-size: 18px;
  background: #f3f3f3;
  border-radius: 10px;
  color: #aaa;
`;
