/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { memo } from "react";
import { Button, Input, Form, message } from "antd";
import classes from "./Update.module.scss";
// import { useStore } from "../../../utils/store/store";
import { CategoryType } from "../../../../types/category.type";
import useUpdate from "../../../../hooks/useUpdate";
import { useQueryClient } from "@tanstack/react-query";
import useGET from "../../../../hooks/useGET";
type Props = {
  id: string;
  parentId: string;
};

const CategoryUpdate: React.FC<Props> = ({ id, parentId }) => {
  const useUPDATE = useUpdate(`admin/category/${id}`);
  const category = useGET<CategoryType[]>(
    ["category", parentId],
    `category/children/${parentId}`
  );
  const item = category?.data?.data.find((item) => item.id === id);
  console.log(item);

  const queryClient = useQueryClient();
  const handleSubmit = (data: any) => {
    const datas = { ...data, parent_id: parentId, image_url: "" };
    useUPDATE.mutate(datas as any, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["category" , parentId],
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
        <Button htmlType="submit">submit</Button>
      </Form>
    </div>
  );
};

export default memo(CategoryUpdate);
