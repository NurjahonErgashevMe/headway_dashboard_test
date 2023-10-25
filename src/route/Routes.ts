/* eslint-disable @typescript-eslint/no-explicit-any */
import Category from "../pages/Category";
import Order from "../pages/Order";
import Products from "../pages/Product";
import Reklama from "../pages/Reklama";
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

  {
    path: "/orders",
    title: "Zakazlar",
    index: false,
    Component: Order,
  },
  {
    path: "/ads",
    title: "Reklamalar",
    index: false,
    Component: Reklama,
  },
];

export default routes;
