export enum Roles {
  Admin = "Admin",
  SuperAdmin = "SuperAdmin",
  Coach = "Coach",
  EquipmentManager = "EquipmentManager",
  SalesManager = "SalesManager",
}

export type RecentlyAttendingStaff = {
  name: string;
  attendanceTime: Date;
  role: Roles;
};

export type AuthUserData = {
  email: string;
  id: string;
  name: string;
  role: Roles;
};
