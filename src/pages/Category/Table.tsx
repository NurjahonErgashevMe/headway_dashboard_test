/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { memo } from "react";
import Table from "antd/es/table";
import Space from "antd/es/space";
import Button from "antd/es/button";
import Tooltip from "antd/es/tooltip";
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import NiceModal from "@ebay/nice-modal-react";
import MyModal from "../../components/Modal/Modal";
import View from "./Forms/View";
import useDelete from "../../hooks/useDelete";
import { Image, message } from "antd";
import { CategoryType } from "../../types/category.type";
import { useQueryClient } from "@tanstack/react-query";
import Update from "./Forms/Update";
import Children from "./Children/Children";
type Props = {
  data: CategoryType[];
};

const TableWrapper: React.CSSProperties = {
  padding: "30px 20px",
};

const { Column } = Table;

const ProductTable: React.FC<Props> = ({ data }) => {
  const useDELETE = useDelete(`admin/category`);
  const queryClient = useQueryClient();
  const ModalViewHandler = (id: string) => {
    const finded: CategoryType = data.find((item) => item.id == id) || data[0];

    NiceModal.show(MyModal, {
      children: <View data={finded} id={id} />,
      variant: "view",
      okButton: false,
    });
  };
  const ModalDeleteHandler = (id: string) => {
    NiceModal.show(MyModal, {
      children: <h2>Do you want delete this?</h2>,
      variant: "delete",
      onOk: () =>
        useDELETE.mutate(id as any, {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["category"],
            });
            message.success("deleted!");
          },
          onError: () => {
            message.error("error!");
          },
        }),
    });
  };
  const ModalUpdateandler = (id: string  ) => {
    NiceModal.show(MyModal, {
      children: <Update id={id} />,
      variant: "update",
      okButton: false,
    });
  };
  const ModalViewChildren = (id: string) => {
    NiceModal.show(MyModal, {
      children: <Children id={id} />,
      variant: "view",
      okButton: false,
      width: 800,
    });
  };
  return (
    <div style={TableWrapper}>
      <Table
        dataSource={data?.map((item) => ({ ...item, key: item.id }))}
      >
        <Column
          key={"name_uz"}
          title={"Name uz"}
          render={(record: CategoryType) => <p>{record.name_uz}</p>}
        ></Column>
        <Column
          key={"name_ru"}
          title={"Name ru"}
          render={(record: CategoryType) => <p>{record.name_ru}</p>}
        ></Column>
        <Column
          key={"name_lat"}
          title={"Name lat"}
          render={(record: CategoryType) => <p>{record.name_lat}</p>}
        ></Column>
        <Column
          key={"image"}
          title={"Image"}
          render={(
            record: Omit<CategoryType, "image_url"> & { image: string }
          ) => <Image width={150} src={record.image} alt="image"></Image>}
        ></Column>

        <Column
          key={"actions"}
          title={"Actions"}
          render={(record: CategoryType) => (
            <Space>
              <Tooltip title="edit">
                <Button
                  shape="circle"
                  onClick={() => ModalUpdateandler(record.id )}
                >
                  <EditOutlined />
                </Button>
              </Tooltip>
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
              <Tooltip title="view children">
                <Button
                  shape="circle"
                  onClick={() => ModalViewChildren(record.id)}
                >
                  <RollbackOutlined />
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
