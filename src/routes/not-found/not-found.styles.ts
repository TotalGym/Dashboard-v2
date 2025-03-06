import styled from "styled-components";
import {
  CenteredFlexContainer,
  MainBgColor,
} from "../../styles/general.styles";

export const NotFoundContainer = styled.div`
  ${CenteredFlexContainer}
  ${MainBgColor}
  height: 100vh;
  gap: 1em;

  a {
    text-decoration: underline;
    color: red;
    background-color: pink;
    padding: 2em;
    border-radius: 1em;

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      &:hover {
        background-color: white;
        outline: 1px solid red;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;
