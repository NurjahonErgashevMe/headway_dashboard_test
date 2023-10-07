/* eslint-disable @typescript-eslint/no-explicit-any */
import { CategoryType } from "../types/category.type";

const flattenTree = (tree: CategoryType[]): CategoryType[] => {
  const result: CategoryType[] = [];

  const flatten = (node: CategoryType) => {
    const { children, ...rest } = node;

    result.push(rest);

    if (children && Array.isArray(children)) {
      for (const child of children) {
        if (child) {
          // Add null check here
          flatten(child as any);
        }
      }
    }
  };

  for (const node of tree) {
    flatten(node);
  }

  return result;
};

export default flattenTree;
