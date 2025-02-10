import { useLocation } from "react-router-dom";
import Button from "../../components/button/button.component";
import BellIcon from "../../components/icons/bell-icon.component";
import Logo from "../../components/logo/logo.component";
import ProfileLogo from "../../components/profile-logo/profile-logo.component";
import {
  BellIconContainer,
  NavigationContainer,
  StyledNavigationList,
  StyledNavigationListItem,
  StyledNavigationNavLink,
  BellIconAndProfileContainer,
} from "./navigation.styles";

const routes = [
  { name: "DASHBOARD", path: "/" },
  { name: "TRAINEE", path: "trainees" },
  { name: "EQUIPMENT", path: "equipment/1" },
  { name: "PROGRAMS", path: "programs/1" },
  { name: "SALES", path: "sales" },
  { name: "STAFF", path: "staff" },
  { name: "REPORTS & ANALYTICS", path: "reports-and-analytics" },
];

const Navigation = () => {
  const location = useLocation();

  return (
    <NavigationContainer>
      <Logo routable />
      <StyledNavigationList>
        {routes.map((route, index) => {
          const isActive =
            location.pathname === route.path ||
            (route.name === "PROGRAMS" &&
              location.pathname.startsWith("/programs")) ||
            (route.name === "EQUIPMENT" &&
              location.pathname.startsWith("/equipment"));

          return (
            <StyledNavigationListItem key={index}>
              <StyledNavigationNavLink
                to={route.path}
                className={isActive ? "active" : ""}
              >
                {route.name}
              </StyledNavigationNavLink>
            </StyledNavigationListItem>
          );
        })}
      </StyledNavigationList>
      <Button>ADD NEW TRAINEE</Button>
      <BellIconAndProfileContainer>
        <BellIconContainer>
          <BellIcon />
        </BellIconContainer>
        <ProfileLogo />
      </BellIconAndProfileContainer>
    </NavigationContainer>
  );
};
export default Navigation;
