/* eslint-disable react-refresh/only-export-components */
import { memo } from "react";
import classes from "./Slider.module.scss";

type Props = {
  value: string;
  setValue: (e: string) => void;
  toSelect: string;
};

const SliderItem: React.FC<Props> = ({ setValue, value, toSelect }) => {
  return (
    <div className={classes.slider} onClick={() => setValue(toSelect)}>
      {value}
    </div>
  );
};

export default memo(SliderItem);
