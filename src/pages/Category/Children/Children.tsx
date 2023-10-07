import Loader from "../../../components/Loader/Loader";
import useGET from "../../../hooks/useGET";
import { Table  , Image} from "antd";
import { CategoryType } from "../../../types/category.type";

type Props = {
  id: string;
};

const Children: React.FC<Props> = ({ id }) => {
  const { data, isLoading, isSuccess } = useGET<CategoryType>(
    ["category", id],
    `category/children/${id}`
  );
  if (isLoading) {
    return <Loader />;
  }
  if (isSuccess) {
    console.log(data, "children");

    return (
      <Table dataSource={data.data}>
        <Table.Column
          key={"name_uz"}
          title={"Name uz"}
          render={(record: CategoryType) => <p>{record.name_uz}</p>}
        ></Table.Column>
        <Table.Column
          key={"name_ru"}
          title={"Name ru"}
          render={(record: CategoryType) => <p>{record.name_ru}</p>}
        ></Table.Column>
        <Table.Column
          key={"name_lat"}
          title={"Name lat"}
          render={(record: CategoryType) => <p>{record.name_lat}</p>}
        ></Table.Column>
        <Table.Column
          key={"image"}
          title={"Image"}
          width={150}
          render={(
            record: Omit<CategoryType, "image_url"> & { image: string }
          ) => <Image src={record.image} alt="image"></Image>}
        ></Table.Column>
      </Table>
    );
  }
};

export default Children;
