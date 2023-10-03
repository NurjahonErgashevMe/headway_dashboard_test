/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { memo } from "react";
import { Button, Input, Form, message } from "antd";
import classes from "./Update.module.scss";
// import { useStore } from "../../../utils/store/store";
import { UserTypes } from "../../../types/user.type";
import useUpdate from "../../../hooks/useUpdate";
import { useQueryClient } from "@tanstack/react-query";
type Props = {
  data: UserTypes;
  id: string;
};

const UserUpdate: React.FC<Props> = ({ data, id }) => {
  const useUPDATE = useUpdate(`user/${id}`);
  const item = data; // item?... lani data qb chqishga erindim😅
  const queryClient = useQueryClient();
  const handleSubmit = (data: any) => {
    useUPDATE.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
        message.success("updated !");
      },
      onError: (err) => {
        console.log(err);

        message.error("error");
      },
      onSettled: () => console.log("setled"),
    });
  };

  return (
    <div className={classes.update}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={(value) => handleSubmit(value)}
        autoComplete="off"
      >
        <Form.Item<UserTypes>
          label="Firtname"
          name="first_name"
          initialValue={item?.first_name}
        >
          <Input defaultValue={data.first_name as string}></Input>
        </Form.Item>
        <Form.Item<UserTypes>
          label="Lastname"
          name="last_name"
          initialValue={item?.last_name}
        >
          <Input defaultValue={item?.last_name as string}></Input>
        </Form.Item>
        <Form.Item<UserTypes>
          label="Phone"
          name="phone"
          initialValue={item?.phone}
        >
          <Input defaultValue={item?.phone} placeholder="Email"></Input>
        </Form.Item>
        <Form.Item<UserTypes>
          label="Email"
          name="email"
          initialValue={item?.email || ""}
        >
          <Input defaultValue={item?.email || ""} placeholder="Email"></Input>
        </Form.Item>
        <Button htmlType="submit">submit</Button>
      </Form>
    </div>
  );
};

export default memo(UserUpdate);
