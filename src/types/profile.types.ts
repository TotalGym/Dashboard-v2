import { Roles } from "./staff.types";

export type Profile = {
  name: string;
  email: string;
  contact: {
    email: string;
    phoneNumber: string;
  };
  role: Roles;
  status: string;
};
