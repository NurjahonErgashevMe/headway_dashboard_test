/* eslint-disable @typescript-eslint/no-explicit-any */
import { CategoryType } from "../types/category.type";

const flattenTree = (
  tree: CategoryType[]
): (CategoryType & { flatten_parent_id: string })[] => {
  const result: (CategoryType & { flatten_parent_id: string })[] = [];

  const flatten = (node: CategoryType, parentId: string = "") => {
    const { children, ...rest } = node;

    result.push({ ...rest, flatten_parent_id: parentId });

    if (children && Array.isArray(children)) {
      for (const child of children) {
        if (child) {
          // Add null check here
          flatten(child as any, rest.id);
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
