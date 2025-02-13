import Hamburger from "hamburger-react";
import { useEffect, useRef, useState } from "react";
import {
  HamburgerMenuContainer,
  StyledHamburgerNavLink,
  StyledSpanToHideBurger,
} from "./hamburger-menu.styles";
import { useLocation } from "react-router-dom";

const routes = [
  { name: "DASHBOARD", path: "/" },
  { name: "TRAINEE", path: "trainees" },
  { name: "EQUIPMENT", path: "equipment/1" },
  { name: "PROGRAMS", path: "programs/1" },
  { name: "SALES", path: "sales" },
  { name: "STAFF", path: "staff" },
  { name: "REPORTS", path: "reports" },
];

const HamburgerMenu = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <StyledSpanToHideBurger>
      <button ref={buttonRef} style={{ all: "unset" }}>
        <Hamburger toggled={open} toggle={() => setOpen((prev) => !prev)} />
      </button>

      <HamburgerMenuContainer ref={menuRef} $open={open}>
        {routes.map((route) => {
          const isActive =
            location.pathname === route.path ||
            (route.name === "PROGRAMS" &&
              location.pathname.startsWith("/programs")) ||
            (route.name === "EQUIPMENT" &&
              location.pathname.startsWith("/equipment"));
          return (
            <StyledHamburgerNavLink
              to={route.path}
              className={isActive ? "active" : ""}
              onClick={() => setOpen(false)}
              key={route.name}
            >
              {route.name}
            </StyledHamburgerNavLink>
          );
        })}
      </HamburgerMenuContainer>
    </StyledSpanToHideBurger>
  );
};
export default HamburgerMenu;
