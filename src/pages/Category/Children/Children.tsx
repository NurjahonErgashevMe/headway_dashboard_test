/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from "../../../components/Loader/Loader";
import useGET from "../../../hooks/useGET";
import { Table, message, Space, Tooltip, Button } from "antd";
import { CategoryType } from "../../../types/category.type";
import NiceModal from "@ebay/nice-modal-react";
import MyModal from "../../../components/Modal/Modal";
import View from "./Forms/View";
import Update from "./Forms/Update";
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Instance } from "../../../utils/axios";
import { useCookies } from "react-cookie";
type Props = {
  id: string;
};

const Children: React.FC<Props> = ({ id }) => {
  const { data, isLoading, isSuccess } = useGET<CategoryType[]>(
    ["category", id],
    `category/children/${id}`
  );
  const [cookie] = useCookies(["token"]);
  const queryClient = useQueryClient();
  if (isLoading) {
    return <Loader />;
  }
  const ModalViewHandler = (id: string, parentId: string = id) => {
    const finded: CategoryType = data?.data as any;

    NiceModal.show(MyModal, {
      children: <View data={finded} id={id} parentId={parentId} />,
      variant: "view",
      okButton: false,
    });
  };
  const ModalDeleteHandler = (id: string) => {
    NiceModal.show(MyModal, {
      children: (
        <div>
          <h3>Do you want delete this?</h3>
          <Button
            style={{ borderColor: "red", color: "red" }}
            onClick={() => {
              message.loading("deleting...");
              Instance.delete(`/admin/category/${id}`, {
                headers: {
                  Authorization: cookie.token,
                },
              }).then((data) => {
                if (data.statusText === "OK") {
                  queryClient.invalidateQueries({
                    queryKey: ["category"],
                  });
                  return message.success("deleted!");
                }
                return message.error("error");
              });
            }}
          >
            Delete
          </Button>
        </div>
      ),
      variant: "delete",
      okButton: false,
    });
  };
  const ModalUpdateandler = (id: string, parent_id: string) => {
    NiceModal.show(MyModal, {
      children: <Update id={id} parentId={parent_id} />,
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
  if (isSuccess) {
    return (
      <>
        <Table
          dataSource={data.data.map((item) => ({
            ...item,
            key: item.id,
            children: null,
          }))}
        >
          <Table.Column
            key={"name_uz"}
            title={"Name uz"}
            render={(record: CategoryType) => <p>{record?.name_uz}</p>}
          ></Table.Column>
          <Table.Column
            key={"name_ru"}
            title={"Name ru"}
            render={(record: CategoryType) => <p>{record?.name_ru}</p>}
          ></Table.Column>
          <Table.Column
            key={"name_lat"}
            title={"Name lat"}
            render={(record: CategoryType) => <p>{record?.name_lat}</p>}
          ></Table.Column>
          <Table.Column
            key={"actions"}
            title={"Actions"}
            render={(record: CategoryType) => (
              <Space>
                <Tooltip title="edit">
                  <Button
                    shape="circle"
                    onClick={() => ModalUpdateandler(record.id, id)}
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
                    onClick={() => ModalViewHandler(record.id, id)}
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
          ></Table.Column>
        </Table>
      </>
    );
  }
};

export default Children;
