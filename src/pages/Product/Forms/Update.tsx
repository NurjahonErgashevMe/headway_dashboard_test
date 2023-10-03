/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { memo } from "react";
import { Button, Input, Select, Form, message } from "antd";
import DateUTC from "../../../hooks/useDateUTC";
import classes from "./Update.module.scss";
// import { useStore } from "../../../utils/store/store";
import { ProductType } from "../../../types/product.type";
import useUpdate from "../../../hooks/useUpdate";
import { useStore } from "../../../utils/store/store";
import { CategoryType } from "../../../types/category.type";
type Props = {
  data: ProductType;
  owner: string;
  id: string;
};

const { TextArea } = Input;

const ProductUpdate: React.FC<Props> = ({ data, owner, id }) => {
  const { state } = useStore();
  const useUPDATE = useUpdate(`admin/product/${id}`);
  const categories: CategoryType[] = state?.filter(
    (item) => item.id === data.category_id
  ) || [];
  const handleSubmit = (data: any) => {
    console.log(data);

    useUPDATE.mutate(data, {
      onSuccess: () => message.success("updated !"),
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
        <Form.Item<ProductType>
          label="Name uz"
          name="name_uz"
          initialValue={data?.name_uz}
        >
          <Input defaultValue={data?.name_uz}></Input>
        </Form.Item>
        <Form.Item<ProductType>
          label="Name ru"
          name="name_ru"
          initialValue={data?.name_ru}
        >
          <Input defaultValue={data?.name_ru}></Input>
        </Form.Item>
        <Form.Item<ProductType>
          label="Name lat"
          name="name_lat"
          initialValue={data?.name_lat}
        >
          <Input defaultValue={data?.name_lat} placeholder="Name lat"></Input>
        </Form.Item>
        <Form.Item<ProductType>
          label="Price"
          name="price"
          initialValue={data?.price}
        >
          <Input defaultValue={data?.price} placeholder="Price"></Input>
        </Form.Item>
        <Form.Item<ProductType>
          label="Sale price"
          name="sale_price"
          initialValue={data?.sale_price}
        >
          <Input
            defaultValue={data?.sale_price}
            placeholder="Sale Price"
          ></Input>
        </Form.Item>
        <Form.Item<ProductType>
          label="Owner"
          name="owner_id"
          initialValue={data?.sale_price}
        >
          <Input defaultValue={owner} placeholder="Owner"></Input>
        </Form.Item>
        <Form.Item<ProductType>
          label="Created At"
          name={"created_at"}
          initialValue={DateUTC(data?.created_at)}
        >
          <Input
            value={DateUTC(data?.created_at)}
            placeholder="created at"
          ></Input>
        </Form.Item>
        <Form.Item<ProductType>
          label="Colors"
          name={"characteristic"}
          initialValue={data?.characteristic?.color}
        >
          <Select
            mode="tags"
            placeholder="Please select"
            defaultValue={data?.characteristic?.color}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item<ProductType>
          label="Categories"
          name={"category_id"}
          initialValue={categories.map((i) => i.name_uz)}
        >
          <Select
            mode="tags"
            placeholder="Please select"
            defaultValue={data?.characteristic?.color}
            style={{ width: "100%" }}
            options={
              state?.map((i) => ({
                key: i.id,
                label: i.name_uz,
                value: i.id,
                disabled: true,
              })) || []
            }
            maxLength={1}
          />
        </Form.Item>
        <Form.Item<ProductType>
          label="Description"
          name={"description"}
          initialValue={data?.description}
        >
          <TextArea defaultValue={data?.description} rows={4} />
        </Form.Item>
        <Button htmlType="submit">submit</Button>
      </Form>
    </div>
  );
};

export default memo(ProductUpdate);
