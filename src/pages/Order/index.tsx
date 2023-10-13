import classes from "./index.module.scss";
import CustomTable from "./Table";
const Order: React.FC = () => {
  return (
    <div className={classes.order}>
      <div className="container">
        <CustomTable />
      </div>
    </div>
  );
};

export default Order;
