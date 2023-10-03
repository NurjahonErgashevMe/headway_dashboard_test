import React from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar/Sidebar";
import useGET from "../../hooks/useGET";
import { CategoryType } from "../../types/category.type";
import { useStore } from "../../utils/store/store";

const { Content } = Layout;

type Props = {
  children: React.ReactNode;
};

const CustomLayout: React.FC<Props> = ({ children }) => {
  const category = useGET<CategoryType>(["category"], "/category");
  const { state, setState } = useStore();
  const flattenTree = (tree: CategoryType[]): CategoryType[] => {
    const result: CategoryType[] = [];

    const flatten = (node: CategoryType) => {
      const { children, ...rest } = node;
      result.push(rest);

      if (children) {
        for (const child of children) {
          flatten(child);
        }
      }
    };

    for (const node of tree) {
      flatten(node);
    }

    return result;
  };
  if (category.isSuccess && state == null) {
    setState(flattenTree(category?.data?.data));
  }
  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Content style={{ marginTop: "100px" }}>
          <main>{children}</main>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CustomLayout;
