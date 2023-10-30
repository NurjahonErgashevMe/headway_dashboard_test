/* eslint-disable react-refresh/only-export-components */
import React, { PropsWithChildren, createContext, useState } from "react";

type TContext = {
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
};

export const LoginContext = createContext<TContext | null>(null);

function LoginProvider({ children }: PropsWithChildren<unknown>) {
  const [current, setCurrent] = useState(0);
  const values = { current, setCurrent };
  return (
    <LoginContext.Provider value={values}>{children}</LoginContext.Provider>
  );
}

export const useLoginContext = (): TContext => {
  const context = React.useContext(LoginContext);
  if (!context) {
    throw new Error("context yo'q");
  }
  return context;
};

export default LoginProvider;
