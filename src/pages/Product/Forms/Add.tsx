/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Button,
  Form,
  Input,
  message,
  InputNumber,
  Dropdown,
  Space,
} from "antd";
import classes from "./Add.module.scss";
import { ProductType } from "../../../types/product.type";
import useCreate from "../../../hooks/useCreate";
import { useQueryClient } from "@tanstack/react-query";
import { useStore } from "../../../utils/store/store";
import { Select } from "antd/lib";
import { CategoryType } from "../../../types/category.type";
import useGET from "../../../hooks/useGET";
import { DownOutlined, DeleteOutlined } from "@ant-design/icons";
import { flatten } from "../../../helpers";
const Add: React.FC = () => {
  const { category } = useStore();
  const useCREATE = useCreate(`product`);
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [childCategoryId, setChildCategoryId] = React.useState<string>("");
  const parentCategory = Form.useWatch("category_id", form);
  const useGETWithId = useGET<CategoryType[]>(
    ["category", parentCategory || ""],
    `category/children/${parentCategory}`
  );

  const handleSubmit = (
    data: Omit<ProductType, "id"> & { child_id: string; color: string }
  ) => {
    const { color, child_id, ...datas } = {
      ...data,
      characteristic: { color: data?.color },
      category_id: childCategoryId ? childCategoryId : data.category_id,
    };
    useCREATE.mutate(datas as any, {
      onSuccess: async () => {
        queryClient.invalidateQueries({
          queryKey: ["products"],
        });
        message.success("added!");
        form.resetFields();
        setChildCategoryId(()=>"")
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
        <Form.Item<ProductType>
          name={"name_uz"}
          label={"Name uz"}
          rules={[{ required: true, message: "Name uz is required" }]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item<ProductType>
          rules={[{ required: true, message: "Name ru is required" }]}
          name={"name_ru"}
          label={"Name ru"}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item<ProductType>
          name={"name_lat"}
          label={"Name lat"}
          rules={[{ required: true, message: "Name lat is required" }]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item<Omit<ProductType, "image"> & { image_url: string }>
          name={"image_url"}
          label={"Image url"}
          initialValue={""}
        >
          <Input defaultValue={""}></Input>
        </Form.Item>
        <Form.Item<ProductType>
          name={"category_id"}
          label={"Category"}
          initialValue={null}
          required
        >
          <Select
            placeholder="Select and search value"
            allowClear
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
              category?.map((item) => ({
                key: item.id,
                label: item.name_uz,
                value: item.id,
              })) || []
            }
          />
        </Form.Item>
        <Form.Item<ProductType & { child_id: string }>
          name={"child_id"}
          label={"Child Category"}
          initialValue={null}
        >
          <Dropdown
            overlayStyle={{
              height : "300px",
              overflowY: "scroll"
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
              // defaultSelectedKeys: [childCategoryId],
              selectedKeys: [childCategoryId],
            }}
          >
            <Space >
              <Button>
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
                <DeleteOutlined  color="red" />
              </Button>
            </Space>
          </Dropdown>
        </Form.Item>
        <Form.Item<ProductType> name={"price"} label={"Price"} initialValue={0}>
          <InputNumber defaultValue={0}></InputNumber>
        </Form.Item>
        <Form.Item<ProductType>
          name={"sale_price"}
          label={"Sale price"}
          initialValue={0}
        >
          <InputNumber defaultValue={0}></InputNumber>
        </Form.Item>
        <Form.Item<ProductType> name={"count"} label={"Count"} initialValue={0}>
          <InputNumber defaultValue={0}></InputNumber>
        </Form.Item>
        <Form.Item<ProductType>
          name={"color" as any}
          label={"Color"}
          initialValue={""}
        >
          <Select
            placeholder="Please select"
            style={{ width: "100%" }}
            options={["red", "white", "blue", "gray"].map((item) => ({
              label: item,
              key: item,
              value: item,
            }))}
          />
        </Form.Item>
        <Form.Item<ProductType> name={"description"} label="Description">
          <Input.TextArea></Input.TextArea>
        </Form.Item>
        <Button htmlType="submit">add</Button>
      </Form>
    </div>
  );
};

export default Add;
