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
import { Button, Input, Select } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import { useCookies } from "react-cookie";
import { ChangeEvent, useState } from "react";
import { useDebounce } from "usehooks-ts";

function Products() {
  const { data, isLoading, isError, isSuccess } = useGET<ProductType[]>(
    ["products"],
    "/product/my"
  );
  const [value, setValue] = useState<string>("");
  const [searchBy, setSearchBy] = useState<"name_uz" | "name_ru" | "name_lat">(
    "name_uz"
  );
  const debouncedValue = useDebounce<string>(value, 500);
  const [cookie] = useCookies(["phone"]);
  const users = useGET<UserTypes[]>(["users"], "/admin/users/list");
  if (isLoading || users.isLoading) {
    return <Loader />;
  }
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  if (isError) {
    return <Error code={"123"} />;
  }

  if (isSuccess && users.isSuccess) {
    const user = users.data.data.find(
      (i) => i.phone === String(cookie.phone)
    ) as UserTypes;

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
            <PlusCircleFilled /> Add
          </Button>
        </div>
        <div className="input-wrapper container">
          <Input placeholder="search..." onChange={handleChange} />
          <Select<"name_uz" | "name_ru" | "name_lat">
            defaultValue="name_uz"
            style={{ width: 120 }}
            onChange={(e) => setSearchBy(e)}
            options={[
              { value: "name_uz", label: "Nom o'zbek" },
              { value: "name_ru", label: "Nom ruscha" },
              { value: "name_lat", label: "Nom lotincha" },
            ]}
          />
        </div>
        <ProductTable
          data={
            value
              ? data?.data?.filter((item) => {
                  return item?.[searchBy]
                    ?.toLowerCase()
                    .includes(debouncedValue.toLowerCase());
                })
              : data?.data
          }
          user={user}
        ></ProductTable>
      </div>
    );
  }
}

export default Products;
