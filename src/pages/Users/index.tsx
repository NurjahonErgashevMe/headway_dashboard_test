import classes from "./index.module.scss";
import useGET from "../../hooks/useGET";
import UserTable from "./Table";
import { UserTypes } from "../../types/user.type";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { Button } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import NiceModal from "@ebay/nice-modal-react";
import MyModal from '../../components/Modal/Modal'
import Add from "./Forms/Add";
function Users() {
  const users = useGET<UserTypes[]>(["users"], "/admin/users/list");
  if (users.isLoading) {
    return <Loader />;
  }
  if (users.isError) {
    return <Error code={"123"} />;
  }

  if (users.isSuccess) {
    const addHandler = () => {
      NiceModal.show(MyModal, {
        children: <Add />,
        variant: "add",
        okButton: false,
      });
    };
    return (
      <div className={classes.users}>
        <div className={classes.buttonWrapper}>
          <Button onClick={addHandler}>
            {" "}
            <PlusCircleFilled /> Add
          </Button>
        </div>
        <UserTable data={users.data.data}></UserTable>
      </div>
    );
  }
}

export default Users;
