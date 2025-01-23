import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("it must be an email")
    .required("email is required"),
  password: yup
    .string()
    .required("password is required"),
});