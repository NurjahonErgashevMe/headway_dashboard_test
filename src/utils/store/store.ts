/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { CategoryType } from "../../types/category.type";

type CategoryStore = {
  state: any[] | null;
  setState: (data: CategoryType[]) => void;
};

export const useStore = create<CategoryStore>()((set) => ({
  state: null,
  setState: (data) => set(() => ({ state: data })),
}));
