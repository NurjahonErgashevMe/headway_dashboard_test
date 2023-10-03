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
import { message } from "antd";
import { UserTypes as UserType } from "../../types/user.type";
import { useQueryClient } from "@tanstack/react-query";
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
  const ModalViewHandler = (id: string) => {
    const finded: UserType = data.find((item) => item.id == id) || data[0];

    NiceModal.show(MyModal, {
      children: <UserView data={finded} />,
      variant: "view",
      cancelButton: false,
    });
  };
  const ModalDeleteHandler = (id: string) => {
    NiceModal.show(MyModal, {
      children: <h2>Do you want delete this?</h2>,
      variant: "view",
      onOk: () =>
        useDELETE.mutate(id as any, {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["users"],
            });
            message.success("deleted!");
          },
          onError: () => {
            message.error("error!");
          },
        }),
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
      <Table
        dataSource={data?.map((item, index) => ({ ...item, key: index + 1 }))}
      >
        <Column
          key={"last_name"}
          title={"Fisrtname"}
          render={(record: UserType) => <p>{record.first_name}</p>}
        ></Column>
        <Column
          title={"last_name"}
          key={"Lastname"}
          render={(record: UserType) => <p>{record.last_name}</p>}
        ></Column>
        <Column
          key={"phone"}
          title={"Phone"}
          render={(record: UserType) => <p>{record.phone}</p>}
        ></Column>
        <Column
          key={"created_at"}
          title={"Created at"}
          render={(record: UserType) => (
            <Tag color="green">{DateUTC(record.created_at)}</Tag>
          )}
        ></Column>
        <Column
          key={"role"}
          title={"Role"}
          render={(record: UserType) => <Tag color="red">{record.role}</Tag>}
        ></Column>
        <Column
          key={"status"}
          title={"Status"}
          render={(record: UserType) => <p>{record.status}</p>}
        ></Column>

        <Column
          key={"actions"}
          title={"Actions"}
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
export default memo(UserTable);
