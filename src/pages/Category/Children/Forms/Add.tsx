/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button, Form, Input, Select, message } from "antd";
import classes from "./Add.module.scss";
import { CategoryType } from "../../../../types/category.type";
import { useStore } from "../../../../utils/store/store";
import useCreate from "../../../../hooks/useCreate";
import { useQueryClient } from "@tanstack/react-query";
import useGET from "../../../../hooks/useGET";

const Add: React.FC = () => {
  const { category } = useStore();
  const categories = useGET<CategoryType[]>(["category"], "category/parents");
  const useCREATE = useCreate(`admin/category`);
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const handleSubmit = (data: any) => {
    useCREATE.mutate(data, {
      onSuccess: async () => {
        await categories.refetch();
        queryClient.invalidateQueries({
          queryKey: ["category"],
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
        <Form.Item<CategoryType>
          name={"name_uz"}
          label={"Name uz"}
          rules={[{ required: true, message: "Name uz is required" }]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item<CategoryType>
          rules={[{ required: true, message: "Name ru is required" }]}
          name={"name_ru"}
          label={"Name ru"}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item<CategoryType>
          name={"name_lat"}
          label={"Name lat"}
          rules={[{ required: true, message: "Name lat is required" }]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item<CategoryType>
          name={"image_url"}
          label={"Image url"}
          initialValue={""}
        >
          <Input defaultValue={""}></Input>
        </Form.Item>
        <Form.Item<CategoryType>
          name={"parent_id"}
          label={"Parent category"}
          initialValue={null}
        >
          <Select
            placeholder="Select and search value"
            allowClear
            showSearch
            // optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
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
        <Button htmlType="submit">add</Button>
      </Form>
    </div>
  );
};

export default Add;
