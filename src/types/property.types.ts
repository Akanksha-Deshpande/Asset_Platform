export type Property = {
  id: string;
  title: string;
  location: string;
  price: number;
  yield: number; // annual yield percentage
  images: string;
  description: string;
};

export type PropertyFilters = {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  minYield?: number;
};