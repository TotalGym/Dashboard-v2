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
  { name: "EQUIPMENT", path: "equipment" },
  { name: "PROGRAMS", path: "programs" },
  { name: "SALES", path: "sales" },
  { name: "STAFF", path: "staff" },
  { name: "REPORTS & ANALYTICS", path: "reports-and-analytics" },
];

const Navigation = () => {
  return (
    <NavigationContainer>
      <Logo />
      <StyledNavigationList>
        {routes.map((route, index) => (
          <StyledNavigationListItem key={index}>
            <StyledNavigationNavLink to={route.path}>
              {route.name}
            </StyledNavigationNavLink>
          </StyledNavigationListItem>
        ))}
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
