import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import Logo from "../../logo/logo.component";
import FormInput from "../../form-input/form-input.component";
import Button from "../../button/button.component";
import { enterEmailSchema } from "../../../utils/yup/yup.utils";
import { FormInputTypes } from "../../form-input/form-input.types";

import {
  ForgetPasswordFormContainer,
  StyledForgetPasswordForm,
} from "./forget-password-forms.styles";
import { StyledFormText } from "../login-form/login-form.styles";

type EnterEmailInput = {
  email: string;
};

const EnterEmailForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EnterEmailInput>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(enterEmailSchema),
  });

  const onSubmit: SubmitHandler<EnterEmailInput> = (data) => {
    console.log(data);
    navigate("/verify-code");
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
        Enter your email and we send you a password reset link.
      </StyledFormText>
      <StyledForgetPasswordForm onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          formInputType={FormInputTypes.AuthInput}
          placeholder="Email"
          {...register("email")}
        />
        <Button width="230px" type="submit">
          Send Request
        </Button>
      </StyledForgetPasswordForm>
    </ForgetPasswordFormContainer>
  );
};
export default EnterEmailForm;
