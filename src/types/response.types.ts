import { Equipment, GetEquipmentResponse } from "./equipment.types";
import {
  GetProductsResponse,
  Product,
  SalesHistoryRecord,
} from "./products.types";
import { Program, ProgramsResponse } from "./programs.types";
import {
  EquipmentReportData,
  PaymentReportData,
  ProgramReportData,
  StaffReportData,
  StoreReportData,
  TraineeReportData,
} from "./reports.types";
import { GetStaffData, Roles, Staff } from "./staff.types";
import { GetTraineesData, Trainee } from "./trainee.types";

export type UnifiedResponse = {
  success: boolean;
  message: string;
  error: null | string;
};

export type LoginResponse = UnifiedResponse & {
  data: {
    token: string;
    userData: {
      id: string;
      name: string;
      email: string;
      role: Roles;
    };
  };
};

export type GetUserDataResponse = UnifiedResponse & {
  data: {
    token: string;
    userData: {
      id: string;
      name: string;
      email: string;
      role: Roles;
    };
  };
};

export type GetProgramsResponse = UnifiedResponse & {
  data: ProgramsResponse;
};

export type GetAddUpdateProgramResponse = UnifiedResponse & {
  data: Program;
};

export type DeleteProgramResponse = UnifiedResponse & {
  data: null;
};

export type GetAllEquipment = UnifiedResponse & {
  data: GetEquipmentResponse;
};

export type GetAddUpdateEquipment = UnifiedResponse & {
  data: Equipment;
};

export type DeleteEquipmentResponse = UnifiedResponse & {
  data: null;
};

export type HomeDataResponse = UnifiedResponse & {
  data: {
    trainees: number;
    pendingPayments: number;
    underMaintenanceEquipments: number;
    totalPrograms: number;
    programs: { _id: string; programName: string }[];
    coaches: { _id: string; name: string }[];
  };
};

export type GetAllProductsResponse = UnifiedResponse & {
  data: GetProductsResponse;
};

export type GetAddUpdateProduct = UnifiedResponse & {
  data: Product;
};

export type DeleteProductResponse = UnifiedResponse & {
  data: null;
};

export type SearchTraineeByNameResponse = UnifiedResponse & {
  data: { id: string; name: string }[];
};

export type GetTraineesDataResponse = UnifiedResponse & {
  data: GetTraineesData;
};

export type GetAddUpdateTrainee = UnifiedResponse & {
  data: Trainee;
};

export type DeleteTraineeResponse = UnifiedResponse & {
  data: null;
};

export type GetSalesHistoryResponse = UnifiedResponse & {
  data: {
    results: SalesHistoryRecord[];
    totalCount: number;
    page: number;
    limit: number;
    next?: {
      page: number;
      limit: number;
    };
  };
};

export type GetStaffResponse = UnifiedResponse & {
  data: GetStaffData;
};

export type GetAddUpdateStaff = UnifiedResponse & {
  data: Staff;
};

export type GetStoreReportResponse = UnifiedResponse & {
  data: StoreReportData;
};

export type GetStaffReportResponse = UnifiedResponse & {
  data: StaffReportData;
};

export type GetTraineeReportResponse = UnifiedResponse & {
  data: TraineeReportData;
};

export type GetPaymentReportResponse = UnifiedResponse & {
  data: PaymentReportData;
};

export type GetEquipmentReportResponse = UnifiedResponse & {
  data: EquipmentReportData;
};

export type GetProgramReportResponse = UnifiedResponse & {
  data: ProgramReportData;
};
