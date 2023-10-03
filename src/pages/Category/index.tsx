import classes from "./index.module.scss";
import useGET from "../../hooks/useGET";
import ProductTable from "./Table";
import { CategoryType } from "../../types/category.type";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";

function Category() {
  const category = useGET<CategoryType>(["category"], "/category");
  if (category.isLoading) {
    return <Loader/>
  }
  if (category.isError) {
    return <Error code={"123"} />
  }

  if (category.isSuccess) {
    return (
      <div className={classes.products}>
        <ProductTable data={category.data.data}></ProductTable>
      </div>
    );
  }
}

export default Category;
