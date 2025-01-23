import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "../../button/button.component";
import FormInput from "../../form-input/form-input.component";
import Logo from "../../logo/logo.component";

import { FormInputTypes } from "../../form-input/form-input.types";
import { loginSchema } from "../../../utils/yup/yup.utils";

import {
  LoginFormContainer,
  StyledCheckBoxAndForgetPasswordTextContainer,
  StyledForgetPasswordText,
  StyledLoginForm,
  StyledLoginWelcomeText,
} from "./login-form.styles";

type LoginInputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
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

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    console.log(data);
    navigate("/");
    reset();
  };

  console.log(errors)

  return (
    <LoginFormContainer>
      <Logo fontSize="60px" />
      <StyledLoginWelcomeText>
        Welcome! Please login to your account.
      </StyledLoginWelcomeText>
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
        <StyledCheckBoxAndForgetPasswordTextContainer>
          <FormInput
            formInputType={FormInputTypes.CheckboxInput}
            label="Remember me"
            id="remember-me"
          />
          <StyledForgetPasswordText onClick={goToForgetPasswordPage}>
            Forget Password
          </StyledForgetPasswordText>
        </StyledCheckBoxAndForgetPasswordTextContainer>
        <Button width="230px" type="submit">Login</Button>
      </StyledLoginForm>
    </LoginFormContainer>
  );
};
export default LoginForm;
