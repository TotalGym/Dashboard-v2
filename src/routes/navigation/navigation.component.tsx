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
  HideLogoSpan,
} from "./navigation.styles";
import HamburgerMenu from "../../components/hamburger-menu/hamburger-menu.component";

const Navigation = () => {
  const location = useLocation();
  const routes = [
    { name: "DASHBOARD", path: "/" },
    { name: "TRAINEE", path: "trainees" },
    { name: "EQUIPMENT", path: "equipment/1" },
    { name: "PROGRAMS", path: "programs/1" },
    { name: "SALES", path: "sales/1" },
    { name: "STAFF", path: "staff" },
    { name: "REPORTS", path: "reports" },
  ];

  return (
    <NavigationContainer>
      <HamburgerMenu />
      <HideLogoSpan>
        <Logo routable />
      </HideLogoSpan>
      <StyledNavigationList>
        {routes.map((route, index) => {
          const isActive =
            location.pathname === route.path ||
            (route.name === "PROGRAMS" &&
              location.pathname.startsWith("/programs")) ||
            (route.name === "EQUIPMENT" &&
              location.pathname.startsWith("/equipment")) ||
            (route.name === "SALES" &&
              (location.pathname.startsWith("/sales") ||
                location.pathname.startsWith("/productDetails")));

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
      <Button className="hide-from-nav-bar">ADD NEW TRAINEE</Button>
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
