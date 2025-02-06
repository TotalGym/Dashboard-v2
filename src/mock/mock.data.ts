import { LastAddedTraineeTable } from "../types/trainee.types";
import { RecentlyAttendingStaff, Roles } from "../types/staff.types";

export const lastAddedTraineesData: LastAddedTraineeTable[] = [
  {
    number: 101,
    name: "Inverness McKenzei",
    assignedCoach: "Lance Borgol",
    dateOfAdmit: new Date(),
    subscribtionType: "monthly",
    status: "active",
  },
  {
    number: 102,
    name: "Inverness McKenzei",
    assignedCoach: "Lance Borgol",
    dateOfAdmit: new Date(),
    subscribtionType: "annually",
    status: "inactive",
  },
  {
    number: 103,
    name: "Inverness McKenzei",
    assignedCoach: "Lance Borgol",
    dateOfAdmit: new Date(),
    subscribtionType: "monthly",
    status: "active",
  },
  {
    number: 104,
    name: "Inverness McKenzei",
    assignedCoach: "Lance Borgol",
    dateOfAdmit: new Date(),
    subscribtionType: "monthly",
    status: "active",
  },
  {
    number: 105,
    name: "Inverness McKenzei",
    assignedCoach: "Lance Borgol",
    dateOfAdmit: new Date(),
    subscribtionType: "monthly",
    status: "new",
  },
  {
    number: 106,
    name: "Inverness McKenzei",
    assignedCoach: "Lance Borgol",
    dateOfAdmit: new Date(),
    subscribtionType: "monthly",
    status: "active",
  },
];

export const recentlyAttendingStaff: RecentlyAttendingStaff[] = [
  {
    name: "Theodore Handle",
    attendanceTime: new Date(),
    role: Roles.Coach,
  },
  {
    name: "Theodore Handle",
    attendanceTime: new Date(),
    role: Roles.EquipmentManager,
  },
  {
    name: "Theodore Handle",
    attendanceTime: new Date(),
    role: Roles.SalesManager,
  },
  {
    name: "Theodore Handle",
    attendanceTime: new Date(),
    role: Roles.EquipmentManager,
  },
  {
    name: "Theodore Handle",
    attendanceTime: new Date(),
    role: Roles.Coach,
  },
];
