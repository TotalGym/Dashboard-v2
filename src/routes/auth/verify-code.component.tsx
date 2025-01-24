import VerifyCodeForm from "../../components/Auth/forget-password-forms/verify-code-form.component";

import authBgImage from "../../assets/auth-bg-image.jpg";

import {
  AuthBackGroundContainer,
  AuthContainer,
  AuthFormContainer,
} from "./auth.styles";

const VerifyCode = () => {
  return (
    <AuthContainer>
      <AuthBackGroundContainer $bgImage={authBgImage} />
      <AuthFormContainer>
        <VerifyCodeForm />
      </AuthFormContainer>
    </AuthContainer>
  );
};
export default VerifyCode;
