/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { memo } from "react";
import { OrderType } from "../../types/order.type";
import { Table, Tooltip, Button, message } from "antd";
import useGET from "../../hooks/useGET";
import { ProductType } from "../../types/product.type";
import NiceModal from "@ebay/nice-modal-react";
import Modal from "../../components/Modal/Modal";
import classes from "./index.module.scss";
import ProductTable from "../Product/Table";
import { UserTypes } from "../../types/user.type";
import GetParamsWithFInd from "../../hooks/useGetParamsWithFind";
import useDelete from "../../hooks/useDelete";
import { DeleteOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
const { Column } = Table;

const CustomTable: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const orders = useGET<OrderType[]>(
    ["order"],
    `admin/product/order-list?status=0`
  );
  const deleteOrders = useDelete("orders");
  const users = useGET<UserTypes[]>(["users"], "admin/users/list");
  const products = useGET<ProductType[]>(["products"], "admin/product/list");
  const queryClient = useQueryClient();
  const [cookie] = useCookies(["phone"]);
  const viewProductHandler = (id: string) => {
    const item: ProductType[] =
      products?.data?.data?.filter((item) => item.id === id) || [];

    NiceModal.show(Modal, {
      width: 1500,
      children: (
        <div className={classes.modal}>
          <ProductTable
            data={item}
            user={
              users?.data?.data?.find(
                (item) => item.phone === String(cookie.phone)
              ) as UserTypes
            }
            pagination={false}
            loading={products.isLoading}
          />
        </div>
      ),
      okButton: false,
    });
  };

  const ModalDeleteHandler = (id: string) => {
    messageApi.open({
      key: "delete",
      type: "loading",
      content: "Loading...",
    });
    deleteOrders.mutate(id as any, {
      onSuccess: () => {
        messageApi.open({
          key: "delete",
          type: "success",
          content: "Deleted!",
        });
        queryClient.invalidateQueries({
          queryKey: ["order"],
        });
      },
      onError: () =>
        messageApi.open({
          key: "delete",
          type: "error",
          content: "Error",
        }),
    });
  };

  return (
    <>
      {contextHolder}
      <Table
        dataSource={orders?.data?.data?.map((item) => ({
          ...item,
          key: item.id,
        }))}
        loading={orders.isLoading || products.isError}
      >
        <Column
          key={"first_name"}
          title={"FISTNAME"}
          render={(record: OrderType) => <p>{record.client_data.first_name}</p>}
        ></Column>
        <Column
          key={"client_last_name"}
          title={"LAST NAME"}
          render={(record: OrderType) => <p>{record.client_data.last_name}</p>}
        ></Column>
        <Column
          key={"client_phone"}
          title={"PHONE NUMBER"}
          render={(record: OrderType) => <p>{record.client_data.phone}</p>}
        ></Column>
        <Column
          key={""}
          title={"COUNT"}
          render={(record: OrderType) => <p>{record.count}</p>}
        ></Column>
        <Column
          key={""}
          title={"SELLER"}
          render={(record: OrderType) => (
            <p>
              {GetParamsWithFInd(
                users?.data?.data || [],
                "id",
                record.seller_id,
                ["first_name", "last_name"]
              )}
            </p>
          )}
        ></Column>
        <Column
          key={""}
          title={"PRODUCT"}
          render={(record: OrderType) => (
            <Tooltip>
              <Button
                type="link"
                onClick={() => viewProductHandler(record.product_id)}
              >
                view product
              </Button>
            </Tooltip>
          )}
        ></Column>
        <Column
          key={""}
          title={""}
          render={(record: OrderType) => (
            <Tooltip title="delete">
              <Button
                shape="circle"
                onClick={() => ModalDeleteHandler(record.id)}
              >
                <DeleteOutlined />
              </Button>
            </Tooltip>
          )}
        ></Column>
      </Table>
    </>
  );
};

export default memo(CustomTable);
