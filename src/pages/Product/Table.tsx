/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { memo, useState } from "react";
import Table, { TableProps } from "antd/es/table";
import Image from "antd/es/image";
import Tag from "antd/es/tag";
import Space from "antd/es/space";
import Button from "antd/es/button";
import Tooltip from "antd/es/tooltip";
import {
  // EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import DateUTC from "../../hooks/useDateUTC";
import NiceModal from "@ebay/nice-modal-react";
import MyModal from "../../components/Modal/Modal";
import ProductView from "./Forms/View";
import useDelete from "../../hooks/useDelete";
import { message } from "antd";
import { ProductType } from "../../types/product.type";
import { useQueryClient } from "@tanstack/react-query";
import { UserTypes } from "../../types/user.type";
// import Update from "./Forms/Update";
interface Props extends TableProps<any> {
  data: ProductType[];
  user: UserTypes;
}

const TableWrapper: React.CSSProperties = {
  padding: "30px 20px",
};

const { Column } = Table;

const ImageWrapperStyles: React.CSSProperties = {
  width: "100px",
  height: "100px",
};

const ProductTable: React.FC<Props> = ({ data, user, ...props }) => {
  const useDELETE = useDelete(`admin/product`);
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);
  const ModalViewHandler = (id: string) => {
    const finded: ProductType = data.find((item) => item.id == id) || data[0];

    NiceModal.show(MyModal, {
      children: (
        <ProductView
          data={finded}
          owner={`${user?.first_name} ${user?.last_name}`}
        />
      ),
      variant: "view",
      okButton: false,
    });
  };
  const ModalDeleteHandler = (id: string) => {
    NiceModal.show(MyModal, {
      children: (
        <div>
          <h2>Do you want delete this?</h2>
          <Button
            style={{ color: "red", borderColor: "red" }}
            loading={loading}
            disabled={loading}
            onClick={() => {
              setLoading(() => true);
              useDELETE.mutate(id as any, {
                onSuccess: () => {
                  queryClient.invalidateQueries({
                    queryKey: ["products"],
                  });
                  message.success("deleted!");
                  setLoading(() => false);
                },
                onError: () => {
                  message.error("error!");
                  setLoading(() => false);
                },
              });
            }}
          >
            Delete
          </Button>
        </div>
      ),
      variant: "view",
      okButton: false,
    });
  };

  return (
    <div style={TableWrapper}>
      <Table
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.description}</p>
          ),
        }}
        dataSource={data?.map((item, index) => ({ ...item, key: index + 1 }))}
        {...props}
      >
        <Column
          key={"name_uz"}
          title={"Nom o'zbekcha"}
          render={(record: ProductType) => <p>{record.name_uz}</p>}
        ></Column>
        <Column
          key={"name_ru"}
          title={"Nom ruscha"}
          render={(record: ProductType) => <p>{record.name_ru}</p>}
        ></Column>
        <Column
          key={"name_lat"}
          title={"Name lat"}
          render={(record: ProductType) => <p>{record.name_lat}</p>}
        ></Column>
        <Column
          key={"sale_price"}
          title={"Skidkadagi narx"}
          render={(record: ProductType) => (
            <Tag color="green">{record.sale_price || null}</Tag>
          )}
        ></Column>
        <Column
          key={"price"}
          title={"Narxi"}
          render={(record: ProductType) => (
            <Tag color="red">{record.price}</Tag>
          )}
        ></Column>
        <Column
          key={"count"}
          title={"Soni"}
          render={(record: ProductType) => <p>{record.count}</p>}
        ></Column>
        <Column
          key={"date"}
          title={"Qoshilgan sanasi"}
          render={(record: ProductType) => <p>{DateUTC(record.created_at)} </p>}
        ></Column>
        <Column
          key={"image"}
          title={"Rasm"}
          render={(
            record: Omit<ProductType, "image_url"> & { image: string }
          ) => (
            <div style={ImageWrapperStyles}>
              <Image
                width={100}
                height={100}
                src={record.image}
                alt="image"
                placeholder={
                  <Image preview={false} src={record.image} width={100} />
                }
              />
            </div>
          )}
        ></Column>
        <Column
          key={"actions"}
          title={""}
          render={(record: ProductType) => (
            <Space>
              {/* <Tooltip title="edit">
                <Button
                  shape="circle"
                  onClick={() => ModalUpdateandler(record)}
                >
                  <EditOutlined />
                </Button>
              </Tooltip> */}
              <Tooltip title="delete">
                <Button
                  shape="circle"
                  onClick={() => ModalDeleteHandler(record.id)}
                >
                  <DeleteOutlined />
                </Button>
              </Tooltip>
              <Tooltip title="view">
                <Button
                  shape="circle"
                  onClick={() => ModalViewHandler(record.id)}
                >
                  <InfoCircleOutlined />
                </Button>
              </Tooltip>
            </Space>
          )}
        ></Column>
      </Table>
    </div>
  );
};
export default memo(ProductTable);
