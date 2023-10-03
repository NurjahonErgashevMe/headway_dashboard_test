/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { Instance } from "../utils/axios";

type OptionsType = Omit<
  UseQueryOptions<any, any, any, any>,
  "queryKey" | "queryFn" | "initialData"
> & { initialData?: () => undefined };

const useGET = <T>(
  keys: string | string[],
  url: string,
  options?: OptionsType
) : UseQueryResult<{data : T[]}> => {
  return useQuery(
    keys,
    () =>
      Instance.get(url, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTU1NzUzMDhkYzY0MDNjNzM1NmY0NSIsImlhdCI6MTY5NTg5NzUwOX0.NHotyJ2YIqHogyyA8PHO_PeAMl5bJhnIQihTMZiZBeY",
        },
      }),
    options
  );
};

export default useGET;
