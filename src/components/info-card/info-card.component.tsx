import { ReactNode } from "react";

import ThreeStripes from "../../assets/three-stripes.svg?react";

import {
  InfoCardContainer,
  StyledNumberIcon,
  StyledInfoText,
} from "./info-card.styles";

type InfoCardProps = {
  number: number | null;
  text: string;
  children: ReactNode;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  numberColorSwitched?: boolean;
  isLoading: boolean;
};

const InfoCard = ({
  number,
  text,
  children,
  onClick,
  numberColorSwitched = false,
  isLoading,
}: InfoCardProps) => {
  return (
    <InfoCardContainer onClick={onClick}>
      <div>
        <StyledNumberIcon $numberColorSwitched={numberColorSwitched}>
          <ThreeStripes />
          {isLoading ? "loading..." : <span>{number}</span>}
        </StyledNumberIcon>
        <StyledInfoText>{text}</StyledInfoText>
      </div>
      {children}
    </InfoCardContainer>
  );
};
export default InfoCard;
