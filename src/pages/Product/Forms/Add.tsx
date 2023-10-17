/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Form, Input, message, InputNumber, TreeSelect } from "antd";
import classes from "./Add.module.scss";
import { ProductType } from "../../../types/product.type";
import useCreate from "../../../hooks/useCreate";
import { useQueryClient } from "@tanstack/react-query";
import { useStore } from "../../../utils/store/store";
import { Select } from "antd/lib";
import { CategoryType } from "../../../types/category.type";
import useGET from "../../../hooks/useGET";
import MyUpload from "../../../components/Upload/Upload";
const Add: React.FC = () => {
  const { category } = useStore();
  const useCREATE = useCreate(`product`);
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const parentCategory = Form.useWatch("category_id", form);
  const useGETWithId = useGET<CategoryType[]>(
    ["category", parentCategory || ""],
    `category/children/${parentCategory}`
  );
  console.log(useGETWithId);

  const handleSubmit = (
    data: Omit<ProductType, "id"> & { child_id: string; color: string }
  ) => {
    const { color, child_id, ...datas } = {
      ...data,
      characteristic: { color: data?.color },
      category_id: data.child_id || data.category_id,
      image_url: image,
    };
    setLoading(() => true);
    useCREATE.mutate(datas as any, {
      onSuccess: async () => {
        queryClient.invalidateQueries({
          queryKey: ["products"],
        });
        message.success("added!");
        setLoading(() => false);
        form.resetFields();
      },
      onError: (err) => {
        console.log(err);
        message.error("error!");
        setLoading(() => false);
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
        onFinishFailed={(e) =>
          form.scrollToField(e.errorFields[0].name, {
            behavior: "smooth",
            scrollMode: "always",
            skipOverflowHiddenElements: true,
          })
        }
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
          rules={[
            {
              required: !image,
              message: "Upload is required",
              validator: () =>
                image !== ""
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    ),
            },
          ]}
        >
          <MyUpload setValue={setImage}></MyUpload>
        </Form.Item>
        <Form.Item<ProductType>
          name={"category_id"}
          label={"Category"}
          initialValue={null}
          rules={[{ required: true, message: "Category is required" }]}
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
          <TreeSelect
            showSearch
            disabled={!useGETWithId?.data?.data?.length}
            loading={useGETWithId?.isLoading}
            style={{ width: "100%" }}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            placeholder="Please select"
            allowClear
            onChange={(e) => console.log(e)}
            treeNodeFilterProp="title"
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
        <Button htmlType="submit" loading={loading} disabled={loading}>
          add
        </Button>
      </Form>
    </div>
  );
};

export default Add;
