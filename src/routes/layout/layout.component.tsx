import { Outlet, useLocation } from "react-router-dom";
import Navigation from "../navigation/navigation.component";
import Footer from "../../components/footer/footer.component";

export const Layout = () => {
  const location = useLocation();
  const isAuthRoute = location.pathname.startsWith("/auth");
  const isForgetPasswordRoute =
    location.pathname.startsWith("/forget-password");
  const isVerifyCodeRoute = location.pathname.startsWith("/verify-code");
  const isNewPasswordRoute = location.pathname.startsWith("/new-password");

  return (
    <>
      {!isAuthRoute &&
        !isForgetPasswordRoute &&
        !isVerifyCodeRoute &&
        !isNewPasswordRoute && <Navigation />}
      <Outlet />
      <Footer />
    </>
  );
};
