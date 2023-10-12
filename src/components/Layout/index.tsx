/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar/Sidebar";
import useGET from "../../hooks/useGET";
import { UserTypes } from "../../types/user.type";
import Loader from "../Loader/Loader";
import { useCookies } from "react-cookie";

const { Content } = Layout;

type Props = {
  children: React.ReactNode;
};

const CustomLayout: React.FC<Props> = ({ children }) => {
  const users = useGET<UserTypes[]>(["users"], "admin/users/list");
  const [cookies] = useCookies(["phone", "token"]);

  if (users.isSuccess) {
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
