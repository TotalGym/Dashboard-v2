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

export const MainContainersHeight = css`
  height: calc(100vh - 80px);
`;

export const MainContentPadding = css`
  padding: 2em;
`;

export const MediumBold = css`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const Bold = css`
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

export const MediumFontSize = css`
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
`;

export const XLargeFontSize = css`
  font-size: ${({ theme }) => theme.typography.fontSize.xlarge};
`;

export const XXLargeFontSize = css`
  font-size: ${({ theme }) => theme.typography.fontSize.xxlarge};
`;

