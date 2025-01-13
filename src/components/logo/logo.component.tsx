import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to={"/"}
      style={{
        cursor: "pointer",
        marginTop: "0.5em",
      }}
    >
      <span
        style={{
          color: "#FF6565",
          fontSize: "34px",
          fontWeight: "700",
          marginRight: "0.25em",
        }}
      >
        GYM
      </span>
      <span
        style={{
          color: "#2CD889",
          fontSize: "34px",
          fontWeight: "700",
        }}
      >
        SYSTEM
      </span>
    </Link>
  );
};

export default Logo;
