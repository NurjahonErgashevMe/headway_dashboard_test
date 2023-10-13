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
  Dropdown,
  Space,
} from "antd";
import DateUTC from "../../../hooks/useDateUTC";
import classes from "./Update.module.scss";
import { ProductType } from "../../../types/product.type";
import useUpdate from "../../../hooks/useUpdate";
import { CategoryType } from "../../../types/category.type";
import useGET from "../../../hooks/useGET";
import { flatten } from "../../../helpers";
import { DownOutlined, DeleteOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
type Props = {
  data: Omit<ProductType, "image_url"> & { image: string };
  owner: string;
  id: string;
};

const { TextArea } = Input;

const ProductUpdate: React.FC<Props> = ({ data, id }) => {
  const useUPDATE = useUpdate(`product/${id}`);
  const getCategories = useGET<CategoryType[]>(
    ["category"],
    "category/parents"
  );
  const [form] = Form.useForm();
  const parentCategory = Form.useWatch("category_id", form);
  const useGETWithId = useGET<CategoryType[]>(
    ["category", parentCategory || ""],
    `category/children/${parentCategory}`
  );
  const queryClient = useQueryClient()
  const [childCategoryId, setChildCategoryId] = React.useState<string>("");

  const handleSubmit = (formData: ProductType & { child_id: string }) => {
    const { child_id, ...datas } = {
      ...formData,
      characteristic: {},
      price: Number(formData.price),
      sale_price: Number(data.price),
      category_id: childCategoryId ? childCategoryId : data.category_id,
    } satisfies ProductType;
    useUPDATE.mutate(datas as any, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey : ['products']
        })
        message.success("updated !")
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
          name={"category_id"}
          label={"Category"}
          initialValue={null}
          required
        >
          <Select
            placeholder="Select and search value"
            style={{ width: "100%" }}
            showSearch
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
              getCategories?.data?.data?.map((item) => ({
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
          <Dropdown
            overlayStyle={{
              maxHeight: "300px",
              overflowY: "scroll",
            }}
            disabled={!useGETWithId?.data?.data?.length}
            menu={{
              itemScope: true,
              items: useGETWithId.data?.data?.map((item) => ({
                key: item.id,
                label: item.name_uz,
                value: item.id,
                children: item?.children
                  ?.filter((item) => item)
                  .map((item) => ({
                    key: item?.id,
                    label: item?.name_uz,
                    value: item?.id,
                  })),
                icon: item.children?.[0] != null ? <DownOutlined /> : <></>,
                onClick: (e) => {
                  setChildCategoryId(() => e.key);
                },
                onTitleClick: (e) => {
                  setChildCategoryId(() => e.key);
                },
              })),
              expandIcon: <></>,
              selectedKeys: [childCategoryId],
            }}
          >
            <Space>
              <Button disabled={!useGETWithId?.data?.data?.length}>
                <Space>
                  {childCategoryId
                    ? flatten(useGETWithId?.data?.data as CategoryType[])?.find(
                        (item) => item.id === childCategoryId
                      )?.name_uz
                    : "select.."}
                  {}
                  <DownOutlined />
                </Space>
              </Button>
              <Button onClick={() => setChildCategoryId(() => "")}>
                <DeleteOutlined color="red" />
              </Button>
            </Space>
          </Dropdown>
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
