import {
  useMutation,
  MutationOptions,
} from "@tanstack/react-query";
import { Instance } from "../utils/axios";
import { url } from "../helpers/index";

const useDelete = (urlPath: string, options?: MutationOptions) => {
  return useMutation(
    (id ) =>
      Instance.delete(`${url}/${urlPath}/${id}`, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTU1NzUzMDhkYzY0MDNjNzM1NmY0NSIsImlhdCI6MTY5NTg5NzUwOX0.NHotyJ2YIqHogyyA8PHO_PeAMl5bJhnIQihTMZiZBeY",
        },
      }),
    options
  );
};

export default useDelete;
