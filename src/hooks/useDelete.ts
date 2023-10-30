import { useMutation, MutationOptions } from "@tanstack/react-query";
import { Instance } from "../utils/axios";
import { url } from "../helpers/index";
import { useCookies } from "react-cookie";

const useDelete = (urlPath: string, options?: MutationOptions) => {
  const [cookie] = useCookies(["token" , "basic"]);

  return useMutation(
    (id) =>
      Instance.delete(`${url}/${urlPath}/${id}`, {
        headers: {
          Authorization: cookie.token,
          basic: cookie.basic,
        },
      }),
    options
  );
};

export default useDelete;
