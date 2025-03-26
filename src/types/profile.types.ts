import { Roles } from "./staff.types";

export type Profile = {
  name: string;
  contact: {
    email: string;
    phoneNumber: string;
  };
  role: Roles;
  status: string;
};

export type AdminProfile = {
  name: string;
  email: string;
  role: Roles;
};
