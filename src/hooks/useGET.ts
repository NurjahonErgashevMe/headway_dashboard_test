/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { Instance } from "../utils/axios";
import { useCookies } from "react-cookie";

type OptionsType = Omit<
  UseQueryOptions<any, any, any, any>,
  "queryKey" | "queryFn" | "initialData"
> & { initialData?: () => undefined };

const useGET = <T>(
  keys: string | string[],
  url: string,
  options?: OptionsType
): UseQueryResult<{ data: T }> => {
  const [cookie] = useCookies(["token", "basic"]);
  return useQuery(
    keys,
    () =>
      Instance.get(url, {
        headers: {
          Authorization: cookie.token,
          basic: cookie.basic,
        },
      }),
    options
  );
};

export default useGET;
