import styled from "styled-components";
import { MainBgColor } from "../../styles/general.styles";

export const StaffDetailsContainer = styled.div`
  ${MainBgColor}
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  min-height: calc(100vh - 160px);
`;

export const StyledStaffDetailsTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

export const StyledStaffDetailsSection = styled.section`
  margin-bottom: 20px;
`;

export const StyledStaffDetailsSectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

export const StyledStaffDetailsInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
`;

export const StyledStaffDetailsLabel = styled.span`
  font-weight: bold;
`;

export const StyledStaffDetailsValue = styled.span`
  color: #555;
`;
