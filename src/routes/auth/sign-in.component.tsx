import { useEffect, useState } from "react";
import LoginForm from "../../components/Auth/login-form/login-form.component";

import {
  AuthBackGroundContainer,
  AuthContainer,
  AuthFormContainer,
} from "./auth.styles";
import { useAppSelector } from "../../app/hooks";
import { selectToken } from "../../features/auth/auth.slice";
import { Navigate, useLocation } from "react-router-dom";
import placeholderBg from "../../assets/placeholder.png";

const SignIn = () => {
  const token = useAppSelector(selectToken);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [bgImage, setBgImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import("../../assets/auth-bg-image.jpg").then((image) => {
      setBgImage(image.default);
      setLoading(false);
    });
  }, []);

  return token ? (
    <Navigate to={from} replace />
  ) : (
    <AuthContainer>
      {loading ? (
        <AuthBackGroundContainer $bgImage={placeholderBg} />
      ) : (
        <AuthBackGroundContainer $bgImage={bgImage ?? ""} />
      )}
      <AuthFormContainer>
        <LoginForm />
      </AuthFormContainer>
    </AuthContainer>
  );
};

export default SignIn;
