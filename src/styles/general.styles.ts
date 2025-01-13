import { css } from "styled-components";

export const CenteredFlexContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CenteredColFlexContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MediumBold = css`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const MediumFontSize = css`
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
`;
