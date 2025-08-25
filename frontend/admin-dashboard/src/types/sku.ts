export interface SKU {
  id: number;
  name: string;
  code: string;
  category?: string;
  stock: number;
  price: number;
  location?: string;
  created_at?: string;
  updated_at?: string;
}
