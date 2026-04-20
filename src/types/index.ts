export type ProductCategory = 
  | 'diseños' 
  | 'reposteria' 
  | 'bolleria' 
  | 'postres' 
  | 'cafe'
  | 'signature'
  | 'seasonal'
  | 'catering'
  | 'gifts';

export interface Product {
    id: string;
    slug: string;
    name: string;
    description: string;
    price: number;
    category: ProductCategory;
    imageUrl: string;
    isFeatured: boolean;
    allergens?: string[];
}
