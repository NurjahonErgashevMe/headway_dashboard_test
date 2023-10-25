/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import classes from "./index.module.scss";
import useCreate from "../../../../hooks/useCreate";
import { useQueryClient } from "@tanstack/react-query";
import Upload from "../../../../components/Upload/Upload";
import { ReklamaType } from "../../../../types/reklama.type";
// import useGET from "../../../hooks/useGET";

const Add: React.FC = () => {
  const useCREATE = useCreate(`admin/ads/create`);
  const queryClient = useQueryClient();
  const [image, setImage] = React.useState<string>("");
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (data: Omit<ReklamaType, "id">): Promise<void> => {
    const datas = { ...data, image };
    setLoading(() => true);
    useCREATE.mutate(datas as any, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["reklama"],
        });
        setLoading(() => false);
        return message.success("added!");
      },
      onError: () => {
        setLoading(() => false);

        return message.error("deleted!");
      },
    });
  };
  return (
    <div className={classes.add}>
      <Form
        name="basic"
        onFinish={(value) => handleSubmit(value)}
        autoComplete="off"
        className={classes.form}
        form={form}
      >
        <Form.Item<ReklamaType>
          name={"title"}
          label={"Title"}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item<ReklamaType>
          name={"link"}
          label={"link"}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item<ReklamaType>
          name={"image"}
          label={"Image"}
          initialValue={""}
          rules={[
            {
              required: !image,
              message: "Rasm joylash kerak!",
            },
          ]}
        >
          <Upload setValue={setImage}></Upload>
        </Form.Item>

        <Button htmlType="submit" loading={loading} disabled={loading}>
          add
        </Button>
      </Form>
    </div>
  );
};

export default Add;
