export enum Roles {
  Coach = "Coach",
  EquipmentManager = "EquipmentManager",
  SalesManager = "SalesManager",
  SuperAdmin = "SuperAdmin",
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
