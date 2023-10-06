import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

type Props = {
  children: JSX.Element;
};

const ProtectRoutes: React.FC<Props> = ({ children }): JSX.Element => {
  const [cookies] = useCookies(["token"]);
  if (cookies.token) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default ProtectRoutes;
