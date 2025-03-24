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

export const addNewProgramSchema = yup.object().shape({
  programName: yup.string().trim().required("Program name is required"),
  description: yup.string().trim().required("Description is required"),
  image: yup
    .string()
    .trim()
    .url("Invalid image URL")
    .required("Image URL is required"),
  monthlyPrice: yup
    .number()
    .typeError("Monthly price must be a positive number")
    .positive("Monthly price must be a positive number")
    .required("Monthly price is required"),
  annuallyPrice: yup
    .number()
    .typeError("Annual price must be a positive number")
    .positive("Annual price must be a positive number")
    .required("Annual price is required"),
  exercises: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().trim().required("Exercise name is required"),
        sets: yup
          .number()
          .typeError("sets must be a number")
          .integer()
          .positive("Sets must be a positive number")
          .required("Sets are required"),
        repetitions: yup
          .number()
          .typeError("repetitions must be a number")
          .integer()
          .positive("Repetitions must be a positive number")
          .required("Repetitions are required"),
      })
    )
    .min(1, "At least one exercise is required")
    .max(6, "You can add up to 6 exercises")
    .default([]),
  schedule: yup
    .array()
    .of(
      yup.object().shape({
        day: yup.string().trim().required("Day is required"),
        startTime: yup.string().required("Start time is required"),
        endTime: yup.string().required("End time is required"),
      })
    )
    .min(1, "At least one schedule is required")
    .max(7, "You can add up to 7 schedules")
    .default([]),
});

export const addNewEquipmentSchema = yup.object().shape({
  name: yup.string().trim().required("Name Is Required"),
  type: yup.string().trim().required("Type Is Required"),
  image: yup
    .string()
    .trim()
    .url("Invalid image URL")
    .required("Image URL is required"),
  quantity: yup
    .number()
    .typeError("Quantity is Required")
    .positive("Quantity must be a positive number")
    .required("Quantity is required"),
  status: yup
    .mixed<"Available" | "Under Maintenance">()
    .oneOf(["Available", "Under Maintenance"], "status is required")
    .required("Status is required"),
});

export const addNewProductSchema = yup.object().shape({
  productName: yup.string().trim().required("Name is Required"),
  description: yup.string().trim().required("Description is Required"),
  image: yup
    .string()
    .trim()
    .url("Invalid image URL")
    .required("Image URL is required"),
  inventoryCount: yup
    .number()
    .typeError("Quantity is Required")
    .positive("Quantity must be a positive number")
    .required("Quantity is required"),
  price: yup
    .number()
    .typeError("Price is Required")
    .positive("Price must be a positive number")
    .required("Price is required"),
});

export const sellProductSchema = yup.object().shape({
  quantity: yup
    .number()
    .typeError("Quantity is Required")
    .positive("Quantity must be a positive number")
    .required("Quantity is required"),
  searchTrainee: yup.string().trim().required("select trainee"),
});

export const traineeSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("password is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  gender: yup.string().required("Gender is required"),
  subscriptionType: yup.string().required("Subscription type is required"),
  selectedProgram: yup.string(),
  assignedCoach: yup.string(),
});

export const editTraineeSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string(),
  phoneNumber: yup.string().required("Phone number is required"),
  gender: yup.string().required("Gender is required"),
  subscriptionType: yup.string().required("Subscription type is required"),
  selectedProgram: yup.string(),
  assignedCoach: yup.string(),
});

export const adminSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  role: yup
    .mixed<"Admin" | "SuperAdmin">()
    .oneOf(["Admin", "SuperAdmin"], "Invalid role selection")
    .required("Role is required"),
});
