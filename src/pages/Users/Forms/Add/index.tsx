/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Segmented, message } from "antd";
import classes from "./index.module.scss";
import useCreate from "../../../../hooks/useCreate";
import { useQueryClient } from "@tanstack/react-query";
import { TUserConfirmOtp, TUserSignup } from "../../../../types/user.type";
import { AxiosResponse } from "axios";

const Register: React.FC<{
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
}> = ({ setLoading, setCurrent, setEmail, loading }) => {
  const useCREATE = useCreate(`user/signup`);
  const next = () => {
    setCurrent((prev) => prev + 1);
  };
  const handleSubmit = (values: TUserSignup): void => {
    setLoading(() => true);
    useCREATE.mutate(values as any, {
      onSuccess: () => {
        setLoading(() => false);
        setEmail(() => values.email);
        next();
      },
      onError: () => {
        setLoading(() => false);
        return message.error("Hatolik!");
      },
    });
  };
  return (
    <Form
      name="basic"
      onFinish={(value) => handleSubmit(value)}
      autoComplete="off"
      className={classes.form}
    >
      <Form.Item<TUserSignup>
        name={"first_name"}
        label={"Ism"}
        rules={[
          {
            required: true,
            message: "Ism kiritish kerak!",
          },
        ]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item<TUserSignup>
        name={"last_name"}
        label={"Familiya"}
        rules={[
          {
            required: true,
            message: "Familiya kiritish kerak!",
          },
        ]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item<TUserSignup>
        name={"phone"}
        label={"Telefon raqam"}
        rules={[
          {
            required: true,
            message: "Telefon kiritish kerak!",
          },
        ]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item<TUserSignup>
        name={"email"}
        label={"Email"}
        rules={[
          {
            required: true,
            message: "Email kiritish kerak!",
          },
        ]}
      >
        <Input></Input>
      </Form.Item>
      <Button loading={loading} disabled={loading} htmlType="submit">
        Keyingisi
      </Button>
    </Form>
  );
};

const Confirm: React.FC<{
  email: string | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}> = ({ email, setLoading, loading }) => {
  const useCREATE = useCreate("user/confirm-otp");
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const handleSubmit = (data: TUserConfirmOtp): void => {
    setLoading(() => true);
    data = { otp: data.otp.toString(), email: `${email}` };
    console.log(data);

    useCREATE.mutate(data as any, {
      onSuccess: (data: AxiosResponse<string>) => {
        setLoading(() => false);
        if (typeof data.data === "string") {
          queryClient.invalidateQueries({ queryKey: ["users"] });
          return message.success("Admin yaratildi!");
        }
        return message.error("Hatolik!");
      },
      onError: () => {
        setLoading(() => false);
        return message.error("Hatolik!");
      },
    });
  };
  return (
    <Form
      name="basic"
      onFinish={(value) => handleSubmit(value)}
      autoComplete="off"
      className={classes.form}
      form={form}
    >
      <Form.Item<TUserConfirmOtp>
        name={"otp"}
        label={"Tasdiqlash kodi"}
        rules={[
          {
            required: true,
            message: "Tasdiqlash kodi kiritish kerak!",
          },
        ]}
      >
        <InputNumber></InputNumber>
      </Form.Item>
      <Button htmlType="submit" loading={loading} disabled={loading}>
        Tekshirish
      </Button>
    </Form>
  );
};

function Add() {
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);

  const steps = [
    {
      title: "Admin registratsiyasi",
      content: (
        <Register
          setCurrent={setCurrent}
          setLoading={setLoading}
          setEmail={setEmail}
          loading={loading}
        />
      ),
    },
    {
      title: "Adminni tasdiqlash",
      content: (
        <Confirm loading={loading} setLoading={setLoading} email={email} />
      ),
    },
  ];

  return (
    <div className={classes.add}>
      <h3>{steps[current].title}</h3>
      {steps[current].content}
    </div>
  );
}

export default Add;
