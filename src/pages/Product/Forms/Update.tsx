/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { memo } from "react";
import { Button, Input, Select, Form, message  , InputNumber} from "antd";
import DateUTC from "../../../hooks/useDateUTC";
import classes from "./Update.module.scss";
// import { useStore } from "../../../utils/store/store";
import { ProductType } from "../../../types/product.type";
import useUpdate from "../../../hooks/useUpdate";
import { useStore } from "../../../utils/store/store";
import { CategoryType } from "../../../types/category.type";
type Props = {
  data: Omit<ProductType, "image_url"> & { image: string };
  owner: string;
  id: string;
};

const { TextArea } = Input;

const ProductUpdate: React.FC<Props> = ({ data, id }) => {
  const { category } = useStore();
  const useUPDATE = useUpdate(`product/${id}`);
  const categories: CategoryType =
    category?.find((item) => item.id === data.category_id) || ([] as any);
  const handleSubmit = (data: any) => {
    const datas = {
      ...data,
      characteristic: {},
      price: Number(data.price),
      sale_price: Number(data.price),
    } satisfies ProductType;
    console.log(datas);

    useUPDATE.mutate(datas, {
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
          initialValue={String(data?.price)
            .split(".00")
            .join("")
            .replace(",", "")
            .replace("$", "")}
        >
          <InputNumber
            defaultValue={String(data?.price)
              .split(".00")
              .join("")
              .replace(",", "")
              .replace("$", "")}
            placeholder="Price"
          ></InputNumber>
        </Form.Item>
        <Form.Item<ProductType>
          label="Sale price"
          name="sale_price"
          initialValue={String(data?.sale_price)
            .split(".00")
            .join("")
            .replace(",", "")
            .replace("$", "")}
        >
          <InputNumber
            defaultValue={String(data?.sale_price)
              .split(".00")
              .join("")
              .replace(",", "")
              .replace("$", "")}
            placeholder="Sale Price"
          ></InputNumber>
        </Form.Item>
        <Form.Item<ProductType>
          label="Count"
          name="count"
          initialValue={Number(data.count)}
        >
          <InputNumber defaultValue={data.count} placeholder="Sale Price"></InputNumber>
        </Form.Item>
        <Form.Item<Omit<ProductType, "image"> & { image_url: string }>
          label="Image url"
          name="image_url"
          initialValue={data?.image}
        >
          <Input defaultValue={data?.image} placeholder="Image url"></Input>
        </Form.Item>
        <Form.Item<ProductType>
          label="Created At"
          name={"created_at"}
          initialValue={data?.created_at}
        >
          <Input
            placeholder="created at"
            disabled
            value={DateUTC(data?.created_at)}
          ></Input>
        </Form.Item>
        <Form.Item<ProductType>
          label="Colors"
          name={"characteristic"}
          initialValue={data?.characteristic?.color}
        >
          <Select
            placeholder="Please select"
            defaultValue={data?.characteristic?.color}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item<ProductType>
          label="Categories"
          name={"category_id"}
          initialValue={categories.id}
        >
          <Select
            placeholder="Please select"
            defaultValue={data?.characteristic?.color}
            style={{ width: "100%" }}
            options={[
              { label: categories.name_uz, value: categories.id, key: 1 },
            ]}
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
