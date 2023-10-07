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
import useDelete from "../../../hooks/useDelete";
import { useQueryClient } from "@tanstack/react-query";
type Props = {
  id: string;
};

const Children: React.FC<Props> = ({ id }) => {
  const { data, isLoading, isSuccess } = useGET<CategoryType[]>(
    ["category", id],
    `category/children/${id}`
  );
  const useDELETE = useDelete(`admin/category`);
  const queryClient = useQueryClient();
  if (isLoading) {
    return <Loader />;
  }
  const ModalViewHandler = (id: string) => {
    const finded: CategoryType = data?.data as any;

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
  const ModalUpdateandler = (id: string) => {
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
  if (isSuccess) {

    return (
      <Table dataSource={data.data.map((item) => ({ ...item, key: item.id }))}>
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
                  onClick={() => ModalUpdateandler(record.id)}
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
        ></Table.Column>
      </Table>
    );
  }
};

export default Children;
