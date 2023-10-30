/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { memo } from "react";
import Table from "antd/es/table";
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
import UserView from "./Forms/View";
import useDelete from "../../hooks/useDelete";
import { Popconfirm, message } from "antd";
import { UserTypes as UserType } from "../../types/user.type";
import { useQueryClient } from "@tanstack/react-query";
import { UserRoles } from "../../enums";
// import Update from "./Forms/Update";
type Props = {
  data: UserType[];
};

const TableWrapper: React.CSSProperties = {
  padding: "30px 20px",
};

const { Column } = Table;

const UserTable: React.FC<Props> = ({ data }) => {
  const useDELETE = useDelete(`admin/users`);
  const queryClient = useQueryClient();
  const [messageApi, contentBox] = message.useMessage();
  const ModalViewHandler = (id: string) => {
    const finded: UserType = data.find((item) => item.id == id) || data[0];

    NiceModal.show(MyModal, {
      children: <UserView data={finded} />,
      variant: "view",
      cancelButton: false,
    });
  };
  const ModalDeleteHandler = (id: string) => {
    const key = "delete-user";
    messageApi.open({
      key,
      type: "loading",
      content: "O'chirilmoqda...",
    });
    useDELETE.mutate(id as any, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
        return messageApi.open({
          key,
          type: "success",
          content: "O'chirildi",
        });
      },
      onError: () => {
        return messageApi.open({
          key,
          type: "error",
          content: "Hatolik",
        });
      },
    });
  };
  // const ModalUpdateandler = (id: string) => {
  //   const finded: UserType = data.find((item) => item.id == id) || data[0];
  //   NiceModal.show(MyModal, {
  //     children: <Update data={finded} id={id} />,
  //     variant: "update",
  //     okButton: false,
  //   });
  // };
  return (
    <div style={TableWrapper}>
      {contentBox}
      <Table
        dataSource={data?.map((item, index) => ({ ...item, key: index + 1 }))}
      >
        <Column
          key={"last_name"}
          title={"Ism"}
          render={(record: UserType) => <p>{record.first_name}</p>}
        ></Column>
        <Column
          title={"Familiya"}
          key={"last_name"}
          render={(record: UserType) => <p>{record.last_name}</p>}
        ></Column>
        <Column
          key={"phone"}
          title={"Telefon raqam"}
          render={(record: UserType) => <p>{record.phone}</p>}
        ></Column>
        <Column
          key={"created_at"}
          title={"Yaratilgan sana"}
          render={(record: UserType) => (
            <Tag color="green">{DateUTC(record.created_at)}</Tag>
          )}
        ></Column>
        <Column
          key={"role"}
          title={"Roli"}
          render={(record: UserType) => (
            <Tag color={UserRoles[record.role].toLowerCase() === "admin" ? "green" : "red"}>{UserRoles[record.role]}</Tag>
          )}
        ></Column>
        <Column
          key={"status"}
          title={"Statusi"}
          render={(record: UserType) => <p>{record.status}</p>}
        ></Column>

        <Column
          key={"actions"}
          title={""}
          render={(record: UserType) => (
            <Space>
              {/* <Tooltip title="edit">
                <Button
                  shape="circle"
                  onClick={() => ModalUpdateandler(record.id)}
                >
                  <EditOutlined />
                </Button>
              </Tooltip> */}
              <Popconfirm
                title="O'chirishni xohlaysizmi?"
                description=""
                onConfirm={() => ModalDeleteHandler(record.id)}
                okText="Ha "
                cancelText="No"
              >
                <Button danger>
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
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
export default memo(UserTable);
