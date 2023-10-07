export type CategoryType = {
  name_uz: string;
  name_lat: string;
  name_ru: string;
  id: string;
  parent_id: string | null;
  image_url : string;
  children ?: CategoryType[] | [null]
};
