import { Outlet, useLocation } from "react-router-dom";
import Navigation from "../navigation/navigation.component";
import Footer from "../../components/footer/footer.component";
import { useAppSelector } from "../../app/hooks";
import { selectToken } from "../../features/auth/auth.slice";
import { ToastContainer } from "react-toastify";

export const Layout = () => {
  const location = useLocation();
  const isAuthRoute = location.pathname.startsWith("/auth");
  const isForgetPasswordRoute =
    location.pathname.startsWith("/forget-password");
  const isVerifyCodeRoute = location.pathname.startsWith("/verify-code");
  const isNewPasswordRoute = location.pathname.startsWith("/new-password");
  const token = useAppSelector(selectToken);

  return (
    <>
      {!isAuthRoute &&
        !isForgetPasswordRoute &&
        !isVerifyCodeRoute &&
        !isNewPasswordRoute &&
        token && <Navigation />}
      <Outlet />
      {!isAuthRoute &&
        !isForgetPasswordRoute &&
        !isVerifyCodeRoute &&
        !isNewPasswordRoute &&
        token && <Footer />}
      <ToastContainer />
    </>
  );
};
