import { Equipment, GetEquipmentResponse } from "./equipment";
import { Program, ProgramsResponse } from "./programs.types";
import { Roles } from "./staff.types";

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
    id: string;
    name: string;
    email: string;
    role: Roles;
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
  };
};
