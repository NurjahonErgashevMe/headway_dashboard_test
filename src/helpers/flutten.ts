import { CategoryType } from "../types/category.type";

const flattenTree = (tree: CategoryType[]): CategoryType[] => {
  const result: CategoryType[] = [];

  const flatten = (node: CategoryType) => {
    const { children, ...rest } = node;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    result.push(rest as any);

    if (children) {
      for (const child of children) {
        flatten(child);
      }
    }
  };

  for (const node of tree) {
    flatten(node);
  }

  return result;
};

export default flattenTree