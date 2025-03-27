import { Roles } from "./staff.types";

export type Profile = {
  name: string;
  contact?: {
    email: string;
    phoneNumber: string;
  };
  email?: string;
  role: Roles;
  status?: string;
};
