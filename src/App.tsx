/* eslint-disable @typescript-eslint/no-explicit-any */
import { Route, Routes } from "react-router-dom";
import routes from "./route/Routes";
import Login from "./pages/Login";
import CustomLayout from "./components/Layout";
import ProtectRoutes from "./route/ProtectRoutes";

function App() {
  return (
    <Routes>
      {routes?.map(({ Component, ...item }, index) => (
        <Route
          path={item.path}
          index={item.index}
          element={
            <CustomLayout>
              <ProtectRoutes>
                <Component></Component>
              </ProtectRoutes>
            </CustomLayout>
          }
          key={index}
        ></Route>
      ))}
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
}

export default App;
