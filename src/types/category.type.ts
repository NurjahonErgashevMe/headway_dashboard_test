export type CategoryType = {
  lvl: number;
  name_uz: string;
  name_lat: string;
  name_ru: string;
  id: string;
  parent_id: string | null;
  children : CategoryType[]
  image_url : string;
};
