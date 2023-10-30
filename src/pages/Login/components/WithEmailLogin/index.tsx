/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button, Form, Input, message } from "antd";
import { UserRoles } from "../../../../enums";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { AxiosResponse } from "axios";
import { useLoginContext } from "../provider";
import useCreate from "../../../../hooks/useCreate";

type FieldType = {
  email: string;
  otp: string;
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const WithEmailLogin: React.FC = () => {
  const { current } = useLoginContext();
  const [, setCookies] = useCookies(["token", "role", "phone"]);
  const [searchParams] = useSearchParams();
  const usePOST = useCreate(
    searchParams.get("step") !== "otp" ? "user/login" : "user/confirm-otp"
  );
  const [form] = Form.useForm<FieldType>();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);

  const onFinish = (values: FieldType) => {
    setLoading(() => true);

    try {
      usePOST.mutate(values as any, {
        onSuccess: (
          data: AxiosResponse<
            { access_token: string; role: number } | { message: string }
          >
        ) => {
          setLoading(() => false);
          if ("access_token" in data.data) {
            setCookies("phone", String(values.email));
            setCookies("token", data.data.access_token);
            setCookies("role", UserRoles[data.data.role]);
            if (UserRoles[data.data.role] === "ADMIN") {
              navigate("/login?step=admin");
              return message.info("Siz adminsiz!");
            }
            navigate("/");
            return message.success("Tizimga kirild!");
          }
          if (!current) {
            navigate("/login?step=otp&email" + values.email);
          }
          return message.info("Emailingizni qarang");
        },
        onError: () => {
          setLoading(() => false);
          return message.error("Tizimga kirishda hatolik");
        },
      });
    } catch (err) {
      setLoading(() => false);
    }
  };

  const otpStep: boolean = searchParams.get("step") === "otp";

  return (
    <Form
      name="basic"
      form={form}
      style={{ width: 400 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        name="email"
        rules={[{ required: true, message: "Iltimos email kiriting!" }]}
      >
        <Input placeholder="email" />
      </Form.Item>

      {otpStep ? (
        <div>
          <Form.Item<FieldType>
            name={"otp"}
            rules={[
              {
                required: true,
                message: "Iltimos tasdiqlash kodini kiriting!",
              },
            ]}
          >
            <Input placeholder="kod (OTP)" />
          </Form.Item>
          <p style={{ color: "Red" }}>Emailingizni tekshiring!</p>
        </div>
      ) : null}
      <Button
        type="primary"
        htmlType="submit"
        loading={loading}
        disabled={loading}
        style={{ textAlign: "center", width: "100%" }}
      >
        Login
      </Button>
      {otpStep ? <Link to={"/login"}>Emailni o'zgartirish</Link> : null}
    </Form>
  );
};

export default WithEmailLogin;
