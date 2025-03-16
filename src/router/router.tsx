import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import { Layout } from "../routes/layout/layout.component";
import RequireAuth from "../routes/require-auth/require-auth.component";
import AdminsOnly from "../routes/role-based-routes/admins-only-route.component";
import AdminsManagement from "../routes/admins-management/admins-management.component";
import Unauthorized from "../routes/role-based-routes/unauthorized.component";
import SuperAdminOnly from "../routes/role-based-routes/super-admin-only.component";
import SalesManagerRoutes from "../routes/role-based-routes/sales-manager-routes.component";
import CoachRoutes from "../routes/role-based-routes/coach-routes.component";
import EquipmentManagerRoutes from "../routes/role-based-routes/equipment-manager-routes.component";

const SignIn = lazy(() => import("../routes/auth/sign-in.component"));
const EnterEmail = lazy(() => import("../routes/auth/enter-email.component"));
const VerifyCode = lazy(() => import("../routes/auth/verify-code.component"));
const NewPassword = lazy(() => import("../routes/auth/new-password.component"));
const Home = lazy(() => import("../routes/home/home.component"));
const TraineeManagement = lazy(
  () => import("../routes/trainee-management/trainee-management.component")
);
const EquipmentManagement = lazy(
  () => import("../routes/equipment-management/equipment-management.component")
);
const SalesManagement = lazy(
  () => import("../routes/sales-management/sales-management.component")
);
const ProgramsManagement = lazy(
  () => import("../routes/programs-management/programs-management.component")
);
const StaffManagement = lazy(
  () => import("../routes/staff-management/staff-management.component")
);
const Reports = lazy(() => import("../routes/reports/reports.component"));
const NotFound = lazy(() => import("../routes/not-found/not-found.component"));
const ProgramDetails = lazy(
  () => import("../routes/program-details/program-details.component")
);
const ProgramgsPage = lazy(
  () => import("../routes/programs-page/programs-page.component")
);
const EquipmentDetails = lazy(
  () => import("../routes/equipment-details/equipment-details.component")
);
const ProductDetails = lazy(
  () => import("../routes/product-details/product-details.component")
);
const SalesHistory = lazy(
  () => import("../routes/sales-history/sales-history.component")
);
const TraineeDetails = lazy(
  () => import("../routes/trainee-details/trainee-details.component")
);
const StaffDetails = lazy(
  () => import("../routes/staff-details/staff-details.component")
);
const StoreReport = lazy(
  () => import("../routes/reports/store-report.component")
);
const StaffReport = lazy(
  () => import("../routes/reports/staff-report.components")
);
const TraineeReport = lazy(
  () => import("../routes/reports/trainee-report.component")
);
const EquipmentReport = lazy(
  () => import("../routes/reports/equipment-report..component")
);
const ProgramsReport = lazy(
  () => import("../routes/reports/programs-report.component")
);
const PaymentsReport = lazy(
  () => import("../routes/reports/payments-report.component")
);

const Router = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
