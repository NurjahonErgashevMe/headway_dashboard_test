import classes from "./index.module.scss";
import useGET from "../../hooks/useGET";
import ProductTable from "./Table";
import { CategoryType } from "../../types/category.type";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { Button, Input, Select } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import NiceModal from "@ebay/nice-modal-react";
import Add from "./Forms/Add";
import MyModal from "../../components/Modal/Modal";
import { ChangeEvent, useState } from "react";
import { useDebounce } from "usehooks-ts";

function Category() {
  const { data, isLoading, isError, isSuccess } = useGET<CategoryType[]>(
    ["category"],
    "/category/parents"
  );
  const [value, setValue] = useState<string>("");
  const [searchBy, setSearchBy] = useState<"name_uz" | "name_ru" | "name_lat">(
    "name_uz"
  );
  const debouncedValue = useDebounce<string>(value, 500);
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Error code={""} />;
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  if (isSuccess) {
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
        ></ProductTable>
      </div>
    );
  }
}

export default Category;
