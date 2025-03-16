import { Roles } from "./staff.types";

export type StoreReportItem = {
  ProductName: string;
  InventoryCount: number;
};

export type PaginationDetails = {
  page: number;
  limit: number;
};

export type StoreReportData = {
  reportName: string;
  totalCount: number;
  next: PaginationDetails | null;
  reportData: StoreReportItem[];
};

export type StaffReportItem = {
  Name: string;
  Role: Roles;
  Email: string;
  Payment: {
    salary: number;
    bonus: number;
    deductions: number;
    payDate: Date;
  };
};

export type StaffReportData = {
  reportName: string;
  totalCount: number;
  next: PaginationDetails | null;
  reportData: StaffReportItem[];
};

export type TraineeReportItem = {
  Name: string;
  Email: string;
  MembershipStartDate: Date;
  MembershipEndDate: Date;
  SelectedPrograms: string[];
};

export type TraineeReportData = {
  reportName: string;
  totalCount: number;
  next: PaginationDetails | null;
  reportData: TraineeReportItem[];
};

export type PaymentReportItem = {
  TraineeName: string;
  TraineeEmail: string;
  Amount: number;
  Status: string;
  DueDate: Date;
  PaymentDate: Date;
};

export type PaymentReportData = {
  reportName: string;
  totalCount: number;
  next: PaginationDetails | null;
  reportData: PaymentReportItem[];
};

export type EquipmentReportItem = {
  Name: string;
  Quantity: number;
  Status: "Available" | "Under Maintenance";
};

export type EquipmentReportData = {
  reportName: string;
  totalCount: number;
  next: PaginationDetails | null;
  reportData: EquipmentReportItem[];
};

export type ProgramReportItem = {
  ProgramName: string;
  Description: string;
  Exercises: {
    name: string;
    sets: number;
    repetitions: number;
    _id: string;
  }[];
  Schedule: {
    day: string;
    startTime: string;
    endTime: string;
    _id: string;
  }[];
  RegisteredTrainees: {
    Name: string;
    Email: string;
  }[];
};

export type ProgramReportData = {
  reportName: string;
  totalCount: number;
  next: PaginationDetails | null;
  reportData: ProgramReportItem[];
};
