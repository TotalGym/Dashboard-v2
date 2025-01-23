import {
  AuthBackGroundContainer,
  AuthContainer,
  AuthFormContainer,
} from "./auth.styles";

import SignInImage from "../../assets/sign-in-image.jpg";
import LoginForm from "../../components/Auth/login-form/login-form.component";

const SignIn = () => {
  return (
    <AuthContainer>
      <AuthBackGroundContainer $bgImage={SignInImage} />
      <AuthFormContainer>
        <LoginForm />
      </AuthFormContainer>
    </AuthContainer>
  );
};
export default SignIn;
