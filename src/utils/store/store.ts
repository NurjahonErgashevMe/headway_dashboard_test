/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { CategoryType } from "../../types/category.type";
import { UserTypes } from "../../types/user.type";

type CategoryStore = {
  category: CategoryType[] | null;
  setCategory: (data: CategoryType[]) => void;
  users: UserTypes[] | null;
  setUsers: (data: UserTypes[]) => void;
};

export const useStore = create<CategoryStore>()((set) => ({
  category: null,
  setCategory: (data) => set(() => ({ category: data })),
  users: null,
  setUsers: (data) => set(() => ({ users: data })),
}));
