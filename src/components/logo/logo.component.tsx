import { Link } from "react-router-dom";
import { StyledLogoText } from "./logo.styles";

const Logo = ({
  routable,
  fontSize,
}: {
  routable?: boolean;
  fontSize?: string;
}) => {
  return routable ? (
    <Link
      to={"/"}
      style={{
        cursor: "pointer",
        marginTop: "0.5em",
      }}
    >
      <StyledLogoText $color="#FF6565" $fontSize={fontSize} $marginRight>
        GYM
      </StyledLogoText>
      <StyledLogoText $color="#2CD889" $fontSize={fontSize}>
        SYSTEM
      </StyledLogoText>
    </Link>
  ) : (
    <span>
      <StyledLogoText $color="#FF6565" $fontSize={fontSize} $marginRight>
        GYM
      </StyledLogoText>
      <StyledLogoText $color="#2CD889" $fontSize={fontSize}>
        SYSTEM
      </StyledLogoText>
    </span>
  );
};

export default Logo;
