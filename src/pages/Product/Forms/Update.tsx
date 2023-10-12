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
} from "antd";
import DateUTC from "../../../hooks/useDateUTC";
import classes from "./Update.module.scss";
// import { useStore } from "../../../utils/store/store";
import { ProductType } from "../../../types/product.type";
import useUpdate from "../../../hooks/useUpdate";
import { useStore } from "../../../utils/store/store";
import { CategoryType } from "../../../types/category.type";
import useGET from "../../../hooks/useGET";
import useGetById from "../../../hooks/useGetById";
import { Instance } from "../../../utils/axios";
import { useCookies } from "react-cookie";
import { flatten } from "../../../helpers";
type Props = {
  data: Omit<ProductType, "image_url"> & { image: string };
  owner: string;
  id: string;
};

const { TextArea } = Input;

const ProductUpdate: React.FC<Props> = ({ data, id }) => {
  const { category } = useStore();
  const useUPDATE = useUpdate(`product/${id}`);
  const getCategories = useGET<CategoryType[]>(
    ["category"],
    "category/parents"
  );
  const [cookie] = useCookies(["token"]);
  const [allCategory, setAllCategory] = React.useState<any[]>([]);
  const getCategoriesById = useGetById("category/children");
  const [parentCategory, setParentCategory] =
    React.useState<CategoryType | null>(null);
  const [childCategory, setChildCategory] = React.useState<CategoryType | null>(
    null
  );

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
  React.useEffect(() => {
    if (getCategories.isSuccess) {
      for (const item of getCategories?.data?.data as CategoryType[]) {
        Instance.get(`/category/children/${item.id}`, {
          headers: { Authorization: cookie.token },
        }).then((data) => setAllCategory((prev) => [...prev, ...data.data]));
      }
    }
  }, [getCategories.data?.data, getCategories.isSuccess]);
  React.useEffect(() => {
    const item: any = flatten(allCategory)?.find(
      (item) => item.id == data.category_id
    );
    const flatted = flatten(allCategory);
    setParentCategory(
      () => flatted.find((i) => i.id == item?.flatten_parent_id) as any
    );
    setChildCategory(() => item);
  }, [allCategory]);
  console.log(parentCategory, "parent");

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
          label="Categories"
          name={"category_id"}
          initialValue={categories.id}
        >
          {/* <Dropdown
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
            <Space>
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
                <DeleteOutlined color="red" />
              </Button>
            </Space>
          </Dropdown> */}
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
