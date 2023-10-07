/* eslint-disable react-refresh/only-export-components */
import { memo } from "react";
import { Input } from "antd";
import classes from "./View.module.scss";
import { CategoryType } from "../../../../types/category.type";
import { useStore } from "../../../../utils/store/store";
type Props = {
  data: CategoryType;
  id: string;
};

const CategoryView: React.FC<Props> = ({ id }) => {
  const { category } = useStore();
  const item:
    | CategoryType
    | { name_uz: string; name_ru: string; name_lat: string } = category?.find(
    (item) => item.id === id
  ) || {
    name_uz: "",
    name_ru: "",
    name_lat: "",
  };
  console.log(category?.map(item=>item.id));
  
  return (
    <div className={classes.view}>
      <Input value={item?.name_uz} placeholder="Name uz"></Input>
      <Input value={item?.name_ru} placeholder="Name ru"></Input>
      <Input value={item?.name_lat} placeholder="Name lat"></Input>
    </div>
  );
};

export default memo(CategoryView);
