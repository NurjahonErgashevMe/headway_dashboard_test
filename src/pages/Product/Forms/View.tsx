/* eslint-disable react-refresh/only-export-components */
import { memo } from "react";
import { Input, Select } from "antd";
import DateUTC from "../../../hooks/useDateUTC";
import classes from "./View.module.scss";
import { useStore } from "../../../utils/store/store";
import { ProductType } from "../../../types/product.type";
type Props = {
  data: ProductType;
  owner: string;
};

const { TextArea } = Input;

const ProductView: React.FC<Props> = ({ data, owner }) => {
  const { category } = useStore();

  return (
    <div className={classes.view}>
      <Input value={data?.name_uz} placeholder="Name uz"></Input>
      <Input value={data?.name_ru} placeholder="Name ru"></Input>
      <Input value={data?.name_lat} placeholder="Name lat"></Input>
      <Input value={data?.price} placeholder="Price"></Input>
      <Input value={data?.sale_price} placeholder="Sale Price"></Input>
      <Input value={owner} placeholder="Owner"></Input>
      <Input value={DateUTC(data?.created_at)} placeholder="created at"></Input>
      <Select
        placeholder="Please select"
        value={data?.characteristic?.color}
        style={{ width: "100%" }}
      />
      <Select
        placeholder="Please select"
        value={category?.find((item) => item.id == data.category_id)?.name_uz || []}
        style={{ width: "100%" }}
      />
      <TextArea value={data?.description} rows={4} />
    </div>
  );
};

export default memo(ProductView);
