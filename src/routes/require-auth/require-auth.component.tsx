import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectToken } from "../../features/auth/auth.slice";
import { useEffect, useState } from "react";

const RequireAuth = () => {
  const token = useAppSelector(selectToken);
  const location = useLocation();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    setCheckingAuth(false);
  }, [token]);

  if (checkingAuth) {
    return <p>Loading...</p>;
  }

  return token ? (
    <Outlet />
  ) : (
    <Navigate to={"/auth"} state={{ from: location }} replace />
  );
};
export default RequireAuth;
