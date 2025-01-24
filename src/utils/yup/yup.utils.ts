import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("it must be an email")
    .required("email is required"),
  password: yup.string().required("password is required"),
});

export const enterEmailSchema = yup.object().shape({
  email: yup
    .string()
    .email("it must be an email")
    .required("email is required"),
});

export const verifyCodeSchema = yup.object().shape({
  code: yup.string().required("the verification code is required!"),
});

export const newPasswordSchema = yup.object().shape({
  newPassword: yup.string().required("enter your new password"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Please enter your new password again"),
});
