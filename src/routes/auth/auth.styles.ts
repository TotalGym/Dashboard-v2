import styled from "styled-components";

import { CenteredFlexContainer } from "../../styles/general.styles";

export const AuthContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

export const AuthBackGroundContainer = styled.div<{ $bgImage: string }>`
  width: 50%;
  background-image: url(${({ $bgImage }) => $bgImage});
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
`;

export const AuthFormContainer = styled.div`
  ${CenteredFlexContainer}
  width: 50%;
`;
