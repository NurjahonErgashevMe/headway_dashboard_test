/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Select, message } from "antd";
import classes from "./Add.module.scss";
import { CategoryType } from "../../../types/category.type";
import { useStore } from "../../../utils/store/store";
import useCreate from "../../../hooks/useCreate";
import { useQueryClient } from "@tanstack/react-query";

const Add: React.FC = () => {
  const { state } = useStore();
  const useCREATE = useCreate(`admin/category`);
  const queryClient = useQueryClient();
  const handleSubmit = (data: any) => {
    console.log(data);
    
    useCREATE.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["category"],
        });
        message.success("added!");
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
          initialValue={''}
        >
          <Select
            placeholder="Please select"
            style={{ width: "100%" }}
            options={
              state?.map((item) => ({
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
