import NewPasswordForm from "../../components/Auth/forget-password-forms/new-password-from.component";

import authBgImage from "../../assets/auth-bg-image.jpg";

import {
  AuthBackGroundContainer,
  AuthContainer,
  AuthFormContainer,
} from "./auth.styles";

const NewPassword = () => {
  return (
    <AuthContainer>
      <AuthBackGroundContainer $bgImage={authBgImage} />
      <AuthFormContainer>
        <NewPasswordForm />
      </AuthFormContainer>
    </AuthContainer>
  );
};
export default NewPassword;
