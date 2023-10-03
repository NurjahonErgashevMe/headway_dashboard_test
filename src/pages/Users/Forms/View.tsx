/* eslint-disable react-refresh/only-export-components */
import { memo } from "react";
import { Input, Select } from "antd";
import classes from "./View.module.scss";
import { UserTypes as UserType } from "../../../types/user.type";
import DateUTC from "../../../hooks/useDateUTC";
type Props = {
  data: UserType;
};

const UserView: React.FC<Props> = ({ data }) => {
  return (
    <div className={classes.view}>
      <Input value={data?.first_name || ""} placeholder="Firstname"></Input>
      <Input value={data?.last_name || ""} placeholder="Lastname"></Input>
      <Input value={data?.status} placeholder="Status"></Input>
      <Input value={data?.phone} placeholder="Phone"></Input>
      <Input value={DateUTC(data?.created_at)} placeholder="Phone"></Input>

      <Select
        mode="tags"
        placeholder="Please select"
        value={data?.role}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default memo(UserView);
