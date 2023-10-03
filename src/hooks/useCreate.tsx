/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, MutationOptions } from "@tanstack/react-query";
import { Instance } from "../utils/axios";
import { url } from "../helpers/index";

const useCreate = (urlPath: string, options?: MutationOptions) => {
  return useMutation(
    (data: any) =>
      Instance.post(`${url}/${urlPath}`, data, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTU1NzUzMDhkYzY0MDNjNzM1NmY0NSIsImlhdCI6MTY5NTg5NzUwOX0.NHotyJ2YIqHogyyA8PHO_PeAMl5bJhnIQihTMZiZBeY",
        },
      }),
    options
  );
};

export default useCreate;
