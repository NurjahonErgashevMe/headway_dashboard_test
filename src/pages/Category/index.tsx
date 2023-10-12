import classes from "./index.module.scss";
import useGET from "../../hooks/useGET";
import ProductTable from "./Table";
import { CategoryType } from "../../types/category.type";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { Button } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import NiceModal from "@ebay/nice-modal-react";
import Add from "./Forms/Add";
import MyModal from "../../components/Modal/Modal";
function Category() {
  const category = useGET<CategoryType[]>(["category"], "/category/parents");
  if (category.isLoading) {
    return <Loader />;
  }
  if (category.isError) {
    return <Error code={"123"} />;
  }

  if (category.isSuccess) {
    const addHandler = () => {
      NiceModal.show(MyModal, {
        children: <Add />,
        variant : "add",
        okButton: false,
      });
    };
    return (
      <div className={classes.products}>
        <div className={classes.buttonWrapper}>
          <Button  onClick={addHandler}>
            {" "}
            <PlusCircleFilled /> Add
          </Button>
        </div>
        <ProductTable data={category.data.data}></ProductTable>
      </div>
    );
  }
}

export default Category;
