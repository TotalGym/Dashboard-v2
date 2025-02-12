import styled from "styled-components";

export const StyledLogoText = styled.span<{
  $fontSize?: string;
  $color: string;
  $marginRight?: boolean;
}>`
  user-select: none;
  color: ${({ $color }) => $color};
  font-size: ${({ $fontSize }) => ($fontSize ? $fontSize : "34px")};
  font-weight: 700;
  margin-right: ${({ $marginRight }) => ($marginRight ? "0.25em" : 0)};

  @media(max-width: ${({theme})=>theme.breakpoints.sm}){
    font-size: 32px;
  }
`;
