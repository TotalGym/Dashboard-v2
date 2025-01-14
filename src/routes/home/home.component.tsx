import { useNavigate } from "react-router-dom";

import InfoCard from "../../components/info-card/info-card.component";

import MembersIcon from "../../assets/body-building.svg?react";
import PaymentIcon from "../../assets/payment.svg?react";
import EquipmentIcon from "../../assets/equipment.svg?react";
import ProgramsIcon from "../../assets/programs.svg?react";

import {
  HomeContainer,
  StyledHello,
  StyledHomeHeader,
  InfoCardsContainer,
} from "./home.styles";

const cardsInfo = [
  {
    number: "38",
    text: "TOTAL MEMBERS",
    icon: <MembersIcon />,
    route: "/trainees",
  },
  {
    number: "16",
    text: "PENDING PAYMENTS",
    icon: <PaymentIcon />,
    switched: true,
    route: "/trainees",
  },
  {
    number: "4",
    text: "DEVICES NEEDING MAINTENANCE",
    icon: <EquipmentIcon />,
    route: "/equipment",
  },
  {
    number: "24",
    text: "TOTAL PROGRAMS",
    icon: <ProgramsIcon />,
    switched: true,
    route: "/programs",
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <StyledHomeHeader>
        <StyledHello>Hello</StyledHello>, Welcome to the Dashboard
      </StyledHomeHeader>
      <InfoCardsContainer>
        {cardsInfo.map((info, index) => (
          <InfoCard
            key={index}
            number={info.number}
            text={info.text}
            numberColorSwitched={info.switched ? info.switched : false}
            onClick={() => navigate(info.route)}
          >
            {info.icon}
          </InfoCard>
        ))}
      </InfoCardsContainer>
      <div>HomePageStatistics</div>
      <div>homePageTables</div>
    </HomeContainer>
  );
};
export default Home;
