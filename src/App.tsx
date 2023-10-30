/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import CustomLayout from "./components/Layout";
import { useCookies } from "react-cookie";
import NotFound from "./pages/NotFound";
import MyRoutes from "./route/Routes";

function App() {
  const [cookies] = useCookies(["token"]);
  return (
    <Routes>
      {MyRoutes()?.map(({ Component, ...item }, index) => (
        <Route
          path={item.path}
          index={item.index}
          element={
            cookies.token ? (
              <CustomLayout>
                <Component></Component>
              </CustomLayout>
            ) : (
              <Navigate to="/login" replace></Navigate>
            )
          }
          key={index}
        ></Route>
      ))}
      <Route path="/login" element={<Login />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
