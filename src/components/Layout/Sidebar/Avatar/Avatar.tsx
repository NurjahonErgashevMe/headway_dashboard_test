import { UserOutlined } from "@ant-design/icons";
import React from "react";
import { Avatar, Space } from "antd";

type Props = {
  first_name: string;
  last_name: string;
};

const App: React.FC<Props> = ({ first_name, last_name }) => (
  <Space wrap size={16}>
    <Avatar size="large" icon={<UserOutlined />} />
    <span>
      {first_name} {last_name}
    </span>
  </Space>
);

export default App;
