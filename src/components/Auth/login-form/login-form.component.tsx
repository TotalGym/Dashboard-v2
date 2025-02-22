import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import Button from "../../button/button.component";
import FormInput from "../../form-input/form-input.component";
import Logo from "../../logo/logo.component";

import { FormInputTypes } from "../../form-input/form-input.types";
import { loginSchema } from "../../../utils/yup/yup.utils";

import { useLoginMutation } from "../../../features/auth/auth.api.slice";

import {
  LoginFormContainer,
  StyledForgetPasswordText,
  StyledLoginForm,
  StyledFormText,
  StyledForgetPasswordContainer,
} from "./login-form.styles";
import { AuthError } from "../../../types/error.types";
import { useAppDispatch } from "../../../app/hooks";
import { setCredentials, setUserData } from "../../../features/auth/auth.slice";

export type LoginInputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const goToForgetPasswordPage = () => {
    navigate("/forget-password");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      const response = await login(data).unwrap();
      if (response.success && response.data) {
        dispatch(setCredentials(response.data.token));
        dispatch(setUserData(response.data.userData));
      }
      reset();
    } catch (error) {
      toast.error((error as AuthError).data.message as string, {
        position: "top-right",
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  useEffect(() => {
    const errorsArray = Object.values(errors);
    if (errorsArray.length > 0) {
      errorsArray.forEach((error) => {
        if (error.message) {
          toast.error(error.message, {
            position: "top-right",
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true,
          });
        }
      });
    }
  }, [errors]);

  return (
    <LoginFormContainer>
      <Logo fontSize="60px" />
      <StyledFormText>Welcome! Please login to your account.</StyledFormText>
      <StyledLoginForm onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          formInputType={FormInputTypes.AuthInput}
          placeholder="email"
          type="text"
          {...register("email")}
        />
        <FormInput
          formInputType={FormInputTypes.AuthInput}
          placeholder="password"
          type="password"
          {...register("password")}
        />
        <StyledForgetPasswordContainer>
          <StyledForgetPasswordText onClick={goToForgetPasswordPage}>
            Forget Password
          </StyledForgetPasswordText>
        </StyledForgetPasswordContainer>
        <Button width="230px" type="submit" isLoading={isLoading}>
          Login
        </Button>
      </StyledLoginForm>
    </LoginFormContainer>
  );
};
export default LoginForm;
