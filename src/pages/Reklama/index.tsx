import classes from "./index.module.scss";
import useGET from "../../hooks/useGET";
import Table from "./Table";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { Button } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import NiceModal from "@ebay/nice-modal-react";
import Add from "./Forms/Add";
import MyModal from "../../components/Modal/Modal";
import { ReklamaType } from "../../types/reklama.type";
function Reklama() {
  const reklama = useGET<ReklamaType[]>(["reklama"], "/admin/ads/all");
  if (reklama.isLoading) {
    return <Loader />;
  }
  
  if (reklama.isError) {
    return <Error code={""} />;
  }

  if (reklama.isSuccess) {
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
        <Table data={reklama.data.data}></Table>
      </div>
    );
  }
}

export default Reklama;
