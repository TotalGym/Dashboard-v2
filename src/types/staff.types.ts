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

export type Staff = {
  contact: {
    email: string;
    phoneNumber: string;
  };
  payroll: {
    salary: number;
    bonus?: number;
    deduction?: number;
    payDate?: Date;
  };

  attendance?: {
    date: Date;
    _id: string;
  }[];

  status?: string;
  _id: string;
  name: string;
  role: "Coach" | "EquipmentManager" | "SalesManager";
  createdAt?: Date;
};

export type GetStaffData = {
  results: Staff[];
  totalCount: number;
  page: number;
  limit: number;
  next?: {
    page: number;
    limit: number;
  };
  previous?: {
    page: number;
    limit: number;
  };
};
