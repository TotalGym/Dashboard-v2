import styled from "styled-components";
import {
  CenteredColFlexContainer,
  MainContentPadding,
  MediumBold,
  MediumFontSize,
} from "../../styles/general.styles";

export const RecentlyAttendingStaffTableContainer = styled.div`
  ${MainContentPadding}
  ${CenteredColFlexContainer}
  ${MediumFontSize}
  justify-content: space-around;
  width: 500px;
  height: 580px;
  background-color: white;
  border-radius: 1em;

  @media (max-width: 501px) {
    display: none;
  }
`;

export const RecentlyAttendingStaffTableRow = styled.div`
  ${MainContentPadding}
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  background-color: ${({ theme }) => theme.colors["bg-primary"]};
  border: 1px solid ${({ theme }) => theme.colors["font-primary"]};
  cursor: pointer;
`;

export const RecentlyAttendingStaffTableCell = styled.div<{
  $colored?: boolean;
}>`
  ${MediumBold}
  color: ${({ $colored, theme }) =>
    $colored ? theme.colors["font-secondary"] : ""};
`;
