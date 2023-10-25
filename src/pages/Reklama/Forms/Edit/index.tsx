/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { memo, useState } from "react";
import { Button, Input, Form, message } from "antd";
import classes from "./index.module.scss";
import { CategoryType } from "../../../../types/category.type";
import useUpdate from "../../../../hooks/useUpdate";
import { useQueryClient } from "@tanstack/react-query";
import useGET from "../../../../hooks/useGET";
import Upload from "../../../../components/Upload/Upload";
import { ReklamaType } from "../../../../types/reklama.type";
type Props = {
  id: string;
};

const MyUpdate: React.FC<Props> = ({ id }) => {
  const reklama = useGET<ReklamaType[] | any>(["reklama"], "admin/ads/all");
  const useUPDATE = useUpdate(`admin/ads/${id}`);
  const item: ReklamaType = reklama?.data?.data.find(
    (item: ReklamaType) => item.id === id
  );
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const handleSubmit = (data: ReklamaType) => {
    const { image: imagecha, ...datas } = { ...data, image };
    setLoading(() => true);
    useUPDATE.mutate(datas as any, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["reklama"],
        });
        setLoading(() => false);
        return message.success("O'zgardi !");
      },
      onError: () => {
        setLoading(() => false);
        return message.error("Hatolik");
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
        <Form.Item<ReklamaType>
          label="Sarlavha"
          name="title"
          initialValue={item?.title}
        >
          <Input defaultValue={item?.title}></Input>
        </Form.Item>
        <Form.Item<ReklamaType>
          label="Havola"
          name="link"
          initialValue={item?.link}
        >
          <Input defaultValue={item?.link}></Input>
        </Form.Item>
        <Form.Item<Omit<CategoryType, "image_url"> & { image: string }>
          label="Image url"
          name="image"
          initialValue={item?.image}
          rules={[{ required: !image, message: "Rasm joylash kerak!" }]}
        >
          <Upload setValue={setImage} defaultValue={item?.image}></Upload>
        </Form.Item>
        <Button htmlType="submit" loading={loading} disabled={loading}>
          submit
        </Button>
      </Form>
    </div>
  );
};

export default memo(MyUpdate);
