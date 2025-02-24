import styled from "styled-components";
import {
  Bold,
  CenteredFlexContainer,
  XXXLargeFontSize,
} from "../../styles/general.styles";

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 3em;
  border-radius: 0.5em;
  z-index: 1000;
  max-height: 720px;
  overflow: auto;

  @media (max-width: 520px) {
    /* ${CenteredFlexContainer} */
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    border-radius: 0;
    max-height: none;
  }

  @media (max-height: 600px) {
    height: 550px;
    overflow-y: scroll;
  }
`;

export const ModalOverLay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(0, 0, 0, 0.7);
  z-index: 1000;
`;

export const ModalTitle = styled.h2`
  ${XXXLargeFontSize}
  ${Bold}
  position: absolute;
  top: 1em;
  right: 2.2em;
  margin: 0 auto;
  background-color: white;
  color: ${({ theme }) => theme.colors["font-secondary"]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;
