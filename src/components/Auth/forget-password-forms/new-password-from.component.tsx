import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { newPasswordSchema } from "../../../utils/yup/yup.utils";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  ForgetPasswordFormContainer,
  StyledForgetPasswordForm,
} from "./forget-password-forms.styles";
import Logo from "../../logo/logo.component";
import { StyledFormText } from "../login-form/login-form.styles";
import FormInput from "../../form-input/form-input.component";
import { FormInputTypes } from "../../form-input/form-input.types";
import Button from "../../button/button.component";

type NewPasswordFormInputs = {
  newPassword: string;
  confirmNewPassword: string;
};

const NewPasswordForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewPasswordFormInputs>({
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    resolver: yupResolver(newPasswordSchema),
  });

  const onSubmit: SubmitHandler<NewPasswordFormInputs> = (data) => {
    console.log(data);
    navigate("/");
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
      <ToastContainer />
      <Logo fontSize="60px" />
      <StyledFormText>
        Enter the verification code that was sent to your email.
      </StyledFormText>
      <StyledForgetPasswordForm onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          formInputType={FormInputTypes.AuthInput}
          placeholder="New Password"
          type="password"
          {...register("newPassword")}
        />
        <FormInput
          formInputType={FormInputTypes.AuthInput}
          placeholder="Confirm New Password"
          type="password"
          {...register("confirmNewPassword")}
        />
        <Button width="230px" type="submit">
          Change Your Password
        </Button>
      </StyledForgetPasswordForm>
    </ForgetPasswordFormContainer>
  );
};
export default NewPasswordForm;
