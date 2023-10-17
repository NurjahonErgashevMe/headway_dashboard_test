/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { memo } from "react";
import {
  Button,
  Input,
  Select,
  Form,
  message,
  InputNumber,
  TreeSelect,
} from "antd";
import DateUTC from "../../../hooks/useDateUTC";
import classes from "./Update.module.scss";
import { ProductType } from "../../../types/product.type";
import useUpdate from "../../../hooks/useUpdate";
import { CategoryType } from "../../../types/category.type";
import useGET from "../../../hooks/useGET";
import { useQueryClient } from "@tanstack/react-query";
import MyUpload from "../../../components/Upload/Upload";
type Props = {
  data: Omit<ProductType, "image_url"> & { image: string };
  owner: string;
  id: string;
};

const { TextArea } = Input;

const ProductUpdate: React.FC<Props> = ({ data, id }) => {
  const useUPDATE = useUpdate(`product/${id}`);
  // const [allCategories, setAllCategories] = React.useState<
  //   Omit<CategoryType, "children">[] | null
  // >(null);
  const [form] = Form.useForm();
  const [image, setImage] = React.useState<string>(data?.image);
  const parentCategoryValue = Form.useWatch("category_id", form);
  const useGETWithId = useGET<CategoryType[]>(
    ["category", parentCategoryValue || data.category_id],
    `category/children/${parentCategoryValue || data.category_id}`
  );
  const [loading, setLoading] = React.useState<boolean>(false);
  const category = useGET<Omit<CategoryType, "children">[]>(
    ["category"],
    "category/parents"
  );
  const queryClient = useQueryClient();
  const handleSubmit = (formData: ProductType & { child_id: string }) => {
    const { child_id, ...datas } = {
      ...formData,
      characteristic: {},
      price: Number(formData.price),
      sale_price: Number(data.price),
      category_id: formData.child_id ? formData.child_id : data.category_id,
      image_url: image,
    } satisfies ProductType & { image_url: string };
    setLoading(() => true);
    useUPDATE.mutate(datas as any, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["products"],
        });
        message.success("updated !");
        setLoading(() => false);
      },
      onError: (err) => {
        console.log(err);
        message.error("error");
        setLoading(() => false);
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
        form={form}
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
          <InputNumber
            defaultValue={data.count}
            placeholder="Sale Price"
          ></InputNumber>
        </Form.Item>
        <Form.Item<Omit<ProductType, "image"> & { image_url: string }>
          label="Image url"
          name="image_url"
          initialValue={data?.image}
        >
          <MyUpload setValue={setImage} defaultValue={data?.image}></MyUpload>
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
          name={"category_id"}
          label={"Category"}
          initialValue={null}
          required
        >
          <Select
            placeholder="Select and search value"
            style={{ width: "100%" }}
            showSearch
            loading={!category?.isSuccess}
            filterOption={(input, option) =>
              (option?.label.toLocaleLowerCase() ?? "").includes(
                input.toLowerCase()
              )
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={
              category?.data?.data?.map((item) => ({
                key: item.id,
                label: item.name_uz,
                value: item.id,
              })) || []
            }
          />
        </Form.Item>
        <Form.Item<ProductType & { child_id: string }>
          label="Child category"
          name={"child_id"}
          initialValue={null}
        >
          <TreeSelect
            showSearch
            disabled={!useGETWithId?.data?.data?.length}
            loading={useGETWithId?.isLoading}
            style={{ width: "100%" }}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            placeholder="Please select"
            allowClear
            onChange={(e) => console.log(e)}
            treeData={useGETWithId?.data?.data?.map((item) => ({
              title: item?.name_uz,
              value: item?.id,
              children: item?.children
                ?.filter((item) => item)
                .map((i: any) => ({
                  title: i?.name_uz,
                  value: i?.id,
                })),
            }))}
          />
        </Form.Item>
        <Form.Item<ProductType>
          label="Description"
          name={"description"}
          initialValue={data?.description}
        >
          <TextArea defaultValue={data?.description} rows={4} />
        </Form.Item>
        <Button htmlType="submit" loading={loading} disabled={loading}>
          submit
        </Button>
      </Form>
    </div>
  );
};

export default memo(ProductUpdate);
