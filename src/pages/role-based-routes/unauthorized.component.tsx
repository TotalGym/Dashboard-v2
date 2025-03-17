import { Link } from "react-router-dom";
import Button from "../../components/button/button.component";

const Unauthorized = () => {
  return (
    <div
      style={{
        height: "calc(100vh - 160px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "2em",
      }}
    >
      <p
        style={{
          fontSize: "28px",
          color: "red",
          fontWeight: "bold",
        }}
      >
        You Are Unauthorized, You can't gain access to this page
      </p>
      <Link to={"/"}>
        <Button redColored>Go Home</Button>
      </Link>
    </div>
  );
};
export default Unauthorized;
