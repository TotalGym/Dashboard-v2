import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectRole } from "../../features/auth/auth.slice";
import { Roles } from "../../types/staff.types";

const SuperAdminOnly = () => {
  const role = useAppSelector(selectRole);

  if (role === Roles.SuperAdmin) {
    return <Outlet />;
  }

  return <Navigate to={"/unauthorized"} replace />;
};
export default SuperAdminOnly;
