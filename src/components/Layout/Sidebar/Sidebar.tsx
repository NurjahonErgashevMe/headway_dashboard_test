/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { Layout, Menu, Button, Space } from "antd";
import classes from "./Sidebar.module.scss";
import routes from "../../../route/Routes";
import { useLocation, useNavigate } from "react-router-dom";
import { UserTypes } from "../../../types/user.type";
import CustomAvatar from "./Avatar/Avatar";
import { useCookies } from "react-cookie";
const { Header } = Layout;

type Props = {
  user: UserTypes;
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: "100px",
  display: "flex",
  position: "fixed",
  top: 0,
};

const Sidebar: React.FC<Props> = ({ user }) => {
  const location = useLocation();
  const [, , removeCookie] = useCookies(["token", "phone"]);
  const navigate = useNavigate();
  const handlerLogOut = () => {
    removeCookie("phone");
    removeCookie("token");
    navigate("/login");
  };

  return (
    <Header className={classes.sidebar} style={siderStyle}>
      <Space size={30}>
        <CustomAvatar user={user} />
        <Button color="red" onClick={handlerLogOut}>
          Logout
        </Button>
      </Space>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["0"]}
        className={classes.menu}
      >
        {routes?.map((item, index) => (
          <Button
            href={item.path}
            className={classes.menu__link}
            shape="round"
            type={location.pathname == item.path ? "primary" : "default"}
            color="red"
            key={index}
          >
            {item.title}
          </Button>
        ))}
      </Menu>
    </Header>
  );
};

export default React.memo(Sidebar);
