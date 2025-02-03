import VerifyCodeForm from "../../components/Auth/forget-password-forms/verify-code-form.component";

import authBgImage from "../../assets/auth-bg-image.jpg";

import {
  AuthBackGroundContainer,
  AuthContainer,
  AuthFormContainer,
} from "./auth.styles";
import { useAppSelector } from "../../app/hooks";
import { selectToken } from "../../features/auth/auth.slice";
import { Navigate, useLocation } from "react-router-dom";

const VerifyCode = () => {
  const token = useAppSelector(selectToken);
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  return token ? (
    <Navigate to={from} replace />
  ) : (
    <AuthContainer>
      <AuthBackGroundContainer $bgImage={authBgImage} />
      <AuthFormContainer>
        <VerifyCodeForm />
      </AuthFormContainer>
    </AuthContainer>
  );
};
export default VerifyCode;
