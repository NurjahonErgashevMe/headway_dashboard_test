/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  TreeSelect,
  message,
} from "antd";
import classes from "./Add.module.scss";
import { CategoryType } from "../../../types/category.type";
import useCreate from "../../../hooks/useCreate";
import { useQueryClient } from "@tanstack/react-query";
import useGET from "../../../hooks/useGET";
import Upload from "../../../components/Upload/Upload";
// import useGET from "../../../hooks/useGET";

const Add: React.FC = () => {
  const useCREATE = useCreate(`admin/category`);
  const queryClient = useQueryClient();
  const category = useGET<CategoryType[]>(["category"], "category/parents");
  const [image, setImage] = React.useState<string>("");
  const [form] = Form.useForm();
  const parentCategory = Form.useWatch("parent_id", form);
  const parentIdIts = Form.useWatch("parent_id_its", form);
  const useGETWithId = useGET<CategoryType[]>(
    ["category", parentCategory || ""],
    `category/children/${parentCategory}`
  );
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = (data: CategoryType & { child_id: string }) => {
    const { child_id, ...datas }: CategoryType & { child_id: string } = {
      ...data,
      parent_id: parentIdIts
        ? null
        : data.child_id
        ? data.child_id
        : data.parent_id,
      image_url: image,
    };
    setLoading(() => true);
    useCREATE.mutate(datas as any, {
      onSuccess: async () => {
        queryClient.invalidateQueries({
          queryKey: ["category"],
        });
        category.refetch();
        message.success("added!");
        setLoading(() => false);

        form.resetFields();
      },
      onError: (err) => {
        console.log(err);
        message.error("error");
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
      >
        <Form.Item<CategoryType>
          name={"name_uz"}
          label={"Name uz"}
          rules={[{ required: true, message: "Name uz is required" }]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item<CategoryType>
          rules={[{ required: true, message: "Name ru is required" }]}
          name={"name_ru"}
          label={"Name ru"}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item<CategoryType>
          name={"name_lat"}
          label={"Name lat"}
          rules={[{ required: true, message: "Name lat is required" }]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item<CategoryType>
          name={"image_url"}
          label={"Image url"}
          hidden={!form.getFieldValue("parent_id_its")}
          initialValue={""}
          // rules={[
          //   {
          //     required: !image,
          //     message: "Upload is required",
          //     // validator: () => {
          //     //   if (form.getFieldValue("parent_id")) {
          //     //     if (!image) {
          //     //       return Promise.resolve();
          //     //     }

          //     //   }
          //     // },
          //   },
          // ]}
        >
          <Upload setValue={setImage}></Upload>
        </Form.Item>
        <Form.Item
          name="parent_id_its"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
          initialValue={true}
        >
          <Checkbox
            onChange={(e) => {
              if (e.target.checked) {
                form.setFieldValue("parent_id", null);
              }
            }}
          >
            Parent category
          </Checkbox>
        </Form.Item>
        <Form.Item<CategoryType>
          name={"parent_id"}
          label={"Parent category"}
          initialValue={null}
          hidden={parentIdIts}
          // rules={[{required : true,message : "Parent category is required" }]}
        >
          <Select
            disabled={parentIdIts}
            placeholder="Select and search value"
            allowClear
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
            style={{ width: "100%" }}
            options={category?.data?.data?.map((item) => ({
              key: item?.id,
              label: item?.name_uz,
              value: item?.id,
            }))}
          />
        </Form.Item>

        <Form.Item<CategoryType & { child_id: string }>
          name={"child_id"}
          label={"Child category"}
          initialValue={null}
          hidden={parentIdIts}
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
        <Button htmlType="submit" loading={loading} disabled={loading}>add</Button>
      </Form>
    </div>
  );
};

export default Add;
