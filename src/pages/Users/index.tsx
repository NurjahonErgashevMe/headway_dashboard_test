import classes from "./index.module.scss";
import useGET from "../../hooks/useGET";
import UserTable from "./Table";
import { UserTypes } from "../../types/user.type";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";

function Users() {
  const users = useGET<UserTypes[]>(["users"], "/admin/users/list");
  if (users.isLoading) {
    return <Loader />;
  }
  if (users.isError) {
    return <Error code={"123"} />;
  }

  if (users.isSuccess) {
    return (
      <div className={classes.users}>
        <UserTable data={users.data.data}></UserTable>
      </div>
    );
  }
}

export default Users;
