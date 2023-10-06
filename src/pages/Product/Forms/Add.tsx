/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button, Form, Input, message, InputNumber } from "antd";
import classes from "./Add.module.scss";
import { ProductType } from "../../../types/product.type";
import useCreate from "../../../hooks/useCreate";
import { useQueryClient } from "@tanstack/react-query";
import { useStore } from "../../../utils/store/store";
import { Select } from "antd/lib";

const Add: React.FC = () => {
  const { category } = useStore();
  const useCREATE = useCreate(`product`);
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const handleSubmit = (data: any) => {
    const datas = { ...data, characteristic: { color: data.color } };

    useCREATE.mutate(datas, {
      onSuccess: async () => {
        queryClient.invalidateQueries({
          queryKey: ["products"],
        });
        message.success("added!");
        form.resetFields();
      },
      onError: (err) => {
        console.log(err);
        message.error("error");
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
        <Form.Item<ProductType>
          name={"name_uz"}
          label={"Name uz"}
          rules={[{ required: true, message: "Name uz is required" }]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item<ProductType>
          rules={[{ required: true, message: "Name ru is required" }]}
          name={"name_ru"}
          label={"Name ru"}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item<ProductType>
          name={"name_lat"}
          label={"Name lat"}
          rules={[{ required: true, message: "Name lat is required" }]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item<Omit<ProductType, "image"> & { image_url: string }>
          name={"image_url"}
          label={"Image url"}
          initialValue={""}
        >
          <Input defaultValue={""}></Input>
        </Form.Item>
        <Form.Item<ProductType>
          name={"category_id"}
          label={"Category"}
          initialValue={null}
        >
          <Select
            placeholder="Please select"
            style={{ width: "100%" }}
            options={
              category?.map((item) => ({
                key: item.id,
                label: item.name_uz,
                value: item.id,
              })) || []
            }
          />
        </Form.Item>
        <Form.Item<ProductType> name={"price"} label={"Price"} initialValue={0}>
          <InputNumber defaultValue={0}></InputNumber>
        </Form.Item>
        <Form.Item<ProductType>
          name={"sale_price"}
          label={"Sale price"}
          initialValue={0}
        >
          <InputNumber defaultValue={0}></InputNumber>
        </Form.Item>
        <Form.Item<ProductType> name={"count"} label={"Count"} initialValue={0}>
          <InputNumber defaultValue={0}></InputNumber>
        </Form.Item>
        <Form.Item<ProductType>
          name={"color" as any}
          label={"Color"}
          initialValue={""}
        >
          <Select
            placeholder="Please select"
            style={{ width: "100%" }}
            options={["red", "white", "blue", "gray"].map((item) => ({
              label: item,
              key: item,
              value: item,
            }))}
          />
        </Form.Item>
        <Form.Item<ProductType> name={"description"} label="Description">
          <Input.TextArea></Input.TextArea>
        </Form.Item>
        <Button htmlType="submit">add</Button>
      </Form>
    </div>
  );
};

export default Add;
