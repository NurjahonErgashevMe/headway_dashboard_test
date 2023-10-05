/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar/Sidebar";
import useGET from "../../hooks/useGET";
import { CategoryType } from "../../types/category.type";
import { useStore } from "../../utils/store/store";
import { UserTypes } from "../../types/user.type";
import Loader from "../Loader/Loader";
import { useCookies } from "react-cookie";
import flattenTree from "../../helpers/flutten";

const { Content } = Layout;

type Props = {
  children: React.ReactNode;
};

const CustomLayout: React.FC<Props> = ({ children }) => {
  const categories = useGET<CategoryType>(["category"], "/category");
  const users = useGET<UserTypes>(["users"], "admin/users/list");
  const [cookies] = useCookies(["phone"]);
  const { category, setCategory } = useStore();

  if (categories.isSuccess && category == null) {
    setCategory(flattenTree(categories?.data?.data));
  }
  if (categories.isSuccess && users.isSuccess) {
    const user: UserTypes = users.data.data.find(
      (item) => item.phone === String(cookies.phone)
    ) as any;

    return (
      <Layout>
        <Sidebar user={user} />
        <Layout>
          <Content style={{ marginTop: "100px" }}>
            <main>{children}</main>
          </Content>
        </Layout>
      </Layout>
    );
  } else {
    return (
      <div>
        <Loader />
      </div>
    );
  }
};

export default CustomLayout;
