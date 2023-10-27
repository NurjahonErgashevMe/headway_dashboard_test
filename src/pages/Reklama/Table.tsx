/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { memo, useState } from "react";
import Table from "antd/es/table";
import Space from "antd/es/space";
import Button from "antd/es/button";
import Tooltip from "antd/es/tooltip";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import NiceModal from "@ebay/nice-modal-react";
import MyModal from "../../components/Modal/Modal";
import useDelete from "../../hooks/useDelete";
import { Image, Popconfirm, message } from "antd";
import { CategoryType } from "../../types/category.type";
import { useQueryClient } from "@tanstack/react-query";
import Update from "./Forms/Edit";
import { ReklamaType } from "../../types/reklama.type";
type Props = {
  data: ReklamaType[];
};

const TableWrapper: React.CSSProperties = {
  padding: "30px 20px",
};

const { Column } = Table;

const ProductTable: React.FC<Props> = ({ data }) => {
  const useDELETE = useDelete(`admin/ads`);
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  const ModalDeleteHandler = (id: string) => {
    setLoading(() => true);
    const key = "delete-ad";
    messageApi.open({
      key,
      type: "loading",
      content: "O'chirilmoqda...",
    });
    useDELETE.mutate(id as any, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["reklama"],
        });
        setLoading(() => false);
        return messageApi.open({
          key,
          type: "success",
          content: "O'chirildi",
        });
      },
      onError: () => {
        setLoading(() => false);

        return messageApi.open({
          key,
          type: "error",
          content: "Hatolik",
        });
      },
    });
  };
  const ModalUpdateandler = (id: string) => {
    NiceModal.show(MyModal, {
      children: <Update id={id} />,
      variant: "update",
      okButton: false,
    });
  };
  return (
    <div style={TableWrapper}>
      {contextHolder}
      <Table dataSource={data?.map((item) => ({ ...item, key: item.id }))}>
        <Column
          key={"title"}
          title={"Name uz"}
          render={(record: ReklamaType) => <p>{record.title}</p>}
        ></Column>
        <Column
          key={""}
          title={"Name lat"}
          render={(record: ReklamaType) => (
            <Button type="link" href={record.link} target="_blank">
              {record.link}
            </Button>
          )}
        ></Column>
        <Column
          key={"image"}
          title={"Image"}
          render={(record: ReklamaType) => (
            <Image width={150} src={record.image} alt="image"></Image>
          )}
        ></Column>

        <Column
          key={"actions"}
          title={"Actions"}
          render={(record: CategoryType) => (
            <Space>
              <Tooltip title="O'zgartirish">
                <Button
                  shape="circle"
                  onClick={() => ModalUpdateandler(record.id)}
                >
                  <EditOutlined />
                </Button>
              </Tooltip>
              <Popconfirm
                title="O'chirishni xohlaysizmi?"
                description=""
                onConfirm={() => ModalDeleteHandler(record.id)}
                okText="Ha "
                cancelText="No"
                okButtonProps={{ loading, disabled: loading }}
              >
                <Button danger>
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
            </Space>
          )}
        ></Column>
      </Table>
    </div>
  );
};
export default memo(ProductTable);
