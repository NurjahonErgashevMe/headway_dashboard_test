/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { memo, useState } from "react";
import { Button, Input, Form, message } from "antd";
import classes from "./Update.module.scss";
import { CategoryType } from "../../../types/category.type";
import useUpdate from "../../../hooks/useUpdate";
import { useQueryClient } from "@tanstack/react-query";
import useGET from "../../../hooks/useGET";
import Upload from "../../../components/Upload/Upload";
type Props = {
  id: string;
};

const CategoryUpdate: React.FC<Props> = ({ id }) => {
  const category = useGET<CategoryType[]>(["category"], "category/parents");
  const useUPDATE = useUpdate(`admin/category/${id}`);
  const item: (Omit<CategoryType, "image_url"> & { image: string }) | any =
    category?.data?.data.find((item) => item.id === id);
  const [image, setImage] = useState<string>("");
  const queryClient = useQueryClient();
  const handleSubmit = (data: CategoryType & { image: string }) => {
    const { image : imagecha, ...datas } = { ...data, image_url: image };
    useUPDATE.mutate(datas as any, {
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
        <Form.Item<Omit<CategoryType, "image_url"> & { image: string }>
          label="Image url"
          name="image"
          initialValue={item?.image}
        >
          <Upload setValue={setImage} defaultValue={item?.image}></Upload>
        </Form.Item>
        <Button htmlType="submit">submit</Button>
      </Form>
    </div>
  );
};

export default memo(CategoryUpdate);
