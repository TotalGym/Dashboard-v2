import EnterEmailForm from "../../components/Auth/forget-password-forms/enter-email-form.component";

import authBgImage from "../../assets/auth-bg-image.jpg";

import {
  AuthBackGroundContainer,
  AuthContainer,
  AuthFormContainer,
} from "./auth.styles";

const EnterEmail = () => {
  return (
    <AuthContainer>
      <AuthBackGroundContainer $bgImage={authBgImage} />
      <AuthFormContainer>
        <EnterEmailForm />
      </AuthFormContainer>
    </AuthContainer>
  );
};

export default EnterEmail;
