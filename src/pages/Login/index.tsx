import React from "react";
import classes from "./index.module.scss";
import SuperAdminLogin from "./components/SuperAdminLogin";
import LoginProvider, { useLoginContext } from "./components/provider";
import WithEmailLogin from "./components/WithEmailLogin";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";

const Content: React.FC = () => {
  const { current, setCurrent } = useLoginContext();
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  if (!cookies?.token) {
    if (pathname !== "/login") {
      navigate("/login");
    }
    setCurrent(0);
  }
  if (searchParams.get("step") === "admin") {
    return <SuperAdminLogin />;
  }

  return (
    <div className={classes.login}>
      {current < 2 ? <WithEmailLogin /> : <SuperAdminLogin />}
    </div>
  );
};
const Login: React.FC = () => {
  return (
    <LoginProvider>
      <Content />
    </LoginProvider>
  );
};

export default Login;
