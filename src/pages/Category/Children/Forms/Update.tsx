/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { memo } from "react";
import { Button, Input, Form, message } from "antd";
import classes from "./Update.module.scss";
// import { useStore } from "../../../utils/store/store";
import { CategoryType } from "../../../../types/category.type";
import useUpdate from "../../../../hooks/useUpdate";
import { useQueryClient } from "@tanstack/react-query";
import { useStore } from "../../../../utils/store/store";
type Props = {
  id: string;
};

const CategoryUpdate: React.FC<Props> = ({ id }) => {
  const { category } = useStore();
  const useUPDATE = useUpdate(`admin/category/${id}`);
  const item = category?.find((item) => item.id === id);

  const queryClient = useQueryClient();
  const handleSubmit = (data: any) => {
    console.log(data);

    useUPDATE.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["category"],
        });
        message.success("updated !");
      },
      onError: (err) => {
        console.log(err);

        message.error("error");
      },
    });
  };

  return (
    <div className={classes.update}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={(value) => handleSubmit(value)}
        autoComplete="off"
      >
        <Form.Item<CategoryType>
          label="Name uz"
          name="name_uz"
          initialValue={item?.name_uz}
        >
          <Input defaultValue={item?.name_uz}></Input>
        </Form.Item>
        <Form.Item<CategoryType>
          label="Name ru"
          name="name_ru"
          initialValue={item?.name_ru}
        >
          <Input defaultValue={item?.name_ru}></Input>
        </Form.Item>
        <Form.Item<CategoryType>
          label="Name lat"
          name="name_lat"
          initialValue={item?.name_lat}
        >
          <Input defaultValue={item?.name_lat} placeholder="Name lat"></Input>
        </Form.Item>
        <Form.Item<CategoryType>
          label="Image url"
          name="image_url"
          initialValue={item?.name_lat}
        >
          <Input defaultValue={item?.image_url} placeholder="Image url"></Input>
        </Form.Item>
        <Button htmlType="submit">submit</Button>
      </Form>
    </div>
  );
};

export default memo(CategoryUpdate);
