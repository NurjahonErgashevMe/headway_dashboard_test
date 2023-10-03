/* eslint-disable @typescript-eslint/no-explicit-any */
import Category from "../pages/Category";
import Products from "../pages/Product";
import Users from "../pages/Users";
type RouteProps = {
  path: string;
  title: string;
  index?: boolean;
  Component: React.FC;
};

const routes: RouteProps[] = [
  {
    path: "/",
    title: "Products",
    index: true,
    Component: Products,
  },
  {
    path: "/category",
    title: "Category",
    index: false,
    Component: Category,
  },
  {
    path: "/users",
    title: "Users",
    index: false,
    Component: Users,
  },
];

export default routes;
