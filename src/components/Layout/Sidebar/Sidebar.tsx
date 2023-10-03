import React from "react";
import { Layout, Menu, Button } from "antd";
import classes from "./Sidebar.module.scss";
import routes from "../../../route/Routes";
import { useLocation } from "react-router-dom";

const { Header } = Layout;

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: "100px",

  position: "fixed",
  top: 0,
};

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <Header
      className={classes.sidebar}
      style={siderStyle}
    >
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["0"]}
        onSelect={(item) => console.log(item)}
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

export default Sidebar;
