/* eslint-disable react-refresh/only-export-components */
import { memo, useState } from "react";
import { OrderType } from "../../types/order.type";
import { Table, Tooltip, Button } from "antd";
import useGET from "../../hooks/useGET";
import { ProductType } from "../../types/product.type";
import NiceModal from "@ebay/nice-modal-react";
import Modal from "../../components/Modal/Modal";
import classes from "./index.module.scss";
import ProductTable from "../Product/Table";
import { UserTypes } from "../../types/user.type";
import GetParamsWithFInd from "../../hooks/useGetParamsWithFind";
const { Column } = Table;

const CustomTable: React.FC = () => {
  const [pagination, setPagination] = useState<number>(1);
  const orders = useGET<OrderType[]>(
    ["order", pagination.toString()],
    `admin/product/order-list?status=0`
  );
  const users = useGET<UserTypes[]>(["users"], "admin/users/list");
  const products = useGET<ProductType[]>(["products"], "admin/product/list");
  const viewProductHandler = (id: string) => {
    const item: ProductType[] =
      products?.data?.data?.filter((item) => item.id === id) || [];

    NiceModal.show(Modal, {
      width: 1500,
      children: (
        <div className={classes.modal}>
          <ProductTable
            data={item}
            users={users.data?.data || []}
            pagination={false}
            loading={products.isLoading}
          />
        </div>
      ),
      okButton: false,
    });
  };
  return (
    <Table
      dataSource={orders?.data?.data?.map((item) => ({
        ...item,
        key: item.id,
      }))}
      loading={orders.isLoading || products.isError}
      pagination={{
        onChange: (e) => setPagination(() => e),
      }}
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
    </Table>
  );
};

export default memo(CustomTable);
