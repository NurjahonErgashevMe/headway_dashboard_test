/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, MutationOptions } from "@tanstack/react-query";
import { Instance } from "../utils/axios";
import { url } from "../helpers/index";
import { useCookies } from "react-cookie";

const useCreate = (urlPath: string, options?: MutationOptions) => {
  const [cookie] = useCookies(["token"]);
  return useMutation(
    (data: any) =>
      Instance.post(`${url}/${urlPath}`, data, {
        headers: {
          Authorization: cookie.token,
        },
      }),
    options
  );
};

export default useCreate;
