import { Link } from "react-router-dom";
import { NotFoundContainer } from "./not-found.styles";

const NotFound = () => {
  return (
    <NotFoundContainer>
      404 page not found
      <Link to={"/"}>Go To Home</Link>
    </NotFoundContainer>
  );
};
export default NotFound;
