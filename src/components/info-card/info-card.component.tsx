import { ReactNode } from "react";

import ThreeStripes from "../../assets/three-stripes.svg?react";

import {
  InfoCardContainer,
  StyledNumberIcon,
  StyledInfoText,
} from "./info-card.styles";

type InfoCardProps = {
  number: string;
  text: string;
  children: ReactNode;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  numberColorSwitched?: boolean;
};

const InfoCard = ({
  number,
  text,
  children,
  onClick,
  numberColorSwitched = false,
}: InfoCardProps) => {
  return (
    <InfoCardContainer onClick={onClick}>
      <div>
        <StyledNumberIcon $numberColorSwitched={numberColorSwitched}>
          <ThreeStripes />
          <span>{number}</span>
        </StyledNumberIcon>
        <StyledInfoText>{text}</StyledInfoText>
      </div>
      {children}
    </InfoCardContainer>
  );
};
export default InfoCard;
