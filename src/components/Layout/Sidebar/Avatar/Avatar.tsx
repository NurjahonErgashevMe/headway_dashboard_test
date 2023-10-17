/* eslint-disable react-refresh/only-export-components */
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import { Avatar } from "antd";
import { UserTypes } from "../../../../types/user.type";
import classes from "./Avatar.module.scss";

type Props = {
  user: UserTypes;
};

const CustomAvatar: React.FC<Props> = ({ user }) => (
  <div className={classes.avatar} style={{cursor : "pointer"}}>
    <Avatar size="large" icon={<UserOutlined />} />
    <div className={classes.user_name}>
      <p>{user?.first_name}</p> <p>{user?.last_name}</p>
    </div>
  </div>
);

export default React.memo(CustomAvatar);
