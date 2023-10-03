/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button, Form, Input, message } from "antd";
import classes from "./index.module.scss";
import { useCookies } from "react-cookie";
import { token } from "../../helpers";
import { useNavigate } from "react-router-dom";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  phone: string;
};

const Login: React.FC = () => {
  const [_, setCookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const onFinish = (values: FieldType) => {
    if (values.phone === "+9980000000") {
      setCookies("token", token);
      navigate("/");
      message.success("loged in!");
    } else {
      message.error("error!");
    }
  };

  return (
    <div className={classes.login}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="phone"
          name="phone"
          rules={[{ required: true, message: "Please input your phone!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
