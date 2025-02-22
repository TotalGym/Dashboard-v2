import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import Button from "../../button/button.component";
import Logo from "../../logo/logo.component";
import FormInput from "../../form-input/form-input.component";

import { verifyCodeSchema } from "../../../utils/yup/yup.utils";
import { FormInputTypes } from "../../form-input/form-input.types";

import { StyledFormText } from "../login-form/login-form.styles";
import {
  ForgetPasswordFormContainer,
  StyledForgetPasswordForm,
} from "./forget-password-forms.styles";

type VerifyCodeFormInput = {
  code: string;
};

const VerifyCodeForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VerifyCodeFormInput>({
    defaultValues: {
      code: "",
    },
    resolver: yupResolver(verifyCodeSchema),
  });

  const onSubmit: SubmitHandler<VerifyCodeFormInput> = (data) => {
    console.log(data);
    navigate("/new-password");
    reset();
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
    <ForgetPasswordFormContainer>
      <Logo fontSize="60px" />
      <StyledFormText>
        Enter the verification code that was sent to your email.
      </StyledFormText>
      <StyledForgetPasswordForm onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          formInputType={FormInputTypes.AuthInput}
          placeholder="Verification Code"
          maxLength={6}
          {...register("code")}
        />
        <Button width="230px" type="submit">
          Enter Code
        </Button>
      </StyledForgetPasswordForm>
    </ForgetPasswordFormContainer>
  );
};
export default VerifyCodeForm;
