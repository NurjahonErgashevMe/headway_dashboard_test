import classes from "./index.module.scss";
import useGET from "../../hooks/useGET";
import ProductTable from "./Table";
import { ProductType } from "../../types/product.type";
import { UserTypes } from "../../types/user.type";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import Add from "./Forms/Add";
import NiceModal from "@ebay/nice-modal-react";
import MyModal from "../../components/Modal/Modal";
import { Button } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";

function Products() {
  const { data, isLoading, isError, isSuccess } = useGET<ProductType[]>(
    ["products"],
    "/admin/product/list"
  );
  const users = useGET<UserTypes[]>(["users"], "/admin/users/list");
  if (isLoading || users.isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Error code={"123"} />;
  }
  if (isSuccess && users.isSuccess) {
    const addHandler = () => {
      NiceModal.show(MyModal, {
        children: <Add />,
        variant: "add",
        okButton: false,
      });
    };
    return (
      <div className={classes.products}>
        <div className={classes.buttonWrapper}>
          <Button onClick={addHandler}>
            {" "}
            <PlusCircleFilled /> Add
          </Button>
        </div>
        <ProductTable data={data?.data} users={users.data.data}></ProductTable>
      </div>
    );
  }
}

export default Products;
