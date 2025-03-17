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
  StyledHomePageChartsContainer,
  StyledHomePageTablesContainer,
} from "./home.styles";
import MembersChart from "../../components/members-chart/members-chart.component";
import ClubEnrollmentChart from "../../components/club-enrollment-chart/club-enrollment-chart.component";
import LastAddedTraineeTable from "../../components/last-added-trainee-table/last-added-trainees-table.component";
import RecentlyAttendingStaffTable from "../../components/recently-attending-staff-table/recently-attending-staff-table.component";
import { useAppSelector } from "../../app/hooks";
import {
  selectHomeData,
  selectIsHomeDataLoading,
} from "../../features/home/home.slice";

const Home = () => {
  const navigate = useNavigate();
  const homeData = useAppSelector(selectHomeData);
  const isLoading = useAppSelector(selectIsHomeDataLoading);

  const cardsInfo = [
    {
      number: homeData.trainees,
      text: "TOTAL MEMBERS",
      icon: <MembersIcon />,
      route: "/trainees",
    },
    {
      number: homeData.pendingPayments,
      text: "PENDING PAYMENTS",
      icon: <PaymentIcon />,
      switched: true,
      route: "/trainees",
    },
    {
      number: homeData.underMaintenanceEquipments,
      text: "DEVICES NEEDING MAINTENANCE",
      icon: <EquipmentIcon />,
      route: "/equipment/1",
    },
    {
      number: homeData.totalPrograms,
      text: "TOTAL PROGRAMS",
      icon: <ProgramsIcon />,
      switched: true,
      route: "/programs/1",
    },
  ];

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
            isLoading={isLoading}
          >
            {info.icon}
          </InfoCard>
        ))}
      </InfoCardsContainer>
      <StyledHomePageChartsContainer>
        <MembersChart />
        <ClubEnrollmentChart />
      </StyledHomePageChartsContainer>
      <StyledHomePageTablesContainer>
        <LastAddedTraineeTable />
        <RecentlyAttendingStaffTable />
      </StyledHomePageTablesContainer>
    </HomeContainer>
  );
};
export default Home;
