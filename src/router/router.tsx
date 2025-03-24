import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import { Layout } from "../pages/layout/layout.component";
import RequireAuth from "../pages/require-auth/require-auth.component";
import AdminsOnly from "../pages/role-based-routes/admins-only-route.component";
import AdminsManagement from "../pages/admins-management/admins-management.component";
import Unauthorized from "../pages/role-based-routes/unauthorized.component";
import SuperAdminOnly from "../pages/role-based-routes/super-admin-only.component";
import SalesManagerRoutes from "../pages/role-based-routes/sales-manager-routes.component";
import CoachRoutes from "../pages/role-based-routes/coach-routes.component";
import EquipmentManagerRoutes from "../pages/role-based-routes/equipment-manager-routes.component";
import Spinner from "../components/spinner/spinner.component";
import Profile from "../pages/profile/profile.component";

const SignIn = lazy(() => import("../pages/auth/sign-in.component"));
const EnterEmail = lazy(() => import("../pages/auth/enter-email.component"));
const VerifyCode = lazy(() => import("../pages/auth/verify-code.component"));
const NewPassword = lazy(() => import("../pages/auth/new-password.component"));
const Home = lazy(() => import("../pages/home/home.component"));
const TraineeManagement = lazy(
  () => import("../pages/trainee-management/trainee-management.component")
);
const EquipmentManagement = lazy(
  () => import("../pages/equipment-management/equipment-management.component")
);
const SalesManagement = lazy(
  () => import("../pages/sales-management/sales-management.component")
);
const ProgramsManagement = lazy(
  () => import("../pages/programs-management/programs-management.component")
);
const StaffManagement = lazy(
  () => import("../pages/staff-management/staff-management.component")
);
const Reports = lazy(() => import("../pages/reports/reports.component"));
const NotFound = lazy(() => import("../pages/not-found/not-found.component"));
const ProgramDetails = lazy(
  () => import("../pages/program-details/program-details.component")
);
const ProgramgsPage = lazy(
  () => import("../pages/programs-page/programs-page.component")
);
const EquipmentDetails = lazy(
  () => import("../pages/equipment-details/equipment-details.component")
);
const ProductDetails = lazy(
  () => import("../pages/product-details/product-details.component")
);
const SalesHistory = lazy(
  () => import("../pages/sales-history/sales-history.component")
);
const TraineeDetails = lazy(
  () => import("../pages/trainee-details/trainee-details.component")
);
const StaffDetails = lazy(
  () => import("../pages/staff-details/staff-details.component")
);
const StoreReport = lazy(
  () => import("../pages/reports/store-report.component")
);
const StaffReport = lazy(
  () => import("../pages/reports/staff-report.components")
);
const TraineeReport = lazy(
  () => import("../pages/reports/trainee-report.component")
);
const EquipmentReport = lazy(
  () => import("../pages/reports/equipment-report..component")
);
const ProgramsReport = lazy(
  () => import("../pages/reports/programs-report.component")
);
const PaymentsReport = lazy(
  () => import("../pages/reports/payments-report.component")
);

const Router = () => {
  return (
    <Suspense
      fallback={
        <>
          <Spinner />
        </>
      }
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="auth" element={<SignIn />} />
          <Route path="forget-password" element={<EnterEmail />} />
          <Route path="verify-code" element={<VerifyCode />} />
          <Route path="new-password" element={<NewPassword />} />

          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route index element={<Home />} />
            <Route path="reports" element={<Reports />} />
            <Route path="profile" element={<Profile />} />

            {/* Sales Manager Routes */}
            <Route element={<SalesManagerRoutes />}>
              <Route path="sales/:salesPage" element={<SalesManagement />} />
              <Route path="salesHistory" element={<SalesHistory />} />
              <Route
                path="productDetails/:productId"
                element={<ProductDetails />}
              />
              <Route path="reports/store-report" element={<StoreReport />} />
            </Route>

            {/* Equipment Manager Routes */}
            <Route element={<EquipmentManagerRoutes />}>
              <Route
                path="equipment/:equipmentPage"
                element={<EquipmentManagement />}
              />
              <Route
                path="equipmentDetails/:equipmentId"
                element={<EquipmentDetails />}
              />
              <Route
                path="reports/equipment-report"
                element={<EquipmentReport />}
              />
            </Route>

            {/* Coach Routes */}
            <Route element={<CoachRoutes />}>
              <Route
                path="reports/trainee-report"
                element={<TraineeReport />}
              />
              <Route
                path="reports/program-report"
                element={<ProgramsReport />}
              />
              <Route path="trainees" element={<TraineeManagement />} />
              <Route path="trainees/:traineeID" element={<TraineeDetails />} />
              <Route element={<ProgramsManagement />}>
                <Route
                  path="programs/:programsPage"
                  element={<ProgramgsPage />}
                />
                <Route
                  path="programsDetails/:programName"
                  element={<ProgramDetails />}
                />
              </Route>
            </Route>

            {/* Admin only Routes */}
            <Route element={<AdminsOnly />}>
              <Route path="staff" element={<StaffManagement />} />
              <Route path="staff/:staffId" element={<StaffDetails />} />
              <Route path="reports/staff-report" element={<StaffReport />} />
            </Route>
          </Route>

          {/* Super Admin only Routes */}
          <Route element={<SuperAdminOnly />}>
            <Route path="admins" element={<AdminsManagement />} />
            <Route path="reports/payment-report" element={<PaymentsReport />} />
          </Route>

          {/* unauthorized */}
          <Route path="unauthorized" element={<Unauthorized />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
