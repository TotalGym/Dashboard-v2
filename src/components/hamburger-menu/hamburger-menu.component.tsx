import Hamburger from "hamburger-react";
import { useEffect, useRef, useState } from "react";
import {
  HamburgerMenuContainer,
  StyledHamburgerNavLink,
  StyledSpanToHideBurger,
} from "./hamburger-menu.styles";

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
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <StyledSpanToHideBurger>
      <Hamburger toggle={setOpen} toggled={open} />
      {open && (
        <HamburgerMenuContainer ref={menuRef}>
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
      )}
    </StyledSpanToHideBurger>
  );
};
export default HamburgerMenu;
