/* eslint-disable @typescript-eslint/no-var-requires */
import { Button, Form, Input, message } from "antd";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import classes from "./index.module.scss";
import { btoa } from "js-base64";
import { useState } from "react";
import { Instance } from "../../../../utils/axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

type FieldType = {
  login: string;
  password: string;
};

const SuperAdminLogin: React.FC = () => {
  const [form] = Form.useForm<FieldType>();
  const [, setCookies] = useCookies(["basic"]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values: FieldType) => {
    const basic = btoa(values.login + ":" + values.password);

    setLoading(() => true);
    await Instance.get("/root/list", {
      headers: {
        basic: basic,
      },
    })
      .then(() => {
        setCookies("basic", basic);
        navigate("/");
        setLoading(() => false);
        return message.success("Tizimga kirild!");
      })
      .catch(() => {
        setLoading(() => false);
        return message.error("Notog'ri login yoki password");
      });
  };
  const onFinishFailed = (err: ValidateErrorEntity<FieldType>) =>
    console.log(err);

  return (
    <div className={classes.login}>
      <h1>Admin sifatida kirish</h1>
      <Form
        form={form}
        style={{ width: 400 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          name={"login"}
          rules={[{ required: true, message: "login kiriting" }]}
        >
          <Input placeholder="login"></Input>
        </Form.Item>
        <Form.Item<FieldType>
          name={"password"}
          rules={[{ required: true, message: "Password kiriting" }]}
        >
          <Input.Password placeholder="password"></Input.Password>
        </Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          style={{ textAlign: "center", width: "100%" }}
          loading={loading}
          disabled={loading}
        >
          Kirish
        </Button>
      </Form>
    </div>
  );
};

export default SuperAdminLogin;
