import classes from "./index.module.scss";
import useGET from "../../hooks/useGET";
import ProductTable from "./Table";
import { ProductType } from "../../types/product.type";
import { UserTypes } from "../../types/user.type";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";

function Products() {
  const { data, isLoading, isError, isSuccess } = useGET<ProductType>(
    ["products"],
    "/admin/product/list"
  );
  const users = useGET<UserTypes>(["users"], "/admin/users/list");
  const category = useGET(["category"], "/category");
  if (isLoading || users.isLoading || category.isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Error code={"123"} />;
  }
  if (isSuccess && users.isStale) {
    return (
      <div className={classes.products}>
        <ProductTable
          data={data?.data}
          users={users?.data?.data as UserTypes[]}
        ></ProductTable>
      </div>
    );
  }
}

export default Products;
