/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React from "react";
import {
  Layout,
  Menu,
  Button,
  Space,
  Dropdown,
  // Form,
  // Input,
  // message,
} from "antd";
import classes from "./Sidebar.module.scss";
import routes from "../../../route/Routes";
import { useLocation, useNavigate } from "react-router-dom";
import { UserTypes } from "../../../types/user.type";
import CustomAvatar from "./Avatar/Avatar";
import { useCookies } from "react-cookie";
// import MyModal from "../../Modal/Modal";
import type { MenuProps } from "antd";
// import useUpdate from "../../../hooks/useUpdate";
// import NiceModal from "@ebay/nice-modal-react";
// import MaskedInput from "react-input-mask";
// import { mask } from "../../../helpers";

const { Header } = Layout;

type Props = {
  user: UserTypes;
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: "100px",
  display: "flex",
  position: "fixed",
  top: 0,
};

const Sidebar: React.FC<Props> = ({ user }) => {
  const location = useLocation();
  // const userUpdate = useUpdate(`user/${user.id}`);
  const [, , removeCookie] = useCookies(["token", "phone"]);
  const navigate = useNavigate();
  const handlerLogOut = () => {
    removeCookie("phone");
    removeCookie("token");
    navigate("/login");
  };
  // const [form] = Form.useForm();
  // const handleEditUser = () => {
  //   NiceModal.show(MyModal, {
  //     children: (
  //       <Form
  //         form={form}
  //         onFinish={(data) => {
  //           message.loading("changing...");
  //           data = {
  //             ...data,
  //             phone: data.phone
  //               .split(" ")
  //               .filter(
  //                 (item: string) => ![" ", "-", "(", ")", "+"].includes(item)
  //               )
  //               .join(""),
  //           };

  //           userUpdate.mutate(data, {
  //             onSettled: (data) => {
  //               if (data) {
  //                 console.log(data);

  //                 message.success("changed!");
  //                 return;
  //               }
  //               message.error("error");
  //               return;
  //             },
  //           });
  //         }}
  //       >
  //         <Form.Item<UserTypes>
  //           name={"first_name"}
  //           rules={[{ required: true, message: "First name is required" }]}
  //           initialValue={user?.first_name || ""}
  //         >
  //           <Input defaultValue={user?.first_name || ""}></Input>
  //         </Form.Item>
  //         <Form.Item<UserTypes>
  //           name={"last_name"}
  //           initialValue={user?.last_name || ""}
  //           rules={[{ required: true, message: "Last name is required" }]}
  //         >
  //           <Input defaultValue={user?.last_name || ""}></Input>
  //         </Form.Item>
  //         <Form.Item<UserTypes>
  //           name={"email"}
  //           initialValue={user.email}
  //           rules={[
  //             { required: true, message: "Invalid email", type: "email" },
  //           ]}
  //         >
  //           <Input defaultValue={user?.email || ""}></Input>
  //         </Form.Item>
  //         <Form.Item<UserTypes>
  //           name={"phone"}
  //           rules={[{ required: true, message: "Phone is required" }]}
  //           initialValue={user.phone}
  //         >
  //           <MaskedInput
  //             className={classes.input}
  //             mask={"+ 998 ( 99 ) 999 - 99 - 99"}
  //             defaultValue={mask(user.phone)}
  //           />
  //         </Form.Item>
  //         <Button htmlType="submit">submit</Button>
  //       </Form>
  //     ),
  //     okButton: false,
  //   });
  // };

  const items: MenuProps["items"] = [
    // {
    //   key: "1",
    //   label: <Button onClick={handleEditUser}>Change profile</Button>,
    // },
    {
      key: "1",
      label: (
        <Button style={{ color: "red", border: "Red" }} onClick={handlerLogOut}>
          Logout
        </Button>
      ),
      disabled: true,
    },
  ];

  return (
    <Header className={classes.sidebar} style={siderStyle}>
      <Space size={30}>
        <Dropdown menu={{ items }} placement="bottomLeft" trigger={["click"]}>
          <div>
            <CustomAvatar user={user} />
          </div>
        </Dropdown>
      </Space>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["0"]}
        className={classes.menu}
      >
        {routes?.map((item, index) => (
          <Button
            href={item.path}
            className={classes.menu__link}
            shape="round"
            type={location.pathname == item.path ? "primary" : "default"}
            color="red"
            key={index}
          >
            {item.title}
          </Button>
        ))}
      </Menu>
    </Header>
  );
};

export default React.memo(Sidebar);
