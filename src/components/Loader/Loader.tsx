import React from "react";
import { Spin } from "antd";
import classes from "./Loader.module.scss";
const Loader: React.FC = () => (
  <div className={classes.loader}>
    {" "}
    <Spin />
  </div>
);

export default Loader;
