export type ProductCategory = 'pasteles' | 'bolleria' | 'postres' | 'cafe';

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
