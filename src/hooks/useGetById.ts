/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, MutationOptions } from "@tanstack/react-query";
import { Instance } from "../utils/axios";
import { useCookies } from "react-cookie";
import { url } from "../helpers";

const useGetById = (urlPath: string, options?: MutationOptions) => {
  const [cookie] = useCookies(["token", "basic"]);
  return useMutation(
    (id) =>
      Instance.get(`${url}/${urlPath}/${id}`, {
        headers: {
          Authorization: cookie.token,
          basic: cookie.basic,
        },
      }),
    options
  );
};

export default useGetById;
