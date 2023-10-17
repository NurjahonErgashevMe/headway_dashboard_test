/* eslint-disable react-hooks/rules-of-hooks */
import { Instance } from "../utils/axios";

type Data1 = {
  id: string;
  name_uz: string;
  name_ru: string;
  name_lat: string;
  image: string;
};

type Data2 = {
  parent_id: string;
  name_uz: string;
  name_ru: string;
  name_lat: string;
  children?: Omit<Data2, "children">[];
}[];

async function getCategoryById(id: string): Promise<Data2[]> {
  const response = await Instance.get(`/category/children/${id}`);
  return response.data;
}

async function getAllCategory(data1: Data1[]): Promise<Data2[][]> {
  const result: Data2[][] = [];

  for (const item of data1) {
    const category = await getCategoryById(item.id);
    result.push(category);
  }

  return result;
}

export default getAllCategory;
