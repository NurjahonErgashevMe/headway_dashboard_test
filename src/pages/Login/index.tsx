/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import classes from "./index.module.scss";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import useCreate from "../../hooks/useCreate";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  phone: string;
};

const Login: React.FC = () => {
  const [_, setCookies] = useCookies(["token", "phone"]);
  const usePOST = useCreate("user/login");
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const onFinish = (values: FieldType) => {
    setLoading(() => true);
    try {
      usePOST.mutate(values as any, {
        onSuccess: (data) => {
          setCookies("phone", String(values.phone));
          setCookies("token", data.data);
          navigate("/");
          setLoading(() => false);

          return message.success("logged in!");
        },
        onError: (err) => {
          console.log(err);
          setLoading(() => false);
          message.error("error  login");
        },
      });
    } catch (err) {
      setLoading(() => false);
      console.log(err);
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
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
