import { Route, Routes } from "react-router-dom";

import { Layout } from "../routes/layout/layout.component";
import SignIn from "../routes/auth/sign-in.component";
import EnterEmail from "../routes/auth/enter-email.component";
import VerifyCode from "../routes/auth/verify-code.component";
import NewPassword from "../routes/auth/new-password.component";
import Home from "../routes/home/home.component";
import TraineeManagement from "../routes/trainee-management/trainee-management.component";
import EquipmentManagement from "../routes/equipment-management/equipment-management.component";
import SalesManagement from "../routes/sales-management/sales-management.component";
import ProgramsManagement from "../routes/programs-management/programs-management.component";
import StaffManagement from "../routes/staff-management/staff-management.component";
import ReportsAndAnalytics from "../routes/reports-and-analytics/reports-and-analytics.component";
import NotFound from "../routes/not-found/not-found.component";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="auth" element={<SignIn />} />
        <Route path="forget-password" element={<EnterEmail />} />
        <Route path="verify-code" element={<VerifyCode />} />
        <Route path="new-password" element={<NewPassword />} />

        {/* protected routes */}
        <Route index element={<Home />} />
        <Route path="trainees" element={<TraineeManagement />} />
        <Route path="equipment" element={<EquipmentManagement />} />
        <Route path="sales" element={<SalesManagement />} />
        <Route path="programs" element={<ProgramsManagement />} />
        <Route path="staff" element={<StaffManagement />} />
        <Route path="reports-and-analytics" element={<ReportsAndAnalytics />} />
      </Route>
      {/* catch all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default Router;
