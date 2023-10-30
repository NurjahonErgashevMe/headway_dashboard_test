/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCookies } from "react-cookie";
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

function MyRoutes() {
  const [cookie] = useCookies(["role", "basic"]);
  if (cookie?.role?.toLowerCase() === "admin" && cookie?.basic) {
    const routes: RouteProps[] = [
      {
        path: "/",
        title: "Produktalar",
        index: true,
        Component: Products,
      },
      {
        path: "/category",
        title: "Kategoriyalar",
        index: false,
        Component: Category,
      },
      {
        path: "/users",
        title: "Userlar/adminlar",
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
    return routes;
  }
  return [
    {
      path: "/",
      title: "Produktalar",
      index: true,
      Component: Products,
    },

    {
      path: "/orders",
      title: "Zakazlar",
      index: false,
      Component: Order,
    },
  ];
}

export default MyRoutes;
