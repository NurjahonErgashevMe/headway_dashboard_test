/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate, Route, Routes } from "react-router-dom";
import routes from "./route/Routes";
import Login from "./pages/Login";
import CustomLayout from "./components/Layout";
import { useCookies } from "react-cookie";

function App() {
  const [cookies] = useCookies(["token"]);
  return (
    <Routes>
      {routes?.map(({ Component, ...item }, index) => (
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
    </Routes>
  );
}

export default App;
