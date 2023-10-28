/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import classes from "./index.module.scss";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import useCreate from "../../hooks/useCreate";
import { AxiosResponse } from "axios";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  email: string;
  otp: string;
};

const Login: React.FC = () => {
  const [_, setCookies] = useCookies(["token", "phone"]);
  const [current, setCurrent] = useState<number>(0);
  const usePOST = useCreate(!current ? "user/login" : "user/confirm-otp");
  const form = Form.useFormInstance<FieldType>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const onFinish = (values: FieldType) => {

    setLoading(() => true);
    try {
      usePOST.mutate(values as any, {
        onSuccess: (data: AxiosResponse<string | { message: string }>) => {
          setLoading(() => false);
          console.log(data);

          if (typeof data.data === "string") {
            setCookies("phone", String(values.email));
            setCookies("token", data.data);
            navigate("/");
            return message.success("Tizimga kirildi!");
          }
          if (!current) {
            setCurrent((prev) => prev + 1);
          }
          return message.info("Emailingizni qarang");
        },
        onError: (err) => {
          console.log(err);
          setLoading(() => false);
          message.error("Tizimga kirishda hatolik");
        },
      });
    } catch (err) {
      setLoading(() => false);
    }
  };

  return (
    <div className={classes.login}>
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Iltimos email kiriting!" }]}
        >
          <Input />
        </Form.Item>

        {current === 1 ? (
          <div>
            <Form.Item<FieldType>
              label="Kod"
              name={"otp"}
              rules={[
                {
                  required: true,
                  message: "Iltimos tasdiqlash kodini kiriting!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <p style={{ color: "Red" }}>Emailingizni tekshiring!</p>
          </div>
        ) : null}

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
