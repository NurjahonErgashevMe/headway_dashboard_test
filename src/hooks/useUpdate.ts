/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, MutationOptions } from "@tanstack/react-query";
import { Instance } from "../utils/axios";
import { url } from "../helpers/index";
import { useCookies } from "react-cookie";

const useUpdate = (urlPath: string, options?: MutationOptions) => {
  const [cookie] = useCookies(["token", "basic"]);
  return useMutation(
    (data: any) =>
      Instance.patch(`${url}/${urlPath}`, data, {
        headers: {
          Authorization: cookie.token,
          basic: cookie.basic,
        },
      }),
    options
  );
};

export default useUpdate;
